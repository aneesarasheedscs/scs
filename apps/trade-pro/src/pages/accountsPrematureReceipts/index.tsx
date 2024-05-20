import { BackButton } from '@tradePro/components';
import { Card, Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import { useState } from 'react';
import AccountsPrematureForm from './form';
import AccountsPrematureHistory from './table';

function AccountsPrematureRecipts() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);

  return (
    <>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={12} sm={10} md={8} lg={8} xl={6} xxl={5} className="forms-heading-container">
          <h1 className="report_heading" style={{ textAlign: 'center' }}>
            {t('accounts_premature_receipts')}
          </h1>
        </Col>
        <Col xxl={1} xl={1} md={2} lg={2} sm={2} xs={2} style={{ marginRight: '56px' }}>
          <BackButton goToDashboard={false} />
        </Col>
        <Col span={24} style={{ marginLeft: 10 }}>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('history')}>
              {/* <RequisitionOrderTable
            setSelectedRecordId={setSelectedRecordId}
            setActiveTab={setActiveTab}
            setSelectedRecordIdforDetail={setSelectedRecordIdforDetail}
            requisitionDetail={requisitionDetail?.data?.Data?.Result}
            isDataLoadingDetail={isDataLoadingDetail}
            refetchDetail={refetchDetail}
          /> */}
              <AccountsPrematureHistory />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('form')}>
              {/* <RequisitionOrderForm
            selectedRecordId={selectedRecordId}
            requisitionById={requisitionById?.data?.Data?.Result}
            isDataSuccess={isDataSuccess}
            isDataLoading={isDataLoading}
            setSelectedRecordId={setSelectedRecordId}
          /> */}
              <AccountsPrematureForm selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>

      {/* <Row justify={'space-around'}>
          <Col xxl={23} xl={23} sm={23} xs={23} lg={23}>
            <Card className="sales_branch_header">
              <Form form={form} onFinish={onFinish} initialValues={formValues}>
                <Row gutter={[18, 6]} justify={'space-between'} style={{ marginTop: -10 }}>
                  <Col xxl={16} xl={18} style={{ border: '' }}>
                    <Row gutter={[0, 5]} justify={'space-between'}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={7} xxl={6} className="form_field">
                        <AntSelectDynamic
                          bordered={false}
                          fieldValue="Id"
                          fieldLabel="DateType"
                          defaultValue={'5'}
                          label={t('date_type')}
                          query={useGetDateTypes}
                          onSelectChange={(obj) => handleDateChange(obj.Id)}
                          name="DateType"
                        />
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={7} xxl={6} className="form_field">
                        <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
                      </Col>
                      <Col xs={24} sm={24} md={7} lg={7} xl={8} xxl={6} className="form_field">
                        <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={7} xxl={5} className="form_field">
                        <AntSelectDynamic
                          label="Value Type"
                          name="ValueType"
                          fieldLabel="type"
                          fieldValue="Id"
                          query={useGetValueType}
                          bordered={false}
                          onSelectChange={(obj) => handleValueTypeChange(obj)}
                        />
                        <AntInput name="ReqType" label="" style={{ display: 'none' }} />
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={6} xxl={6} className="form_field">
                        <AntSelectDynamic
                          label="Weight Type"
                          name="WeightType"
                          fieldLabel="type"
                          fieldValue="Id"
                          query={useGetWeightType}
                          bordered={false}
                          onSelectChange={(obj) => handleWeightTypeChange(obj)}
                        />
                        <AntInput name="VoucherType" label="" style={{ display: 'none' }} />
                      </Col>
                      <Col xs={24} sm={24} md={7} lg={7} xl={6} xxl={6}>
                        <Row gutter={[6, 0]} justify={'space-evenly'}>
                          <Form.Item
                            style={{ marginBottom: 0 }}
                            className="box"
                            name="CashSale"
                            valuePropName="checked"
                            initialValue={false}
                          >
                            <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'CashSale')}>
                              {t('cash_sale')}
                            </Checkbox>
                          </Form.Item>
                          <Form.Item
                            style={{ marginBottom: 0 }}
                            className="box"
                            name="CreditSale"
                            valuePropName="checked"
                            initialValue={false}
                          >
                            <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'CreditSale')}>
                              {t('credit_sale')}
                            </Checkbox>
                          </Form.Item>
                        </Row>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={2} xxl={11} style={{ border: '' }}>
                        <Row justify={'start'} style={{ marginLeft: 0 }}>
                          <Col>
                            <AntButton
                              label={t('show')}
                              htmlType="submit"
                              style={{ marginTop: 2 }}
                              isError={isError}
                              isLoading={isLoading || isFetching}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col xxl={8} xl={6} lg={24} md={24} sm={24} xs={24}>
                    <Col xxl={14} xl={24} lg={8} md={10} sm={24} xs={24}>
                      <Row justify={'space-between'}>
                        <h4>Total Sale Value </h4>
                        <p>{numberFormatter(totalSalesValue)}</p>
                      </Row>
                      <Row justify={'space-between'}>
                        <h4>Total Weight</h4>
                        <p>{numberFormatter(totalWeightValue)} </p>
                      </Row>
                    </Col>
                  </Col>
                  <Col span={24} style={{ marginTop: 5 }}>
                    {data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>

        <Row justify={'space-around'}>
          <Col span={23} style={{ marginTop: 0 }}>
            <Row
              gutter={[0, 0]}
              style={{
                marginTop: 10,
                borderTop: `1px solid ${colorPrimary}`,
                borderBottom: `1px solid ${colorPrimary}`,
                padding: 8,
              }}
            >
              <Col span={24}>
                <h3>Branch Wise Total Information</h3>
              </Col>
              <Col span={24}>
                <BranchWiseInformationCards form={form} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify={'space-around'}>
          <Col span={23} style={{ marginTop: 10 }}>
            {!isLoading && isSuccess && !isFetching ? (
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
                columns={columns(t)}
                // reportCriteriaString={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
                // printSlip={{ data: reportData?.data, enabled: true, onClick: () => mutate(), isSuccess, isPending }}
              />
            ) : (
              <Space style={{ height: '60vh' }}>
                <PageLoader />
              </Space>
            )}
          </Col>
        </Row> */}
    </>
  );
}

export default AccountsPrematureRecipts;
