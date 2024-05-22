import { AntButton, AntDatePicker, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';
import { Col, Form, FormInstance, Row, theme } from 'antd';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterFilled } from '@ant-design/icons';
import { useGetSupplierCustomer } from '../queries';
import { map } from 'lodash';

const { useToken } = theme;
const { useForm, useWatch } = Form;

interface TFrom {
  ItemId: number;
}
interface TProps {
  data: any;
  setFilteredRecord: (data: any[]) => void;
}
const AddItemCriteria = ({ data, setFilteredRecord }: TProps) => {
  const { t } = useTranslation();
  const [form] = useForm<any>();
  const formValues = useWatch<any>([], form);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [itemName, setItemName] = useState('');
  const abc = form.getFieldValue('ItemId');
  console.log('Item', abc);

  const handleSelectItem = (value: number) => {
    const selectedAccount = data?.data?.Data?.Result?.find((item: any) => item.ItemId === value);
    if (selectedAccount) {
      const accountTitle = selectedAccount.ItemName;
      //here we are setting the item name we are selecting from the dropdown
      setItemName(accountTitle);
    }
  };

  console.log(itemName);
  const handleFiltereItems = () => {
    const filterdData = data?.data?.Data?.Result?.filter((item: any) => item.ItemName === itemName);
    setFilteredRecord(filterdData);
  };
  const ItemWithPackUom = data?.data?.Data?.Result;

  // const ItemName = data?.data?.Data?.Result?.[0]?.ItemName
  const itemNames = data?.data?.Data?.Result?.map((item: any) => item.ItemName);

  console.log(itemNames, 'itemName');
  // const fillteredItemName = ItemWithPackUom?.filter((item: any) => item.TranType === 'Receipts');

  console.log(ItemWithPackUom, 'filterItem');

  return (
    <>
      <Row justify={'space-around'}>
        <Col xxl={24} xl={23} sm={23} xs={23} lg={23} className="ItemCriteriaStyle" style={{ padding: 10 }}>
          <Form
            form={form}
            //   initialValues={{FromDate,ToDate}}
            //   onFinish={onFinish}
          >
            <Col>
              <Row justify={'space-between'}>
                <Col xs={24} sm={12} md={12} xxl={10} className="formfield">
                  <AntSelectDynamic
                    bordered={false}
                    label={t('store_name')}
                    name="CompanyName"
                    fieldLabel="CompanyName"
                    fieldValue="Id"
                    query={useGetSupplierCustomer}
                    //   options={filteredItemClassGroups}
                    // options={map(status, (item: any) => ({
                    //   value: item.Id,
                    //   label: item.Name,
                    // }))}
                  />
                </Col>
                <Col xs={24} sm={12} md={12} xxl={3} className="formfield">
                  <AntInputNumber name="qty" label={t('qty')} bordered={false} />
                </Col>
                <Col xs={24} sm={12} md={12} xxl={8} className="formfield">
                  <AntSelectDynamic
                    bordered={false}
                    label={t('select_item')}
                    name="ItemId"
                    fieldLabel="ItemName"
                    fieldValue="Id"
                    // options={itemNames}
                    options={map(data?.data?.Data?.Result, (item: any) => ({
                      value: item.ItemId,
                      label: item.ItemName,
                    }))}
                    onSelect={(value) => handleSelectItem(value)}
                  />
                </Col>

                <Col>
                  <Col xs={24} sm={12} md={12} xxl={2}>
                    <AntButton
                      onClick={handleFiltereItems}
                      ghost
                      icon={
                        <>
                          {' '}
                          <FilterFilled style={{ fontWeight: 'bold', fontSize: 25 }} />
                        </>
                      }
                    />
                  </Col>
                </Col>
              </Row>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default AddItemCriteria;
