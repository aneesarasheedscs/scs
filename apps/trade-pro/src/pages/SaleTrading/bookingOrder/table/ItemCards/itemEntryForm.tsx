import { AntButton, AntDatePicker, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';
import { Col, Form, FormInstance, Row, theme } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterFilled } from '@ant-design/icons';
import { PlusOutlined, FullscreenOutlined, CloseOutlined, MinusOutlined, SyncOutlined } from '@ant-design/icons';

import _, { map } from 'lodash';
import { useGetItemWithPackUom } from '../../queries';
import { TPreBookingOrderDetailList } from '../../type';

const { useToken } = theme;
const { useForm, useWatch } = Form;

const ItemEntryForm = ({ setSelectedItem, selectedItem }: TAddItem) => {
  const { t } = useTranslation();
  const [form] = useForm<TPreBookingOrderDetailList>();
  const formValues = useWatch<TPreBookingOrderDetailList>([], form);
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const TotalItems = selectedItem?.length;
  const qty  = _.sumBy(selectedItem, 'OrderItemQty')
  const totalAmount =  _.sumBy(selectedItem, 'TotalAmount')
  // const { data, isLoading, isSuccess } = useGetItemWithPackUom();
  // const ItemWithPackUom = data?.data?.Data?.Result

  // const ItemName = data?.data?.Data?.Result?.[0]?.ItemNames
  // const itemNames = data?.data?.Data?.Result?.map(item => item.ItemName);

  // console.log(itemNames,'itemName')
  // const fillteredItemName = ItemWithPackUom?.filter((item: any) => item.TranType === 'Receipts');
console.log(selectedItem)
  // console.log(ItemWithPackUom,'filterItem')
  const [itemPrice, setItemPrice] = useState<number>();

  const { data, isLoading, isSuccess, refetch } = useGetItemWithPackUom();

  type TItemObj = {
    PackUom: string;
    RateUom: string;
  };
  type TFormValues = {
    ItemName: string;
    PackUom: string;
    Qty: number;
    RateUom: string;
    ItemPrice: number;
    Amount: number;
  };

  const onFinish = (values: TPreBookingOrderDetailList) => {
    setSelectedItem([...selectedItem, values]);
    console.log(values, 'vvvvvvvvvvvv');

    form.resetFields();
    // form.setFieldValue(['SaleOrderDetailList', 0, 'ItemName'], null);
  };

  const handleItemNameChange = (value: TItemObj) => {
    console.log(value, 'val');
    const selectedAccount = data?.data?.Data?.Result?.find((item: any) => item.ItemId === value);
    if (selectedAccount) {
      const itemPackUom = selectedAccount.PackUom;
      const itemRateUom = selectedAccount.PackUom;

      const ItemTitle = selectedAccount.ItemName;
      const ItemTitlePrice = selectedAccount.ItemPrice;
      setItemPrice(ItemTitlePrice);

      // setItemName(accountTitle);
      form.setFieldValue('PackUom', itemPackUom);
      form.setFieldValue('RateUom', itemRateUom);

      form.setFieldValue('ItemName', ItemTitle);
      form.setFieldValue('ItemPrice', ItemTitlePrice);
    }
  };

  const handleQuantityChange = (value: number | null | any) => {
    if (value && itemPrice) {
      const amount = value * itemPrice;
      form.setFieldValue('Amount', amount);
      form.setFieldValue('TotalAmount', amount);
    }
  };
  return (
    <>
      <Row>
        <Col
          xxl={24}
          xl={24}
          sm={24}
          xs={24}
          lg={24}
          className="ItemCriteriaStyle"
          style={{ paddingBottom: 5, paddingTop: 5 }}
        >
          <Form
            form={form}
            // initialValues={{FromDate,ToDate}}
            onFinish={onFinish}
          >
            <Col>
              <Row justify={'space-between'}>
                <Col xs={24} sm={12} md={12} xxl={6} className="formfield">
                  <AntSelectDynamic
                    bordered={false}
                    label={t('')}
                    placeholder={'select item'}
                    name="OrderItemId"
                    fieldLabel="ItemName"
                    fieldValue="ItemId"
                    query={useGetItemWithPackUom}
                    onSelect={(obj) => handleItemNameChange(obj)}
                  />
                </Col>
                <Col xs={24} sm={12} md={12} xxl={4} className="formfield">
                  <AntInputNumber name="PackUom" label={t('pack')} bordered={false} />
                  <AntInputNumber name="ItemName" label={t('')} bordered={false} style={{ display: 'none' }} />
                  <AntInputNumber name="ItemPrice" label={t('')} bordered={false} style={{ display: 'none' }} />
                  <AntInputNumber name="TotalAmount" label={t('')} bordered={false} style={{ display: 'none' }} />
                </Col>
                <Col xs={24} sm={12} md={12} xxl={3} className="formfield">
                  <AntInputNumber
                    name="OrderItemQty"
                    label={t('qty')}
                    bordered={false}
                    onChange={(value) => handleQuantityChange(value)}
                  />
                </Col>
                <Col xs={24} sm={12} md={12} xxl={4} className="formfield">
                  <AntInputNumber name="RateUom" label={t('rate')} bordered={false} />
                </Col>
                <Col xs={24} sm={12} md={12} xxl={4} className="formfield">
                  <AntInputNumber name="Amount" label={t('amount')} bordered={false} />
                </Col>

                <Col xs={24} sm={12} md={12} xxl={1}>
                  <AntButton onClick={() => onFinish(formValues)} icon={<PlusOutlined />} />
                </Col>
              </Row>
            </Col>
          </Form>
        </Col>
      </Row>
      <Row justify={'space-between'} style={{ border: '1px solid ', padding: 4 }}>
          <Col xxl={11} lg={14} style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <Col>
              <h5>
                Qty: <span style={{ background: 'lightgrey', borderRadius: 10, padding: 3 }}>{ qty ? qty : 0 } </span>
              </h5>
            </Col>
            <Col>
              <h5>
                Item: <span style={{ background: 'lightgrey', borderRadius: 10, padding: 3 }}>{TotalItems}</span>
              </h5>
            </Col>
            <Col>
              <h5>
                Discount: <span style={{ background: 'lightgrey', borderRadius: 10, padding: 3 }}>000.0</span>
              </h5>
            </Col>
            <Col>
              <h5>
                Total: <span style={{ background: 'lightgrey', borderRadius: 10, padding: 3 }}>{totalAmount ? totalAmount : 0}</span>
              </h5>
            </Col>
          </Col>
          <Col style={{ display: 'flex', justifyContent: 'end', padding: 0, color: 'green' }}>
            <Row gutter={[10, 16]}>
              <Col>
                <AntButton icon={<SyncOutlined />} />
              </Col>
              <Col>
                <AntButton icon={<FullscreenOutlined />} />
              </Col>
            </Row>
          </Col>
        </Row>
    </>
  );
};

export default ItemEntryForm;

interface TAddItem {
  setSelectedItem: (ary: any[]) => void;
  selectedItem: any[];
}
