import { Col, Row, Card, Form } from 'antd';
import { AntButton, AntDatePicker } from '@scs/ui';
import { AntSelectDynamic } from '@scs/ui';
import { useTranslation } from 'react-i18next';
import { useGetDateType, useGetAccountDashboardData, useGetCompanies } from './queries';
import AccountDashboardCards from './AccountDashboardCards ';
import dayjs from 'dayjs';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TAccountDashboardCriteria } from './types';
import './style.scss';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import { ArrowRightOutlined, SyncOutlined } from '@ant-design/icons';

const { useForm, useWatch } = Form;
const AccountDashboard: React.FC<{ FromDateProp?: Date; ToDateProp?: Date; CompanyId?: number }> = (props) => {
  const { FromDateProp, ToDateProp, CompanyId } = props;
  const [form] = useForm<TAccountDashboardCriteria>();

  const formvalues = useWatch<TAccountDashboardCriteria>([], form);
  const { t } = useTranslation();

  const { setFieldValue, getFieldValue } = form;
  const {
    data,
    isError: isError,
    isLoading: isLoading,
    refetch,
  } = useGetAccountDashboardData(true, 1, form.getFieldsValue());
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isInputFocusedFromDate, setIsInputFocusedFromDate] = useState(false);
  const [isInputFocusedToDate, setIsInputFocusedToDate] = useState(false);
  const [isInputFocusedCompanyName, setIsInputFocusedCompanyName] = useState(false);

  const FinancialYear = storedFinancialYear();
  const UserDetail = storedUserDetail();

  const FromDate = dayjs(FinancialYear?.Start_Period);
  const ToDate = dayjs(FinancialYear?.End_Period);

  const onFinish = (_: TAccountDashboardCriteria) => {
    _.CompanyIds = _.CompanyIds?.toString();
    refetch();
  };
  const handleDateChange = (Id: number) => {
    let fromDate, toDate;
    if (Id == 1) {
      fromDate = dayjs(new Date()); // Current date
      toDate = dayjs(new Date()); // Current date
    } else if (Id == 2) {
      //Week
      const sevenDaysAgo = dayjs(new Date()).subtract(7, 'day').toDate();
      fromDate = sevenDaysAgo;
      toDate = dayjs(new Date()); // Current date
    } else if (Id == 3) {
      //Month
      fromDate = dayjs(new Date()).startOf('month').toDate();
      toDate = dayjs(new Date()).endOf('month').toDate();
    } else if (Id == 4) {
      //Year
      fromDate = dayjs().year(new Date().getFullYear()).startOf('year').toDate();
      toDate = dayjs().year(new Date().getFullYear()).endOf('year').toDate();
    } else if (Id == 5) {
      // Financial Year
      fromDate = FromDate;
      toDate = ToDate;
    }
    setFieldValue('FromDate', dayjs(fromDate));
    setFieldValue('ToDate', dayjs(toDate));
    setIsInputFocused(true);
  };
  const handleFromDateChange = () => {
    setIsInputFocusedFromDate(true);
  };
  const handleToDateChange = () => {
    setIsInputFocusedToDate(true);
  };

  const handleCompanyNameChange = () => {
    setIsInputFocusedCompanyName(true);
  };

  const DateType = form.getFieldValue('DateType');
  const FromDateSelect = form.getFieldValue('FromDate');
  const ToDateSelect = form.getFieldValue('ToDate');
  const CompanyNameSelect = form.getFieldValue('CompanyIds');

  useEffect(() => {
    if (FromDateProp !== undefined && ToDateProp !== undefined) {
      form.setFieldValue('FromDate', dayjs(FromDateProp));
      form.setFieldValue('ToDate', dayjs(ToDateProp));
    } else {
      setFieldValue('FromDate', FromDate);
      setFieldValue('ToDate', ToDate);
    }

    if (!DateType) {
      setIsInputFocused(true);
    }
    if (!FromDateSelect) {
      setIsInputFocusedFromDate(true);
    }
    if (!ToDateSelect) {
      setIsInputFocusedToDate(true);
    }
    if (!CompanyNameSelect) {
      setIsInputFocusedCompanyName(true);
    }
  }, [form, !DateType, !FromDateSelect, !ToDateSelect, !CompanyNameSelect]);

  const formHeading = {
    fontFamily: 'Times New Roman',
    // borderRadius: '5px',
    // padding: '5px',
    // boxShadow: '2px 4px 12px 1px lightgray',
    marginBottom: '7px',
    fontSize: '1.8rem',
  };

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Row>
        <Col
          xs={10}
          sm={10}
          md={12}
          lg={12}
          xl={14}
          xxl={16}
          style={{ display: 'flex', alignItems: 'center', alignContent: 'center', margin: '16px' }}
        >
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '10px' }}>{t('accounts_dashboard')}</h1>
        </Col>
      </Row>

      <Row justify={'space-around'}>
        <Col xxl={23} xs={23} sm={23} md={23} lg={23} xl={23}>
          <p className="media-query-forCard">
            <Card>
              <Form form={form} onFinish={onFinish}>
                <Row gutter={16} justify={'space-between'}>
                  <Col xl={8} xs={24} sm={23} md={8} lg={8} xxl={4} className="formfield form-container">
                    <p className={isInputFocused ? 'focused-label' : 'focused2'}>{t('date_type')}</p>
                    <AntSelectDynamic
                      className={isInputFocused ? 'focused2' : 'focused'}
                      bordered={false}
                      label=""
                      name="DateType"
                      fieldLabel="DateType"
                      fieldValue="Id"
                      query={useGetDateType}
                      onChange={(value) => handleDateChange(value)}
                    />
                  </Col>
                  <Col xl={8} xs={24} sm={12} md={8} lg={8} xxl={4} className="formfield form-container">
                    <p className={isInputFocusedFromDate ? 'focused-label' : 'focused2'}>{t('from_date')}</p>
                    <AntDatePicker
                      className={isInputFocusedFromDate ? 'focused2' : 'focused'}
                      name="FromDate"
                      bordered={false}
                      label={t('')}
                      placeholder=""
                      onChange={() => handleFromDateChange()}
                    />
                  </Col>
                  <Col xl={7} xs={24} sm={11} md={7} lg={7} xxl={4} className="formfield form-container">
                    <p className={isInputFocusedToDate ? 'focused-label' : 'focused2'}>{t('to_date')}</p>
                    <AntDatePicker
                      className={isInputFocusedToDate ? 'focused2' : 'focused'}
                      name="ToDate"
                      bordered={false}
                      label={t('')}
                      placeholder=""
                      onChange={() => handleToDateChange()}
                    />
                  </Col>
                  <Col xl={11} xs={24} sm={20} md={15} lg={14} xxl={6} className="formfield form-container">
                    <p className={isInputFocusedCompanyName ? 'focused-label' : 'focused2'}>{t('companyName')}</p>
                    <AntSelectDynamic
                      bordered={false}
                      mode={UserDetail?.IsHeadOffice ? 'multiple' : undefined}
                      disabled={UserDetail?.IsHeadOffice === false}
                      defaultValue={UserDetail?.IsHeadOffice == false ? UserDetail?.CompanyId : undefined}
                      // label={t('companyName')}
                      label={t('')}
                      name="CompanyIds"
                      fieldLabel="CompName"
                      fieldValue="Id"
                      query={useGetCompanies}
                      className={isInputFocusedCompanyName ? 'focused2' : 'focused'}
                      onChange={() => handleCompanyNameChange()}
                    />
                  </Col>

                  <Col xl={2} xs={6} sm={4} md={3} lg={4} xxl={2} className="btn-margin-top">
                    <AntButton label={t('show')} htmlType="submit" isError={isError} isLoading={isLoading} />
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={4} xl={2} className="btn-margin-top">
                    <AntButton
                      danger
                      ghost
                      htmlType="reset"
                      // onClick={() => {
                      // form.resetFields();
                      //   // setSelectedRows([]);
                      //   // setIsInputFocusedFromDate(false);
                      // }}
                      label={t('reset')}
                      icon={<SyncOutlined />}
                    />
                  </Col>
                </Row>
              </Form>
            </Card>
          </p>
        </Col>
      </Row>

      <Row justify={'center'}>
        <Col xxl={24} sm={24} md={24}>
          <AccountDashboardCards
            Data={data?.data?.Data?.Result}
            FromdateProp={getFieldValue('FromDate')}
            TodateProp={getFieldValue('ToDate')}
            Companies={form.getFieldValue('CompanyIds')?.toString()}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AccountDashboard;
