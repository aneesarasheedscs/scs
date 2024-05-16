import { Col, Row, Typography, Card, Form, theme, Checkbox, Modal } from 'antd';
import { AntButton, AntDatePicker, AntSelectDynamic, AntTable, BackButton } from '@scs/ui';
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

const ActivitySummaryReport: React.FC<{
  columnWidth?: boolean;
  DateType?: string;
  FromDateProp?: Date;
  ToDateProp?: Date;
  CompanyId?: number;
}> = (props) => {
  const { columnWidth, FromDateProp, ToDateProp, CompanyId, DateType } = props;
  const { t } = useTranslation();
  const [form] = useForm<Tfilter>();
  const formValues = useWatch<Tfilter>([], form);
  const { setFieldValue } = form;

  const [SelectedAccount, setSelectedAccount] = useState<number | undefined>(undefined);

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isInputFocusedFromDate, setIsInputFocusedFromDate] = useState(false);
  const [isInputFocusedToDate, setIsInputFocusedToDate] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (FromDateProp !== undefined && ToDateProp !== undefined) {
      form.setFieldValue('FromDate', dayjs(FromDateProp));
      form.setFieldValue('ToDate', dayjs(ToDateProp));
      form.setFieldValue('DateType', DateType);
    } else {
      setFieldValue('FromDate', FromDate);
      setFieldValue('ToDate', ToDate);
    }
  }, [form, DateType]);
  console.log('DateType', DateType);
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
    true,
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
    setIsInputFocused(true);
  };

  //handle form float label
  const handleFromDateChange = () => {
    setIsInputFocusedFromDate(true);
  };
  const handleToDateChange = () => {
    setIsInputFocusedToDate(true);
  };

  // const DateTypeSelect = form.getFieldValue('DateType');

  const FromDateSelect = form.getFieldValue('FromDate');
  const ToDateSelect = form.getFieldValue('ToDate');

  useEffect(() => {
    if (!DateType && DateType === undefined) {
      setIsInputFocused(false);
    } else {
      setIsInputFocused(true);
    }
    if (!FromDateSelect) {
      setIsInputFocusedFromDate(false);
    } else {
      setIsInputFocusedFromDate(true);
    }
    if (!ToDateSelect) {
      setIsInputFocusedToDate(false);
    } else {
      setIsInputFocusedToDate(true);
    }
  }, [!DateType, !FromDateSelect, !ToDateSelect]);

  const onChangeUnPost = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setFieldValue('ApprovedFilter', 'All');
    } else {
      setFieldValue('ApprovedFilter', null);
    }
  };
  const CriteriaString =()=>{
    return(
      <Row style={{border: '1px solid #25A7DF', padding:7,borderRadius:5}}>
        <h5>{ActivitySummary?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    )
  }
  

  return (
    <div style={{ backgroundColor: '#fff', overflowX: 'hidden' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={16} className="">
          <h1 className="report_heading">{t('activity_summary')}</h1>
        </Col>
        <Col xxl={1} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={false} />
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
              {/* <Row justify={'space-around'}>
        <Col xxl={23} xs={23} sm={23} md={23} lg={23} xl={23}> */}

              <Col xxl={18} xl={24} lg={24} xs={24}>
                <Row gutter={[16, 16]} justify={'space-between'}>
                  <Col xxl={5} xl={6} xs={24} sm={24} md={9} lg={8} className="formfield form-container">
                    <p className={isInputFocused ? 'focused-label' : 'focused2'}>{t('date_type')}</p>
                    <AntSelectDynamic
                      className={isInputFocused ? 'focused2' : 'focused'}
                      bordered={false}
                      fieldValue="Id"
                      fieldLabel="DateType"
                      defaultValue={FromDateProp !== undefined ? undefined : '5'}
                      label={t('')}
                      query={useGetDateTypes}
                      onSelectChange={(obj) => handleDateChange(obj.Id)}
                      name="DateType"
                    />
                  </Col>
                  <Col xxl={5} xl={6} xs={12} md={6} lg={8} className="formfield form-container">
                    <p className={isInputFocusedFromDate ? 'focused-label' : 'focused2'}>{t('from_date')}</p>
                    <AntDatePicker
                      placeholder=""
                      name="FromDate"
                      bordered={false}
                      label={t('')}
                      onChange={handleFromDateChange}
                      className={isInputFocusedFromDate ? 'focused2' : 'focused'}
                    />
                  </Col>
                  <Col xxl={5} xl={5} xs={11} md={6} lg={7} className="formfield form-container">
                    <p className={isInputFocusedToDate ? 'focused-label' : 'focused2'}>{t('to_date')}</p>
                    <AntDatePicker
                      name="ToDate"
                      bordered={false}
                      label={t('')}
                      placeholder=""
                      onChange={handleToDateChange}
                      className={isInputFocusedToDate ? 'focused2' : 'focused'}
                    />
                  </Col>
                  <Col
                    xxl={5}
                    xl={6}
                    xs={24}
                    sm={12}
                    lg={8}
                    className="form-container btn-margin-top"
                    style={{ height: '4vh' }}
                  >
                    <Form.Item name="ApprovedFilter">
                      <Checkbox onChange={onChangeUnPost}>{t('include_unposted_vochers')}</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col xxl={2} xl={3} sm={6} lg={4} className="btn-margin-top">
                    <AntButton
                      label={t('show')}
                      htmlType="submit"
                      isError={isActivitySummaryError}
                      isLoading={isActivitySummaryLoading || isFetching}
                    />
                  </Col>
                </Row>
              </Col>
            </Form>
          </Card>
        </Col>
      </Row>
      {/* </Col> */}

      <div className="summary-table-container">
        <Row gutter={[16, 16]} justify={'center'}>
          <Col xs={23} md={23} xxl={23} xl={23} lg={23} className="">
            <AntTable
              rowKey={'AccountId'}
              columns={Columns(t, handleAccountCodeClick, columnWidth)}
              data={ActivitySummary?.data?.Data?.Result || []}
              isError={isActivitySummaryError}
              isLoading={isActivitySummaryLoading}
              searchCriteriaReport={ActivitySummary?.data?.Data?.Result?.[0]?.ReportCriteria? <CriteriaString/>:''}
              refetch={refetch}
              scroll={{ y: convertVhToPixels('35vh') }}
              pagination={{
                pageSize: 10,
                total: ActivitySummary?.data?.Data?.TotalCount || 0,
                current: currentPage,
                onChange: (page, pageSize) => {
                  setCurrentPage(page);
                },
              }}
            />
          </Col>
        </Row>
      </div>

      <Modal
        width={1300}
        key={SelectedAccount}
        open={SelectedAccount !== undefined}
        onCancel={() => setSelectedAccount(undefined)}
        destroyOnClose={true}
        footer={null}
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <div style={{ maxHeight: '100%', overflowX: 'hidden' }}>
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
