import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import DetailEntryTable from './DetailEntryTable';
import { useEffect, useRef, useState } from 'react';
import { addtableData, newTableData } from './Atom';
import { useGetAccountTitle, useGetItemName, useGetUomByItemId, useGetWhereHouse } from '../quries';
import { InvStockAdjustmentDetail, TAccountTitle, TDetailItem, TWareHouse } from '../types';
import { Card, Col, Row, Form, FormInstance, notification } from 'antd';
import { AntButton, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';

const { useWatch } = Form;

const DynamicForm = ({ form, AdjustmentTypeId }: TDynamicForm) => {
  const { t } = useTranslation();
  const formValues = useWatch<InvStockAdjustmentDetail[]>('InvStockAdjustmentDetailslist', form);
  const { setFields, getFieldValue } = form;
  const equivalentRate = getFieldValue(['InvStockAdjustmentDetailslist', 0, 'PackEquivalent']);
  const itemId = getFieldValue(['InvStockAdjustmentDetailslist', 0, 'ItemId']);
  const antSelectRef = useRef<any>(null);
  const { data, isSuccess, isLoading } = useGetAccountTitle(AdjustmentTypeId);
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
    Qty: null,
    NetWeight: null,
    ReqRate: null,
    Amount: null,
    RemarksDetail: null,
    WareHouseName: '',
    AccountTitle: '',
    ActionTypeId: null,
    ItemUom: null,
  };
  const [rateUomEquivalent, setRateUomEquivalent] = useState<{ [key: number]: number }>({});

  const handleAddToTable = () => {
    const newData = formValues.map((item, index) => ({
      ItemId: item.ItemId,
      ItemName: item.ItemName,
      PackUom: item.PackUom,
      Qty: item.Qty,
      ItemRate: item.ItemRate,
      NetWeight: item.NetWeight,
      Amount: item.Amount,
      RemarksDetail: item.RemarksDetail,
      WarehouseId: item.WarehouseId,
      WareHouseName: item.WareHouseName,
      PackUomId: item.PackUomId,
      RateUomId: item.RateUomId,
      DebitAccountId: item.DebitAccountId,
      ActionTypeId: 1,
      RateUom: item.RateUom,
      AccountTitle: item.AccountTitle,
    }));
    if (newData.some((item) => item.WarehouseId === null || item.WarehouseId === undefined)) {
      const message = 'Please Select WareHouse!';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.ItemId === null || item.ItemId === undefined)) {
      const message = 'Please select Item!';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.Qty === null || item.Qty === undefined)) {
      const message = 'Please fill  Request Amount!';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.Qty < 0 || item.Qty === undefined)) {
      const message = 'Item Qty must be positive or greater then 0!';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.ItemRate === null || item.ItemRate === undefined)) {
      const message = 'Please Fill ItemRate';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.DebitAccountId === null || item.DebitAccountId === undefined)) {
      const message = 'AccountTitle Is Required';
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
      ItemName: item.ItemName,
      PackUom: item.PackUom,
      Qty: item.Qty,
      ItemRate: item.ItemRate,
      NetWeight: item.NetWeight,
      Amount: item.Amount,
      RemarksDetail: item.RemarksDetail,
      WarehouseId: item.WarehouseId,
      WareHouseName: item.WareHouseName,
      PackUomId: item.PackUomId,
      RateUomId: item.RateUomId,
      DebitAccountId: item.DebitAccountId,
      ActionTypeId: 1,
      RateUom: item.RateUom,
      AccountTitle: item.AccountTitle,
    }));

    if (newData.some((item) => item.WarehouseId === null || item.WarehouseId === undefined)) {
      const message = 'Please Select WareHouse!';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.ItemId === null || item.ItemId === undefined)) {
      const message = 'Please select Item!';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.Qty === null || item.Qty === undefined)) {
      const message = 'Please fill  Request Amount!';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.Qty < 0 || item.Qty === undefined)) {
      const message = 'Item Qty must be positive or greater then 0!';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.ItemRate === null || item.ItemRate === undefined)) {
      const message = 'Please Fill ItemRate';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.DebitAccountId === null || item.DebitAccountId === undefined)) {
      const message = 'AccountTitle Is Required';
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
          // LineId: edit?.LineId,
          Id: edit?.Id,
          // WsRmRequisitionPoId: edit?.WsRmRequisitionPoId,
          // DestinationLocationId: edit?.DestinationLocationId,
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
      { name: ['InvStockAdjustmentDetailslist', index, 'RateUomId'], value: obj?.UOMCode },
      { name: ['InvStockAdjustmentDetailslist', index, 'ItemName'], value: obj?.ItemName },
      { name: ['InvStockAdjustmentDetailslist', index, 'ItemId'], value: obj?.Id },
      { name: ['InvStockAdjustmentDetailslist', index, 'PackEquivalent'], value: obj?.Equivalent },
      { name: ['InvStockAdjustmentDetailslist', index, 'PackUomId'], value: obj?.ItemUomId },
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
  const WareHouseChange = (obj: TWareHouse, index: number) => {
    setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'WareHouseName'], value: obj?.WareHouseName }]);
  };

  const AccountTitleChange = (obj: TAccountTitle, index: number) => {
    console.log(obj.AccountTitle);
    setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'AccountTitle'], value: obj?.AccountTitle }]);
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
      console.log(amount);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'Amount'], value: amount }]);
    } else {
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'Amount'], value: null }]);
    }
  };
  const handleRateUOMChange = (UOMCod: string, equivalentRate: number, id: number, index: number) => {
    console.log(UOMCod);
    const weight = getFieldValue(['InvStockAdjustmentDetailslist', index, 'NetWeight']);
    const itemRate = getFieldValue(['InvStockAdjustmentDetailslist', index, 'ItemRate']);
    setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'RateUom'], value: UOMCod }]);
    if (itemRate && weight && equivalentRate && id) {
      const amount = calculateAmount(weight, equivalentRate, itemRate);
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'Amount'], value: amount }]);

      setRateUomEquivalent({ ...rateUomEquivalent, [index]: equivalentRate });
    } else {
      setFields([{ name: ['InvStockAdjustmentDetailslist', index, 'Amount'], value: null }]);
    }
  };
  useEffect(() => {
    if (isSuccess && !isLoading) {
      form.setFieldValue(['InvStockAdjustmentDetailslist', 0, 'DebitAccountId'], data?.data?.Data?.Result?.[0]?.Id);
      form.setFieldValue(
        ['InvStockAdjustmentDetailslist', 0, 'AccountTitle'],
        data?.data?.Data?.Result?.[0]?.AccountTitle
      );
    }
  }, [form, isSuccess]);

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
                        xl={{ span: 6 }}
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
                          name={[field.name, 'WarehouseId']}
                          onSelectChange={(obj) => WareHouseChange(obj, field.name)}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 11 }}
                        xl={{ span: 12 }}
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
                        xl={{ span: 6 }}
                        xxl={{ span: 3 }}
                        className="formfield"
                      >
                        <AntInputNumber
                          bordered={false}
                          onChange={(ReqQty) => handleReqQtyChange(ReqQty, field.name)}
                          formItemProps={{ ...field, name: [field.name, 'Qty'] }}
                          label={t('item_qty')}
                          type="number"
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 12 }}
                        xl={{ span: 12 }}
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
                        lg={{ span: 11 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15, marginLeft: '0%' }}
                      >
                        <AntInputNumber
                          bordered={false}
                          label={t('item_rate')}
                          formItemProps={{ ...field, name: [field.name, 'ItemRate'] }}
                          onChange={(itemRate) => handleItemRateChange(itemRate, field.name)}
                          type="number"
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 6 }}
                        xxl={{ span: 7 }}
                        className="formfield"
                        style={{ marginTop: 15, marginLeft: '-0.2%' }}
                      >
                        <AntSelectDynamic
                          bordered={false}
                          fieldValue="Id"
                          label={t('rate_uom')}
                          fieldLabel="UOMCode"
                          name={[field.name, 'RateUomId']}
                          query={useGetUomByItemId(formValues?.[field.name]?.ItemId)}
                          onSelectChange={(obj) =>
                            handleRateUOMChange(obj?.UOMCode, obj?.Equivalent, obj?.Id, field.name)
                          }
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 8 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15, marginLeft: '0%' }}
                      >
                        <AntInputNumber
                          bordered={false}
                          readOnly
                          label={t('amount')}
                          formItemProps={{ ...field, name: [field.name, 'Amount'] }}
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
                          query={() => useGetAccountTitle(AdjustmentTypeId)}
                          name={[field.name, 'DebitAccountId']}
                          onSelectChange={(obj) => AccountTitleChange(obj, field.name)}
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
                        xxl={{ span: 7 }}
                      >
                        <Row gutter={10}>
                          <Col
                            xs={{ span: 10 }}
                            sm={{ span: 6 }}
                            md={{ span: 12 }}
                            lg={{ span: 12 }}
                            xl={{ span: 6 }}
                            xxl={5}
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
type TDynamicForm = { form: FormInstance; AdjustmentTypeId: number | undefined };
export default DynamicForm;
