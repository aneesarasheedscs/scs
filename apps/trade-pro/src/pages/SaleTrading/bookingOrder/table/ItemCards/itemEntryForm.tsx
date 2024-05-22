import { AntButton, AntDatePicker, AntInputNumber, AntSelectDynamic } from "@tradePro/components";
import { CriteriaRowGutter } from "@tradePro/globalAtoms";
import { Col, Form, FormInstance, Row, theme } from "antd";
import { PlusOutlined,} from '@ant-design/icons';

import React from "react";
import { useTranslation } from "react-i18next";
import {
    FilterFilled 
  } from '@ant-design/icons';

import { map } from "lodash";

  const {useToken} = theme
  const { useForm, useWatch } = Form;




const ItemEntryForm = () =>{
    const {t} =useTranslation()
    const [form] = useForm<any>();
    const formValues = useWatch<any>([], form);
    const {token:{colorPrimary}} = theme.useToken()


// const ItemWithPackUom = data?.data?.Data?.Result

// const ItemName = data?.data?.Data?.Result?.[0]?.ItemName
// const itemNames = data?.data?.Data?.Result?.map(item => item.ItemName);

// console.log(itemNames,'itemName')
// const fillteredItemName = ItemWithPackUom?.filter((item: any) => item.TranType === 'Receipts');

// console.log(ItemWithPackUom,'filterItem')
    return(
        <>
                 <Row  >
        <Col xxl={24} xl={24} sm={24} xs={24} lg={24} className="ItemCriteriaStyle" style={{paddingBottom:5,paddingTop:5}}>
          
            <Form

              form={form}
            //   initialValues={{FromDate,ToDate}}
            //   onFinish={onFinish}
            >
        
 <Col>
 <Row justify={'space-between'}>
 <Col xs={24} sm={12} md={12} xxl={8} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('item_name')}
              name="CompanyName"
              fieldLabel="CompanyName"
              fieldValue="Id"
            //   query={useGetSupplierCustomer}
            //   options={filteredItemClassGroups}
              // options={map(status, (item: any) => ({
              //   value: item.Id,
              //   label: item.Name,
              // }))}
            />
          </Col>
          <Col xs={24} sm={12} md={12} xxl={3} className="formfield">
          <AntInputNumber name="" label={t('pack')} bordered={false} />
            </Col>
          <Col xs={24} sm={12} md={12} xxl={3} className="formfield">
          <AntInputNumber name="" label={t('qty')} bordered={false} />
            </Col>
          <Col xs={24} sm={12} md={12} xxl={3} className="formfield">
          <AntInputNumber name="" label={t('rate')} bordered={false} />
            </Col>
          <Col xs={24} sm={12} md={12} xxl={4} className="formfield">
          <AntInputNumber name="d" label={t('amount')} bordered={false} />
            </Col>

          <Col xs={24} sm={12} md={12} xxl={1} >
      <AntButton icon={<PlusOutlined />}  />
          </Col>
        
 </Row>
 </Col>
 
            </Form>
          
        </Col>
      </Row>
        </>
    )
}

export default ItemEntryForm