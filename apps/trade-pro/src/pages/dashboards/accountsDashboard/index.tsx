import { DatePicker, Col, Row, Typography, Card, Form, theme } from 'antd';
import { AntButton, AntDatePicker } from '@scs/ui';
import { AntSelectDynamic } from '@scs/ui';
import { useTranslation } from 'react-i18next';
import { useGetDateType, useGetAccountDashboardData, useGetCompanies } from './queries';
import AccountDashboardCards from './AccountDashboardCards ';
import dayjs from 'dayjs';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { TAccountDashboardCriteria } from './types';

const { useForm, useWatch } = Form;
function AccountDashboard() {
  const [form] = useForm<TAccountDashboardCriteria>();
  const formvalues = useWatch<TAccountDashboardCriteria>([], form);
  const { t } = useTranslation();

  const { setFieldValue, getFieldValue } = form;
  const {
    data: dataSource,
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
    console.log(_);
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
          xs={2}
          sm={4}
          md={6}
          lg={8}
          xl={14}
          style={{ display: 'flex', alignItems: 'center', alignContent: 'center', margin: '16px' }}
        >
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '10px' }}>{t('account_dashboard')} </h1>
          <span style={{ position: 'relative', left: '120%' }}>
            {' '}
            <b> {t('dashboard')}</b> &#9654; {t('account_dashboard')}
          </span>
        </Col>
      </Row>

      <Card style={{ width: '80vw', marginLeft: '50px' }}>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={16} justify={'space-evenly'}>
            <Col xl={4} className="formfield">
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
            <Col xl={4} className="formfield">
              <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
            </Col>
            <Col xl={4} className="formfield">
              <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
            </Col>
            <Col xl={6} className="formfield">
              <AntSelectDynamic
                bordered={false}
                mode={UserDetail?.IsHeadOffice ? 'multiple' : undefined}
                disabled={UserDetail?.IsHeadOffice == false ? true : false}
                label={t('companyName')}
                name="CompanyIds"
                fieldLabel="CompName"
                fieldValue="Id"
                query={useGetCompanies}
              />
            </Col>

            <Col xl={2}>
              <AntButton label={t('show')} htmlType="submit" isError={isError} isLoading={isLoading} />
            </Col>
          </Row>
        </Form>
      </Card>

      <AccountDashboardCards
        Data={dataSource?.data?.Data?.Result}
        FromdateProp={getFieldValue('FromDate')}
        TodateProp={getFieldValue('ToDate')}
        Companies={form.getFieldValue('CompanyIds')}
      />
    </div>
  );
}

export default AccountDashboard;
