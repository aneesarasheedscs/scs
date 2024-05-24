import { AntButton, AntSelectDynamic } from '@tradePro/components';

import { Card, Col, Form, Row, theme } from 'antd';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterFilled } from '@ant-design/icons';
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
      <Row style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1 }}>
        <Col xxl={24} xl={24} lg={24} sm={24} md={24} xs={24} style={{ padding: 5 }}>
          <Card style={{ height: '7vh' }} className="cardHieght">
            <Col xxl={24} xl={23} sm={23} xs={23} lg={23} className="ItemCriteriaStyle" style={{ padding: 0 }}>
              <Form
                form={form}
                //   initialValues={{FromDate,ToDate}}
                //   onFinish={onFinish}
              >
                <Col>
                  <Row justify={'space-between'}>
                    <Col xs={24} sm={12} md={12} xxl={12} className="formfield">
                      <AntSelectDynamic
                        bordered={false}
                        label={t('select_item')}
                        name="ItemId"
                        fieldLabel="ItemName"
                        fieldValue="Id"
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
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default AddItemCriteria;
