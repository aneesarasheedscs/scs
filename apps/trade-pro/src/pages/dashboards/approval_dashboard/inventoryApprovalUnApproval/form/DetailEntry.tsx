import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, Row, Form, FormInstance, Button, theme, notification, Modal } from 'antd';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { columns } from './column';
import { useAtom } from 'jotai';
import { addtableData, deleteData, newTableData, editMode } from './Atom';
import { TDetailItem, TWsRmRequisitionPoDetailsList } from '../types';
import { useGetAvailableStock, useGetDestinationAndSourceLoc, useGetItemName } from '../query';

const { useWatch } = Form;

const DynamicForm = ({ form, selectedRecordId }: TDynamicForm) => {
  const [disablefields, setDisablefields] = useState(true);
  const formValues = useWatch<TWsRmRequisitionPoDetailsList[]>('WsRmRequisitionPoDetailsList', form);
  const { t } = useTranslation();
  const { setFields, getFieldValue } = form;
  const equivalentRate = getFieldValue(['WsRmRequisitionPoDetailsList', 0, 'PackEquivalent']);
  const itemId = getFieldValue(['WsRmRequisitionPoDetailsList', 0, 'ItemId']);
  const antSelectRef = useRef<any>(null);

  const { data, isSuccess, isLoading } = useGetAvailableStock(true, itemId);

  const [tableData, setTableData] = useAtom(addtableData);
  const [delettableData, setDeleteTableData] = useAtom(deleteData);
  const [newtableData, setNewTableData] = useAtom(newTableData);
  const [isEditMode, setIsEditMode] = useAtom(editMode);
  const [useFocus, setUseFocus] = useState(false);
  const [edit, setEdit] = useState<any>([]);
  const initialValues = {
    Id: null,
    ItemId: null,
    DestinationLocationId: null,
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
    ApprovedQty: null,
    ItemUom: null,
  };
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [counter, setCounter] = useState<any>(0);

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
    } else if (selectedRecordId !== 0 || selectedRecordId !== undefined) {
      const message = "You Can't Add Record To this Grid!";
      notification.error({ message: message });
      return;
    }
    setUseFocus(true);
    setCounter((prevCounter: any) => prevCounter + 1);
    setTableData((prevData: any[]) => {
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
      { name: ['WsRmRequisitionPoDetailsList', 0, 'Item'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ItemId'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ItemName'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'PackUom'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ItemUom'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'PackEquivalent'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ReqQty'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'BillWeight'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'StockWeight'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'NetWeight'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ItemUomId'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ReqRate'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ReqAmount'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'RemarksDetail'], value: null },
    ]);
    setIsEditMode(false);
  };

  const handleUpdateToTable = () => {
    const newData = formValues.map((item, index) => ({
      DestinationLocationId: item.DestinationLocationId,
      Id: item.Id,
      ItemId: item.ItemId,
      ItemName: item.ItemName,
      ItemUomId: item.ItemUomId,
      PackUom: item.PackUom,
      ReqQty: item.ReqQty,
      ReqRate: item.ReqRate,
      BillWeight: item.BillWeight,
      StockWeight: item.StockWeight,
      ApprovedQty: item.ApprovedQty,
      ItemUom: item.ItemUom,
      NetWeight: item.NetWeight,
      ReqAmount: item.ReqAmount,
      PackEquivalent: item.PackEquivalent,
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
    } else if (
      newData.some(
        (item) => item.ApprovedQty === null || item.ApprovedQty === undefined || item.ApprovedQty > item.ReqQty
      )
    ) {
      const message = 'ApprovedQty must be less than equal to ReqQty!';
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
          LineId: edit.LineId,
          Id: edit.Id,
          WsRmRequisitionPoId: edit.WsRmRequisitionPoId,
        };
        console.log('New tableData:', updatedData);
        return updatedData;
      });
    }

    setUseFocus(true);
    setIsEditMode(false);
    setFields([
      { name: ['WsRmRequisitionPoDetailsList', 0, 'Item'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ItemId'], value: null },
      // { name: ['WsRmRequisitionPoDetailsList', 0, 'DestinationLocationId'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ItemName'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'PackUom'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ItemUom'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'PackEquivalent'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ReqQty'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ApprovedQty'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'BillWeight'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'StockWeight'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'NetWeight'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ItemUomId'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ReqRate'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ReqAmount'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'RemarksDetail'], value: null },
    ]);
  };
  const handleResetForm = () => {
    setFields([
      { name: ['WsRmRequisitionPoDetailsList', 0, 'Item'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ItemId'], value: null },
      // { name: ['WsRmRequisitionPoDetailsList', 0, 'DestinationLocationId'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ItemName'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'PackUom'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ItemUom'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'PackEquivalent'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ReqQty'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ApprovedQty'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'BillWeight'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'StockWeight'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'NetWeight'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ItemUomId'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ReqRate'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'ReqAmount'], value: null },
      { name: ['WsRmRequisitionPoDetailsList', 0, 'RemarksDetail'], value: null },
    ]);
  };
  const handleDeleteRow = (record: any | any[]) => {
    console.log(record);
    if (record?.Id >= 0 || record?.Id === undefined) {
      const message = "You Can't Delete This Row!";
      notification.error({ message: message });
      return;
    }
    if (record?.Id > 0) {
      const recordsToDelete = Array.isArray(record) ? record : [record];
      setDeleteTableData((prevData) => [...prevData, ...recordsToDelete]);
    }
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
  const handleEditRow = (record: any | any[]) => {
    setEdit(record);
    setTableData((prevData: any[]) => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex((item: any) => item.Id === record.Id);

      if (rowIndex !== -1) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          Item: record.ItemName,
          DestinationLocationId: record.DestinationLocationId,
          Id: record.Id,
          ItemId: record.ItemId,
          ItemName: record.ItemName,
          ItemUomId: record.ItemUomId,
          ItemUom: record.ItemUom,
          ReqQty: record.ReqQty,
          ApprovedQty: record.ReqQty,
          BillWeight: record.BillWeight,
          StockWeight: record.StockWeight,
          NetWeight: record.BillWeight,
          PackUom: record.PackUom,
          ReqRate: record.ReqRate,
          ReqAmount: record.ReqAmount,
          PackEquivalent: record.PackEquivalent,
          WsRmRequisitionPoId: record.WsRmRequisitionPoId,
          RemarksDetail: record.RemarksDetail,
        };

        form.setFieldValue(['WsRmRequisitionPoDetailsList', 0], updatedData[rowIndex]); // Update form values
        setIsEditMode(true);
      }
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const calculateWeight = (ReqQty: number, equivalentRate: number) => ReqQty * equivalentRate;
  const calculateAmount = (weight: number, rateUOM: number, itemRate: number) => {
    return (weight / rateUOM) * itemRate;
  };

  const handleItemChange = (obj: TDetailItem, index: number) => {
    console.log(obj);
    console.log(obj?.UOMCode);

    setFields([
      { name: ['WsRmRequisitionPoDetailsList', index, 'PackUom'], value: obj?.UOMCode },
      { name: ['WsRmRequisitionPoDetailsList', index, 'ItemName'], value: obj?.ItemName },
      { name: ['WsRmRequisitionPoDetailsList', index, 'ItemUom'], value: obj?.RateUom },
      { name: ['WsRmRequisitionPoDetailsList', index, 'ItemId'], value: obj?.ItemId },
      { name: ['WsRmRequisitionPoDetailsList', index, 'PackEquivalent'], value: obj?.Equivalent },
      { name: ['WsRmRequisitionPoDetailsList', index, 'ReqRate'], value: obj?.ItemPrice },
      { name: ['WsRmRequisitionPoDetailsList', index, 'ItemUomId'], value: obj?.ItemUomId },
      { name: ['WsRmRequisitionPoDetailsList', index, 'ActionTypeId'], value: 1 },
    ]);

    // const ReqQty = getFieldValue(['WsRmRequisitionPoDetailsList', index, 'ReqQty']);
    const ReqQty = getFieldValue(['WsRmRequisitionPoDetailsList', index, 'ApprovedQty']);
    if (ReqQty && obj?.Equivalent) {
      const weight = calculateWeight(ReqQty, obj?.Equivalent);
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'NetWeight'], value: weight }]);
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'BillWeight'], value: weight }]);
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'StockWeight'], value: weight }]);
    } else {
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'NetWeight'], value: null }]);
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'BillWeight'], value: null }]);
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'StockWeight'], value: null }]);
    }
    const weight = getFieldValue(['WsRmRequisitionPoDetailsList', index, 'NetWeight']);
    const itemRate = getFieldValue(['WsRmRequisitionPoDetailsList', index, 'ReqRate']);
    console.log(weight);
    if (itemRate && weight && obj?.Equivalent) {
      const amount = calculateAmount(weight, obj?.Equivalent, itemRate);
      console.log(amount);
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'ReqAmount'], value: amount }]);
    } else {
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'ReqAmount'], value: null }]);
    }
  };
  const handleReqQtyChange = (ReqQty: number | string | null, index: number) => {
    const equivalentRate = getFieldValue(['WsRmRequisitionPoDetailsList', index, 'PackEquivalent']);
    if (ReqQty && typeof ReqQty === 'number' && equivalentRate) {
      const weight = calculateWeight(ReqQty, equivalentRate);
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'NetWeight'], value: weight }]);
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'BillWeight'], value: weight }]);
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'StockWeight'], value: weight }]);
    } else {
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'NetWeight'], value: null }]);
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'BillWeight'], value: null }]);
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'StockWeight'], value: null }]);
    }
    const weight = getFieldValue(['WsRmRequisitionPoDetailsList', index, 'NetWeight']);
    const itemRate = getFieldValue(['WsRmRequisitionPoDetailsList', index, 'ReqRate']);
    if (itemRate && weight && equivalentRate) {
      const amount = calculateAmount(weight, equivalentRate, itemRate);
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'ReqAmount'], value: amount }]);
    } else {
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'ReqAmount'], value: null }]);
    }
  };

  const handleItemRateChange = (itemRate: number | string | null, index: number) => {
    const weight = getFieldValue(['WsRmRequisitionPoDetailsList', index, 'NetWeight']);
    if (itemRate && typeof itemRate === 'number' && weight && equivalentRate) {
      const amount = calculateAmount(weight, equivalentRate, itemRate);
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'ItemAmount'], value: amount }]);
    } else {
      setFields([{ name: ['WsRmRequisitionPoDetailsList', index, 'ItemAmount'], value: null }]);
    }
  };

  useEffect(() => {
    const weight = getFieldValue(['WsRmRequisitionPoDetailsList', 0, 'NetWeight']);
    if (isSuccess && data?.data?.Data?.Result !== null) {
      setFields([
        {
          name: ['WsRmRequisitionPoDetailsList', 0, 'BillWeight'],
          value: data?.data?.Data?.Result?.[0]?.BillWeight,
        },
        {
          name: ['WsRmRequisitionPoDetailsList', 0, 'StockWeight'],
          value: data?.data?.Data?.Result?.[0]?.StockWeight,
        },
      ]);
    } else if (data?.data?.Data?.Result === null) {
      setFields([
        {
          name: ['WsRmRequisitionPoDetailsList', 0, 'BillWeight'],
          value: weight,
        },
        {
          name: ['WsRmRequisitionPoDetailsList', 0, 'StockWeight'],
          value: weight,
        },
      ]);
    }

    console.log(tableData);
  }, [form, data, tableData]);
  useEffect(() => {
    if (antSelectRef.current) {
      antSelectRef.current.focus();
    }
  }, [antSelectRef]);
  console.log(selectedRecordId);
  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '0%' }}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          {selectedRecordId !== undefined && selectedRecordId !== null ? (
            <>
              <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingTop: '-15%' }}>
                <Form.List name="WsRmRequisitionPoDetailsList" initialValue={[initialValues]}>
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
                            md={{ span: 11 }}
                            lg={{ span: 11 }}
                            xl={{ span: 8 }}
                            xxl={{ span: 6 }}
                            className="formfield"
                            style={{ marginTop: 15 }}
                          >
                            <AntSelectDynamic
                              bordered={false}
                              label={t('location_to')}
                              fieldValue="Id"
                              fieldLabel="CompName"
                              name={[field.name, 'DestinationLocationId']}
                              query={useGetDestinationAndSourceLoc}
                            />
                          </Col>
                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 20 }}
                            md={{ span: 12 }}
                            lg={{ span: 12 }}
                            xl={{ span: 7 }}
                            xxl={{ span: 7 }}
                            className="formfield"
                            style={{ marginTop: 15 }}
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
                              disabled={disablefields}
                            />
                          </Col>

                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 20 }}
                            md={{ span: 11 }}
                            lg={{ span: 5 }}
                            xl={{ span: 4 }}
                            xxl={{ span: 3 }}
                            className="formfield"
                            style={{ marginTop: 15 }}
                          >
                            <AntInputNumber
                              bordered={false}
                              onChange={(ReqQty) => handleReqQtyChange(ReqQty, field.name)}
                              formItemProps={{ ...field, name: [field.name, 'ReqQty'] }}
                              label={t('item_qty')}
                              readOnly
                              disabled={disablefields}
                            />
                          </Col>
                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 20 }}
                            md={{ span: 12 }}
                            lg={{ span: 6 }}
                            xl={{ span: 4 }}
                            xxl={{ span: 3 }}
                            className="formfield"
                            style={{ marginTop: 15 }}
                          >
                            <AntInputNumber
                              bordered={false}
                              onChange={(ReqQty) => handleReqQtyChange(ReqQty, field.name)}
                              formItemProps={{ ...field, name: [field.name, 'ApprovedQty'] }}
                              label={t('approved_qty')}
                            />
                          </Col>

                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 20 }}
                            md={{ span: 11 }}
                            lg={{ span: 6 }}
                            xl={{ span: 4 }}
                            xxl={{ span: 4 }}
                            className="formfield"
                            style={{ marginTop: 15 }}
                          >
                            <p style={{ marginTop: 5 }}>
                              <AntInput
                                bordered={false}
                                readOnly
                                label={t('pack_uom')}
                                formItemProps={{ ...field, name: [field.name, 'PackUom'] }}
                                disabled={disablefields}
                              />
                            </p>
                          </Col>

                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 20 }}
                            md={{ span: 12 }}
                            lg={{ span: 5 }}
                            xl={{ span: 3 }}
                            xxl={{ span: 3 }}
                            className="formfield"
                            style={{ marginTop: 15 }}
                          >
                            <p>
                              <AntInputNumber
                                bordered={false}
                                readOnly
                                label={t('weight')}
                                formItemProps={{ ...field, name: [field.name, 'NetWeight'] }}
                                disabled={disablefields}
                              />
                            </p>
                          </Col>
                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 20 }}
                            md={{ span: 11 }}
                            lg={{ span: 5 }}
                            xl={{ span: 4 }}
                            xxl={{ span: 3 }}
                            className="formfield"
                            style={{ marginTop: 15, marginLeft: '-0.7%' }}
                          >
                            <p>
                              <AntInputNumber
                                bordered={false}
                                readOnly
                                label={t('item_price')}
                                formItemProps={{ ...field, name: [field.name, 'ReqRate'] }}
                                onChange={(itemRate) => handleItemRateChange(itemRate, field.name)}
                                disabled={disablefields}
                              />
                            </p>
                          </Col>
                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 20 }}
                            md={{ span: 12 }}
                            lg={{ span: 6 }}
                            xl={{ span: 4 }}
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
                            lg={{ span: 6 }}
                            xl={{ span: 4 }}
                            xxl={{ span: 3 }}
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
                            lg={{ span: 5 }}
                            xl={{ span: 4 }}
                            xxl={{ span: 3 }}
                            className="formfield"
                            style={{ marginTop: 15 }}
                          >
                            <p>
                              <AntInputNumber
                                bordered={false}
                                readOnly
                                label={t('request_amount')}
                                formItemProps={{ ...field, name: [field.name, 'ReqAmount'] }}
                                disabled={disablefields}
                              />
                            </p>
                          </Col>

                          <Col
                            xs={{ span: 24 }}
                            sm={{ span: 20 }}
                            md={{ span: 17 }}
                            lg={{ span: 18 }}
                            xl={{ span: 15 }}
                            xxl={{ span: 7 }}
                            className="formfield"
                            style={{ marginTop: 15 }}
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
                            md={{ span: 6 }}
                            lg={{ span: 5 }}
                            xl={{ span: 24 }}
                            xxl={{ span: 24 }}
                            style={{ display: 'flex', justifyContent: 'end' }}
                          >
                            <Row style={{ marginTop: '0%' }} gutter={10}>
                              <Col
                                xs={{ span: 12 }}
                                sm={{ span: 12 }}
                                md={{ span: 12 }}
                                lg={{ span: 12 }}
                                xl={{ span: 12 }}
                                xxl={12}
                              >
                                <AntButton
                                  style={{ marginTop: 15 }}
                                  onClick={isEditMode ? handleUpdateToTable : handleAddToTable}
                                  label={isEditMode ? 'Update' : 'Add'}
                                ></AntButton>
                              </Col>
                              <Col
                                xs={{ span: 12 }}
                                sm={{ span: 12 }}
                                md={{ span: 12 }}
                                lg={{ span: 12 }}
                                xl={{ span: 12 }}
                                xxl={12}
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
              </Card>
            </>
          ) : null}

          <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
              <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
                <AntTable
                  numberOfSkeletons={12}
                  scroll={{ x: '', y: convertVhToPixels('15vh') }}
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
type TDynamicForm = { form: FormInstance; selectedRecordId?: number | null };
export default DynamicForm;
