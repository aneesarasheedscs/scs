import { Col, Row, Typography, Card, Form, theme, Checkbox, Modal } from 'antd';
import { AntButton, AntDatePicker, AntSelectDynamic, AntTable } from '@scs/ui';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Columns } from './Columns';
import { useGetActivitySummary, useGetDateTypes } from '../queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Tfilter } from './types';
import './style.scss';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useEffect, useState } from 'react';
import GeneralLedgerReport from '../GeneralLedger';
const { Title, Text } = Typography;
const { useToken } = theme;
const financialYear = storedFinancialYear();
const FromDate = dayjs(financialYear?.Start_Period);
const ToDate = dayjs(financialYear?.End_Period);

const { useForm, useWatch } = Form;
const UserDetail = storedUserDetail();

const ActivitySummaryReport: React.FC<{ FromDateProp?: Date; ToDateProp?: Date; CompanyId?: number }> = (props) => {
  const { FromDateProp, ToDateProp, CompanyId } = props;
  const { t } = useTranslation();
  const [form] = useForm<Tfilter>();
  const formValues = useWatch<Tfilter>([], form);
  const { setFieldValue } = form;

  const [SelectedAccount, setSelectedAccount] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (FromDateProp !== undefined && ToDateProp !== undefined) {
      form.setFieldValue('FromDate', dayjs(FromDateProp));
      form.setFieldValue('ToDate', dayjs(ToDateProp));
    } else {
      setFieldValue('FromDate', FromDate);
      setFieldValue('ToDate', ToDate);
    }
  }, []);

  const [formState, setformState] = useState<Tfilter>({
    FromDate: FromDateProp,
    ToDate: ToDateProp,
    ApprovedFilter: '',
    IsApproved: true,
  });

  const {
    refetch,
    isFetching,
    data: ActivitySummary,
    isError: isActivitySummaryError,
    isLoading: isActivitySummaryLoading,
  } = useGetActivitySummary(
    false,
    CompanyId !== undefined && CompanyId > 0 ? CompanyId : UserDetail?.CompanyId,
    formState
  );

  useEffect(() => {
    if (formState.FromDate !== undefined && formState.ToDate != undefined) {
      refetch();
    }
  }, [formState]);

  const handleAccountCodeClick = (AccountId: number) => {
    setSelectedAccount(AccountId);
  };

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const onFinish = (_: Tfilter) => {
    setformState(form.getFieldsValue());
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

  const onChangeUnPost = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setFieldValue('ApprovedFilter', 'All');
    } else {
      setFieldValue('ApprovedFilter', null);
    }
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
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '10px' }}>{t('acctivity_summary')}</h1>
          <span style={{ position: 'relative', left: '115%' }}>
            {' '}
            <b> {t('activity')}</b> &#9654; {t('summary')}
          </span>
        </Col>
      </Row>
      <Row justify={'space-around'}>
        <Col xxl={23} xl={23} sm={23} xs={23} lg={23}>
          <Card>
            <Form
              form={form}
              initialValues={FromDateProp === undefined && ToDateProp === undefined ? { FromDate, ToDate } : undefined}
              onFinish={onFinish}
            >
              {/* <Row gutter={[24, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify={'start'}> */}
              <Row gutter={[16, 16]} justify={'space-around'}>
                <Col xxl={5} xl={8} xs={24} sm={24} md={9} lg={23} className="formfield form-container">
                  <AntSelectDynamic
                    bordered={false}
                    fieldValue="Id"
                    fieldLabel="DateType"
                    defaultValue={FromDateProp !== undefined ? undefined : '5'}
                    label={t('date_type')}
                    query={useGetDateTypes}
                    onSelectChange={(obj) => handleDateChange(obj.Id)}
                    name="DateType"
                  />
                </Col>
                <Col xxl={5} xl={6} xs={12} md={6} lg={12} className="formfield form-container">
                  <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
                </Col>
                <Col xxl={5} xl={6} xs={11} md={6} lg={11} className="formfield form-container">
                  <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
                </Col>
                <Col xxl={5} xl={8} xs={24} sm={12} lg={12} className="form-container">
                  <Form.Item name="ApprovedFilter">
                    <Checkbox onChange={onChangeUnPost}>{t('include_unposted_vochers')}</Checkbox>
                  </Form.Item>
                </Col>
                <Col xxl={2} xl={4} sm={6} className="btn-margin-top">
                  <AntButton
                    label={t('show')}
                    htmlType="submit"
                    isError={isActivitySummaryError}
                    isLoading={isActivitySummaryLoading || isFetching}
                  />
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>

      <div className="summary-table-container">
        <Row gutter={[16, 16]}>
          <Col xs={23} md={23} xxl={24} xl={23} lg={23} className="">
            <AntTable
              rowKey={'AccountId'}
              columns={Columns(t, handleAccountCodeClick)}
              data={ActivitySummary?.data?.Data?.Result || []}
              isError={isActivitySummaryError}
              isLoading={isActivitySummaryLoading}
              scroll={{ y: convertVhToPixels('50vh') }}
            />
          </Col>
        </Row>
      </div>

      <Modal
        width={1800}
        key={SelectedAccount}
        open={SelectedAccount !== undefined}
        onCancel={() => setSelectedAccount(undefined)}
        destroyOnClose={true}
        footer={null}
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
          <GeneralLedgerReport
            FromDateProp={form.getFieldValue('FromDate')}
            ToDateProp={form.getFieldValue('ToDate')}
            AccountIdProp={SelectedAccount}
          />
        </div>
      </Modal>
    </div>
  );
};
export default ActivitySummaryReport;
