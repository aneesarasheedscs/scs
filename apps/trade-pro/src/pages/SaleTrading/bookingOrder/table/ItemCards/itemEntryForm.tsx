import _ from 'lodash';
import { Col, Form, Row, notification, theme } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined, FullscreenOutlined, SyncOutlined } from '@ant-design/icons';
import { AntButton, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useGetItemWithPackUom } from '../../queries';
import { TPreBookingOrderDetailList } from '../../type';

const { useForm, useWatch } = Form;

const ItemEntryForm = ({ setSelectedItem, selectedItem }: TAddItem) => {
  const { t } = useTranslation();
  const [form] = useForm<TPreBookingOrderDetailList>();
  const formValues = useWatch<TPreBookingOrderDetailList>([], form);
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const TotalItems = selectedItem?.length;
  const qty = _.sumBy(selectedItem, 'OrderItemQty');
  const totalAmount = _.sumBy(selectedItem, 'TotalAmount');

  const [itemPrice, setItemPrice] = useState<number>();
  const { data, refetch } = useGetItemWithPackUom();

  type TItemObj = {
    PackUom: string;
    RateUom: string;
    ItemId: number;
    ItemName: string;
    ItemPrice: number;
    PackEquivalent: number;
    PackUomId: number;
    RateEquivalent: number;
    RateUomId: number;
    ScheduleId: number;
  };

  const onFinish = (values: TPreBookingOrderDetailList) => {
    if (!values.OrderItemQty) {
      notification.error({
        message: 'Error',
        description: 'Please Enter Quantity!',
      });
    } else {
      setSelectedItem([...selectedItem, values]);
      console.log(values, 'formValues');
      form.resetFields();
    }
  };

  const handleItemNameChange = (value: TItemObj) => {
    console.log(value, 'val');
    const selectedAccount = data?.data?.Data?.Result?.find((item: any) => item.ItemId === value);
    if (selectedAccount) {
      const itemPackUom = selectedAccount.PackUom;
      const itemRateUom = selectedAccount.RateUom;
      const OrderItemUOMId = selectedAccount?.PackUomId;
      const OrderItemRate = selectedAccount?.RateEquivalent;
      const OrderItemRateUOMId = selectedAccount?.RateUomId;
      const ItemTitle = selectedAccount.ItemName;
      const ItemTitlePrice = selectedAccount.ItemPrice;
      setItemPrice(ItemTitlePrice);

      form.setFieldValue('PackUom', itemPackUom);
      form.setFieldValue('RateUom', itemRateUom);
      form.setFieldValue('OrderItemUOMId', OrderItemUOMId);
      form.setFieldValue('OrderItemRate', OrderItemRate);
      form.setFieldValue('OrderItemRateUOMId', OrderItemRateUOMId);

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
          style={{ paddingBottom: 5, paddingTop: 5, border: '1px' }}
        >
          <Form form={form} onFinish={onFinish}>
            <Col>
              <Row justify={'space-between'}>
                <Col xs={24} sm={12} md={12} xxl={6} lg={12} className="formfield">
                  <AntSelectDynamic
                    required
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
                <Col xs={24} sm={11} md={11} xxl={4} lg={11} className="formfield">
                  <AntInputNumber name="PackUom" label={t('pack')} bordered={false} />
                  <AntInputNumber name="ItemName" label={t('')} bordered={false} style={{ display: 'none' }} />
                  <AntInputNumber name="ItemPrice" label={t('')} bordered={false} style={{ display: 'none' }} />
                  <AntInputNumber name="OrderItemUOMId" label={t('')} bordered={false} style={{ display: 'none' }} />
                  <AntInputNumber name="OrderItemRate" label={t('')} bordered={false} style={{ display: 'none' }} />
                  <AntInputNumber
                    name="OrderItemRateUOMId"
                    label={t('')}
                    bordered={false}
                    style={{ display: 'none' }}
                  />
                  <AntInputNumber name="TotalAmount" label={t('')} bordered={false} style={{ display: 'none' }} />
                </Col>
                <Col xs={24} sm={12} md={12} xxl={3} lg={12} className="formfield">
                  <AntInputNumber
                    name="OrderItemQty"
                    label={t('qty')}
                    bordered={false}
                    onChange={(value) => handleQuantityChange(value)}
                  />
                </Col>
                <Col xs={24} sm={11} md={11} xxl={4} lg={11} className="formfield">
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
      <Row justify={'space-between'} style={{ border: '1px solid  grey', padding: 4 }}>
        <Col
          xxl={11}
          lg={14}
          md={10}
          sm={13}
          xs={15}
          style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}
        >
          <Col>
            <h5>
              Qty: <span style={{ background: 'lightgrey', borderRadius: 5, padding: 3 }}>{qty ? qty : 0} </span>
            </h5>
          </Col>
          <Col>
            <h5>
              Item: <span style={{ background: 'lightgrey', borderRadius: 5, padding: 3 }}>{TotalItems}</span>
            </h5>
          </Col>
          <Col>
            <h5>
              Discount: <span style={{ background: 'lightgrey', borderRadius: 5, padding: 3 }}>0</span>
            </h5>
          </Col>
          <Col>
            <h5>
              Total:{' '}
              <span style={{ background: 'lightgrey', borderRadius: 5, padding: 3 }}>
                {totalAmount ? totalAmount : 0}
              </span>
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
