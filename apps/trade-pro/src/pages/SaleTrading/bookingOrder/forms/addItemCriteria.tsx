import { AntButton, AntDatePicker, AntInputNumber, AntSelectDynamic } from "@tradePro/components";
import { CriteriaRowGutter } from "@tradePro/globalAtoms";
import { Col, Form, FormInstance, Row, theme } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import {
    FilterFilled 
  } from '@ant-design/icons';

  const {useToken} = theme
const AddItemCriteria =({form}:TAddItem)=>{
    const {t} =useTranslation()
    const {token:{colorPrimary}} = theme.useToken()

    return(
        <>
          <Row justify={'space-around'} >
        <Col xxl={24} xl={23} sm={23} xs={23} lg={23} className="ItemCriteriaStyle" style={{padding:10}}>
          
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
              label={t('store_name')}
              name="ItemClassGroup"
              fieldLabel="Name"
              fieldValue="Id"
            //   options={filteredItemClassGroups}
              // options={map(status, (item: any) => ({
              //   value: item.Id,
              //   label: item.Name,
              // }))}
            />
          </Col>
          <Col xs={24} sm={12} md={12} xxl={5} className="formfield">
          <AntInputNumber name="qty" label={t('qty')} bordered={false} />
            </Col>
            <Col xs={24} sm={12} md={12} xxl={8} className="formfield" >
            <AntSelectDynamic
              bordered={false}
              label={t('select_item')}
              name="ItemClassGroup"
              fieldLabel="Name"
              fieldValue="Id"
            //   options={filteredItemClassGroups}
              // options={map(status, (item: any) => ({
              //   value: item.Id,
              //   label: item.Name,
              // }))}
            />
          </Col>

          <Col>
          <Col xs={24} sm={12} md={12} xxl={2}  >
      <AntButton ghost icon={<>    <FilterFilled style={{fontWeight:"bold",fontSize:25,}}/></>}/>
          </Col>
          </Col>
 </Row>
 </Col>
 
            </Form>
          
        </Col>
      </Row>
        </>
    )
}
export default AddItemCriteria
type TAddItem = {form:FormInstance}