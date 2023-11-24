import { map, size } from 'lodash';
import { Button, Card, Col, Form, FormInstance, Row, Space, theme } from 'antd';
import { TDetailItem, TPurchaseOrderDetailEntry, TSaleOrderDetail } from '../type';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetUomByItemId } from '../queryOptions';
import { AntButton, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { useGetItemsWithBaseUom } from '@tradePro/pages/purchaseTrading/purchaseOrder/queryOptions';
import { useTranslation } from 'react-i18next';

const { useToken } = theme;
const { useWatch } = Form;

const DynamicForm = ({ form }: TDynamicForm) => {
  const [toggle, setToggle] = useState(false);
  const { t } = useTranslation();

  const status = [
    {
      Id: 1,
      Flat: 'Flat',
    },
    {
      Id: 2,
      Flat: 'Percent',
    },
  ];

  const colorPrimary = useToken().token.colorPrimary;

  const toggler = () => {
    setToggle(!toggle);
  };

  const { setFields, getFieldValue } = form;
  const formValues = useWatch<TSaleOrderDetail[]>('SaleOrderDetailList', form);

  const initialValues = {
    UOMCode: '',
    Amount: null,
    JobLotId: null,
    NetWeight: null,
    OrderItemId: null,
    OrderItemQty: null,
    EquivalentRate: null,
  };

  const calculateWeight = (itemQty: number, equivalentRate: number) => itemQty * equivalentRate;

  const calculateAmount = (weight: number, rateUOM: number, itemRate: number) => {
    return (weight / rateUOM) * itemRate;
  };

  const calculateNetRate = (itemPrice: number, addLess: number) => {
    return itemPrice + addLess;
  };

  const handleItemChange = (obj: TDetailItem, index: number) => {
    setFields([
      { name: ['SaleOrderDetailList', index, 'UOMCode'], value: obj?.UOMCode },
      { name: ['SaleOrderDetailList', index, 'EquivalentRate'], value: obj?.Equivalent },
    ]);

    const itemQty = getFieldValue(['SaleOrderDetailList', index, 'OrderItemQty']);
    if (itemQty && obj?.Equivalent) {
      const weight = calculateWeight(itemQty, obj?.Equivalent);
      setFields([{ name: ['SaleOrderDetailList', index, 'NetWeight'], value: weight }]);
    } else {
      setFields([{ name: ['SaleOrderDetailList', index, 'NetWeight'], value: null }]);
    }
  };

  const handleItemQtyChange = (itemQty: number | string | null, index: number) => {
    const equivalentRate = getFieldValue(['SaleOrderDetailList', index, 'EquivalentRate']);

    if (itemQty && typeof itemQty === 'number' && equivalentRate) {
      const weight = calculateWeight(itemQty, equivalentRate);
      setFields([{ name: ['SaleOrderDetailList', index, 'NetWeight'], value: weight }]);
    } else {
      setFields([{ name: ['SaleOrderDetailList', index, 'NetWeight'], value: null }]);
    }
  };

  const handleRateUOMChange = (equivalentRate: number, index: number) => {
    const weight = getFieldValue(['SaleOrderDetailList', index, 'NetWeight']);
    const itemRate = getFieldValue(['SaleOrderDetailList', index, 'ItemPrice']);

    if (itemRate && weight && equivalentRate) {
      const amount = calculateAmount(weight, equivalentRate, itemRate);
      setFields([{ name: ['SaleOrderDetailList', index, 'Amount'], value: amount }]);
    } else {
      setFields([{ name: ['SaleOrderDetailList', index, 'Amount'], value: null }]);
    }
  };

  const handleItemPriceChange = (itemPrice: number | string | null, index: number) => {
    const addLess = getFieldValue(['SaleOrderDetailList', index, 'Add/Less']);
    if (itemPrice && typeof itemPrice === 'number') {
      const netRate = calculateNetRate(itemPrice, addLess);
      setFields([{ name: ['SaleOrderDetailList', index, 'NetRate'], value: netRate }]);
    } else {
      setFields([{ name: ['SaleOrderDetailList', index, 'NetRate'], value: null }]);
    }
  };

  const handleAddLessChange = (addLess: number | string | null, index: number) => {
    const itemPrice = getFieldValue(['SaleOrderDetailList', index, 'ItemPrice']);
    if (addLess && typeof addLess === 'number') {
      const netRate = calculateNetRate(itemPrice, addLess);
      setFields([{ name: ['SaleOrderDetailList', index, 'NetRate'], value: netRate }]);
    } else {
      setFields([{ name: ['SaleOrderDetailList', index, 'NetRate'], value: null }]);
    }
  };

  return (
    <>
      <Row style={{ border: `1px solid ${colorPrimary}` }}>
        <h6
          style={{
            fontFamily: 'times-roman',
            fontSize: '20px',
            marginBottom: '15px',
            padding: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          Sales Personal Information
          <Button onClick={toggler}>
            {' '}
            <DownOutlined />
          </Button>
        </h6>
        {toggle ? (
          <Card className="antCard card-shadow" style={{ overflowX: 'auto', width: '100%' }}>
            {/* <h2 style={{ padding: '10px' }}>Sales Personal Information</h2> */}
            <Form.List name="SaleOrderDetailList" initialValue={[initialValues]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className="form-list-container">
                      <Col span={6}>
                        <AntSelectDynamic
                          fieldValue="Id"
                          label="Sales Man/Agent"
                          fieldLabel="ItemName"
                          query={useGetItemsWithBaseUom}
                          name={[field.name, 'OrderItemId']}
                          onSelectChange={(obj) => handleItemChange(obj, field.name)}
                        />
                      </Col>
                      <Col span={6}>
                        <AntSelectDynamic
                          fieldValue="Id"
                          label="Commission Type"
                          fieldLabel=""
                          name="CommissionType"
                          options={map(status, (item: any) => ({
                            value: item.Id,
                            label: item.Flat,
                          }))}
                        />
                      </Col>
                      <Col span={3}>
                        <AntInput label="Commission Rate" />
                      </Col>
                      <Col span={3}>
                        <AntInput label="Commission Amount" />
                      </Col>
                      <Col span={3}>
                        <AntInput label="Commission Remarks" />
                      </Col>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Card>
        ) : (
          ''
        )}
      </Row>
      <br></br>
      <Card className="antCard card-shadow" style={{ overflowX: 'auto' }}>
        <h2 style={{ padding: '10px' }}>Detail</h2>
        <Form.List name="SaleOrderDetailList" initialValue={[initialValues]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key} className="form-list-container">
                  <Col span={7}>
                    <AntSelectDynamic
                      required
                      fieldValue="Id"
                      label="Item Name"
                      fieldLabel="ItemName"
                      query={useGetItemsWithBaseUom}
                      name={[field.name, 'OrderItemId']}
                      onSelectChange={(obj) => handleItemChange(obj, field.name)}
                    />
                  </Col>

                  <Col span={3}>
                    <AntInput
                      required
                      readOnly
                      label="Base UOM"
                      formItemProps={{ ...field, name: [field.name, 'UOMCode'] }}
                    />
                  </Col>

                  <Col span={3}>
                    <AntInputNumber
                      required
                      label="Qty"
                      onChange={(itemQty) => handleItemQtyChange(itemQty, field.name)}
                      formItemProps={{ ...field, name: [field.name, 'OrderItemQty'] }}
                    />
                  </Col>

                  <Col span={3}>
                    <AntInputNumber
                      required
                      readOnly
                      label="Weight"
                      formItemProps={{ ...field, name: [field.name, 'NetWeight'] }}
                    />
                  </Col>

                  <Col span={3}>
                    <AntInputNumber
                      required
                      label="Item Price"
                      formItemProps={{ ...field, name: [field.name, 'ItemPrice'] }}
                      onChange={(itemPrice) => handleItemPriceChange(itemPrice, field.name)}
                    />
                  </Col>
                  <Col span={3}>
                    <AntInputNumber
                      required
                      label="Add/Less"
                      formItemProps={{ ...field, name: [field.name, 'Add/Less'] }}
                      onChange={(addLess) => handleAddLessChange(addLess, field.name)}
                    />
                  </Col>
                  <Col span={3}>
                    <AntInputNumber
                      required
                      label="Net Rate"
                      formItemProps={{ ...field, name: [field.name, 'NetRate'] }}
                    />
                  </Col>
                  <Col span={4}>
                    <AntSelectDynamic
                      required
                      fieldValue="Id"
                      label="Rate UOM"
                      fieldLabel="UOMCode"
                      name={[field.name, 'RateUom']}
                      query={useGetUomByItemId(formValues?.[field.name]?.OrderItemId)}
                      onSelectChange={(obj) => handleRateUOMChange(obj?.Equivalent, field.name)}
                    />
                  </Col>

                  <Col span={3}>
                    <AntInputNumber
                      required
                      label="Amount"
                      formItemProps={{ ...field, name: [field.name, 'Amount'] }}
                    />
                  </Col>
                  <Col span={6}>
                    <AntInput label="Remarks" />
                  </Col>
                  <Col span={2}>
                    <Row>
                      <Col>
                        <AntButton
                          type="text"
                          onClick={() => add()}
                          icon={<PlusOutlined className="dynamic-add-button" />}
                        />
                      </Col>
                      <Col>
                        <AntButton
                          type="text"
                          icon={<MinusCircleOutlined className="dynamic-delete-button" />}
                          onClick={() => {
                            if (size(fields) > 1) remove(field.name);
                          }}
                        />
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
  );
};

type TDynamicForm = { form: FormInstance };

export default DynamicForm;
