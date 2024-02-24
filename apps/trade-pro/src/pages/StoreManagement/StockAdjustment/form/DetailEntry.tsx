import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import DetailEntryTable from './DetailEntryTable';
import { useEffect, useRef, useState } from 'react';
import { addtableData, newTableData } from './Atom';
import { useGetAccountTitle, useGetAvailableStock, useGetItemName, useGetWhereHouse } from '../quries';
import { InvStockAdjustmentDetail, TDetailItem } from '../types';
import { Card, Col, Row, Form, FormInstance, notification } from 'antd';
import { AntButton, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';

const { useWatch } = Form;

const DynamicForm = ({ form }: TDynamicForm) => {
  const { t } = useTranslation();
  const formValues = useWatch<InvStockAdjustmentDetail[]>('InvStockAdjustmentDetailslist', form);
  const { setFields, getFieldValue } = form;
  const equivalentRate = getFieldValue(['InvStockAdjustmentDetailslist', 0, 'PackEquivalent']);
  const itemId = getFieldValue(['InvStockAdjustmentDetailslist', 0, 'ItemId']);
  const antSelectRef = useRef<any>(null);
  const { data, isSuccess, isLoading } = useGetAvailableStock(true, itemId);
  const [tableData, setTableData] = useAtom(addtableData);
  const [newtableData, setNewTableData] = useAtom(newTableData);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [useFocus, setUseFocus] = useState(false);
  const [edit, setEdit] = useState<InvStockAdjustmentDetail>();
  const [counter, setCounter] = useState<number>(0);
  const initialValues = {
    Id: null,
    ItemId: null,
    ItemName: null,
    UOMCode: null,
    ItemUomId: null,
    ItemUomCode: null,
    PackEquivalent: null,
    BillWeight: null,
    StockWeight: null,
    ReqQty: null,
    NetWeight: null,
    ReqRate: null,
    ReqAmount: null,
    RemarksDetail: null,
    ActionTypeId: null,
    ItemUom: null,
  };
  const handleAddToTable = () => {
    const newData = formValues.map((item, index) => ({
      ItemId: item.ItemId,
      ItemName: item.ItemName,
      ItemUomId: item.ItemUomId,
      ItemUom: item.ItemUom,
      PackUom: item.PackUom,
      ReqQty: item.ReqQty,
      ReqRate: item.ReqRate,
      BillWeight: item.BillWeight,
      StockWeight: item.StockWeight,
      NetWeight: item.NetWeight,
      ReqAmount: item.ReqAmount,
      PackEquivalent: item.PackEquivalent,
      RemarksDetail: item.RemarksDetail,
    }));

    if (newData.some((item) => item.ItemId === null || item.ItemId === undefined)) {
      const message = 'Please select Item!';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.ReqQty === null || item.ReqQty === undefined)) {
      const message = 'Please fill  Request Amount!';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.ReqQty < 0 || item.ReqQty === undefined)) {
      const message = 'Item Qty must be positive or greater then 0!';
      notification.error({ message: message });
      return;
    }
    setUseFocus(true);
    setCounter((prevCounter: number) => prevCounter + 1);
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item) => ({
        ...item,
        LineId: counter,
        Id: 0,
        ActionTypeId: 1,
        WsRmRequisitionPoId: counter,
        DestinationLocationId: 2,
      }));
      const combinedData = [...prevData, ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
    setNewTableData((prevData: any[]) => {
      const updatedData = newData.map((item) => ({
        ...item,
        LineId: counter,
        Id: 0,
        ActionTypeId: 1,
        WsRmRequisitionPoId: counter,
      }));
      const combinedData = [...prevData, ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });

    if (antSelectRef.current) {
      antSelectRef.current.focus();
    }

    form.setFieldValue(['InvStockAdjustmentDetailslist', 0], null);
    setIsEditMode(false);
  };

  const handleUpdateToTable = () => {
    const newData = formValues.map((item, index) => ({
      ItemId: item.ItemId,
      // ItemName: item.ItemName,
      // ItemUomId: item.ItemUomId,
      // PackUom: item.PackUom,
      // ReqQty: item.ReqQty,
      // ReqRate: item.ReqRate,
      // BillWeight: item.BillWeight,
      // StockWeight: item.StockWeight,
      // ItemUom: item.ItemUom,
      // NetWeight: item.NetWeight,
      // ReqAmount: item.ReqAmount,
      // PackEquivalent: item.PackEquivalent,
      RemarksDetail: item.RemarksDetail,
    }));

    if (newData.some((item) => item.ItemId === null || item.ItemId === undefined)) {
      const message = 'Please select Item!';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.ReqQty < 0 || item.ReqQty === undefined)) {
      const message = 'Item Qty must be positive or greater then 0!';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.ReqAmount === null || item.ReqAmount === undefined)) {
      const message = 'Please fill  Request Amount!';
      notification.error({ message: message });
      return;
    }
    const editedRowIndex = tableData.findIndex((row: any) => row.ItemId === edit?.ItemId);

    if (editedRowIndex >= 0) {
      setTableData((prevData: any[]) => {
        const updatedData = [...prevData];
        updatedData[editedRowIndex] = {
          ...newData[0],
          ActionTypeId: 1,
          LineId: edit?.LineId,
          Id: edit?.Id,
          WsRmRequisitionPoId: edit?.WsRmRequisitionPoId,
          DestinationLocationId: edit?.DestinationLocationId,
        };
        console.log('New tableData:', updatedData);
        return updatedData;
      });
    }
    setUseFocus(true);
    setIsEditMode(false);
    form.setFieldValue(['InvStockAdjustmentDetailslist', 0], null);
  };
  const handleResetForm = () => {
    form.setFieldValue(['InvStockAdjustmentDetailslist', 0], null);
  };
  const calculateWeight = (ReqQty: number, equivalentRate: number) => ReqQty * equivalentRate;
  const calculateAmount = (weight: number, rateUOM: number, itemRate: number) => {
    return (weight / rateUOM) * itemRate;
  };

  const handleItemChange = (obj: TDetailItem, index: number) => {
    console.log(obj);
    console.log(obj?.UOMCode);

    setFields([
      { name: ['InvStockAdjustmentDetailslist', index, 'PackUom'], value: obj?.UOMCode },
      { name: ['InvStockAdjustmentDetailslist', index, 'ItemName'], value: obj?.ItemName },
      { name: ['InvStockAdjustmentDetailslist', index, 'ItemUom'], value: obj?.RateUom },
      { name: ['InvStockAdjustmentDetailslist', index, 'ItemId'], value: obj?.ItemId },
      { name: ['InvStockAdjustmentDetailslist', index, 'PackEquivalent'], value: obj?.Equivalent },
      { name: ['InvStockAdjustmentDetailslist', index, 'ReqRate'], value: obj?.ItemPrice },
      { name: ['InvStockAdjustmentDetailslist', index, 'ItemUomId'], value: obj?.ItemUomId },
      { name: ['InvStockAdjustmentDetailslist', index, 'ActionTypeId'], value: 1 },
    ]);

    const ReqQty = getFieldValue(['InvStockAdjustmentDetailslist', index, 'ReqQty']);
    if (ReqQty && obj?.Equivalent) {
      const weight = calculateWeight(ReqQty, obj?.Equivalent);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'NetWeight'], value: weight }]);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'BillWeight'], value: weight }]);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'StockWeight'], value: weight }]);
    } else {
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'NetWeight'], value: null }]);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'BillWeight'], value: null }]);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'StockWeight'], value: null }]);
    }
    const weight = getFieldValue(['InvStockAdjustmentDetailslist', index, 'NetWeight']);
    const itemRate = getFieldValue(['InvStockAdjustmentDetailslist', index, 'ReqRate']);
    console.log(weight);
    if (itemRate && weight && obj?.Equivalent) {
      const amount = calculateAmount(weight, obj?.Equivalent, itemRate);
      console.log(amount);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'ReqAmount'], value: amount }]);
    } else {
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'ReqAmount'], value: null }]);
    }
  };
  const handleReqQtyChange = (ReqQty: number | string | null, index: number) => {
    const equivalentRate = getFieldValue(['InvStockAdjustmentDetailslist', index, 'PackEquivalent']);
    if (ReqQty && typeof ReqQty === 'number' && equivalentRate) {
      const weight = calculateWeight(ReqQty, equivalentRate);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'NetWeight'], value: weight }]);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'BillWeight'], value: weight }]);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'StockWeight'], value: weight }]);
    } else {
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'NetWeight'], value: null }]);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'BillWeight'], value: null }]);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'StockWeight'], value: null }]);
    }
    const weight = getFieldValue(['InvStockAdjustmentDetailslist', index, 'NetWeight']);
    const itemRate = getFieldValue(['InvStockAdjustmentDetailslist', index, 'ReqRate']);
    if (itemRate && weight && equivalentRate) {
      const amount = calculateAmount(weight, equivalentRate, itemRate);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'ReqAmount'], value: amount }]);
    } else {
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'ReqAmount'], value: null }]);
    }
  };

  const handleItemRateChange = (itemRate: number | string | null, index: number) => {
    const weight = getFieldValue(['InvStockAdjustmentDetailslist', index, 'NetWeight']);
    if (itemRate && typeof itemRate === 'number' && weight && equivalentRate) {
      const amount = calculateAmount(weight, equivalentRate, itemRate);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'ItemAmount'], value: amount }]);
    } else {
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'ItemAmount'], value: null }]);
    }
  };

  useEffect(() => {
    const weight = getFieldValue(['InvStockAdjustmentDetailslist', 0, 'NetWeight']);
    if (isSuccess && data?.data?.Data?.Result !== null) {
      setFields([
        {
          name: ['InvStockAdjustmentDetailslist', 0, 'BillWeight'],
          value: data?.data?.Data?.Result?.[0]?.BillWeight,
        },
        {
          name: ['InvStockAdjustmentDetailslist', 0, 'StockWeight'],
          value: data?.data?.Data?.Result?.[0]?.StockWeight,
        },
      ]);
    } else if (data?.data?.Data?.Result === null) {
      setFields([
        {
          name: ['InvStockAdjustmentDetailslist', 0, 'BillWeight'],
          value: weight,
        },
        {
          name: ['InvStockAdjustmentDetailslist', 0, 'StockWeight'],
          value: weight,
        },
      ]);
    }
  }, [form, data, tableData]);
  useEffect(() => {
    if (antSelectRef.current) {
      antSelectRef.current.focus();
    }
  }, [antSelectRef]);

  return (
    <>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card className="detail_card">
            <Form.List name="InvStockAdjustmentDetailslist" initialValue={[initialValues]}>
              {(fields, {}) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className="form-list-container detail_entry">
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 8 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                      >
                        <AntSelectDynamic
                          autoFocus={useFocus}
                          bordered={false}
                          label={t('where_house')}
                          fieldValue="Id"
                          fieldLabel="WareHouseName"
                          query={useGetWhereHouse}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 8 }}
                        xxl={{ span: 7 }}
                        className="formfield"
                      >
                        <AntSelectDynamic
                          autoFocus={useFocus}
                          bordered={false}
                          label={t('item_name')}
                          fieldValue="Id"
                          fieldLabel="ItemName"
                          query={useGetItemName}
                          name={[field.name, 'Item']}
                          onSelectChange={(obj) => handleItemChange(obj, field.name)}
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                      >
                        <AntInput
                          bordered={false}
                          readOnly
                          label={t('pack_uom')}
                          formItemProps={{ ...field, name: [field.name, 'PackUom'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 3 }}
                        className="formfield"
                      >
                        <AntInputNumber
                          bordered={false}
                          onChange={(ReqQty) => handleReqQtyChange(ReqQty, field.name)}
                          formItemProps={{ ...field, name: [field.name, 'ReqQty'] }}
                          label={t('item_qty')}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 4 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                      >
                        <AntInputNumber
                          bordered={false}
                          readOnly
                          label={t('weight')}
                          formItemProps={{ ...field, name: [field.name, 'NetWeight'] }}
                        />
                      </Col>

                      {/* <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 8 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                      >
                        <AntInputNumber
                          bordered={false}
                          readOnly
                          label={t('available_quantity')}
                          formItemProps={{ ...field, name: [field.name, 'BillWeight'] }}
                        />
                      </Col> */}
                      {/* <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <AntInputNumber
                          bordered={false}
                          readOnly
                          label={t('available_weight')}
                          formItemProps={{ ...field, name: [field.name, 'StockWeight'] }}
                        />
                      </Col> */}
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15, marginLeft: '0%' }}
                      >
                        <AntInputNumber
                          bordered={false}
                          readOnly
                          label={t('item_price')}
                          formItemProps={{ ...field, name: [field.name, 'ReqRate'] }}
                          onChange={(itemRate) => handleItemRateChange(itemRate, field.name)}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 7 }}
                        className="formfield"
                        style={{ marginTop: 15, marginLeft: '-0.2%' }}
                      >
                        <AntInput
                          bordered={false}
                          readOnly
                          label={t('rate_uom')}
                          formItemProps={{ ...field, name: [field.name, 'PackUom'] }}
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 4 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15, marginLeft: '0%' }}
                      >
                        <AntInputNumber
                          bordered={false}
                          readOnly
                          label={t('amount')}
                          formItemProps={{ ...field, name: [field.name, 'ReqAmount'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 8 }}
                        xxl={{ span: 7 }}
                        className="formfield"
                        style={{ marginTop: 15, marginRight: '2%' }}
                      >
                        <AntSelectDynamic
                          autoFocus={useFocus}
                          bordered={false}
                          label={t('account_title')}
                          fieldValue="Id"
                          fieldLabel="AccountTitle"
                          query={useGetAccountTitle}
                          name=""
                          // name={[field.name, 'Item']}
                          // onSelectChange={(obj) => handleItemChange(obj, field.name)}
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 17 }}
                        lg={{ span: 17 }}
                        xl={{ span: 15 }}
                        xxl={{ span: 16 }}
                        className="formfield"
                        style={{ marginTop: 15, marginLeft: '0%' }}
                      >
                        <AntInput
                          bordered={false}
                          label={t('comments')}
                          formItemProps={{ ...field, name: [field.name, 'RemarksDetail'] }}
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 21 }}
                        md={{ span: 6 }}
                        lg={{ span: 6 }}
                        xl={{ span: 8 }}
                        xxl={{ span: 4 }}
                      >
                        <Row gutter={10}>
                          <Col
                            xs={{ span: 10 }}
                            sm={{ span: 6 }}
                            md={{ span: 12 }}
                            lg={{ span: 12 }}
                            xl={{ span: 6 }}
                            xxl={8}
                          >
                            <AntButton
                              style={{ marginTop: 15 }}
                              onClick={isEditMode ? handleUpdateToTable : handleAddToTable}
                              label={isEditMode ? 'Update' : 'Add'}
                            ></AntButton>
                          </Col>
                          <Col
                            xs={{ span: 10 }}
                            sm={{ span: 6 }}
                            md={{ span: 12 }}
                            lg={{ span: 12 }}
                            xl={{ span: 6 }}
                            xxl={8}
                          >
                            <AntButton
                              className="reset_btn"
                              onClick={() => {
                                handleResetForm();
                                setIsEditMode(false);
                              }}
                              label={t('cancel')}
                            ></AntButton>
                          </Col>
                        </Row>
                      </Col>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Card>
          <DetailEntryTable form={form} t={t} setIsEditMode={setIsEditMode} setEdit={setEdit} />
        </Col>
      </Row>
    </>
  );
};
type TDynamicForm = { form: FormInstance };
export default DynamicForm;
