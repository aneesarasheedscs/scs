import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, Row, Form, FormInstance, Button, theme, notification, Modal } from 'antd';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { columns } from './column';
import {
  useGetAvailableStock,
  useGetAverageRatesAndStock,
  useGetAverageStockRateforOnlyCGS,
  useGetCompanyFeatures,
  useGetItemName,
  useGetStockByFifoMethod,
  useGetUomByItemId,
  useGetWareHouse,
} from '../quries';
import { useAtom } from 'jotai';
import { addtableData, listAtom } from './Atom';
import { TDetailItem, TDetailPackUom, TWarehouse, TWsRmWareHouseToWareHouseStocTransferDetailList } from '../types';

const { useWatch } = Form;

const DynamicForm = ({ form }: TDynamicForm) => {
  const [stockTransferDetailList, setStocKTransferDetailList] = useAtom(listAtom);
  const formValues = useWatch<TWsRmWareHouseToWareHouseStocTransferDetailList[]>(
    'WsRmWareHouseToWareHouseStocTransferDetailList',
    form
  );
  const { t } = useTranslation();
  const { setFields, getFieldValue } = form;
  const equivalentRate = getFieldValue(['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'EquivalentRate']);
  const itemId = getFieldValue(['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemId']);
  const wareHouseFromId = getFieldValue(['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'WareHouseFromId']);
  const netWeight = getFieldValue(['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'NetWeight']);
  const itemUomId = getFieldValue(['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemUomId']);
  const itemQty = getFieldValue(['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemQty']);

  const { data, isSuccess, isLoading } = useGetAvailableStock(true, itemId, wareHouseFromId);
  const { data: ERPFeature, isSuccess: isSuccessERP } = useGetCompanyFeatures();
  const {
    data: ItemRateCopy,
    isSuccess: isSuccessItemRateCopy,
    refetch: refetchRateWhenConfigurationFalse,
  } = useGetAverageRatesAndStock(itemId);
  const {
    data: ItemRateforCGS,
    isSuccess: ItemRateSucessforCGS,
    refetch: refetchRateforCGS,
  } = useGetAverageStockRateforOnlyCGS(itemId);

  const {
    data: ItemRate,
    isSuccess: isSuccessRate,
    isLoading: isLoadingItemRate,
    refetch,
  } = useGetStockByFifoMethod(itemId, wareHouseFromId, itemQty, netWeight, itemUomId, equivalentRate);

  const [tableData, setTableData] = useAtom(addtableData);
  const selectedOption1Ref = useRef<string | null>('');
  const selectedOption2Ref = useRef<string | null>('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [edit, setEdit] = useState<any>([]);
  const initialValues = {
    Id: null,
    ItemId: null,
    ItemName: null,
    WareHouseFromId: null,
    WarehouseFromName: null,
    ItemUomId: null,
    ItemUomCode: null,
    EquivalentRate: null,
    BalQty: null,
    BalWeight: null,
    ItemQty: null,
    NetWeight: null,
    ItemRate: null,
    ItemAmount: null,
    WareHouseToId: null,
    WarehouseToName: null,
    RemarksDetail: null,
    ActionTypeId: null,
  };
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [counter, setCounter] = useState<any>(0);

  const handleAddToTable = () => {
    const newData = formValues.map((item, index) => ({
      Id: item.ItemId,
      ItemId: item.ItemId,
      ItemName: item.ItemName,
      WareHouseFromId: item.WareHouseFromId,
      WarehouseFromName: item.WarehouseFromName,
      ItemUomId: item.ItemUomId,
      ItemUomCode: item.ItemUomCode,
      ItemQty: item.ItemQty,
      BalQty: item.BalQty,
      BalWeight: item.BalWeight,
      NetWeight: item.NetWeight,
      ItemRate: item.ItemRate,
      ItemAmount: item.ItemAmount,
      WareHouseToId: item.WareHouseToId,
      WarehouseToName: item.WarehouseToName,
      RemarksDetail: item.RemarksDetail,
      WsRmStockTransferId: item.ItemId,
    }));

    if (newData.some((item) => item.ItemId === null || item.ItemId === undefined)) {
      const message = 'Please select a Credit account';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.ItemAmount === null || item.ItemAmount === undefined)) {
      const message = 'Please fill  Debit Amount';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.WareHouseFromId === item.WareHouseToId)) {
      const message = 'WareHouseFrom and WareHouseTo cannot be same';
      notification.error({ message: message });
      return;
    }
    setCounter((prevCounter: any) => prevCounter + 1);
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item) => ({
        ...item,

        LineId: counter,
        ActionTypeId: 1,
      }));

      const combinedData = [...prevData, ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
    setFields([
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemId'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemName'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'WareHouseFromId'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'WareHouseFrom'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemUomId'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemUom'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'EquivalentRate'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemQty'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'BalQty'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'BalWeight'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'NetWeight'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemRate'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemAmount'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'WareHouseToId'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'WareHouseTo'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'RemarksDetail'], value: null },
    ]);
    setIsEditMode(false);
  };

  const handleUpdateToTable = () => {
    const newData = formValues.map((item, index) => ({
      Id: item.ItemId,
      ItemId: item.ItemId,
      ItemName: item.ItemName,
      WareHouseFromId: item.WareHouseFromId,
      WarehouseFromName: item.WarehouseFromName,
      ItemUomId: item.ItemUomId,
      ItemUomCode: item.ItemUomCode,
      ItemQty: item.ItemQty,
      BalQty: item.BalQty,
      BalWeight: item.BalWeight,
      NetWeight: item.NetWeight,
      ItemRate: item.ItemRate,
      ItemAmount: item.ItemAmount,
      WareHouseToId: item.WareHouseToId,
      WarehouseToName: item.WarehouseToName,
      RemarksDetail: item.RemarksDetail,
      WsRmStockTransferId: item.ItemId,
    }));

    if (newData.some((item) => item.ItemId === null || item.ItemId === undefined)) {
      const message = 'Please select a Credit account';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.ItemAmount === null || item.ItemAmount === undefined)) {
      const message = 'Please fill  Debit Amount';
      notification.error({ message: message });
      return;
    } else if (newData.some((item) => item.WareHouseFromId === item.WareHouseToId)) {
      const message = 'WareHouseFrom and WareHouseTo cannot be same';
      notification.error({ message: message });
      return;
    }
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item, index) => {
        const editedRowIndex = prevData.findIndex((row) => row.LineId === edit.LineId);
        if (editedRowIndex >= 0) {
          return {
            ...item,
            ActionTypeId: 2,
            LineId: edit.Id,
          };
        }
        return item;
      });

      const combinedData = [...prevData.filter((row) => row.LineId !== edit.LineId), ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
    setIsEditMode(false);
    setFields([
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemId'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemName'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'WareHouseFromId'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'WareHouseFrom'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemUomId'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemUom'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'EquivalentRate'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemQty'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'BalQty'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'BalWeight'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'NetWeight'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemRate'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemAmount'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'WareHouseToId'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'WareHouseTo'], value: null },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'RemarksDetail'], value: null },
    ]);
  };

  const handleDeleteRow = (record: any) => {
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.LineId !== record.LineId);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  const handleEditRow = (record: any) => {
    setEdit(record);
    setTableData((prevData: any[]) => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex((item: any) => item.LineId === record.LineId);

      if (rowIndex !== -1) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          ItemId: record.ItemId,
          ItemName: record.ItemName,
          WareHouseFromId: record.WareHouseFromId,
          WareHouseFrom: record.WareHouseFrom,
          ItemUomId: record.ItemUomId,
          ItemUom: record.ItemUom,
          ItemQty: record.ItemQty,
          BalQty: record.BalQty,
          BalWeight: record.BalWeight,
          NetWeight: record.NetWeight,
          ItemRate: record.ItemRate,
          ItemAmount: record.ItemAmount,
          WareHouseToId: record.WareHouseToId,
          WareHouseTo: record.WareHouseTo,
          RemarksDetail: record.RemarksDetail,
        };

        form.setFieldValue(['WsRmWareHouseToWareHouseStocTransferDetailList', 0], updatedData[rowIndex]); // Update form values
        setIsEditMode(true);
      }
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const calculateWeight = (itemQty: number, equivalentRate: number) => itemQty * equivalentRate;
  const calculateAmount = (weight: number, rateUOM: number, itemRate: number) => {
    return (weight / rateUOM) * itemRate;
  };

  const handleItemChange = (obj: TDetailItem, index: number) => {
    setFields([
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'ItemName'], value: obj?.ItemName },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'ActionTypeId'], value: 1 },
    ]);
    const equivalentRate = getFieldValue(['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'EquivalentRate']);
    const itemQty = getFieldValue(['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'ItemQty']);
    if (itemQty && equivalentRate) {
      const weight = calculateWeight(itemQty, equivalentRate);
      setFields([{ name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'NetWeight'], value: weight }]);
    } else {
      setFields([{ name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'NetWeight'], value: null }]);
    }
  };
  console.log(equivalentRate);
  const handleItemQtyChange = (itemQty: number | string | null, index: number) => {
    const equivalentRate = getFieldValue(['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'EquivalentRate']);

    if (itemQty && typeof itemQty === 'number' && equivalentRate) {
      const weight = calculateWeight(itemQty, equivalentRate);
      setFields([{ name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'NetWeight'], value: weight }]);
    } else {
      setFields([{ name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'NetWeight'], value: null }]);
    }
  };

  const handleRateUOMChange = (obj: TDetailPackUom, index: number) => {
    setFields([
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'ItemUomCode'], value: obj?.UOMCode },
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'EquivalentRate'], value: obj?.Equivalent },
    ]);

    const itemQty = getFieldValue(['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'ItemQty']);
    if (itemQty && typeof itemQty === 'number' && obj?.Equivalent) {
      const weight = calculateWeight(itemQty, obj?.Equivalent);
      setFields([{ name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'NetWeight'], value: weight }]);
    } else {
      setFields([{ name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'NetWeight'], value: null }]);
    }
    const weight = getFieldValue(['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'NetWeight']);
    const itemRate = getFieldValue(['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'ItemRate']);
    if (itemRate && weight && obj?.Equivalent && obj?.Id) {
      const amount = calculateAmount(weight, obj?.Equivalent, itemRate);
      setFields([{ name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'ItemAmount'], value: amount }]);
    } else {
      setFields([{ name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'ItemAmount'], value: null }]);
    }
  };
  const handleItemRateChange = (itemRate: number | string | null, index: number) => {
    const weight = getFieldValue(['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'NetWeight']);
    if (itemRate && typeof itemRate === 'number' && weight && equivalentRate) {
      const amount = calculateAmount(weight, equivalentRate, itemRate);
      setFields([{ name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'ItemAmount'], value: amount }]);
    } else {
      setFields([{ name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'ItemAmount'], value: null }]);
    }
  };
  const handleOk = () => {
    setIsErrorModalVisible(false);
    selectedOption1Ref.current = null;
    selectedOption2Ref.current = null;
  };
  const handleWarehouseFromChange = (obj: TWarehouse, index: number) => {
    selectedOption1Ref.current = obj?.WareHouseName;
    showModal();
    setFields([
      {
        name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'WarehouseFromName'],
        value: obj?.WareHouseName,
      },
    ]);
  };
  const handleWarehouseToChange = (obj: TWarehouse, index: number) => {
    selectedOption2Ref.current = obj?.WareHouseName;
    showModal();
    setFields([
      { name: ['WsRmWareHouseToWareHouseStocTransferDetailList', index, 'WarehouseToName'], value: obj?.WareHouseName },
    ]);
  };
  const showModal = () => {
    if (selectedOption1Ref.current === selectedOption2Ref.current) {
      setIsErrorModalVisible(true);
    }
  };

  useEffect(() => {
    setStocKTransferDetailList(tableData);
    if (isSuccess) {
      setFields([
        {
          name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'BalQty'],
          value: data?.data?.Data?.Result?.[0]?.BalQty,
        },
        {
          name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'BalWeight'],
          value: data?.data?.Data?.Result?.[0]?.BalWeight,
        },
      ]);
    } else if (data?.data?.Data?.Result === null) {
      setFields([
        {
          name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'BalQty'],
          value: null,
        },
        {
          name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'BalWeight'],
          value: null,
        },
      ]);
    }
    if (isSuccessRate && isSuccessERP && ERPFeature?.data?.Data?.Result?.[0]?.Id === 5) {
      handleItemRateChange(ItemRate?.data?.Data?.Result, 0);
      setFields([
        {
          name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemRate'],
          value: ItemRate?.data?.Data?.Result,
        },
      ]);
    } else if (ItemRateSucessforCGS && isSuccessERP && ERPFeature?.data?.Data?.Result?.[0]?.Id === 1) {
      handleItemRateChange(ItemRateforCGS?.data?.Data?.Result, 0);
      setFields([
        {
          name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemRate'],
          value: ItemRateforCGS?.data?.Data?.Result,
        },
      ]);
    } else if (
      ERPFeature?.data?.Data?.Result?.[0]?.Id === 5 &&
      ERPFeature?.data?.Data?.Result?.[0]?.Id === 1 &&
      isSuccessItemRateCopy
    ) {
      setFields([
        {
          name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemRate'],
          value: ItemRateCopy?.data?.Data?.Result,
        },
      ]);
    } else if (ItemRate?.data?.Data?.Result === null) {
      setFields([
        {
          name: ['WsRmWareHouseToWareHouseStocTransferDetailList', 0, 'ItemRate'],
          value: null,
        },
      ]);
    }
  }, [tableData, form, data, ItemRate, ItemRateCopy, ItemRateforCGS]);

  console.log(formValues);
  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-1%' }}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingTop: '-10%' }}>
            <Form.List name="WsRmWareHouseToWareHouseStocTransferDetailList" initialValue={[initialValues]}>
              {(fields, {}) => (
                <>
                  {fields.map((field) => (
                    <div
                      key={field.key}
                      className="form-list-container"
                      style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}
                    >
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 8 }}
                        xl={{ span: 8 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('item_name')}
                          fieldValue="Id"
                          fieldLabel="ItemName"
                          query={useGetItemName}
                          name={[field.name, 'ItemId']}
                          onSelectChange={(obj) => handleItemChange(obj, field.name)}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 8 }}
                        xl={{ span: 6 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('ware_house_from')}
                          fieldValue="Id"
                          fieldLabel="WareHouseName"
                          query={useGetWareHouse}
                          name={[field.name, 'WareHouseFromId']}
                          onSelectChange={(obj) => handleWarehouseFromChange(obj, field.name)}
                        />
                        <Modal
                          width={250}
                          title="Error"
                          visible={isErrorModalVisible}
                          onOk={handleOk}
                          centered
                          closable={false}
                        >
                          <p style={{ color: 'red' }}>{t('warehouse_from_and_warehouse_to_canot_same')} </p>
                        </Modal>
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 6 }}
                        xl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <AntInputNumber
                          bordered={false}
                          onChange={(itemQty) => handleItemQtyChange(itemQty, field.name)}
                          formItemProps={{ ...field, name: [field.name, 'ItemQty'] }}
                          label={t('item_qty')}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 8 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <p style={{ marginTop: 5 }}>
                          <AntSelectDynamic
                            bordered={false}
                            fieldValue="Id"
                            label={t('pack_uom')}
                            fieldLabel="UOMCode"
                            name={[field.name, 'ItemUomId']}
                            query={useGetUomByItemId(formValues?.[field.name]?.ItemId)}
                            onSelectChange={(obj) => handleRateUOMChange(obj, field.name)}
                          />
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 8 }}
                        xl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <p>
                          <AntInputNumber
                            bordered={false}
                            readOnly
                            label={t('net_weight')}
                            formItemProps={{ ...field, name: [field.name, 'NetWeight'] }}
                          />
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 6 }}
                        xl={{ span: 5 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <p>
                          <AntInputNumber
                            bordered={false}
                            readOnly
                            label={t('available_quantity')}
                            formItemProps={{ ...field, name: [field.name, 'BalQty'] }}
                          />
                        </p>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 8 }}
                        xl={{ span: 5 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <p>
                          <AntInputNumber
                            bordered={false}
                            readOnly
                            label={t('available_weight')}
                            formItemProps={{ ...field, name: [field.name, 'BalWeight'] }}
                          />
                        </p>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 8 }}
                        xl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <p>
                          <AntInputNumber
                            bordered={false}
                            readOnly
                            label={t('item_rate')}
                            formItemProps={{ ...field, name: [field.name, 'ItemRate'] }}
                            onChange={(itemRate) => handleItemRateChange(itemRate, field.name)}
                          />
                        </p>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 6 }}
                        xl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <p>
                          <AntInputNumber
                            bordered={false}
                            readOnly
                            label={t('amount')}
                            formItemProps={{ ...field, name: [field.name, 'ItemAmount'] }}
                          />
                        </p>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 8 }}
                        xl={{ span: 7 }}
                        className="formfield"
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('ware_house_to')}
                          fieldValue="Id"
                          fieldLabel="WareHouseName"
                          query={useGetWareHouse}
                          name={[field.name, 'WareHouseToId']}
                          onSelectChange={(obj) => handleWarehouseToChange(obj, field.name)}
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 16 }}
                        lg={{ span: 10 }}
                        xl={{ span: 10 }}
                        className="formfield"
                      >
                        <AntInput
                          bordered={false}
                          label={t('comments')}
                          formItemProps={{ ...field, name: [field.name, 'RemarksDetail'] }}
                        />
                      </Col>
                      <Col xs={{ span: 24 }} sm={{ span: 21 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 6 }}>
                        <Row style={{ marginTop: '2%' }}>
                          <Col
                            xs={{ span: 10 }}
                            sm={{ span: 6 }}
                            md={{ span: 20 }}
                            lg={{ span: 20 }}
                            xl={{ span: 6 }}
                            xxl={4}
                          >
                            <AntButton
                              style={{ marginTop: 15 }}
                              onClick={isEditMode ? handleUpdateToTable : handleAddToTable}
                              label={isEditMode ? 'Update' : 'Add'}
                            ></AntButton>
                          </Col>
                          <AntInput
                            bordered={false}
                            label={''}
                            formItemProps={{ ...field, name: [field.name, 'AccountTitleC'] }}
                            style={{ width: '102.5%', display: 'none' }}
                          />
                          <AntInput
                            bordered={false}
                            label={''}
                            formItemProps={{ ...field, name: [field.name, 'AccountTitleD'] }}
                            style={{ width: '102.5%', display: 'none' }}
                          />
                        </Row>
                      </Col>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Card>

          <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
              <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
                <AntTable
                  numberOfSkeletons={12}
                  scroll={{ x: '', y: convertVhToPixels('20vh') }}
                  data={tableData || []}
                  columns={columns(t, handleDeleteRow, handleEditRow)}
                />
              </Card>
            </Col>
          </Row>
          <br />
        </Col>
      </Row>
    </>
  );
};
type TDynamicForm = { form: FormInstance };
export default DynamicForm;
