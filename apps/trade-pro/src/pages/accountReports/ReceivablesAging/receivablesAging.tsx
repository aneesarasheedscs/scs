import { columns } from './column';
import { AntButton, AntDatePicker, AntInputNumber, AntTable, BackButton } from '@tradePro/components';
import {
  useGetReceivablesAgingRegister,
  useGetReceivablesAgingRegisterNotYetDue,
  useGetReceivablesAgingRegisterOverDue,
} from './queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import './style.scss';
import { t } from 'i18next';
import { Card, Col, Form, Radio, RadioChangeEvent, Row } from 'antd';
import { ReceivablesAgingSearchCriteria } from './type';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ReceiableAgingIntervalCard from './receivablesAgingIntervalCard';
import ReceiableAgingIntervalNotYetCards from './receivableNotYetCards';
import ReceiableAgingIntervalOverDueCards from './receivableOverDueCard';
// import ReceiableAgingIntervalOverDueCards from './receivableNotYetCards';

const { useForm, useWatch } = Form;

function ReceivablesAgingRegisterTable() {
  const [form] = useForm<ReceivablesAgingSearchCriteria>();
  const formValues = useWatch<ReceivablesAgingSearchCriteria>([], form);
  const [reportType, setReportType] = useState('NetReceivable'); // Initial value
  const {
    data,
    refetch,
    isFetching,
    isError: isError,
    isLoading: isLoading,
  } = useGetReceivablesAgingRegister(true, form.getFieldsValue());

  const {
    data: DataforOverDue,
    refetch: refetchOverDue,
    isFetching: isFetchingOverDue,
    isError: isErrorOverDue,
    isLoading: isLoadingOverDue,
  } = useGetReceivablesAgingRegisterOverDue(false, form.getFieldsValue());

  const {
    data: DataforNetDue,
    refetch: refNetOver,
    isFetching: isFetchingNetDue,
    isError: isErrorNetOver,
    isLoading: isLoadingNetOver,
  } = useGetReceivablesAgingRegisterNotYetDue(false, form.getFieldsValue());

  const firstCaption = data?.data?.Data?.Result?.[0]?.FirstIntervalCaption;
  const secondtCaption = data?.data?.Data?.Result?.[0]?.SecondIntervalCaption;
  const thirdCaption = data?.data?.Data?.Result?.[0]?.ThirdIntervalCaption;
  const aboveCaption = data?.data?.Data?.Result?.[0]?.AboveIntervalCaption;
  const [receivablesAgingType, setReceivablesAgingType] = useState('NetReceivable');
  const onFinish = (_: ReceivablesAgingSearchCriteria) => {
    _.ToDate = dayjs(_.ToDate).startOf('day');
    console.log(_.ToDate);

    // refetch();
    if (reportType === 'NetReceivable') {
      setReceivablesAgingType('NetReceivable');
      refetch();
    } else if (reportType === 'OverDue') {
      setReceivablesAgingType('OverDue');
      refetchOverDue();
    } else if (reportType === 'NotYetDue') {
      setReceivablesAgingType('NotYetDue');
      refNetOver();
    }
  };
  console.log(reportType, 'reportType');

  useEffect(() => {
    form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
    form.setFields([{ name: 'AgingDays', value: 30 }]);
  }, []);

  useEffect(() => {
    const calculateFromDate = () => {
      const toDate = form.getFieldValue('ToDate');
      const agingDays = form.getFieldValue('AgingDays');
      if (toDate && agingDays) {
        const fromDate = dayjs(toDate).subtract(agingDays * 4, 'days');
        form.setFields([{ name: 'FromDate', value: fromDate }]);
        form.setFields([{ name: 'EndDate', value: toDate }]);
      }
    };
    if (!isFetching) {
      calculateFromDate();
    }
    if (!isFetchingOverDue) {
      calculateFromDate();
    }
    if (!isFetchingNetDue) {
      calculateFromDate();
    }
  }, [isFetching, isFetchingNetDue, isFetchingOverDue]);

  const [SelectedAccount, setSelectedAccount] = useState<number | undefined>(undefined);
  const handleAccountCodeClick = (AccountId: number) => {
    setSelectedAccount(AccountId);
  };

  const CriteriaString = () => {
    return (
      <>
        <Row style={{ border: '1px solid #25A7DF', padding: 7, borderRadius: 5 }}>
          <h5>{data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
        </Row>
      </>
    );
  };
  const handleRadioChange = (e: RadioChangeEvent) => {
    setReportType(e.target.value);
  };

  // import dayjs from 'dayjs';

  // Assuming _.ToDate is a Date object

  const ToDate = form.getFieldValue('ToDate');

  const datee = dayjs(ToDate).startOf('day');

  console.log(datee.format()); // Output: The date portion of _.ToDate in YYYY-MM-DD format

  const date = dayjs(ToDate?.toISOString().split('T')[0]);

  console.log(date.format()); // Output: The date portion of _.ToDate in YYYY-MM-DD format

  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={9} sm={10} md={6} lg={7} xl={6} xxl={4} className="forms-heading-container">
          <h1 className="report_heading" style={{ textAlign: 'center' }}>
            {t('receivables_aging')}
          </h1>
        </Col>
        <Col xxl={1} lg={1} md={1} style={{ marginRight: '56px' }}>
          <BackButton goToDashboard={false} />
        </Col>
      </Row>

      <Row justify={'space-around'} style={{ marginBottom: 10 }}>
        <Col xxl={23} xl={23} sm={23} xs={23} lg={23}>
          <Card style={{}} className="CardHight">
            <Form form={form} onFinish={onFinish} initialValues={formValues}>
              <Col xxl={24} xl={24} lg={24} xs={24} style={{ marginLeft: -10 }}>
                <Row gutter={[16, 10]}>
                  <Col xxl={15} lg={24} xl={15} md={24} sm={24} xs={24}>
                    <Row gutter={[10, 6]} justify={'space-between'}>
                      <Col xs={24} sm={12} md={12} xxl={6} lg={12} xl={12} className="form_field">
                        <AntDatePicker name="ToDate" label={t('end_date')} bordered={false} />
                      </Col>
                      <Col xs={24} sm={11} md={11} xxl={4} lg={11} xl={11} className="form_field">
                        <AntInputNumber name="AgingDays" label={t('interval_days')} bordered={false} />
                      </Col>
                      <Col xxl={10} lg={13} xl={18} md={15} sm={15} xs={24}>
                        <Row justify={'space-between'}>
                          <Col xxl={24} xs={24} lg={24} md={24} sm={24}>
                            <Radio.Group
                              onChange={handleRadioChange}
                              value={reportType}
                              name="ReportTypeId"
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                // alignItems: 'center',
                                marginTop: 10,
                              }}
                            >
                              <Radio value="NetReceivable">{t('net_receivable')}</Radio>

                              <Radio value="NotYetDue">{t('not_yet_due')}</Radio>

                              <Radio value="OverDue">{t('over_due')}</Radio>
                            </Radio.Group>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={8} sm={5} md={4} xxl={3} lg={4} style={{ border: '' }} className="marginRight">
                        <AntButton
                          label={t('show')}
                          htmlType="submit"
                          style={{ marginTop: 10 }}
                          isError={isError}
                          isLoading={isLoading || isFetching}
                        />
                      </Col>
                    </Row>
                    <Col xxl={12} md={24} style={{marginLeft:-10}}>
                      {/* <Row style={{ marginTop: 5 }}>
                        {' '}
                        <h5>{t('period_filltered_records')}</h5>
                      </Row> */}
                      <Row gutter={[0,5]} justify={'space-between'}>
                        <Col xs={24} sm={12} md={12} xxl={12} lg={12} xl={12} className="form_field" style={{marginLeft:0}}>
                          <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} disabled />
                        </Col>
                        <Col
                          xs={24}
                          sm={11}
                          md={11}
                          xxl={11}
                          lg={11}
                          xl={11}
                          className="form_field "
                          style={{ marginLeft: 0 }}
                        >
                          <AntDatePicker name="EndDate" label={t('to_date')} bordered={false} disabled />
                        </Col>
                      </Row>
                    </Col>
                  </Col>
                  <Col xxl={9} xl={9} lg={24} md={24} sm={24} xs={24}>
                    <Row style={{ marginLeft: 20 }}>
                      <Col xxl={24} lg={24} md={24} sm={24} xs={24}>
                        {receivablesAgingType === 'NetReceivable' ? (
                          <ReceiableAgingIntervalCard form={form} />
                        ) : receivablesAgingType === 'NotYetDue' ? (
                          <ReceiableAgingIntervalNotYetCards form={form} />
                        ) : receivablesAgingType === 'OverDue' ? (
                          <ReceiableAgingIntervalOverDueCards form={form} />
                        ) : (
                          ''
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row justify={'space-around'}>
        <Col xxl={23} md={23} xl={23} lg={23} sm={23} xs={23} style={{ marginTop: 10 }}>
          <AntTable
            rowKey="Id"
            refetch={refetch}
            isError={isError}
            columns={columns(t, handleAccountCodeClick, firstCaption, secondtCaption, thirdCaption, aboveCaption)}
            numberOfSkeletons={12}
            searchCriteriaReport={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
            isLoading={isLoading || isFetching}
            data={data?.data?.Data?.Result || []}
            scroll={{ x: '', y: convertVhToPixels('45vh') }}
           
          />
        </Col>
      </Row>
    </div>
  );
}

export default ReceivablesAgingRegisterTable;
