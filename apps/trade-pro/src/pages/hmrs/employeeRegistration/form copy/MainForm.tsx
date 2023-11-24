import { Checkbox, Col, Form, FormInstance, Row } from 'antd';
import { useState } from 'react';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import UploadPictures, { UploadEmployeeSignature } from './UploadPictures';
import EmployeeCategory from './lookUpForms/EmployeeCategory';
// import { useGetDeliveryTerms, useGetSuppliersforGRN, useGetTransporters, useGetVehicleType } from '../queryOptions';

function MainForm({ form }: TDynamicForm) {
  const { t } = useTranslation();

  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };
  return (
    <Row gutter={6} justify={'space-around'} style={{ marginTop: 10 }}>
      <Col xl={12} xs={24}>
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xxl={11} xl={11} sm={11} md={12} xs={24}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} sm={22} md={22} xs={22} className="formfield">
                <AntSelectDynamic
                  required
                  bordered={false}
                  fieldValue="Id"
                  label={t('title')}
                  name="SupplierCustomerId"
                  fieldLabel="CompanyName"
                  style={{ width: '100%' }}
                  // query={useGetSuppliersforGRN}
                />
              </Col>
              <Col xxl={2} xl={2} lg={2} md={2} xs={2}>
                <EmployeeCategory />
              </Col>
            </Row>
          </Col>
          <Col xxl={12} xl={12} sm={13} xs={24} md={12}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} md={22} sm={22} xs={22} className="formfield">
                <AntSelectDynamic
                  required
                  bordered={false}
                  fieldValue="Id"
                  label={t('employee_catagory')}
                  name="SupplierCustomerId"
                  fieldLabel="CompanyName"
                  style={{ width: '100%' }}
                  // query={useGetSuppliersforGRN}
                />
              </Col>
              <Col xxl={2} xl={2} lg={2} md={2} xs={2}>
                <EmployeeCategory />
              </Col>
            </Row>
            {/* <Form.Item style={{ marginTop: 0, marginRight: 15 }}>
            
            </Form.Item> */}
          </Col>
          <Col xl={11} lg={11} md={11} sm={11} xs={22} className="formfield">
            <AntDatePicker bordered={false} name="DocDate" label={t('date_of_birth')} />

            {/* <AntSelectDynamic
              required
              bordered={false}
              name="DeliveryTermId"
              label={t('first_name')}
              fieldValue="Id"
              fieldLabel="type"
              style={{ marginLeft: 10, width: '95%' }}
              // query={useGetDeliveryTerms}
            /> */}
          </Col>
          <Col xxl={12} xl={12} sm={12} xs={24} md={12}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} md={22} sm={22} xs={22} className="formfield">
                <AntSelectDynamic
                  required
                  bordered={false}
                  name="CommisionType"
                  label={t('gender')}
                  fieldValue="Id"
                  fieldLabel="VehicleDescription"
                  // query={useGetVehicleType}
                  style={{ marginLeft: 18, width: '92%' }}
                />
              </Col>
              <Col xxl={2} xl={2} lg={2} md={2} xs={2}>
                <EmployeeCategory />
              </Col>
            </Row>
          </Col>
          <Col xl={11} sm={11} xs={22} className="formfield">
            <AntInput bordered={false} name="RemarksHeader" label={t('first_name')} style={{ marginLeft: 40 }} />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={22} className="formfield">
            <AntInput bordered={false} name="RemarksHeader" label={t('middle_name')} style={{ marginLeft: 40 }} />
          </Col>

          <Col xl={11} lg={11} md={11} sm={11} xs={22} className="formfield">
            <AntInput bordered={false} name="RemarksHeader" label={t('last_name')} style={{ marginLeft: 40 }} />
          </Col>
          <Col xl={12} sm={12} xs={22} style={{ marginLeft: 0 }} className="formfield">
            <AntInput bordered={false} name="RemarksHeader" label={t('email')} style={{ marginLeft: 40 }} />
          </Col>
          <Col xl={11} lg={11} md={11} sm={11} xs={22} style={{ marginLeft: 0 }} className="formfield">
            <AntInput required bordered={false} name="RemarksHeader" label={t('mobile_1')} style={{ marginLeft: 40 }} />
          </Col>
          <Col xl={12} sm={12} xs={22} style={{ marginLeft: 0 }} className="formfield">
            <AntInput bordered={false} name="RemarksHeader" label={t('mobile_2')} style={{ marginLeft: 40 }} />
          </Col>
        </Row>
      </Col>
      <Col xl={11} xs={24}>
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xl={12} xxl={12} sm={11} md={12} xs={24}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} sm={22} md={22} xs={22} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  name="RateUOM"
                  label={t('relation_title')}
                  fieldValue="Id"
                  fieldLabel="VehicleDescription"
                  // query={useGetVehicleType}
                  style={{ marginLeft: 18, width: '92%' }}
                />
              </Col>
              <Col xxl={2} xl={2} lg={2} md={2} xs={2}>
                <EmployeeCategory />
              </Col>
            </Row>
          </Col>
          <Col xl={11} md={11} lg={11} sm={11} xs={22} className="formfield">
            <AntInputNumber bordered={false} name="DueDays" label={t('relation_name')} />
          </Col>

          <Col xl={12} xxl={12} sm={11} md={12} xs={24}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} sm={22} md={22} xs={22} className="formfield">
                <AntSelectDynamic
                  required
                  bordered={false}
                  name="RateUOM"
                  label={t('nationality')}
                  fieldValue="Id"
                  fieldLabel="VehicleDescription"
                  // query={useGetVehicleType}
                  style={{ marginLeft: 18, width: '92%' }}
                />
              </Col>
              <Col xxl={2} xl={2} lg={2} md={2} xs={2}>
                <EmployeeCategory />
              </Col>
            </Row>
          </Col>
          <Col xl={11} md={11} lg={11} sm={11} xs={22} className="formfield">
            <AntInputNumber
              bordered={false}
              name="Amount"
              label={t('passport_no')}
              style={{ marginLeft: 15, width: '95%' }}
            />
          </Col>
          <Col xl={12} xxl={12} sm={11} md={12} xs={24}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} sm={22} md={22} xs={22} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  name="RateUOM"
                  label={t('blood_group')}
                  fieldValue="Id"
                  fieldLabel="VehicleDescription"
                  // query={useGetVehicleType}
                  style={{ marginLeft: 18, width: '92%' }}
                />
              </Col>
              <Col xxl={2} xl={2} lg={2} md={2} xs={2}>
                <EmployeeCategory />
              </Col>
            </Row>
          </Col>
          <Col xl={11} md={11} lg={11} sm={11} xs={22} className="formfield">
            <AntInputNumber
              required
              bordered={false}
              name="BillNo"
              label={t('cnic')}
              style={{ marginLeft: 4, width: '100%' }}
            />
          </Col>
          <Col xl={12} xxl={12} sm={11} md={12} xs={24} className="formfield">
            <AntInputNumber bordered={false} name="DueDays" label={t('relation_mobile_no')} />
          </Col>
          <Col xl={11} xxl={11} sm={11} md={11} xs={24} className="formfield">
            <AntInputNumber
              bordered={false}
              name="Amount"
              label={t('license_no')}
              style={{ marginLeft: 15, width: '95%' }}
            />
          </Col>
          <Col xl={12} xxl={12} sm={11} md={12} xs={24} className="formfield">
            <AntDatePicker bordered={false} name="DocDate" label={t('cnic_issue_date')} />
          </Col>
          <Col xl={11} md={11} lg={11} sm={11} xs={22} className="formfield">
            <AntDatePicker bordered={false} name="DocDate" label={t('cnic_expiry_date')} />
          </Col>
        </Row>
      </Col>
      <Col xxl={23} xl={23} xs={24}>
        <Row gutter={10} justify={'space-evenly'}>
          <Col xxl={12} xl={12}>
            <UploadPictures />{' '}
          </Col>
          <Col xxl={10} xl={12}>
            <UploadEmployeeSignature />{' '}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
type TDynamicForm = { form: FormInstance };

export default MainForm;
