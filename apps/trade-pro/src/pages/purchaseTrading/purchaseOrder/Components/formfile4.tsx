import React, { useEffect, useState } from 'react';
import { AntButton, AntInput, AntSelectDynamic } from '@scs/ui';
import { Button, Form, Input, Row, Space, Tooltip } from 'antd';
import { useGetItem, useGetUom, useJobLot } from './queries';
import { MinusCircleOutlined, PlusOutlined, DeleteFilled } from '@ant-design/icons';
import { map, values } from 'lodash';

function FormFile4() {
  const [form] = Form.useForm();
  const [baseUomData, setBaseUomData] = useState<any>([]);

  const { data, isSuccess, isError, isLoading } = useGetItem();
  const {
    data: joblot,
    isSuccess: isSuccessjob,
    isError: isErrorjob,
    isLoading: isLoadingjob,
  } = useJobLot();
  const {
    data: uomData,
    isSuccess: isUomSuccess,
    isError: isUomError,
    isLoading: isUomLoading,
  } = useGetUom();

  const onFinish = (values: any) => {
    setWeight(weight);
    console.log('Received values of form:', values);
  };
  const calculateWeight = (quantity: number, baseUom: number) => {
    return (quantity * baseUom).toFixed(2);
  };
  const [weight, setWeight] = useState('');
  const handleQuantityChange = (changedValues: any, value: any) => {
    // const { users } = value;
    // const updatedUsers = users.map((user) => ({
    //   ...user,
    //   weight: calculateWeight(user.quantity, user.baseUom),
    // }));

    // form.setFieldsValue({ users: updatedUsers });

    const { quantity, baseUom } = changedValues;
    if (quantity !== undefined && baseUom !== undefined) {
      const weight = calculateWeight(quantity, baseUom);
      form.setFieldsValue({ weight }); // Update weight field
      setWeight(weight);
      console.log(weight);
      setBaseUomData(data);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setBaseUomData(map(data?.data?.Data?.Result, (item) => item.ItemUomId));
      console.log(baseUomData);
    }
  }, [isSuccess]);

  return (
    <Form
      name="dynamic_form_nest_item"
      layout={'vertical'}
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      onValuesChange={handleQuantityChange}
    >
      <Form.List name="users">
        {(fields, { add, remove }, index) => (
          <>
            <Space style={{ display: 'flex', marginBottom: 0, marginTop: 50 }} align="baseline">
              <Row>
                <Form.Item
                  // {...restField}
                  name={'itemName'}
                  label="Item Name"
                  //   rules={[{ required: true, message: 'Select Item' }]}
                  style={{ marginRight: 90 }}
                >
                  <AntSelectDynamic
                    fieldValue="ItemName"
                    optionFilterProp="children"
                    showSearch
                    bordered={false}
                    className="select"
                    placeholder="click to select an item"
                    allowClear
                    fieldLabel="ItemName"
                    name="ItemsName"
                    style={{ width: '150%', background: '#ffff' }}
                    data={data?.data?.Data?.Result}
                  />
                </Form.Item>
                <Form.Item
                  // {...restField}
                  name={'job/lot'}
                  label="Job/Lot"
                  //   rules={[{ required: true, message: 'Missing last name' }]}
                  style={{ marginRight: 10 }}
                >
                  <AntSelectDynamic
                    fieldValue="JobLotDescription"
                    isError={isSuccessjob}
                    isLoading={isLoadingjob}
                    optionFilterProp="children"
                    showSearch
                    bordered={false}
                    className="select"
                    placeholder="select job/lot"
                    allowClear
                    fieldLabel="JobLotDescription"
                    name="JobLotDescription"
                    style={{ width: '100%', marginLeft: 5, background: '#ffff' }}
                    data={joblot?.data?.Data?.Result}
                  />
                </Form.Item>
                <Form.Item
                  // {...restField}
                  name={'baseUom'}
                  label="Base UOM"
                  //   rules={[{ required: true, message: 'Missing last name' }]}
                  style={{ marginRight: 10 }}
                >
                  <AntInput
                    name="baseUom"
                    inputProps={{ type: 'number' }}
                    className="input"
                    //   fieldValue="UOMCode"
                    //   fieldLabel="UOMCode"
                    style={{ width: '100%' }}
                    data={map(data?.data?.Data?.Result, (item) => item.ItemUomId)}
                    // value={form.getFieldValue(['users', name, 'itemName'])}
                    // value={baseUomData?.map((item: any) => item.UOMCode)}
                    value={baseUomData}
                    readOnly
                  />
                </Form.Item>
                <Form.Item
                  // {...restField}
                  name={'quantity'}
                  label="Item Quantity"
                  //   rules={[{ required: true, message: 'Missing last name' }]}
                  style={{ marginRight: 10 }}
                >
                  <AntInput
                    name="quantity"
                    inputProps={{ type: 'number' }}
                    className="input"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item
                  // {...restField}
                  name={'weight'}
                  label="Weight"
                  //   rules={[{ required: true, message: 'Missing last name' }]}
                  style={{ marginRight: 10 }}
                >
                  <AntInput
                    name="weight"
                    inputProps={{ type: 'number' }}
                    className="input"
                    readOnly
                    //   value={calculateWeight(name?.quantity, name?.baseUom)}
                    value={calculateWeight(
                      form.getFieldValue('quantity'),
                      form.getFieldValue('baseUom')
                    )}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item
                  // {...restField}
                  name={'rate'}
                  label="Item Rate"
                  //   rules={[{ required: true, message: 'Missing last name' }]}
                  style={{ marginRight: 10 }}
                >
                  <AntInput
                    name="rate"
                    inputProps={{ type: 'number' }}
                    className="input"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item
                  // {...restField}
                  name={'rateUom'}
                  label="Rate UOM"
                  //   rules={[{ required: true, message: 'Missing last name' }]}
                  style={{ marginRight: 10 }}
                >
                  <AntSelectDynamic
                    fieldValue="UOMCode"
                    optionFilterProp="children"
                    showSearch
                    bordered={false}
                    className="select"
                    placeholder="select Rate Uom"
                    allowClear
                    fieldLabel="UOMCode"
                    name="UOMCodes"
                    style={{ width: '100%', marginLeft: 0, background: '#ffff' }}
                    data={uomData?.data?.Data?.Result}
                  />
                </Form.Item>
                <Form.Item
                  // {...restField}
                  name={'amount'}
                  label="Amount"
                  //   rules={[{ required: true, message: 'Missing last name' }]}
                  style={{ marginRight: 10 }}
                >
                  <AntInput
                    name="amount"
                    inputProps={{ type: 'number' }}
                    className="input"
                    readOnly
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item
                  // {...restField}
                  name={'action'}
                  label="Action"
                  //   rules={[{ required: true, message: 'Missing last name' }]}
                  style={{ marginRight: 10 }}
                >
                  <AntButton icon={<DeleteFilled />} onClick={() => remove(index)} />
                </Form.Item>
              </Row>
            </Space>
            <Form.Item>
              <AntButton label={'Add Field'} icon={<PlusOutlined />} onClick={() => add()} />
            </Form.Item>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Row>
                  <Form.Item
                    {...restField}
                    name={[name, 'itemName']}
                    label="Item Name"
                    //   rules={[{ required: true, message: 'Select Item' }]}
                    style={{ marginRight: 40 }}
                  >
                    <AntSelectDynamic
                      fieldValue="ItemName"
                      optionFilterProp="children"
                      showSearch
                      bordered={false}
                      className="select"
                      placeholder="click to select an item"
                      allowClear
                      fieldLabel="ItemName"
                      name="ItemsName"
                      style={{ width: '120%', marginRight: 0 }}
                      data={data?.data?.Data?.Result}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'job/lot']}
                    label="Job/Lot"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntSelectDynamic
                      fieldValue="JobLotDescription"
                      isError={isSuccessjob}
                      isLoading={isLoadingjob}
                      optionFilterProp="children"
                      showSearch
                      bordered={false}
                      className="select"
                      placeholder="select job/lot"
                      allowClear
                      fieldLabel="JobLotDescription"
                      name="JobLotDescription"
                      style={{ width: '100%', marginLeft: 5 }}
                      data={joblot?.data?.Data?.Result}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'baseUom']}
                    label="Base UOM"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntInput
                      name="baseUom"
                      inputProps={{ type: 'number' }}
                      className="input"
                      bordered={false}
                      //   fieldValue="UOMCode"
                      //   fieldLabel="UOMCode"
                      style={{ width: '100%' }}
                      // data={data?.data?.Data?.Result}
                      // value={form.getFieldValue(['users', name, 'itemName'])}
                      // value={baseUomData?.map((item: any) => item.UOMCode)}
                      value={baseUomData}
                      readOnly
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'quantity']}
                    label="Item Quantity"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntInput
                      name="quantity"
                      inputProps={{ type: 'number' }}
                      className="input"
                      bordered={false}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'weight']}
                    label="Weight"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntInput
                      name="weight"
                      inputProps={{ type: 'number' }}
                      className="input"
                      bordered={false}
                      readOnly
                      //   value={calculateWeight(name?.quantity, name?.baseUom)}
                      value={calculateWeight(
                        form.getFieldValue(['users', name, 'quantity']),
                        form.getFieldValue(['users', name, 'baseUom'])
                      )}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'rate']}
                    label="Item Rate"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntInput
                      name="rate"
                      inputProps={{ type: 'number' }}
                      className="input"
                      bordered={false}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'rateUom']}
                    label="Rate UOM"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntSelectDynamic
                      fieldValue="UOMCode"
                      optionFilterProp="children"
                      showSearch
                      bordered={false}
                      className="select"
                      placeholder="select Rate Uom"
                      allowClear
                      fieldLabel="UOMCode"
                      name="UOMCodes"
                      style={{ width: '100%', marginLeft: 0 }}
                      data={uomData?.data?.Data?.Result}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'amount']}
                    label="Amount"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntInput
                      name="amount"
                      inputProps={{ type: 'number' }}
                      className="input"
                      bordered={false}
                      readOnly
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'action']}
                    label="Action"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntButton icon={<DeleteFilled />} onClick={() => remove(name)} />
                  </Form.Item>
                </Row>
              </Space>
            ))}
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormFile4;
