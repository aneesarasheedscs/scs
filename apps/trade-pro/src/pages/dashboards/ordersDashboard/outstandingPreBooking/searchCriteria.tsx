
import { Card, Col, Form, Row, theme } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Tfilter } from "../types";

import dayjs from 'dayjs'
import { storedFinancialYear } from "@tradePro/utils/storageService";
import { AntButton, AntDatePicker } from "@tradePro/components";
import { CriteriaRowGutter } from "@tradePro/globalAtoms";


const { useToken } = theme;
const { useForm, useWatch } = Form;

const financialYear = storedFinancialYear()

const FromDate = dayjs(financialYear?.Start_Period);
const ToDate = dayjs(financialYear?.End_Period)

function  SearchCriteria (){
    const {t} = useTranslation()

    const [form] = useForm<Tfilter>();
    const formValues = useWatch<Tfilter>([], form);

    const {token:{colorPrimary}} = theme.useToken()

    const onFinish = (_: Tfilter) => {
        // setformState(form.getFieldsValue());
      };
    return(
        <>
   
      <Row justify={'space-around'}>
        <Col xxl={23} xl={23} sm={23} xs={23} lg={23}>
          <Card>
            <Form

              form={form}
              initialValues={{FromDate,ToDate}}
              onFinish={onFinish}
            >
        

              <Col xxl={10} xl={14} lg={15}md={5} xs={24} >
                <Row gutter={CriteriaRowGutter} justify={'space-between'}>
             
                  <Col xxl={9} xl={10} xs={12} md={6} lg={8} className="formfield">
                    <AntDatePicker
                      placeholder=""
                      name="FromDate"
                      bordered={false}
                      label={t('from_date')}
               
                    />
                  </Col>
                  <Col xxl={9} xl={8} xs={11} md={6} lg={7} className="formfield">
                    <AntDatePicker
                      name="ToDate"
                      bordered={false}
                      label={t('to_date')}
                      placeholder=""
                  
                    />
                  </Col>
            
                  <Col xxl={4} xl={4} sm={6} lg={4}>
                    <AntButton
                      label={t('show')}
                      htmlType="submit"
                    //   isError={isActivitySummaryError}
                    //   isLoading={isActivitySummaryLoading || isFetching}
                    />
                  </Col>
                </Row>
              </Col>
            </Form>
          </Card>
        </Col>
      </Row>
        </>
    )
}
export default SearchCriteria