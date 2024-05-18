import {
  AntButton,
  AntDatePicker,
  AntInput,
  AntInputNumber,
  AntSelectDynamic,
  AntTablecopy,
  BackButton,
  PageLoader,
} from '@tradePro/components';
import { Card, Checkbox, Col, Form, Row, Space, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { TSalesDataSearchCriteria } from './types';
import { useGetDateTypes, useGetSalesDataBranchWise, useGetValueType, useGetWeightType } from './quries';
import './style.scss';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import dayjs from 'dayjs';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { useEffect, useState } from 'react';
import BranchWiseInformationCards from './branchWiseInformationCards';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { columns } from './column';
import _ from 'lodash';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

const { useForm, useWatch } = Form;
function SalesDataBranchWise() {
  const { t } = useTranslation();
  const financialYear = storedFinancialYear();
  const [form] = useForm<TSalesDataSearchCriteria>();
  const formValues = useWatch<TSalesDataSearchCriteria>([], form);
  const { setFieldValue, getFieldValue } = form;
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const FromDate = dayjs(financialYear?.Start_Period);
  const ToDate = dayjs(financialYear?.End_Period);
  const { data, isError, isLoading, isFetching, refetch, isSuccess } = useGetSalesDataBranchWise(
    true,
    form.getFieldsValue()
  );
  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };
  // const handleCheckboxChange = (e: CheckboxValueType[]) => {
  //   // setReportType(e.target.value);
  //   console.log(e);
  // };
  const [pageSize, setPageSize] = useState<number | undefined>(10);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const mainData = data?.data?.Data?.Result || [];
  const results = data?.data?.Data?.Result;
  const branchesData = results?.map((result: any) => ({
    branchCaption: [
      result.Parms_01,
      result.Parms_02,
      result.Parms_03,
      result.Parms_04,
      result.Parms_05,
      result.Parms_06,
      result.Parms_07,
      result.Parms_08,
      result.Parms_09,
      result.Parms_10,
    ].filter((caption) => caption !== null),
    totalSaleValues: [
      _.sumBy(results, 'Value_01'),
      _.sumBy(results, 'Value_02'),
      _.sumBy(results, 'Value_03'),
      _.sumBy(results, 'Value_04'),
      _.sumBy(results, 'Value_05'),
      _.sumBy(results, 'Value_06'),
      _.sumBy(results, 'Value_07'),
      _.sumBy(results, 'Value_08'),
      _.sumBy(results, 'Value_09'),
      _.sumBy(results, 'Value_10'),
    ].filter((value) => value !== 0),
    totalWeightValues: [
      _.sumBy(results, 'ValueWT_01'),
      _.sumBy(results, 'ValueWT_02'),
      _.sumBy(results, 'ValueWT_03'),
      _.sumBy(results, 'ValueWT_04'),
      _.sumBy(results, 'ValueWT_05'),
      _.sumBy(results, 'ValueWT_06'),
      _.sumBy(results, 'ValueWT_07'),
      _.sumBy(results, 'ValueWT_08'),
      _.sumBy(results, 'ValueWT_09'),
      _.sumBy(results, 'ValueWT_10'),
    ].filter((value) => value !== 0),
  }));
  const totalSalesValue = branchesData?.reduce(
    (total: number, branch: any) => total + _.sum(branch.totalSaleValues),
    0
  );
  const totalWeightValue = branchesData?.reduce(
    (total: number, branch: any) => total + _.sum(branch.totalWeightValues),
    0
  );
  const onFinish = (_: TSalesDataSearchCriteria) => {
    refetch();
    console.log(_);
  };
  function CriteriaString() {
    return (
      <Row style={{ border: '1px solid #25A7DF', padding: 5, borderRadius: 5 }}>
        <h5> {data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    );
  }
  useEffect(() => {
    setFieldValue('DateType', '5');
    setFieldValue('FromDate', FromDate);
    setFieldValue('ToDate', ToDate);
  }, []);
  console.log(formValues);
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
  const handleWeightTypeChange = (obj: TWeightType) => {
    console.log(obj?.type);
    setFieldValue('ReqType', obj?.type);
  };
  const handleValueTypeChange = (obj: TWeightType) => {
    console.log(obj?.type);
    setFieldValue('VoucherType', obj?.type);
  };
  // console.log(form.getFieldValue('VoucherType'));
  return (
    <>
      <div style={{ background: '#fff' }}>
        <Row justify={'space-between'} align={'middle'}>
          <Col xs={12} sm={10} md={8} lg={8} xl={6} xxl={5} className="forms-heading-container">
            <h1 className="report_heading" style={{ textAlign: 'center' }}>
              {t('sales_data_branch_wise')}
            </h1>
          </Col>
          <Col xxl={1} xl={1} md={2} lg={2} sm={2} xs={2} style={{ marginRight: '56px' }}>
            <BackButton goToDashboard={false} />
          </Col>
        </Row>

        <Row justify={'space-around'}>
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
        </Row>
      </div>
    </>
  );
}

export default SalesDataBranchWise;
interface TWeightType {
  Id: number;
  type: string;
}
