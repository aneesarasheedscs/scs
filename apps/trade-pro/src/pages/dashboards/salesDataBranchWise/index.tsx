import { AntButton, AntDatePicker, AntInputNumber, AntSelectDynamic, BackButton } from '@tradePro/components';
import { Card, Checkbox, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { TSalesDataSearchCriteria } from './types';
import { useGetSalesDataBranchWise } from './quries';
import './style.scss';

const { useForm, useWatch } = Form;
function SalesDataBranchWise() {
  const { t } = useTranslation();
  const [form] = useForm<TSalesDataSearchCriteria>();
  const formValues = useWatch<TSalesDataSearchCriteria>([], form);
  const { data, isError, isLoading, isFetching, refetch } = useGetSalesDataBranchWise(true, form.getFieldsValue());

  const onFinish = (_: TSalesDataSearchCriteria) => {
    // refetch();
  };
  function CriteriaString() {
    return (
      <Row style={{ border: '1px solid #25A7DF', padding: 5, borderRadius: 5 }}>
        {/* <h5> {data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5> */}
      </Row>
    );
  }
  return (
    <>
      <div style={{ background: '#fff' }}>
        <Row justify={'space-between'} align={'middle'}>
          <Col xs={10} sm={10} md={6} lg={8} xl={5} xxl={4} className="forms-heading-container">
            <h1 className="report_heading" style={{ textAlign: 'center' }}>
              {t('sales_data_branch_wise')}
            </h1>
          </Col>
          <Col xxl={1} xl={1} md={2} lg={2} style={{ marginRight: '56px' }}>
            <BackButton goToDashboard={false} />
          </Col>
        </Row>

        <Row justify={'space-around'}>
          <Col xxl={23} xl={23} sm={23} xs={23} lg={23}>
            <Card>
              <Form form={form} onFinish={onFinish} initialValues={formValues}>
                <Row justify={'space-between'}>
                  <Col xxl={24} xl={9} lg={13} md={24} xs={24} style={{ border: ' ' }}>
                    <Row gutter={[0, 0]} justify={'space-between'}>
                      <Col xs={24} sm={24} md={12} lg={12} xl={11} xxl={4} className="form_field">
                        <AntDatePicker name="ToDate" label={t('from_date')} bordered={false} />
                      </Col>
                      <Col xs={24} sm={24} md={7} lg={7} xl={8} xxl={4} className="form_field">
                        <AntDatePicker name="EndDate" label={t('to_date')} bordered={false} disabled />
                      </Col>
                      <Col xs={24} sm={24} md={7} lg={7} xl={8} xxl={4} className="form_field">
                        <AntSelectDynamic label="ValueType" name="" fieldLabel="" fieldValue="" bordered={false} />
                      </Col>
                      <Col xs={24} sm={24} md={7} lg={7} xl={8} xxl={4} className="form_field">
                        <AntSelectDynamic label="WeightType" name="" fieldLabel="" fieldValue="" bordered={false} />
                      </Col>
                      <Col xs={24} sm={24} md={7} lg={7} xl={8} xxl={4}>
                        <Checkbox />
                        Cash Sale
                        <Checkbox />
                        Credit Sale
                      </Col>
                      <Col xs={24} sm={4} md={4} lg={4} xl={4} xxl={2}>
                        <AntButton
                          label={t('show')}
                          htmlType="submit"
                          style={{ marginTop: 2 }}
                          isError={isError}
                          isLoading={isLoading || isFetching}
                        />
                      </Col>
                    </Row>

                    {/* <Row style={{ marginTop: 10 }}>
                      <Col xxl={24} xl={24} lg={24} xs={24} style={{ border: '' }}>
                        <Row gutter={[0, 0]} justify={'space-between'}>
                          <Col xs={24} sm={24} md={11} lg={11} xl={11} xxl={11} className="form_field">
                            <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} disabled />
                          </Col>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className="form_field">
                            <AntDatePicker name="EndDate" label={t('to_date')} bordered={false} disabled />
                          </Col>
                        </Row>
                      </Col>
                    </Row> */}
                  </Col>
                  <Col xxl={15} xl={14} lg={11} xs={24} style={{ border: '' }}>
                    {/* <PayableAgingCards form={form} /> */}
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>

        <Row justify={'space-around'}>
          <Col xxl={23} style={{ marginTop: 10 }}>
            {/* {!isLoading && isSuccess && !isFetching ? (
            <AntTablecopy
              paginate
              tableId="pagination-example-id" // id must be unique
              pageSize={pageSize}
              currentPage={currentPage}
              totalItems={mainData[0]?.row_count}
              onChange={(pagination) => {
                setPageSize(pagination?.pageSize);
                setCurrentPage(pagination?.current);
              }}
              refetch={refetch}
              isError={isError}
              numberOfSkeletons={8}
              isLoading={isLoading || isFetching}
              scroll={{ x: '', y: convertVhToPixels('35vh') }}
              data={data?.data?.Data?.Result || []}
              columns={columns(
                t,
                FirstIntervalCaption,
                SecondIntervalCaption,
                ThirdIntervalCaption,
                AboveIntervalCaption
              )}
              reportCriteriaString={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
              // printSlip={{ data: reportData?.data, enabled: true, onClick: () => mutate(), isSuccess, isPending }}
            />
          ) : (
            <Space style={{ height: '60vh' }}>
              <PageLoader />
            </Space>
          )} */}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SalesDataBranchWise;
