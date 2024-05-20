import { map, size } from 'lodash';
import { Button, Card, Col, Form, FormInstance, Row, Space, notification, theme } from 'antd';
import { TDetailItem, TPriceItem, TRateUomCombo, TSaleOrderDetail } from '../type';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetCustomerNameSalesManAgent, useGetItemsWithBaseUom, useGetUomByItemId } from '../queryOptions';
import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { tableDataList } from './Atom';

import { DownOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import { useGetDiscountRate, useGetPriceSchedule, useGetSaleOrder } from '../queries';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { saleOrderFormcolumns, saleOrderFormcolumns2 } from '../table/columns';
import { useAtom } from 'jotai';
import SalesPersonalInfo from './SalesInfo';
import { FormRowGutter } from '@tradePro/globalAtoms';

const { useToken } = theme;
const { useWatch } = Form;

const DynamicForm = ({ form }: TDynamicForm) => {
  const [toggle, setToggle] = useState(false);
  const { t } = useTranslation();
  const [counter, setCounter] = useState<any>(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [validation, setValidation] = useState(true);
  const [tableData, setTableData] = useAtom(tableDataList);
  const [edit, setEdit] = useState<any>([]);

  const colorPrimary = useToken().token.colorPrimary;

  const toggler = () => {
    setToggle(!toggle);
  };

  const { setFields, getFieldValue } = form;
  const formValues = useWatch<TSaleOrderDetail[]>('SaleOrderDetailList', form);

  const initialValues = {
    UOMCode: null,
    EquivalentRate: null,
    ItemName: null,
    DiscRate: null,
    RateUom: null,
    OrderItemUOMId: null,
    OrderItemRateUOMId: null,
    RetailRate: null,
    NetWeight: null,
    Amount: null,
  };

  const handleAddToTable = () => {
    console.log('Form Values:', formValues);
    const newData = formValues.map((item) => ({
      ItemName: item.ItemName,
      OrderItemId: item.OrderItemId,
      BagPrice: item.BagPrice,
      UOMCode: item.UOMCode,
      OrderItemQty: item.OrderItemQty,
      NetWeight: item.NetWeight,
      AddLess: item.RateAddLess,
      ItemPriceSchudleId: `${dayjs(item.ItemPriceSchudleId)}`,
      DiscRate: item.DiscRate,
      RetailRate: item.RetailRate,
      RateUomNo: item.RateUomNo,
      Amount: item.Amount,
      RateUom: item.RateUom,
      OrderItemRateUOMId: item.OrderItemRateUOMId,
      OrderRemarks: item.OrderRemarks,
    }));
    if (newData.some((item) => item.Amount === null || item.Amount === undefined)) {
      const message = 'Please fill  Debit Amount';
      notification.error({ message: message });
      return;
    }
    // if (!selectedCreditAccount) {
    //   const message = 'Please select a Credit Account';
    //   notification.error({ message: message });
    //   return;
    // }
    // if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
    //   const message = 'Please select a Debit account';
    //   notification.error({ message: message });
    //   return;
    // }

    // setRefAccountId(0);
    setCounter((prevCounter: any) => prevCounter + 1);
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item) => ({
        ...item,
        Id: 0,
      }));
      const combinedData = [...prevData, ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
    form.setFieldValue(['SaleOrderDetailList', 0, 'ItemName'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'ItemId'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'BagPrice'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'UOMCode'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'UOMCode'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'OrderItemQty'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'NetWeight'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'AddLess'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'ItemPriceSchudleId'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'DiscRate'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'RetailRate'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'RateUomNo'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'Amount'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'Remarks'], null);
    setIsEditMode(false);
  };

  const handleUpdateToTable = () => {
    console.log('Form Values:', formValues);
    const newData = formValues.map((item) => ({
      ItemName: item.ItemName,
      OrderItemId: item.OrderItemId,
      BagPrice: item.BagPrice,
      UOMCode: item.UOMCode,
      OrderItemQty: item.OrderItemQty,
      NetWeight: item.NetWeight,
      AddLess: item.RateAddLess,
      ItemPriceSchudleId: `${dayjs(item.ItemPriceSchudleId)}`,
      DiscRate: item.DiscRate,
      RetailRate: item.RetailRate,
      RateUomNo: item.RateUomNo,
      Amount: item.Amount,
      Remarks: item.OrderRemarks,
    }));
    if (newData.some((item) => item.Amount === null || item.Amount === undefined)) {
      const message = 'Please fill  Amount';
      notification.error({ message: message });
      return;
    }
    // if (newData.some((item) => item.AccountId === null || item.AccountId === undefined)) {
    //   const message = 'Please select a Debit account';
    //   notification.error({ message: message });
    //   return;
    // }
    // if (newData.some((item) => item.JobLotId === null || item.JobLotId === undefined)) {
    //   const message = 'Please select a Job Lot';
    //   notification.error({ message: message });
    //   return;
    // }
    setCounter((prevCounter: any) => prevCounter - 1);
    setTableData((prevData: any[]) => {
      const updatedData = newData.map((item, index) => {
        const editedRowIndex = prevData.findIndex((row) => row.Id === edit.Id);
        if (editedRowIndex >= 0) {
          return {
            ...item,
            Id: edit.Id,
          };
        }
        return item;
      });
      const combinedData = [...prevData.filter((row) => row.Id !== edit.Id), ...updatedData];
      console.log('New tableData:', combinedData);
      return combinedData;
    });
    form.setFieldValue(['SaleOrderDetailList', 0, 'ItemName'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'OrderItemId'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'BagPrice'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'UOMCode'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'OrderItemQty'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'NetWeight'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'RateAddLess'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'ItemPriceSchudleId'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'DiscRate'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'RetailRate'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'RateUomNo'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'Amount'], null);
    form.setFieldValue(['SaleOrderDetailList', 0, 'OrderRemarks'], null);
    setIsEditMode(false);
  };

  const handleDeleteRow = (record: any) => {
    console.log('record', record);
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.Id !== record.Id);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  const handleEditRow = (record: any) => {
    setEdit(record);
    console.log(record);
    setTableData((prevData: any[]) => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex((item: any) => item.Id === record.Id);
      if (rowIndex !== -1) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          ItemName: record.ItemName,
          ItemId: record.ItemId,
          BagPrice: record.BagPrice,
          UOMCode: record.UOMCode,
          OrderItemQty: record.OrderItemQty,
          NetWeight: record.NetWeight,
          AddLess: record.AddLess,
          ItemPriceSchudleId: `${dayjs(record.ItemPriceSchudleId)}`,
          DiscRate: record.DiscRate,
          RetailRate: record.RetailRate,
          RateUomNo: record.RateUomNo,
          Amount: record.Amount,
          Remarks: record.Remarks,
        };
        form.setFieldValue(['SaleOrderDetailList', 0], updatedData[rowIndex]);
        setIsEditMode(true);
      }
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  // const handleAgainstAccountChange = (accountId?: any) => {
  //   form.setFieldValue('AgainstAccountId', accountId);
  // };
  useEffect(() => {
    // form.setFieldValue(['voucherDetailList', 0, 'PaymentTypeId'], 'Regular');
    // form.setFieldValue(['voucherDetailList', 0, 'PaymentType'], 'Regular');
    // form.setFieldValue(['voucherDetailList', 0, 'DCheqDate'], dayjs(new Date()));
  }, [form]);
  // const calculateWeight = (itemQty: number, equivalentRate: number) => itemQty * equivalentRate;

  // const calculateAmount = (weight: number, rateUOM: number, itemRate: number) => {
  //   return (weight / rateUOM) * itemRate;
  // };

  // const calculateNetRate = (itemPrice: number, addLess: number) => {
  //   return itemPrice + addLess;
  // };
  const calculateWeight = (itemQty: number, equivalentRate: number) => itemQty * equivalentRate;

  const calculateAmount = (weight: number, rateUOM: number, netRate: number) => {
    return (weight / rateUOM) * netRate;
  };

  const calculateNetRate = (netRate: number, addLess: number) => {
    return netRate + addLess;
  };

  const handleItemChange = async (obj: TDetailItem, index: number) => {
    console.log(obj);
    setFields([
      { name: ['SaleOrderDetailList', index, 'UOMCode'], value: obj?.UOMCode },
      { name: ['SaleOrderDetailList', index, 'ItemName'], value: obj?.ItemName },
      { name: ['SaleOrderDetailList', index, 'EquivalentRate'], value: obj?.Equivalent },
      { name: ['SaleOrderDetailList', index, 'OrderItemUOMId'], value: obj?.ItemUomId },
    ]);
    const baseUmo = getFieldValue(['SaleOrderDetailList', index, 'UOMCode']);

    if (baseUmo !== null) {
      setValidation(false);
      setFields([{ name: ['SaleOrderDetailList', index, 'UOMCode'], errors: undefined }]);
    }
    const itemQty = getFieldValue(['SaleOrderDetailList', index, 'OrderItemQty']);
    if (itemQty && obj?.Equivalent) {
      const weight = calculateWeight(itemQty, obj?.Equivalent);
      setFields([{ name: ['SaleOrderDetailList', index, 'NetWeight'], value: weight }]);
    } else {
      setFields([{ name: ['SaleOrderDetailList', index, 'NetWeight'], value: null }]);
    }
  };

  const handleItemQtyChange = (itemQty: number | string | any, index: number) => {
    const equivalentRate = getFieldValue(['SaleOrderDetailList', index, 'EquivalentRate']);
    if (itemQty < 0) {
      const msg = 'Qty must be None Nagative!';
      return notification.error({
        message: 'Error',
        description: msg,
      });
    }
    if (itemQty && typeof itemQty === 'number' && itemQty > 0 && equivalentRate) {
      const weight = calculateWeight(itemQty, equivalentRate);
      setFields([{ name: ['SaleOrderDetailList', index, 'NetWeight'], value: weight }]);
    } else {
      setFields([{ name: ['SaleOrderDetailList', index, 'NetWeight'], value: null }]);
    }
  };

  const handleRateUOMChange = (obj: TRateUomCombo, index: number) => {
    console.log(obj);
    setFields([{ name: ['SaleOrderDetailList', index, 'RateUom'], value: obj?.ScheduleUnitName }]);

    const weight = getFieldValue(['SaleOrderDetailList', index, 'NetWeight']);
    const itemRate = getFieldValue(['SaleOrderDetailList', index, 'BagPrice']);

    if (itemRate && weight && obj?.Equivalent) {
      const amount = calculateAmount(weight, obj?.Equivalent, itemRate);
      setFields([{ name: ['SaleOrderDetailList', index, 'Amount'], value: amount }]);
    } else {
      setFields([{ name: ['SaleOrderDetailList', index, 'Amount'], value: null }]);
    }
  };

  const handleItemPriceChange = (itemPrice: number | string | null | any, index: number) => {
    // { name: ['SaleOrderDetailList', index, 'BagPrice'], value: obj?.BagPrice },

    const addLess = getFieldValue(['SaleOrderDetailList', index, 'RateAddLess']);
    if (itemPrice < 0) {
      const msg = 'item Price must be None Nagative!';
      return notification.error({
        message: 'Error',
        description: msg,
      });
    }
    // if (itemPrice && typeof itemPrice === 'number') {
    //   const netRate = calculateNetRate(itemPrice, addLess);
    //   setFields([{ name: ['SaleOrderDetailList', index, 'RetailRate'], value: netRate }]);
    // } else {
    //   setFields([{ name: ['SaleOrderDetailList', index, 'RetailRate'], value: null }]);
    // }
  };

  // const handleAddLessChange = (addLess: number | string | null, index: number) => {
  //   const itemPrice = getFieldValue(['SaleOrderDetailList', index, 'BagPrice']);
  //   if (addLess && typeof addLess === 'number') {
  //     const netRate = calculateNetRate(itemPrice, addLess);
  //     setFields([{ name: ['SaleOrderDetailList', index, 'RetailRate'], value: netRate }]);
  //   } else {
  //     setFields([{ name: ['SaleOrderDetailList', index, 'RetailRate'], value: null }]);
  //   }
  // };
  // const handleNetRateChange = (netRate: number | string | null, index: number) => {
  //   const rateUOM = getFieldValue(['SaleOrderDetailList', index, 'RateUomNo']);
  //   const weight = getFieldValue(['SaleOrderDetailList', index, 'NetWeight']);

  //   if (rateUOM && weight && netRate && typeof netRate === 'number') {
  //     const amount = calculateAmount(weight, rateUOM, netRate);
  //     setFields([{ name: ['SaleOrderDetailList', index, 'Amount'], value: amount }]);
  //   } else {
  //     setFields([{ name: ['SaleOrderDetailList', index, 'Amount'], value: null }]);
  //   }
  // };

  const handleAddLessChange = (addLess: number | string | null, index: number) => {
    const itemPrice = getFieldValue(['SaleOrderDetailList', index, 'BagPrice']);
    if (addLess && typeof addLess === 'number') {
      const netRate = calculateNetRate(itemPrice, addLess);
      setFields([{ name: ['SaleOrderDetailList', index, 'RetailRate'], value: netRate }]);
      // updateAmount(index);
    } else {
      setFields([{ name: ['SaleOrderDetailList', index, 'RetailRate'], value: null }]);
      // updateAmount(index);
    }
    const rateUOM = getFieldValue(['SaleOrderDetailList', index, 'RateUomNo']);
    const weight = getFieldValue(['SaleOrderDetailList', index, 'NetWeight']);
    const netRate = getFieldValue(['SaleOrderDetailList', index, 'RetailRate']);
    console.log('rate', rateUOM);
    console.log('weight', weight);
    console.log('netRate', netRate);
    if (rateUOM && weight && netRate && typeof netRate === 'number') {
      const amount = calculateAmount(weight, rateUOM, netRate);
      setFields([{ name: ['SaleOrderDetailList', index, 'Amount'], value: numberFormatter(amount) }]);
    } else {
      setFields([{ name: ['SaleOrderDetailList', index, 'Amount'], value: null }]);
    }
  };

  const handleNetRateChange = (netRate: number | string | null, index: number) => {
    const rateUOM = getFieldValue(['SaleOrderDetailList', index, 'RateUomNo']);
    const weight = getFieldValue(['SaleOrderDetailList', index, 'NetWeight']);
    console.log(rateUOM);
    console.log(weight);
    if (rateUOM && weight && netRate && typeof netRate === 'number') {
      const amount = calculateAmount(weight, rateUOM, netRate);
      setFields([{ name: ['SaleOrderDetailList', index, 'Amount'], value: numberFormatter(amount) }]);
    } else {
      setFields([{ name: ['SaleOrderDetailList', index, 'Amount'], value: null }]);
    }
  };

  const updateAmount = (index: number) => {
    const netRate = getFieldValue(['SaleOrderDetailList', index, 'RetailRate']);
    const rateUOM = getFieldValue(['SaleOrderDetailList', index, 'RateUomNo']);
    const weight = getFieldValue(['SaleOrderDetailList', index, 'NetWeight']);

    if (netRate && rateUOM && weight) {
      const amount = calculateAmount(weight, rateUOM, netRate);
      setFields([{ name: ['SaleOrderDetailList', index, 'Amount'], value: numberFormatter(amount) }]);
    } else {
      setFields([{ name: ['SaleOrderDetailList', index, 'Amount'], value: null }]);
    }
  };

  const handleItemsChange = async (obj: TPriceItem, index: number) => {
    console.log(obj);
    setFields([{ name: ['SaleOrderDetailList', index, 'BagPrice'], value: obj?.ItemPrice }]);
    setFields([{ name: ['SaleOrderDetailList', index, 'RetailRate'], value: obj?.ItemPrice }]);
    setFields([{ name: ['SaleOrderDetailList', index, 'OrderItemRateUOMId'], value: obj?.RateUomId }]);

    if (obj?.ScheduleDesc === null) {
      setFields([{ name: ['SaleOrderDetailList', index, 'ScheduleDesc'], value: 0 }]);
    } else {
      setFields([{ name: ['SaleOrderDetailList', index, 'ScheduleDesc'], value: obj?.ScheduleDesc }]);
    }
  };

  return (
    <Row gutter={[0, 16]} justify={'space-between'}>
      {' '}
      {/* <Card className="antCard card-shadow" style={{ overflowX: 'auto' }}> */}
      {/* <h2 style={{ padding: '10px' }}>Detail</h2> */}
      {/* <h6
        style={{
          fontFamily: 'times-roman',
          fontSize: '20px',
          // marginBottom: '15px',
          marginTop: '10px',
          padding: '5px',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        Detail
      </h6> */}
      <Form.List name="SaleOrderDetailList" initialValue={[initialValues]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Card style={{ boxShadow: '2px 4px 12px 1px gray', marginTop: '20px' }}>
                <div
                  key={field.key}
                  className="form-list-container"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Row gutter={FormRowGutter} justify={'space-between'}>
                    {/* <h6
        style={{
          fontFamily: 'times-roman',
          fontSize: '20px',
          // marginBottom: '15px',
          marginTop: '0px',
          padding: '5px',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
       Detail
        {/* <Button onClick={toggler}>
            {' '}
            <DownOutlined />
          </Button> */}
                    {/* </h6>  */}
                    <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={7} className="formfields">
                      <AntSelectDynamic
                        bordered={false}
                        required
                        fieldValue="Id"
                        label="Item Name"
                        fieldLabel="ItemName"
                        query={useGetItemsWithBaseUom}
                        name={[field.name, 'OrderItemId']}
                        onSelectChange={(obj) => handleItemChange(obj, field.name)}
                      />
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={4} className="formfields">
                      <AntSelectDynamic
                        bordered={false}
                        fieldValue="Id"
                        label="Price Schedule"
                        fieldLabel="EffectedDate"
                        query={() => useGetPriceSchedule(formValues?.[0]?.OrderItemId)}
                        name={[field.name, 'ItemPriceSchudleId']}
                        onChange={(itemPrice) => handleItemPriceChange(itemPrice, field.name)}
                        onSelectChange={(obj) => handleItemsChange(obj, field.name)}
                      />
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={4} className="formfields">
                      <AntInput
                        bordered={false}
                        required={validation}
                        readOnly
                        label="Base UOM :"
                        formItemProps={{ ...field, name: [field.name, 'UOMCode'] }}
                      />
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={3} className="formfields">
                      <AntInputNumber
                        bordered={false}
                        required
                        label="Qty"
                        onChange={(itemQty) => handleItemQtyChange(itemQty !== undefined ? itemQty : null, field.name)}
                        formItemProps={{ ...field, name: [field.name, 'OrderItemQty'] }}
                      />
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={4} className="formfields">
                      <AntInputNumber
                        bordered={false}
                        required
                        readOnly
                        label="Weight"
                        formItemProps={{ ...field, name: [field.name, 'NetWeight'] }}
                      />
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={7} className="formfields">
                      <AntInputNumber
                        bordered={false}
                        readOnly
                        label="Item Price"
                        formItemProps={{ ...field, name: [field.name, 'BagPrice'] }}

                        // formItemProps={{ ...field, name: [field.name, 'BagPrice'] }}
                        // formItemProps={{ ...field, name: [field.name, 'BagPrice'] }}
                      />
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={4} className="formfields">
                      <AntInputNumber
                        bordered={false}
                        readOnly
                        label="Disc Rate"
                        formItemProps={{ ...field, name: [field.name, 'ScheduleDesc'] }}

                        // query={useGetDiscountRate(formValues?.CompanyId)}
                        // onChange={(itemPrice) => handleItemPriceChange(itemPrice, field.name)}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={4} className="formfields">
                      <AntInputNumber
                        bordered={false}
                        required
                        label="Add/Less"
                        formItemProps={{ ...field, name: [field.name, 'RateAddLess'] }}
                        onChange={(addLess) => handleAddLessChange(addLess, field.name)}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={3} className="formfields">
                      <AntInputNumber
                        bordered={false}
                        required
                        readOnly
                        label="Net Rate "
                        formItemProps={{ ...field, name: [field.name, 'RetailRate'] }}
                        onChange={(netRate) => handleNetRateChange(netRate, field.name)}
                      />
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={4} className="formfields">
                      <AntSelectDynamic
                        bordered={false}
                        required
                        fieldValue="Id"
                        label="Rate UOM"
                        fieldLabel="UOMCode"
                        name={[field.name, 'RateUomNo']}
                        query={useGetUomByItemId(formValues?.[field.name]?.OrderItemId)}
                        onSelectChange={(obj) => handleRateUOMChange(obj, field.name)}
                      />
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={7} className="formfields">
                      <AntInputNumber
                        bordered={false}
                        required
                        readOnly
                        label="Amount"
                        formItemProps={{ ...field, name: [field.name, 'Amount'] }}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={3} xxl={14} className="formfields">
                      <AntInput
                        label="Remarks"
                        formItemProps={{ ...field, name: [field.name, 'OrderRemarks'] }}
                        bordered={false}
                      />
                    </Col>

                    <Col xs={12} sm={12} md={8} lg={6} xl={3} xxl={2} style={{ marginTop: '0.5%' }}>
                      <AntButton
                        onClick={isEditMode ? handleUpdateToTable : handleAddToTable}
                        label={isEditMode ? <>{t('update')}</> : <>{t('add')}</>}
                      />
                    </Col>
                  </Row>
                </div>
              </Card>
            ))}
          </>
        )}
      </Form.List>
      <Row gutter={[10, 10]}>
        <Col>
          <AntTable
            // refetch={addRefetch}
            // isError={addisError}
            columns={saleOrderFormcolumns(t, handleDeleteRow, handleEditRow)}
            numberOfSkeletons={12}
            // isLoading={addisLoading}
            data={tableData || []}
            scroll={{ x: '', y: convertVhToPixels('15vh') }}
          />
        </Col>
      </Row>
    </Row>
  );
};

type TDynamicForm = { form: FormInstance };

export default DynamicForm;
