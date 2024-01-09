import { Checkbox, Col, Form, FormInstance, Row } from 'antd';
import { useState } from 'react';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import EmployeeCategory from '../lookUpForms/EmployeeCategory';
import EmployeeDesignation from '../lookUpForms/EmployeeDesignation';
import EmployeeGroup from '../lookUpForms/EmployeeGroup';
import EmployeeShift from '../lookUpForms/EmployeeShift';
import DefineSection from '../lookUpForms/DefineSection';
import DefineDepartment from '../lookUpForms/Department';
import LocationName from '../lookUpForms/Location';
import DefineBenefits from '../lookUpForms/DefineBenifits';

function EmployeeRegistrationInformation({ form }: TDynamicForm) {
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
          <Col xl={12} md={12} sm={12} xs={22} className="formfield">
            <AntDatePicker bordered={false} name="DocDate" label={t('start_date')} />
          </Col>

          <Col xl={11} md={11} sm={12} xs={22} className="formfield">
            <AntDatePicker bordered={false} name="DocDate" label={t('end_date')} />
          </Col>

          <Col xl={12} lg={12} md={12} sm={11} xs={22} className="formfield">
            <AntDatePicker bordered={false} name="DocDate" label={t('probation_end_date')} />
          </Col>
          <Col xxl={11} xl={11} lg={11} sm={13} xs={24} md={11}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} md={22} sm={22} xs={22} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  fieldValue="Id"
                  label={t('section')}
                  name="SupplierCustomerId"
                  fieldLabel="CompanyName"
                  style={{ width: '100%' }}
                  // query={useGetSuppliersforGRN}
                />
              </Col>
              <Col xxl={2} xl={2} lg={2} md={2} xs={2}>
                <DefineSection />
              </Col>
            </Row>
          </Col>

          <Col xl={12} lg={12} md={12} sm={12} xs={22}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} md={22} sm={22} xs={22} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  name="CommisionType"
                  label={t('payable_ac')}
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

          <Col xxl={11} xl={11} lg={11} sm={12} xs={24} md={11}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} md={22} sm={22} xs={22} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  name="CommisionType"
                  label={t('expense_ac')}
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

          <Col xl={12} sm={12} xs={22} style={{ marginLeft: 0 }}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} md={22} sm={22} xs={22} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  name="CommisionType"
                  label={t('employee_type')}
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
          <Col xl={11} lg={11} md={11} sm={11} xs={22} style={{ marginLeft: 0 }}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} md={22} sm={22} xs={22} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  name="CommisionType"
                  label={t('emloyee_group')}
                  fieldValue="Id"
                  fieldLabel="VehicleDescription"
                  // query={useGetVehicleType}
                  style={{ marginLeft: 18, width: '92%' }}
                />
              </Col>
              <Col xxl={2} xl={2} lg={2} md={2} xs={2}>
                <EmployeeGroup />
              </Col>
            </Row>
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
                  label={t('designation')}
                  fieldValue="Id"
                  fieldLabel="VehicleDescription"
                  // query={useGetVehicleType}
                  style={{ marginLeft: 18, width: '92%' }}
                />
              </Col>

              <Col xxl={2} xl={2} lg={2} md={2} xs={2}>
                <EmployeeDesignation />
              </Col>
            </Row>
          </Col>
          <Col xl={11} xxl={11} lg={11} sm={11} md={11} xs={24}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} sm={22} md={22} xs={22} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  name="RateUOM"
                  label={t('department')}
                  fieldValue="Id"
                  fieldLabel="VehicleDescription"
                  // query={useGetVehicleType}
                  style={{ marginLeft: 18, width: '92%' }}
                />
              </Col>
              <Col xxl={2} xl={2} lg={2} md={2} xs={2}>
                <DefineDepartment />
              </Col>
            </Row>
          </Col>
          <Col xl={12} xxl={12} sm={11} md={12} xs={24}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} sm={22} md={22} xs={22} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  name="RateUOM"
                  label={t('reported_branch')}
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
          <Col xl={11} md={11} lg={11} sm={11} xs={22}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} md={22} sm={22} xs={22} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  name="CommisionType"
                  label={t('location')}
                  fieldValue="Id"
                  fieldLabel="VehicleDescription"
                  // query={useGetVehicleType}
                  style={{ marginLeft: 18, width: '92%' }}
                />
              </Col>
              <Col xxl={2} xl={2} lg={2} md={2} xs={2}>
                <LocationName />
              </Col>
            </Row>
          </Col>
          <Col xxl={12} xl={12} md={12} lg={12} sm={12} xs={22}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} md={22} sm={22} xs={22} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  name="CommisionType"
                  label={t('reported_person')}
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
          <Col xl={11} md={11} lg={11} sm={11} xs={22}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} md={22} sm={22} xs={22} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  name="CommisionType"
                  label={t('loan_account')}
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
          <Col xxl={12} xl={12} md={12} lg={12} sm={12} xs={22}>
            <Row gutter={10} justify={'space-between'}>
              <Col xxl={22} xl={22} lg={22} md={22} sm={22} xs={22} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  name="CommisionType"
                  label={t('shift_name')}
                  fieldValue="Id"
                  fieldLabel="VehicleDescription"
                  // query={useGetVehicleType}
                  style={{ marginLeft: 18, width: '92%' }}
                />
              </Col>
              <Col xxl={2} xl={2} lg={2} md={2} xs={2}>
                <EmployeeShift />
              </Col>
            </Row>
          </Col>
          <Col xl={11} xxl={11} sm={11} md={11} lg={11} xs={24} className="formfield">
            <AntInputNumber bordered={false} name="DueDays" label={t('total_salary')} />
          </Col>
          <Col xl={12} xxl={12} sm={12} md={12} lg={12} xs={24}>
            {/* <Row style={{ marginLeft: 10 }}>
              <Form.Item name="Status" valuePropName="checked" initialValue={false}>
                <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'Status')}>{t('is_active')}</Checkbox>
              </Form.Item>
            </Row> */}
          </Col>
          <Col xl={11} xxl={11} sm={11} md={11} lg={11} xs={24}>
            <Row style={{ marginLeft: 10 }}>
              <Form.Item name="Status" valuePropName="checked" initialValue={false}>
                <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'Status')}>{t('is_active')}</Checkbox>
              </Form.Item>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
type TDynamicForm = { form: FormInstance };

export default EmployeeRegistrationInformation;
