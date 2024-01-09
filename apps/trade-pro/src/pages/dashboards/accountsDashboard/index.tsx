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

const { useForm, useWatch } = Form;
function AccountDashboard() {
  const [form] = useForm<TAccountDashboardCriteria>();
  const formvalues = useWatch<TAccountDashboardCriteria>([], form);
  const { t } = useTranslation();

  const { setFieldValue, getFieldValue } = form;
  const {
    data,
    isError: isError,
    isLoading: isLoading,
    refetch,
  } = useGetAccountDashboardData(false, 1, form.getFieldsValue());

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
  };

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Row>
        <Col
          xs={12}
          sm={10}
          md={12}
          lg={6}
          xl={9}
          xxl={12}
          style={{ display: 'flex', alignItems: 'center', alignContent: 'center', margin: '16px' }}
        >
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '10px' }}>{t('account_dashboard')} </h1>
          <Col xs={8} sm={10} md={8} lg={20} xl={14} xxl={12}>
            <span style={{ position: 'relative', left: '270%' }}>
              {' '}
              <b> {t('dashboard')}</b> &#9654; {t('account_dashboard')}
            </span>
          </Col>
        </Col>
      </Row>

      <Row justify={'space-around'}>
        <Col xxl={23} xs={23} sm={23} md={23} lg={23} xl={23}>
          <Card>
            <Form form={form} onFinish={onFinish}>
              <Row gutter={16} justify={'space-between'}>
                <Col xl={10} xs={24} sm={23} md={10} lg={23} xxl={4} className="formfield form-container">
                  <AntSelectDynamic
                    bordered={false}
                    label={t('date_type')}
                    name="DateType"
                    fieldLabel="DateType"
                    fieldValue="Id"
                    query={useGetDateType}
                    onChange={(value) => handleDateChange(value)}
                  />
                </Col>
                <Col xl={6} xs={24} sm={12} md={6} lg={12} xxl={4} className="formfield form-container">
                  <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
                </Col>
                <Col xl={6} xs={24} sm={11} md={6} lg={11} xxl={4} className="formfield form-container">
                  <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
                </Col>
                <Col xl={20} xs={24} sm={20} md={18} lg={18} xxl={6} className="formfield form-container">
                  <AntSelectDynamic
                    bordered={false}
                    mode={UserDetail?.IsHeadOffice ? 'multiple' : undefined}
                    disabled={UserDetail?.IsHeadOffice === false}
                    defaultValue={UserDetail?.IsHeadOffice == false ? UserDetail?.CompanyId : undefined}
                    label={t('companyName')}
                    name="CompanyIds"
                    fieldLabel="CompName"
                    fieldValue="Id"
                    query={useGetCompanies}
                  />
                </Col>

                <Col xl={2} xs={10} sm={4} md={4} lg={5} xxl={2} className="btn-margin-top">
                  <AntButton label={t('show')} htmlType="submit" isError={isError} isLoading={isLoading} />
                </Col>
              </Row>
            </Form>
          </Card>
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
}

export default AccountDashboard;
