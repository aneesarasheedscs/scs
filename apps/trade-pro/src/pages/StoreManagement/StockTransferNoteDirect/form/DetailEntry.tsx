import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, FormInstance, Row, Form, notification } from 'antd';
import '../style.scss';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useAtom } from 'jotai';
import { addtableData, expenseAmount, listAtom, totalValue } from './Atom';
import { column2 } from '../table/columns';
import {
  useGetCompanyFeaturesCheck,
  useGetFifoAvgRate,
  useGetItemNameSelect,
  useGetWareHouseAndItemOnChange,
  useGetWareHouseSelect,
} from '../queries/queries';
import { StockTransferDetail, TDetailItem } from './types';
import { sumBy } from 'lodash';
import { Twarehouse } from '../table/types';

const { useWatch } = Form;

const DynamicForm = ({ form }: TDynamicForm) => {
  const { t } = useTranslation();
  const formValues = useWatch<StockTransferDetail[]>('WsRmStockTransferNotesDetailsList', form);
  const [totalAmounts, setTotalAmounts] = useAtom(totalValue);
  const [WsRmStockTransferNotesDetailsList, setWsRmStockTransferNotesDetailsList] = useAtom(listAtom);
  const [ItemId, setItemId] = useState(0);
  const [WareHouseId, setWareHouseId] = useState(0);
  const [stockUOM, setstockUOM] = useState(0);
  const [RateEqvailent, setRateEqvailent] = useState(0);
  const [itemQty, setitemQty] = useState<any>(0);
  const [NetWeight, setNetWeight] = useState(0);
  const [ItemUomId, setItemUomId] = useState(0);
  const { setFields, getFieldValue } = form;
  const { data: ERPFeature, isSuccess: isSuccessERP } = useGetCompanyFeaturesCheck();
  const { data: fifoAvgRateData, isSuccess: isSuccessRate } = useGetFifoAvgRate(
    false,
    ItemId,
    WareHouseId,
    stockUOM,
    RateEqvailent,
    itemQty,
    NetWeight
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [counter, setCounter] = useState<any>(0);
  const { data: balance, isSuccess } = useGetWareHouseAndItemOnChange(true, ItemId, WareHouseId, stockUOM);
  const availableQty = balance?.data?.Data?.Result?.[0]?.BalQty;
  const [tableData, setTableData] = useAtom(addtableData);
  const [edit, setEdit] = useState<any>([]);
  const [ExpenseAmounts, setExpenseAmounts] = useAtom(expenseAmount);

  const initialValues = {
    Id: null,
    UOMCode: '',
    WareHouseName: null,
    ItemId: null,
    ItemName: null,
    stockUOM: null,
    ItemQty: null,
    IssuedQty: null,
    BalQty: null,
    BalWeight: null,
    BillWeight: null,
    StockWeight: null,
    IssuedRate: null,
    IssuedAmount: null,
    PackEquivalent: null,
    RemarksDetail: null,
    Amount: null,
    NetWeight: null,
    ItemUomId: null,
    EquivalentRate: null,
    ExpenseAmount: '',
    ActionTypeId: null,
  };

  const handleAddToTable = () => {
    const newData = formValues.map((item) => ({
      WarehouseId: item.WarehouseId,
      WareHouseName: item.WareHouseName,
      ItemName: item.ItemName,
      ItemId: item.ItemId,
      ItemQty: item.ItemQty,
      BalQty: item.BalQty,
      BalWeight: item.BalWeight,
      UOMCode: item.UOMCode,
      ItemUomId: item.ItemUomId,
      NetWeight: item.NetWeight,
      IssuedQty: item.ItemQty,
      BillWeight: item.NetWeight,
      StockWeight: item.BillWeight,
      IssuedRate: item.IssuedRate,
      IssuedAmount: item.IssuedAmount,
      RemarksDetail: item.RemarksDetail,
      ExpenseAmount: ExpenseAmounts,
      ItemNetAmount: ExpenseAmounts - item.IssuedAmount,
    }));
    const totalAmount2 = sumBy(newData, (item) => item.ExpenseAmount);

    // Update expense amount using Jotai
    setExpenseAmounts(totalAmount2);
    console.log('TOTAL2:' + totalAmount2);

    if (newData.some((item) => item.WarehouseId === null || item.WarehouseId === undefined)) {
      const message = 'Please fill WareHouse';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.ItemId === null || item.ItemId === undefined)) {
      const message = 'Please fill ItemName';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.ItemQty === null || item.ItemQty === undefined)) {
      const message = 'Please fill ItemQty';
      notification.error({ message: message });
      return;
    }
    setCounter((prevCounter: any) => prevCounter + 1);
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item) => ({
        ...item,
        Id: counter,
        LineId: counter,
        ActionTypeId: 1,
        // WsRmRequisitionPoDetailId: 0,
        // WsRmRequisitionPoId: 0,
        // WsRmStockTransferNotesId: 5,
        // RequisitionNo: 0,
        // ApprovedQty: 0.0,
      }));

      const combinedData = [...prevData, ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'WarehouseId'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'ItemId'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'ItemQty'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'ItemUomId'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'UOMCode'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'BalQty'], null),
      form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'BalWeight'], null),
      form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'NetWeight'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'IssuedQty'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'BillWeight'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'IssuedRate'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'ExpenseAmount'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'IssuedAmount'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'RemarksDetail'], null);
    setIsEditMode(false);
  };

  // console.log(formValues);
  const handleUpdateToTable = () => {
    const newData = formValues.map((item) => ({
      WarehouseId: item.WarehouseId,
      WareHouseName: item.WareHouseName,
      ItemName: item.ItemName,
      ItemId: item.ItemId,
      ItemQty: item.ItemQty,
      UOMCode: item.UOMCode,
      ItemUomId: item.ItemUomId,
      NetWeight: item.NetWeight,
      IssuedQty: item.IssuedQty,
      BalQty: item.BalQty,
      BalWeight: item.BalWeight,
      BillWeight: item.BillWeight,
      IssuedRate: item.IssuedRate,
      IssuedAmount: item.IssuedAmount,
      RemarksDetail: item.RemarksDetail,
      ExpenseAmount: ExpenseAmounts,
      ItemNetAmount: ExpenseAmounts - item.IssuedAmount,
    }));
    if (newData.some((item) => item.WarehouseId === null || item.WarehouseId === undefined)) {
      const message = 'Please fill WareHouse';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.ItemId === null || item.ItemId === undefined)) {
      const message = 'Please fill ItemName';
      notification.error({ message: message });
      return;
    }
    if (newData.some((item) => item.ItemQty === null || item.ItemQty === undefined)) {
      const message = 'Please fill ItemQty';
      notification.error({ message: message });
      return;
    }

    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item) => {
        const editedRowIndex = prevData.findIndex((row) => row.LineId === edit.LineId);
        if (editedRowIndex >= 0) {
          return {
            ...item,
            LineId: edit.Id,
            ActionTypeId: 2,
          };
        }
        return item;
      });

      const combinedData = [...prevData.filter((row) => row.LineId !== edit.LineId), ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
    setIsEditMode(false);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'WarehouseId'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'ItemId'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'ItemQty'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'UOMCode'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'ItemUomId'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'NetWeight'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'IssuedQty'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'BalQty'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'BalWeight'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'BillWeight'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'IssuedRate'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'ExpenseAmount'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'IssuedAmount'], null);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0, 'RemarksDetail'], null);
  };

  const handleDeleteRow = (record: any) => {
    console.log(record)
    setTableData((prevData: any[]) => {
      console.log(prevData)
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
          WarehouseId: record.WarehouseId,
          WareHouseName: record.WareHouseName,
          ItemName: record.ItemName,
          ItemId: record.ItemId,
          // ItemQty: record.IssuedQty,
          ItemQty: record.ItemQty,
          UOMCode: record.UOMCode,
          ItemUomId: record.ItemUomId,
          // NetWeight: record.BillWeight,
          NetWeight: record.BillWeight,
          BalQty: record.BalQty,
          BalWeight: record.BalWeight,
          IssuedQty: record.BalQty,
          BillWeight: record.BalWeight,
          IssuedRate: record.IssuedRate,
          IssuedAmount: record.IssuedAmount,
          RemarksDetail: record.RemarksDetail,
        };

        form.setFieldValue(['WsRmStockTransferNotesDetailsList', 0], updatedData[rowIndex]);
        setIsEditMode(true);
      }

      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const calculateWeight = (itemQty: number, equivalentRate: number) => itemQty * equivalentRate;
  const calculateAmount = (weight: number, rateUOM: number, itemRate: number) => {
    return weight * itemRate;
  };

  const handleWareHouseChange = (obj: Twarehouse, index: number) => {
    setWareHouseId(obj?.Id);
    form.setFieldValue(['WsRmStockTransferNotesDetailsList', index, 'WareHouseName'], obj?.WareHouseName);
  };

  const handleItemChange = (obj: TDetailItem, index: number) => {
    setItemId(obj?.Id);
    setstockUOM(obj?.ItemUomId);
    setItemUomId(obj?.ItemUomId);
    setFields([
      { name: ['WsRmStockTransferNotesDetailsList', index, 'UOMCode'], value: obj?.UOMCode },
      { name: ['WsRmStockTransferNotesDetailsList', index, 'PackEquivalent'], value: obj?.Equivalent },
      { name: ['WsRmStockTransferNotesDetailsList', index, 'ItemName'], value: obj?.ItemName },
    ]);

    const equivalentRate = getFieldValue(['WsRmStockTransferNotesDetailsList', index, 'PackEquivalent']);
    const itemQty = getFieldValue(['WsRmStockTransferNotesDetailsList', index, 'ItemQty']);
    if (itemQty && equivalentRate) {
      setRateEqvailent(obj?.Id);
      const weight = calculateWeight(itemQty, equivalentRate);

      setFields([{ name: ['WsRmStockTransferNotesDetailsList', index, 'NetWeight'], value: weight }]);
    } else {
      setFields([{ name: ['WsRmStockTransferNotesDetailsList', index, 'NetWeight'], value: null }]);
    }
  };

  const handleItemQtyChange = (itemQty: number | string | null, index: number) => {
    const equivalentRate = getFieldValue(['WsRmStockTransferNotesDetailsList', index, 'PackEquivalent']);
    setitemQty(itemQty);
    setRateEqvailent(equivalentRate);
    if (itemQty && typeof itemQty === 'number' && equivalentRate) {
      const weight = calculateWeight(itemQty, equivalentRate);
      setNetWeight(weight);

      if (itemQty >= availableQty) {
        notification.error({
          message: 'Error',
          description: 'ItemQty Cant,t be Greater than Available Quantity .',
        });
        setFields([{ name: ['WsRmStockTransferNotesDetailsList', index, 'ItemQty'], value: availableQty }]);
        setFields([
          { name: ['WsRmStockTransferNotesDetailsList', index, 'NetWeight'], value: availableQty * equivalentRate },
        ]);
      } else {
        setFields([{ name: ['WsRmStockTransferNotesDetailsList', index, 'NetWeight'], value: weight }]);
      }
    } else {
      setFields([{ name: ['WsRmStockTransferNotesDetailsList', index, 'NetWeight'], value: null }]);
    }

    const itemRate = getFieldValue(['WsRmStockTransferNotesDetailsList', index, 'IssuedRate']);
    const netweight = getFieldValue(['WsRmStockTransferNotesDetailsList', index, 'NetWeight']);

    if (itemRate && netweight && equivalentRate) {
      const amount = calculateAmount(netweight, equivalentRate, itemRate);
      console.log(amount);
      setFields([{ name: ['WsRmStockTransferNotesDetailsList', index, 'IssuedAmount'], value: amount }]);
    } else {
      setFields([{ name: ['WsRmStockTransferNotesDetailsList', index, 'IssuedAmount'], value: null }]);
    }
  };

  const handleItemRateChange = (itemRate: number | string | null, index: number) => { };
  // const calculateAmount2 = (itemQty: number, itemRate: number) => {
  //   return itemQty * itemRate;
  // };
  // const handleItemRateChange = (itemRate: number | string | null, index: number) => {
  //   const itemQty = getFieldValue(['WsRmStockTransferNotesDetailsList', index, 'Qty']);
  //   if (itemQty && itemQty > 0) {
  //     if (itemRate && typeof itemRate === 'number' && itemRate > 0) {
  //       const amount = calculateAmount2(itemQty, itemRate);
  //       setFields([{ name: ['WsRmStockTransferNotesDetailsList', index, 'IssuedAmount'], value: amount }]);
  //     } else {
  //       setFields([{ name: ['WsRmStockTransferNotesDetailsList', index, 'IssuedAmount'], value: null }]);
  //     }
  //   }
  // };
  const list = tableData.map((item: any) => item);

  const DebitAmount = tableData.map((item: any) => item.IssuedAmount);
  const totalAmount = sumBy(DebitAmount);
  useEffect(() => {
    setTotalAmounts(totalAmount);
    // setExpenseAmounts(totalAmount);
    setWsRmStockTransferNotesDetailsList(tableData);
    console.log(totalAmounts);
    if (isSuccess) {
      setFields([
        {
          name: ['WsRmStockTransferNotesDetailsList', 0, 'BalQty'],
          value: balance?.data?.Data?.Result?.[0]?.BalQty,
        },
        {
          name: ['WsRmStockTransferNotesDetailsList', 0, 'BalWeight'],
          value: balance?.data?.Data?.Result?.[0]?.BalWeight,
        },
      ]);
    } else if (balance?.data?.Data?.Result === null) {
      setFields([
        {
          name: ['WsRmStockTransferNotesDetailsList', 0, 'BalQty'],
          value: null,
        },
        {
          name: ['WsRmStockTransferNotesDetailsList', 0, 'BalWeight'],
          value: null,
        },
      ]);
    }
    if (isSuccess) {
      setFields([
        {
          name: ['WsRmStockTransferNotesDetailsList', 0, 'IssuedQty'],
          value: balance?.data?.Data?.Result?.[0]?.BalQty,
        },
        {
          name: ['WsRmStockTransferNotesDetailsList', 0, 'BillWeight'],
          value: balance?.data?.Data?.Result?.[0]?.BalWeight,
        },
      ]);
    } else if (balance?.data?.Data?.Result === null) {
      setFields([
        {
          name: ['WsRmStockTransferNotesDetailsList', 0, 'IssuedQty'],
          value: null,
        },
        {
          name: ['WsRmStockTransferNotesDetailsList', 0, 'BillWeight'],
          value: null,
        },
      ]);
    }
    if (isSuccessRate) {
      setFields([
        {
          name: ['WsRmStockTransferNotesDetailsList', 0, 'IssuedRate'],
          value: fifoAvgRateData?.data?.Data?.Result,
        },
      ]);
    } else if (fifoAvgRateData?.data?.Data?.Result === null) {
      setFields([
        {
          name: ['WsRmStockTransferNotesDetailsList', 0, 'IssuedRate'],
          value: null,
        },
      ]);
    }
    if (isSuccessRate && isSuccessERP && ERPFeature?.data?.Data?.Result?.[0]?.Id === 5) {
      handleItemRateChange(fifoAvgRateData?.data?.Data?.Result, 0);
      setFields([
        {
          name: ['WsRmStockTransferNotesDetailsList', 0, 'IssuedRate'],
          value: fifoAvgRateData?.data?.Data?.Result,
        },
      ]);
    } else if (fifoAvgRateData?.data?.Data?.Result === null) {
      setFields([
        {
          name: ['WsRmStockTransferNotesDetailsList', 0, 'IssuedRate'],
          value: null,
        },
      ]);
    }
  }, [tableData, form, balance, fifoAvgRateData]);

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '1%' }}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingBottom: '1%' }}>
            <Form.List name="WsRmStockTransferNotesDetailsList" initialValue={[initialValues]}>
              {(fields, { }) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className="form-list-container">
                      <Col
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 0 }}
                        lg={{ span: 11, offset: 0 }}
                        xl={{ span: 6, offset: 0 }}
                        className="formfield"
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('warehouse')}
                          fieldValue="Id"
                          fieldLabel="WareHouseName"
                          name={[field.name, 'WarehouseId']}
                          query={useGetWareHouseSelect}
                          onSelectChange={(obj) => handleWareHouseChange(obj, field.name)}
                        />
                      </Col>
                      <Col
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 1 }}
                        lg={{ span: 11, offset: 1 }}
                        xl={{ span: 6, offset: 1 }}
                        className="formfield"
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('item_name')}
                          fieldValue="Id"
                          fieldLabel="ItemName"
                          name={[field.name, 'ItemId']}
                          query={useGetItemNameSelect}
                          onSelectChange={(obj) => handleItemChange(obj, field.name)}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 0 }}
                        lg={{ span: 11, offset: 0 }}
                        xl={{ span: 4, offset: 1 }}
                        className="formfield pack"
                      >
                        <AntInput
                          readOnly
                          bordered={false}
                          label={t('pack_uom')}
                          formItemProps={{ ...field, name: [field.name, 'UOMCode'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 1 }}
                        lg={{ span: 11, offset: 1 }}
                        xl={{ span: 4, offset: 1 }}
                        className="formfield qty"
                      >
                        <AntInputNumber
                          bordered={false}
                          label={t('item_qty')}
                          onChange={(itemQty) => handleItemQtyChange(itemQty, field.name)}
                          formItemProps={{ ...field, name: [field.name, 'ItemQty'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 0 }}
                        lg={{ span: 11, offset: 0 }}
                        xl={{ span: 5, offset: 0 }}
                        className="formfield"
                        style={{ marginTop: '0.8rem' }}
                      >
                        <AntInputNumber
                          readOnly
                          bordered={false}
                          label={t('weight')}
                          onChange={(itemQty) => handleItemQtyChange(itemQty, field.name)}
                          formItemProps={{ ...field, name: [field.name, 'NetWeight'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 1 }}
                        lg={{ span: 11, offset: 1 }}
                        xl={{ span: 5, offset: 1 }}
                        className="formfield"
                        style={{ marginTop: '0.8rem' }}
                      >
                        <AntInputNumber
                          disabled
                          bordered={false}
                          label={t('available_qty')}
                          formItemProps={{ ...field, name: [field.name, 'IssuedQty'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 0 }}
                        lg={{ span: 11, offset: 0 }}
                        xl={{ span: 5, offset: 1 }}
                        className="formfield"
                        style={{ marginTop: '0.8rem' }}
                      >
                        <AntInputNumber
                          disabled
                          bordered={false}
                          label={t('available_weight')}
                          formItemProps={{
                            ...field,
                            name: [field.name, 'BillWeight'],
                          }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 1 }}
                        lg={{ span: 11, offset: 1 }}
                        xl={{ span: 5, offset: 1 }}
                        className="formfield"
                        style={{ marginTop: '0.8rem' }}
                      >
                        <AntInputNumber
                          readOnly
                          bordered={false}
                          label={t('average_rate')}
                          formItemProps={{ ...field, name: [field.name, 'IssuedRate'] }}
                          onChange={(itemRate) => handleItemRateChange(itemRate, field.name)}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 0 }}
                        lg={{ span: 11, offset: 0 }}
                        xl={{ span: 6, offset: 0 }}
                        className="formfield"
                        style={{ marginTop: '0.8rem' }}
                      >
                        <AntInputNumber
                          readOnly
                          bordered={false}
                          label={t('amount')}
                          formItemProps={{ ...field, name: [field.name, 'IssuedAmount'] }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 23, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 1 }}
                        lg={{ span: 11, offset: 1 }}
                        xl={{ span: 12, offset: 1 }}
                        className="formfield remarks"
                        style={{ marginTop: '0.8rem' }}
                      >
                        <AntInput
                          bordered={false}
                          label={t('remarks')}
                          formItemProps={{ ...field, name: [field.name, 'RemarksDetail'] }}
                        />
                      </Col>
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'WareHouseName'] }}
                        style={{ display: 'none' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'ItemName'] }}
                        style={{ display: 'none' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'UOMCode'] }}
                        style={{ display: 'none' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'ItemQty'] }}
                        style={{ display: 'none' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'NetWeight'] }}
                        style={{ display: 'none' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'IssuedQty'] }}
                        style={{ display: 'none' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'BillWeight'] }}
                        style={{ display: 'none' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'IssuedRate'] }}
                        style={{ display: 'none' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'IssuedAmount'] }}
                        style={{ display: 'none' }}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'ExpenseAmount'] }}
                        style={{ display: 'none' }}
                        value={ExpenseAmounts}
                      />
                      <AntInput
                        bordered={false}
                        label={''}
                        formItemProps={{ ...field, name: [field.name, 'RemarksDetail'] }}
                        style={{ display: 'none' }}
                      />
                      <Col
                        xs={{ span: 10, offset: 2 }}
                        sm={{ span: 5, offset: 8 }}
                        md={{ span: 3, offset: 7 }}
                        lg={{ span: 5, offset: 7 }}
                        xl={{ span: 1, offset: 0 }}
                        style={{ marginTop: '0.8rem' }}
                      >
                        <AntButton
                          className="add"
                          onClick={isEditMode ? handleUpdateToTable : handleAddToTable}
                          label={isEditMode ? <>{t('update')}</> : <>{t('add')}</>}
                        />
                      </Col>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Card>
          <br />
          <h2 className="form-heading">{t('detail')}</h2>
          <br />
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
            <AntTable
              numberOfSkeletons={12}
              scroll={{ x: '', y: convertVhToPixels('15vh') }}
              data={tableData || []}
              columns={column2(t, handleDeleteRow, handleEditRow)}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

type TDynamicForm = { form: FormInstance };

export default DynamicForm;
