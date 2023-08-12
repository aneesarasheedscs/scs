import React, { useEffect, useState } from 'react';
import { AntButton, AntInput, AntSelectDynamic } from '@scs/ui';
import { Button, Card, Checkbox, Col, Form, Input, Row, Space, Tooltip } from 'antd';
import { useGetItem, useGetUom, useJobLot } from './queries';
import { CloseOutlined, PlusOutlined, FileAddOutlined, DeleteFilled } from '@ant-design/icons';
import { map, values } from 'lodash';

function FormFile() {
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
    <>
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
              <Card style={{ display: 'flex', marginBottom: 10, marginTop: 0 }} align="baseline">
                <Form.Item style={{ marginTop: 0 }}>
                  <AntButton label={'Add Field'} icon={<PlusOutlined />} onClick={() => add()} />
                </Form.Item>
                <Row style={{ border: '1px solid black' }}>
                  <Col style={{ border: '1px solid black', height: '50px' }}>
                    <Form.Item
                      // {...restField}
                      name={'itemName'}
                      label="Item Category"
                      //   rules={[{ required: true, message: 'Select Item' }]}
                      style={{ marginRight: 10 }}
                    >
                      <AntSelectDynamic
                        fieldValue="ItemName"
                        optionFilterProp="children"
                        showSearch
                        className="select"
                        placeholder="click to select an item"
                        allowClear
                        fieldLabel="ItemName"
                        name="ItemsName"
                        style={{
                          width: '100%',
                          marginRight: 200,
                          background: '#ffff',
                        }}
                        data={data?.data?.Data?.Result}
                      />
                    </Form.Item>
                  </Col>
                  <Form.Item
                    // {...restField}
                    name={'itemCode'}
                    label="Item Code"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntInput
                      name="itemCode"
                      inputProps={{ type: 'number' }}
                      className="input"
                      style={{ width: '100%', border: '1px dashed blue' }}
                      data={map(data?.data?.Data?.Result, (item) => item.UOMCode)}
                      value={baseUomData}
                      readOnly
                    />
                  </Form.Item>
                  <Form.Item
                    // {...restField}
                    name={'itemCode'}
                    label="Item Name"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntInput
                      name="itemCode"
                      inputProps={{ type: 'text' }}
                      className="input"
                      style={{ width: '100%' }}
                      data={map(data?.data?.Data?.Result, (item) => item.UOMCode)}
                      value={baseUomData}
                    />
                  </Form.Item>

                  <Form.Item
                    // {...restField}
                    name={'job/lot'}
                    label="Item Type"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntSelectDynamic
                      fieldValue="JobLotDescription"
                      isError={isSuccessjob}
                      isLoading={isLoadingjob}
                      optionFilterProp="children"
                      showSearch
                      className="select"
                      placeholder="select job/lot"
                      allowClear
                      fieldLabel="JobLotDescription"
                      name="JobLotDescription"
                      style={{ width: '100%', marginRight: 200, background: '#ffff' }}
                      data={joblot?.data?.Data?.Result}
                    />
                  </Form.Item>
                  <Form.Item
                    // {...restField}
                    name={'job/lot'}
                    label="Item Class"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntSelectDynamic
                      fieldValue="JobLotDescription"
                      isError={isSuccessjob}
                      isLoading={isLoadingjob}
                      optionFilterProp="children"
                      showSearch
                      className="select"
                      placeholder="select job/lot"
                      allowClear
                      fieldLabel="JobLotDescription"
                      name="JobLotDescription"
                      style={{ width: '100%', marginRight: 100, background: '#ffff' }}
                      data={joblot?.data?.Data?.Result}
                    />
                  </Form.Item>
                  <Form.Item
                    // {...restField}
                    name={'job/lot'}
                    label="Item Group"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntSelectDynamic
                      fieldValue="JobLotDescription"
                      isError={isSuccessjob}
                      isLoading={isLoadingjob}
                      optionFilterProp="children"
                      showSearch
                      className="select"
                      placeholder="select job/lot"
                      allowClear
                      fieldLabel="JobLotDescription"
                      name="JobLotDescription"
                      style={{ width: '100%', marginRight: 100, background: '#ffff' }}
                      data={joblot?.data?.Data?.Result}
                    />
                  </Form.Item>
                  <Form.Item
                    // {...restField}
                    name={'job/lot'}
                    label="Base Unit"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntSelectDynamic
                      fieldValue="JobLotDescription"
                      isError={isSuccessjob}
                      isLoading={isLoadingjob}
                      optionFilterProp="children"
                      showSearch
                      className="select"
                      placeholder="select job/lot"
                      allowClear
                      fieldLabel="JobLotDescription"
                      name="JobLotDescription"
                      style={{ width: '100%', marginRight: 250, background: '#ffff' }}
                      data={joblot?.data?.Data?.Result}
                    />
                  </Form.Item>
                  <Form.Item
                    // {...restField}
                    name={'baseUom'}
                    label="HSCode"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntInput
                      name="baseUom"
                      inputProps={{ type: '' }}
                      className="input"
                      style={{ width: '100%' }}
                      data={map(data?.data?.Data?.Result, (item) => item.ItemUomId)}
                      value={baseUomData}
                    />
                  </Form.Item>
                  <Form.Item
                    // {...restField}
                    name={'baseUom'}
                    label="Product No"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntInput
                      name="baseUom"
                      inputProps={{ type: 'number' }}
                      className="input"
                      style={{ width: '100%' }}
                      data={map(data?.data?.Data?.Result, (item) => item.ItemUomId)}
                      value={baseUomData}
                    />
                  </Form.Item>
                  <Form.Item
                    // {...restField}
                    name={'quantity'}
                    label="Purchase Account"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntSelectDynamic
                      fieldValue="UOMCode"
                      optionFilterProp="children"
                      showSearch
                      className="select"
                      placeholder="select Rate Uom"
                      allowClear
                      fieldLabel="UOMCode"
                      name="UOMCodes"
                      style={{ width: '100%', marginRight: 200, background: '#ffff' }}
                      data={uomData?.data?.Data?.Result}
                    />
                  </Form.Item>
                  <Form.Item
                    // {...restField}
                    name={'weight'}
                    label="Sale Account"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntSelectDynamic
                      fieldValue="UOMCode"
                      optionFilterProp="children"
                      showSearch
                      className="select"
                      placeholder="select Rate Uom"
                      allowClear
                      fieldLabel="UOMCode"
                      name="UOMCodes"
                      style={{ width: '100%', marginRight: 200, background: '#ffff' }}
                      data={uomData?.data?.Data?.Result}
                    />
                  </Form.Item>
                  <Form.Item
                    // {...restField}
                    name={'rate'}
                    label="CGS Account"
                    //   rules={[{ required: true, message: 'Missing last name' }]}
                    style={{ marginRight: 10 }}
                  >
                    <AntSelectDynamic
                      fieldValue="UOMCode"
                      optionFilterProp="children"
                      showSearch
                      className="select"
                      placeholder="select Rate Uom"
                      allowClear
                      fieldLabel="UOMCode"
                      name="UOMCodes"
                      style={{ width: '100%', marginRight: 200, background: '#ffff' }}
                      data={uomData?.data?.Data?.Result}
                    />
                  </Form.Item>

                  <Col span={22}>
                    <Form.Item
                      // {...restField}
                      name={'baseUom'}
                      label=""
                      //   rules={[{ required: true, message: 'Missing last name' }]}
                      style={{ marginRight: 10 }}
                    >
                      Status
                      <Checkbox style={{ marginTop: 30, marginLeft: 5 }} />
                    </Form.Item>
                    <Form.Item
                      // {...restField}
                      name={'rateUom'}
                      label="Select Companies"
                      //   rules={[{ required: true, message: 'Missing last name' }]}
                      style={{ marginRight: 10 }}
                    >
                      <AntSelectDynamic
                        fieldValue="UOMCode"
                        optionFilterProp="children"
                        showSearch
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
                      label="Upload Image"
                      //   rules={[{ required: true, message: 'Missing last name' }]}
                      style={{ marginRight: 10 }}
                    >
                      {/* <AntInput
                      name="amount"
                      inputProps={{ type: 'number' }}
                      className="input"
                      readOnly
                      style={{ width: '100%' }}
                    /> */}
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              {fields.map(({ key, name, ...restField }) => (
                <Card key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
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
                </Card>
              ))}
            </>
          )}
        </Form.List>
        <Form.Item>
          <AntButton
            label={'Save'}
            icon={<FileAddOutlined />}
            htmlType="submit"
            style={{ marginRight: 10 }}
          ></AntButton>
          <AntButton label={'Close'} icon={<CloseOutlined />} htmlType="submit"></AntButton>
        </Form.Item>
      </Form>
    </>
  );
}

export default FormFile;
