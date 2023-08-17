import './style.scss';
import image from './OIP.jpg';
import { map, values } from 'lodash';
import { TItemHistoryTable } from '../type';
import React, { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import ItemCategory from './definitionScreens/ItemCategory';
import {
  getCompaniesNames,
  getItemCategory,
  getItemClass,
  getItemCode,
  getItemLedger,
  getItemType,
  getItemUOM,
} from './queries';
import { AntButton, AntInput, AntSelectDynamic } from '@scs/ui';
import { Button, Card, Checkbox, Col, Form, Input, Row, Space, Tooltip } from 'antd';
import { CloseOutlined, PlusOutlined, FileAddOutlined, DeleteFilled } from '@ant-design/icons';
import ItemType from './definitionScreens/ItemType';

//convert image
const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); //built in function
    reader.onload = () => resolve(reader.result);
    reader.onabort = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
//handle image
const handleImage = (e: any) => {
  const file = e.target.files[0];
  getBase64(file).then((base64) => {
    localStorage['img'] = base64;
    console.debug('File Store', base64);
  });
};

function FormFile() {
  const [form] = Form.useForm();
  const [baseUomData, setBaseUomData] = useState<any>([]);
  const { data: itemCategory, isSuccess, isError, isFetched, isLoading } = getItemCategory();
  const {
    data: itemCode,
    isSuccess: isCodeSuccess,
    isLoading: isCodeLoading,
    isError: isCodeError,
  } = getItemCode();
  const {
    data: itemType,
    isSuccess: isitemSuccess,
    isLoading: isitemLoading,
    isError: isitemError,
  } = getItemType();
  const {
    data: itemClass,
    isSuccess: isSuccessClass,
    isLoading: isLoadingClass,
    isError: isErrorClass,
  } = getItemClass();
  const {
    data: itemUom,
    isSuccess: isSuccessUom,
    isLoading: isLoadingUom,
    isError: isErrorUom,
  } = getItemUOM();
  const {
    data: getCompanies,
    isError: isCompanieError,
    isLoading: isCompanieLoading,
    isSuccess: isCompanieSuccess,
  } = getCompaniesNames();

  const onFinish = (values: TItemHistoryTable) => {
    console.log('Received values of form:', values);
  };

  return (
    <>
      <Form
        name="dynamic_form_nest_item"
        layout={'vertical'}
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="users">
          {(fields, { add, remove }, index) => (
            <>
              <Card style={{ display: 'flex', marginBottom: 10, marginTop: 0 }}>
                {/* <Form.Item style={{ marginTop: 0 }}>
                  <AntButton label={'Add Item'} icon={<PlusOutlined />} onClick={() => add()} />
                </Form.Item> */}
                <Row style={{ width: '100%' }}>
                  <Row style={{ width: '100%', height: 70 }} className="row">
                    <Col xl={{ span: 8 }} xs={{ span: 10 }} className="column">
                      <Form.Item
                        name={'itemCategory'}
                        label={<h3>Item Category</h3>}
                        rules={[{ required: true, message: 'Select Category' }]}
                        style={{ marginRight: 0, width: '100%' }}
                      >
                        <AntSelectDynamic
                          fieldValue="Id"
                          optionFilterProp="children"
                          showSearch
                          isError={isError}
                          isLoading={isLoading}
                          className="select"
                          placeholder="Select item Category"
                          allowClear
                          fieldLabel="CategoryDescription"
                          name="itemCategory"
                          style={{
                            width: '100%',
                            background: '#ffff',
                          }}
                          data={itemCategory?.data?.Data?.Result}
                        />
                      </Form.Item>
                      <Form.Item style={{ marginTop: 30, marginRight: 10 }}>
                        <ItemCategory />
                      </Form.Item>
                    </Col>

                    <Col xl={{ span: 6 }} xs={{ span: 10 }} className="column">
                      <Form.Item
                        // {...restField}
                        name={'itemType'}
                        label={<h3>Item Type</h3>}
                        rules={[{ required: true, message: 'Select Type' }]}
                        style={{ width: '100%' }}
                      >
                        <AntSelectDynamic
                          fieldValue="Id"
                          isError={isitemError}
                          isLoading={isitemLoading}
                          optionFilterProp="children"
                          showSearch
                          className="select"
                          placeholder="Select Item Type"
                          allowClear
                          fieldLabel="TypeDescription"
                          name="itemType"
                          style={{ width: '100%', marginRight: 10, background: '#ffff' }}
                          data={itemType?.data?.Data?.Result}
                        />
                      </Form.Item>
                      <Form.Item style={{ marginTop: 30, marginRight: 10 }}>
                        <ItemType></ItemType>
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 7 }} xs={{ span: 20 }} className="column">
                      <Form.Item
                        // {...restField}
                        name={'itemClass'}
                        label={<h3>Item Class</h3>}
                        rules={[{ required: true, message: 'Select Class' }]}
                        style={{ width: '100%' }}
                      >
                        <AntSelectDynamic
                          fieldValue="ClassId"
                          isError={isErrorClass}
                          isLoading={isLoadingClass}
                          optionFilterProp="children"
                          showSearch
                          className="select"
                          placeholder="Select Class"
                          allowClear
                          fieldLabel="ClassDescription"
                          name="itemClass"
                          style={{ width: '100%', marginRight: 10, background: '#ffff' }}
                          data={itemClass?.data?.Data?.Result}
                        />
                      </Form.Item>
                      <Form.Item style={{ marginTop: 30, marginRight: 10 }}>
                        <AntButton label={''} icon={<PlusOutlined />} onClick={() => add()} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={{ width: '100%', height: 70 }} className="row">
                    <Col xl={{ span: 4 }} sm={{ span: 10 }}>
                      <Form.Item
                        // {...restField}
                        name={'itemCode'}
                        label={<h3>Item Code</h3>}
                        // rules={[{ required: true, message: 'Enter Code' }]}
                        style={{ marginRight: 10 }}
                      >
                        <AntInput
                          name="itemCode"
                          inputProps={{ type: 'number' }}
                          className="input"
                          style={{ width: '100%', border: '1px dashed blue' }}
                          data={map(itemCode?.data?.Data?.Result, (item) => item.ItemCode)}
                          readOnly
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 5 }} sm={{ span: 10 }}>
                      <Form.Item
                        // {...restField}
                        name={'itemName'}
                        label={<h3>Item Name</h3>}
                        rules={[{ required: true, message: 'Enter Name' }]}
                        style={{ marginRight: 10 }}
                      >
                        <AntInput
                          name="itemName"
                          inputProps={{ type: 'text' }}
                          className="input"
                          style={{ width: '100%' }}
                          value={baseUomData}
                        />
                      </Form.Item>
                    </Col>{' '}
                    <Col xl={{ span: 6 }} sm={{ span: 10 }}>
                      <Form.Item
                        // {...restField}
                        name={'itemOtherName'}
                        label={<h3>Item Other Name</h3>}
                        rules={[{ required: true, message: 'Enter Name' }]}
                        style={{ marginRight: 10 }}
                      >
                        <AntInput
                          name="itemOtherName"
                          inputProps={{ type: 'text' }}
                          className="input"
                          style={{ width: '100%' }}
                          value={baseUomData}
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6 }} sm={{ span: 10 }}>
                      <Form.Item
                        name={'ItemSpecificatiom'}
                        label={<h3>Item Specification</h3>}
                        style={{ marginRight: 10 }}
                      >
                        <TextArea style={{ height: 10 }}></TextArea>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={{ width: '100%', height: 70, marginTop: 20 }} className="row">
                    <Col xl={{ span: 6 }} xs={{ span: 10 }} className="column">
                      <Form.Item
                        // {...restField}
                        name={'packUnit'}
                        label={<h3>Base Pack Unit</h3>}
                        rules={[{ required: true, message: '' }]}
                        style={{ width: '90%' }}
                      >
                        <AntSelectDynamic
                          fieldValue="Id"
                          isError={isErrorUom}
                          isLoading={isLoadingUom}
                          optionFilterProp="children"
                          showSearch
                          className="select"
                          placeholder="Select Rate UOM"
                          allowClear
                          fieldLabel="UOMDescription"
                          name="packUnit"
                          style={{ width: '100%', marginRight: 250, background: '#ffff' }}
                          data={itemUom?.data?.Data?.Result}
                        />
                      </Form.Item>
                      <Form.Item style={{ marginTop: 30, marginRight: 15 }}>
                        <AntButton label={''} icon={<PlusOutlined />} onClick={() => add()} />
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6 }} xs={{ span: 10 }}>
                      <Form.Item
                        // {...restField}
                        name={'rateUom'}
                        label={<h3>Base Rate UOM</h3>}
                        rules={[{ required: true, message: 'Select Rate' }]}
                        style={{ marginRight: 10, marginLeft: 10 }}
                      >
                        <AntSelectDynamic
                          fieldValue="Id"
                          isError={isErrorUom}
                          isLoading={isLoadingUom}
                          optionFilterProp="children"
                          showSearch
                          className="select"
                          placeholder="Select Rate UOM"
                          allowClear
                          fieldLabel="UOMDescription"
                          name="rateUom"
                          style={{ width: '100%', marginRight: 250, background: '#ffff' }}
                          data={itemUom?.data?.Data?.Result}
                        />
                      </Form.Item>
                    </Col>

                    <Col xl={{ span: 4 }} xs={{ span: 10 }}>
                      <Form.Item
                        // {...restField}
                        name={'SaleRate'}
                        label={<h3>Whole Sale Rate</h3>}
                        rules={[{ required: true, message: 'Enter Rate here' }]}
                        style={{ marginRight: 10 }}
                      >
                        <AntInput
                          name="SaleRate"
                          inputProps={{ type: '' }}
                          className="input"
                          style={{ width: '100%' }}
                          // data={map(data?.data?.Data?.Result, (item) => item.ItemUomId)}
                          value={baseUomData}
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 5 }} xs={{ span: 10 }}>
                      <Form.Item
                        // {...restField}
                        name={'Barcode'}
                        label={<h3>Barcode No</h3>}
                        rules={[{ required: true, message: 'Enter Barcode Number' }]}
                        style={{ marginRight: 10 }}
                      >
                        <AntInput
                          name="Barcode"
                          inputProps={{ type: 'number' }}
                          className="input"
                          style={{ width: '100%' }}
                          // data={map(data?.data?.Data?.Result, (item) => item.ItemUomId)}
                          value={baseUomData}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={{ width: '100%', height: 60, marginTop: 10 }} className="row">
                    <Col xl={{ span: 7 }} xs={{ span: 10 }} className="column">
                      <Form.Item
                        // {...restField}
                        name={'InventoryAccountTitle'}
                        label={<h3>Purchase GL A/C</h3>}
                        rules={[{ required: true, message: 'Select Purchase GL A/C ' }]}
                        style={{ width: '100%' }}
                      >
                        <AntSelectDynamic
                          fieldValue="Id"
                          optionFilterProp="children"
                          showSearch
                          className="select"
                          placeholder="Purchase Account"
                          allowClear
                          fieldLabel="InventoryAccountTitle"
                          name="InventoryAccountTitle"
                          style={{ width: '100%', background: '#ffff' }}
                          data={itemCategory?.data?.Data?.Result}
                        />
                      </Form.Item>
                      <Form.Item style={{ marginTop: 30, marginRight: 10 }}>
                        <AntButton label={''} icon={<PlusOutlined />} onClick={() => add()} />
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6 }} xs={{ span: 10 }} className="column">
                      <Form.Item
                        // {...restField}
                        name={'RevenueAccountTitle'}
                        label={<h3>Sale GL A/C</h3>}
                        rules={[{ required: true, message: 'Select Sale GL A/C' }]}
                        style={{ width: '100%' }}
                      >
                        <AntSelectDynamic
                          fieldValue="Id"
                          optionFilterProp="children"
                          showSearch
                          className="select"
                          placeholder="Sale Account"
                          allowClear
                          fieldLabel="RevenueAccountTitle"
                          name="RevenueAccountTitle"
                          style={{ width: '100%' }}
                          data={itemCategory?.data?.Data?.Result}
                        />
                      </Form.Item>
                      <Form.Item style={{ marginTop: 30, marginRight: 10 }}>
                        <AntButton label={''} icon={<PlusOutlined />} onClick={() => add()} />
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 7 }} xs={{ span: 10 }} className="column">
                      <Form.Item
                        // {...restField}
                        name={'CGSAccountTitle'}
                        label={<h3>CGS GL A/C</h3>}
                        rules={[{ required: true, message: 'Select CGS GL A/C' }]}
                        style={{ width: '100%' }}
                      >
                        <AntSelectDynamic
                          fieldValue="Id"
                          optionFilterProp="children"
                          showSearch
                          className="select"
                          placeholder="CGS Account Title"
                          allowClear
                          fieldLabel="CGSAccountTitle"
                          name="CGSAccountTitle"
                          style={{ width: '100%', marginRight: 200, background: '#ffff' }}
                          data={itemCategory?.data?.Data?.Result}
                        />
                      </Form.Item>
                      <Form.Item style={{ marginTop: 30, marginRight: 10 }}>
                        <AntButton label={''} icon={<PlusOutlined />} onClick={() => add()} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Col span={22}>
                    <Form.Item
                      name={'status'}
                      label={<h3>Is Active</h3>}
                      style={{ marginRight: 10, marginTop: 15 }}
                    >
                      <Checkbox style={{ position: 'absolute', top: -25, left: 70 }} />
                    </Form.Item>
                    <Form.Item
                      name={'CompName'}
                      label={<h3>Select Companies</h3>}
                      style={{ marginRight: 10, marginTop: -30 }}
                    >
                      <AntSelectDynamic
                        fieldValue="Id"
                        optionFilterProp="children"
                        showSearch
                        className="select"
                        placeholder="Select Companies"
                        allowClear
                        fieldLabel="CompName"
                        name="CompName"
                        style={{ width: '100%', marginLeft: 0, background: '#ffff' }}
                        data={getCompanies?.data?.Data?.Result}
                      />
                    </Form.Item>
                    <Row>
                      <Form.Item
                        name={'amount'}
                        label={<h3>Product Image</h3>}
                        //   rules={[{ required: true, message: 'Missing last name' }]}
                        style={{ marginRight: 10 }}
                      >
                        <img
                          src={localStorage.getItem('img') ? localStorage.getItem('img') : image}
                          alt=""
                          style={{ border: '1px solid gray', borderRadius: 10 }}
                          height={200}
                          width={250}
                        />
                        <AntInput
                          type="file"
                          // accept="image/*"

                          name="file"
                          onChange={handleImage}
                          style={{ width: 250 }}
                        />
                      </Form.Item>
                      <Form.Item
                        name={'amount'}
                        label={<h3>Barcode Image</h3>}
                        // rules={[{ required: true, message: '!!' }]}
                        style={{ marginRight: 10 }}
                      >
                        <AntInput
                          type="image"
                          accept="image/*"
                          name="file"
                          // onChange={handleImage}
                          style={{ display: '', width: 250, height: 50 }}
                          // ref={(input) => input && input.setAttribute('multiple', 'false')}
                        />
                      </Form.Item>
                    </Row>
                  </Col>
                </Row>
                <Form.Item>
                  <AntButton
                    label={'Save'}
                    icon={<FileAddOutlined />}
                    htmlType="submit"
                    style={{ marginRight: 10 }}
                  ></AntButton>
                  <AntButton label={'Close'} icon={<CloseOutlined />} htmlType="submit"></AntButton>
                </Form.Item>
              </Card>
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
}

export default FormFile;
