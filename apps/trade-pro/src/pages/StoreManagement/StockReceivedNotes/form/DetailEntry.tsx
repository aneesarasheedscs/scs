import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, Row, Form, FormInstance, Button, theme, notification, Modal } from 'antd';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { columns } from './column';
import { useGetAvailableStock, useGetAverageRateByFiFo, useGetAverageRateforCGS, useGetItemName } from '../quries';
import { useAtom } from 'jotai';
import { addtableData, deleteData, newTableData } from './Atom';
import { TDetailItem, TWsRmStockReceivedNotesDetailList } from '../types';

const { useWatch } = Form;

const DynamicForm = ({ form }: TDynamicForm) => {
  const [disablefields, setDisablefields] = useState(true);
  const formValues = useWatch<TWsRmStockReceivedNotesDetailList[]>('WsRmStockReceivedNotesDetailList', form);
  const { t } = useTranslation();
  const { setFields, getFieldValue } = form;
  const equivalentRate = getFieldValue(['WsRmStockReceivedNotesDetailList', 0, 'PackEquivalent']);
  const itemId = getFieldValue(['WsRmStockReceivedNotesDetailList', 0, 'ItemId']);
  const WarehouseId = getFieldValue(['WsRmStockReceivedNotesDetailList', 0, 'WarehouseId']);
  const ItemQty = getFieldValue(['WsRmStockReceivedNotesDetailList', 0, 'ItemQty']);
  const BillWeight = getFieldValue(['WsRmStockReceivedNotesDetailList', 0, 'BillWeight']);
  const itemUomId = getFieldValue(['WsRmStockReceivedNotesDetailList', 0, 'ItemUomId']);

  const antSelectRef = useRef<any>(null);

  const { data, isSuccess, isLoading } = useGetAvailableStock(true, itemId);
  const { data: averageRateforCGS } = useGetAverageRateforCGS(true, itemId, WarehouseId);
  const { data: averageRateByFifo } = useGetAverageRateByFiFo(
    true,
    itemId,
    WarehouseId,
    ItemQty,
    BillWeight,
    itemUomId,
    equivalentRate
  );

  const [tableData, setTableData] = useAtom(addtableData);
  const [delettableData, setDeleteTableData] = useAtom(deleteData);
  const [newtableData, setNewTableData] = useAtom(newTableData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [useFocus, setUseFocus] = useState(false);
  const [edit, setEdit] = useState<any>([]);
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
    IssuedQty: null,
    IssuedRate: null,
    ItemNetAmount: null,
    RemarksDetail: null,
    ActionTypeId: null,
    ItemUom: null,
  };
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [counter, setCounter] = useState<any>(0);

  const handleAddToTable = () => {
    const newData = formValues.map((item, index) => ({
      // Id: item.Id,
      ItemId: item.ItemId,
      ItemName: item.ItemName,
      ItemUomId: item.ItemUomId,
      // ItemUom: item.ItemUom,
      UOMCode: item.UOMCode,
      // IssuedQty: item.IssuedQty,
      // IssuedRate: item.IssuedRate,
      StockWeight: item.StockWeight,
      BillWeight: item.BillWeight,
      ItemNetAmount: item.ItemNetAmount,
      PackEquivalent: item.PackEquivalent,
      RemarksDetail: item.RemarksDetail,
    }));

    if (newData.some((item) => item.ItemId === null || item.ItemId === undefined)) {
      const message = 'Please select Item!';
      notification.error({ message: message });
      return;
    }
    // else if (newData.some((item) => item.IssuedQty === null || item.IssuedQty === undefined)) {
    //   const message = 'Please fill  Request Amount!';
    //   notification.error({ message: message });
    //   return;
    // } else if (newData.some((item) => item.IssuedQty < 0 || item.IssuedQty === undefined)) {
    //   const message = 'Item Qty must be positive or greater then 0!';
    //   notification.error({ message: message });
    //   return;
    // }
    setUseFocus(true);
    setCounter((prevCounter: any) => prevCounter + 1);
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

    setFields([
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'Item'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemId'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemName'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'UOMCode'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemUom'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'PackEquivalent'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'IssuedQty'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'BillWeight'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'StockWeight'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'BillWeight'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemUomId'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'IssuedRate'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemNetAmount'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'RemarksDetail'], value: null },
    ]);
    setIsEditMode(false);
  };

  const handleUpdateToTable = () => {
    const newData = formValues.map((item, index) => ({
      // Id: item.Id,
      ItemId: item.ItemId,
      ItemName: item.ItemName,
      ItemUomId: item.ItemUomId,
      UOMCode: item.UOMCode,
      // IssuedQty: item.IssuedQty,
      // IssuedRate: item.IssuedRate,
      BillWeight: item.BillWeight,
      StockWeight: item.StockWeight,
      // ItemUom: item.ItemUom,
      ItemNetAmount: item.ItemNetAmount,
      PackEquivalent: item.PackEquivalent,
      RemarksDetail: item.RemarksDetail,
    }));

    if (newData.some((item) => item.ItemId === null || item.ItemId === undefined)) {
      const message = 'Please select Item!';
      notification.error({ message: message });
      return;
    }
    //  else if (newData.some((item) => item.IssuedQty < 0 || item.IssuedQty === undefined)) {
    //   const message = 'Item Qty must be positive or greater then 0!';
    //   notification.error({ message: message });
    //   return;
    // } else if (newData.some((item) => item.ItemNetAmount === null || item.ItemNetAmount === undefined)) {
    //   const message = 'Please fill  Request Amount!';
    //   notification.error({ message: message });
    //   return;
    // }
    const editedRowIndex = tableData.findIndex((row: any) => row.ItemId === edit?.ItemId);

    if (editedRowIndex >= 0) {
      setTableData((prevData: any[]) => {
        const updatedData = [...prevData];
        updatedData[editedRowIndex] = {
          ...newData[0],
          ActionTypeId: 1,
          LineId: edit.LineId,
          Id: edit.Id,
          WsRmRequisitionPoId: edit.WsRmRequisitionPoId,
          DestinationLocationId: edit.DestinationLocationId,
        };
        console.log('New tableData:', updatedData);
        return updatedData;
      });
    }

    setUseFocus(true);
    setIsEditMode(false);
    setFields([
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'Item'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemId'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemName'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'UOMCode'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemUom'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'PackEquivalent'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'IssuedQty'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'BillWeight'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'StockWeight'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'BillWeight'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemUomId'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'IssuedRate'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemNetAmount'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'RemarksDetail'], value: null },
    ]);
  };
  const handleResetForm = () => {
    setFields([
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'Item'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemId'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemName'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'UOMCode'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemUom'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'PackEquivalent'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'IssuedQty'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'BillWeight'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'StockWeight'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'BillWeight'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemUomId'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'IssuedRate'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'ItemNetAmount'], value: null },
      { name: ['WsRmStockReceivedNotesDetailList', 0, 'RemarksDetail'], value: null },
    ]);
  };
  console.log(delettableData);
  const handleDeleteRow = (record: any | any[]) => {
    if (record?.Id > 0) {
      const recordsToDelete = Array.isArray(record) ? record : [record];
      setDeleteTableData((prevData) => [...prevData, ...recordsToDelete]);
      // return;
    }
    console.log(record);
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.LineId !== record?.LineId || item.Id !== record?.Id);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
    setNewTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.LineId !== record?.LineId || item.Id !== record?.Id);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  // console.log(edit);
  const handleEditRow = (record: any | any[]) => {
    setEdit(record);
    setTableData((prevData: any[]) => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex((item: any) => item.Id === record.Id);

      if (rowIndex !== -1) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          Item: record.ItemName,
          Id: record.Id,
          ItemId: record.ItemId,
          ItemName: record.ItemName,
          ItemUomId: record.ItemUomId,
          ItemUom: record.ItemUom,
          IssuedQty: record.IssuedQty,
          BillWeight: record.BillWeight,
          StockWeight: record.StockWeight,
          UOMCode: record.UOMCode,
          IssuedRate: record.IssuedRate,
          ItemNetAmount: record.ItemNetAmount,
          PackEquivalent: record.PackEquivalent,
          WsRmRequisitionPoId: record.WsRmRequisitionPoId,
          RemarksDetail: record.RemarksDetail,
          DestinationLocationId: record.DestinationLocationId,
        };

        form.setFieldValue(['WsRmStockReceivedNotesDetailList', 0], updatedData[rowIndex]); // Update form values
        setIsEditMode(true);
      }
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const calculateWeight = (IssuedQty: number, equivalentRate: number) => IssuedQty * equivalentRate;
  const calculateAmount = (weight: number, rateUOM: number, itemRate: number) => {
    return (weight / rateUOM) * itemRate;
  };

  const handleItemChange = (obj: TDetailItem, index: number) => {
    console.log(obj);
    console.log(obj?.UOMCode);

    setFields([
      { name: ['WsRmStockReceivedNotesDetailList', index, 'UOMCode'], value: obj?.UOMCode },
      { name: ['WsRmStockReceivedNotesDetailList', index, 'ItemName'], value: obj?.ItemName },
      { name: ['WsRmStockReceivedNotesDetailList', index, 'ItemUom'], value: obj?.RateUom },
      { name: ['WsRmStockReceivedNotesDetailList', index, 'ItemId'], value: obj?.ItemId },
      { name: ['WsRmStockReceivedNotesDetailList', index, 'PackEquivalent'], value: obj?.Equivalent },
      { name: ['WsRmStockReceivedNotesDetailList', index, 'IssuedRate'], value: obj?.ItemPrice },
      { name: ['WsRmStockReceivedNotesDetailList', index, 'ItemUomId'], value: obj?.ItemUomId },
      { name: ['WsRmStockReceivedNotesDetailList', index, 'ActionTypeId'], value: 1 },
    ]);

    const IssuedQty = getFieldValue(['WsRmStockReceivedNotesDetailList', index, 'IssuedQty']);
    if (IssuedQty && obj?.Equivalent) {
      const weight = calculateWeight(IssuedQty, obj?.Equivalent);
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'BillWeight'], value: weight }]);
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'BillWeight'], value: weight }]);
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'StockWeight'], value: weight }]);
    } else {
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'BillWeight'], value: null }]);
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'BillWeight'], value: null }]);
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'StockWeight'], value: null }]);
    }
    const weight = getFieldValue(['WsRmStockReceivedNotesDetailList', index, 'BillWeight']);
    const itemRate = getFieldValue(['WsRmStockReceivedNotesDetailList', index, 'IssuedRate']);
    console.log(weight);
    if (itemRate && weight && obj?.Equivalent) {
      const amount = calculateAmount(weight, obj?.Equivalent, itemRate);
      console.log(amount);
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'ItemNetAmount'], value: amount }]);
    } else {
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'ItemNetAmount'], value: null }]);
    }
  };
  const handleIssuedQtyChange = (IssuedQty: number | string | null, index: number) => {
    const equivalentRate = getFieldValue(['WsRmStockReceivedNotesDetailList', index, 'PackEquivalent']);
    if (IssuedQty && typeof IssuedQty === 'number' && equivalentRate) {
      const weight = calculateWeight(IssuedQty, equivalentRate);
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'BillWeight'], value: weight }]);
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'BillWeight'], value: weight }]);
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'StockWeight'], value: weight }]);
    } else {
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'BillWeight'], value: null }]);
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'BillWeight'], value: null }]);
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'StockWeight'], value: null }]);
    }
    const weight = getFieldValue(['WsRmStockReceivedNotesDetailList', index, 'BillWeight']);
    const itemRate = getFieldValue(['WsRmStockReceivedNotesDetailList', index, 'IssuedRate']);
    if (itemRate && weight && equivalentRate) {
      const amount = calculateAmount(weight, equivalentRate, itemRate);
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'ItemNetAmount'], value: amount }]);
    } else {
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'ItemNetAmount'], value: null }]);
    }
  };

  const handleItemRateChange = (itemRate: number | string | null, index: number) => {
    const weight = getFieldValue(['WsRmStockReceivedNotesDetailList', index, 'BillWeight']);
    if (itemRate && typeof itemRate === 'number' && weight && equivalentRate) {
      const amount = calculateAmount(weight, equivalentRate, itemRate);
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'ItemAmount'], value: amount }]);
    } else {
      setFields([{ name: ['WsRmStockReceivedNotesDetailList', index, 'ItemAmount'], value: null }]);
    }
  };

  useEffect(() => {
    const weight = getFieldValue(['WsRmStockReceivedNotesDetailList', 0, 'BillWeight']);
    if (isSuccess && data?.data?.Data?.Result !== null) {
      setFields([
        {
          name: ['WsRmStockReceivedNotesDetailList', 0, 'BillWeight'],
          value: data?.data?.Data?.Result?.[0]?.BillWeight,
        },
        {
          name: ['WsRmStockReceivedNotesDetailList', 0, 'StockWeight'],
          value: data?.data?.Data?.Result?.[0]?.StockWeight,
        },
      ]);
    } else if (data?.data?.Data?.Result === null) {
      setFields([
        {
          name: ['WsRmStockReceivedNotesDetailList', 0, 'BillWeight'],
          value: weight,
        },
        {
          name: ['WsRmStockReceivedNotesDetailList', 0, 'StockWeight'],
          value: weight,
        },
      ]);
    }

    console.log(tableData);
  }, [form, data, tableData]);
  useEffect(() => {
    // Set focus to AntSelectDynamic after it has been rendered
    if (antSelectRef.current) {
      antSelectRef.current.focus();
    }
  }, [antSelectRef]);

  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-0.5%' }}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          {/* <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingTop: '-10%' }}>
            <Form.List name="WsRmStockReceivedNotesDetailList" initialValue={[initialValues]}>
              {(fields, {}) => (
                <>
                  {fields.map((field) => (
                    <div
                      key={field.key}
                      className="form-list-container"
                      style={{ display: 'flex', justifyContent: 'space-between', marginTop: -15 }}
                    >
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 8 }}
                        xxl={{ span: 8 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <AntSelectDynamic
                          // mode={undefined}
                          // ref={antSelectRef}
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
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 3 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <AntInputNumber
                          bordered={false}
                          onChange={(IssuedQty) => handleIssuedQtyChange(IssuedQty, field.name)}
                          formItemProps={{ ...field, name: [field.name, 'IssuedQty'] }}
                          label={t('item_qty')}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 5 }}
                        xxl={{ span: 3 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <p style={{ marginTop: 5 }}>
                          <AntInput
                            bordered={false}
                            readOnly
                            label={t('pack_uom')}
                            formItemProps={{ ...field, name: [field.name, 'UOMCode'] }}
                            disabled={disablefields}
                          />
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 4 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <p>
                          <AntInputNumber
                            bordered={false}
                            readOnly
                            label={t('weight')}
                            formItemProps={{ ...field, name: [field.name, 'BillWeight'] }}
                            disabled={disablefields}
                          />
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 7 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <p>
                          <AntInputNumber
                            bordered={false}
                            readOnly
                            label={t('available_quantity')}
                            formItemProps={{ ...field, name: [field.name, 'BillWeight'] }}
                            disabled={disablefields}
                          />
                        </p>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 7 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <p>
                          <AntInputNumber
                            bordered={false}
                            readOnly
                            label={t('available_weight')}
                            formItemProps={{ ...field, name: [field.name, 'StockWeight'] }}
                            disabled={disablefields}
                          />
                        </p>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xl={{ span: 4 }}
                        xxl={{ span: 3 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <p>
                          <AntInputNumber
                            bordered={false}
                            readOnly
                            label={t('item_price')}
                            formItemProps={{ ...field, name: [field.name, 'IssuedRate'] }}
                            onChange={(itemRate) => handleItemRateChange(itemRate, field.name)}
                            disabled={disablefields}
                          />
                        </p>
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 11 }}
                        lg={{ span: 11 }}
                        xl={{ span: 4 }}
                        xxl={{ span: 4 }}
                        className="formfield"
                        style={{ marginTop: 15 }}
                      >
                        <p>
                          <AntInputNumber
                            bordered={false}
                            readOnly
                            label={t('request_amount')}
                            formItemProps={{ ...field, name: [field.name, 'ItemNetAmount'] }}
                            disabled={disablefields}
                          />
                        </p>
                      </Col>

                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 20 }}
                        md={{ span: 18 }}
                        lg={{ span: 18 }}
                        xl={{ span: 15 }}
                        xxl={{ span: 12 }}
                        className="formfield"
                      >
                        <AntInput
                          bordered={false}
                          label={t('remarks')}
                          formItemProps={{ ...field, name: [field.name, 'RemarksDetail'] }}
                        />
                      </Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 21 }}
                        md={{ span: 4 }}
                        lg={{ span: 4 }}
                        xl={{ span: 8 }}
                        xxl={{ span: 9 }}
                      >
                        <Row style={{ marginTop: '0%' }} gutter={10}>
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
                          <Col
                            xs={{ span: 10 }}
                            sm={{ span: 6 }}
                            md={{ span: 20 }}
                            lg={{ span: 20 }}
                            xl={{ span: 6 }}
                            xxl={4}
                          >
                            <AntButton
                              ghost
                              style={{ marginTop: 15 }}
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
          </Card> */}

          <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
              {/* <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}> */}
              <AntTable
                numberOfSkeletons={12}
                scroll={{ x: '', y: convertVhToPixels('20vh') }}
                data={tableData || []}
                columns={columns(t, handleDeleteRow, handleEditRow)}
              />
              {/* </Card> */}
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
