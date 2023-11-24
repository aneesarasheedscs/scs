import { Card, Col, Form, Row } from 'antd';
import { useEffect, useState } from 'react';
import '../style2.scss';
import { AntButton, AntDatePicker, AntInput, AntSelectDynamic, AntTable } from '@tradePro/components';

import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { isNumber, map } from 'lodash';
import { RedoOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';
import { useGetJobLotState, useGetJobLotsById, useGetJobLotsTable } from '../queries';
import { useSaveJobLotsType } from '../querySave';
import { TDefineJobLotOnAdd } from '../types';
import dayjs from 'dayjs';

function JobLots() {
  const [form] = Form.useForm();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const { data, isError, isLoading } = useGetJobLotsTable();
  const { mutate, isSuccess, isLoading: isSaveLoading } = useSaveJobLotsType(selectedRecordId);
  const {
    data: joblot,
    refetch,
    isSuccess: isDataByIdSuccess,
    isLoading: isDataLoading,
  } = useGetJobLotsById(selectedRecordId);

  interface TJobStatus {
    Id: number;
    JobStatus: string;
  }
  const status: TJobStatus[] = [
    {
      Id: 1,
      JobStatus: 'Complete',
    },
    { Id: 2, JobStatus: 'In Complete' },

    { Id: 3, JobStatus: 'Close' },
  ];

  const { t } = useTranslation();

  const onFinish = (values: TDefineJobLotOnAdd) => {
    if (isNumber(selectedRecordId)) {
      mutate(values);
    } else {
      mutate(values);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setSelectedRecordId(null);
  };

  useEffect(() => {
    if (isSuccess) handleReset();
  }, [isSuccess]);

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataByIdSuccess) {
      form.setFieldsValue(joblot?.data?.Data?.Result);
      form.setFieldValue('StartDate', dayjs(joblot?.data?.Data?.Result?.StartDate));
      form.setFieldValue('EndDate', dayjs(joblot?.data?.Data?.Result?.EndDate));
    }
  }, [isDataByIdSuccess]);

  return (
    <>
      <div className="joblot-main">
        <Row
          style={{
            marginTop: '5%',
            width: '65vw',
          }}
          className="row-border"
        >
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
            <h2 className="job-lot-heading">{t('define_job_lots')}</h2>
          </Col>
        </Row>
        <center>
          <div>
            <Form
              style={{
                width: '80vw',
                paddingTop: '5%',
              }}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 15 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              form={form}
            >
              <Row>
                <Col
                  xs={{ span: 15, offset: 2 }}
                  sm={{ span: 15, offset: 4 }}
                  md={{ span: 15, offset: 4 }}
                  lg={{ span: 6, offset: 0 }}
                  xl={{ span: 6, offset: 1 }}
                >
                  <AntInput
                    label={t('code')}
                    name="JobLotCode"
                    style={{
                      marginLeft: '2%',
                      textAlign: 'center',
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                  />
                </Col>

                <Col
                  className="description"
                  xs={{ span: 15, offset: 2 }}
                  sm={{ span: 15, offset: 2 }}
                  md={{ span: 15, offset: 3 }}
                  lg={{ span: 6, offset: 0 }}
                  xl={{ span: 6, offset: 0 }}
                >
                  <AntInput
                    label={t('description')}
                    name="JobLotDescription"
                    style={{
                      textAlign: 'center',
                      marginLeft: '4%',
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                  />
                </Col>

                <Col
                  className="start-date"
                  style={{ marginLeft: '2%' }}
                  xs={{ span: 15, offset: 2 }}
                  sm={{ span: 15, offset: 4 }}
                  md={{ span: 15, offset: 3 }}
                  lg={{ span: 6, offset: 1 }}
                  xl={{ span: 6, offset: 0 }}
                >
                  <AntDatePicker
                    label={t('start_date')}
                    name="StartDate"
                    style={{
                      textAlign: 'center',
                      marginLeft: '4%',
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                  />
                </Col>
              </Row>

              <Row style={{ marginLeft: '-1.7%' }}>
                <Col
                  className="end-date"
                  xs={{ span: 15, offset: 2 }}
                  sm={{ span: 15, offset: 3 }}
                  md={{ span: 15, offset: 4 }}
                  lg={{ span: 6, offset: 0 }}
                  xl={{ span: 6, offset: 1 }}
                >
                  <AntDatePicker
                    label={t('end_date')}
                    name="EndDate"
                    style={{
                      marginLeft: '2%',
                      textAlign: 'center',
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                  />
                </Col>

                <Col
                  className="status"
                  style={{ marginLeft: '3%' }}
                  xs={{ span: 15, offset: 2 }}
                  sm={{ span: 15, offset: 4 }}
                  md={{ span: 15, offset: 4 }}
                  lg={{ span: 6, offset: 0 }}
                  xl={{ span: 6, offset: 0 }}
                >
                  <AntSelectDynamic
                    fieldValue="JobStatus"
                    label={t('status')}
                    name="JobStatus"
                    fieldLabel="JobStatus"
                    style={{
                      textAlign: 'center',
                      marginLeft: '4%',
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                    options={map(status, (item: any) => ({
                      value: item.JobStatus,
                      label: item.JobStatus,
                    }))}
                  />
                </Col>

                <Col
                  className="type"
                  xs={{ span: 15, offset: 2 }}
                  sm={{ span: 15, offset: 3 }}
                  md={{ span: 15, offset: 4 }}
                  lg={{ span: 6, offset: 0 }}
                  xl={{ span: 6, offset: 0 }}
                >
                  <AntSelectDynamic
                    fieldValue="Id"
                    fieldLabel="LookupName"
                    label={t('job_type')}
                    name="JobTypeId"
                    style={{
                      textAlign: 'center',
                      marginLeft: '4%',
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                    query={useGetJobLotState}
                  />
                </Col>

                <Row style={{ width: '60%', marginTop: '3%', marginLeft: '10%' }}>
                  <Col
                    xs={{ span: 1, offset: 10 }}
                    sm={{ span: 1, offset: 13 }}
                    md={{ span: 2, offset: 8 }}
                    lg={{ span: 2, offset: 9 }}
                    xl={{ span: 1, offset: 10 }}
                  >
                    <AntButton
                      htmlType="submit"
                      label={isNumber(selectedRecordId) ? <>{t('update')}</> : <>{t('add')}</>}
                      className="save-btn2"
                    ></AntButton>
                  </Col>

                  <Col
                    xs={{ span: 7, offset: 6 }}
                    sm={{ span: 5, offset: 5 }}
                    md={{ span: 4, offset: 5 }}
                    lg={{ span: 3, offset: 4 }}
                    xl={{ span: 2, offset: 4 }}
                  >
                    <AntButton
                      icon={<RedoOutlined />}
                      style={{ width: '100%' }}
                      onClick={handleReset}
                      className="reset-btn2"
                    />
                  </Col>
                </Row>

                <Row className="row-border" style={{ marginTop: '3%', width: '65vw', marginLeft: '1.6%' }}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                    <h2 className="history-heading">{t('history')}</h2>
                  </Col>
                </Row>

                <Row style={{ marginTop: '3%' }}>
                  <Col
                    xs={{ span: 20 }}
                    sm={{ span: 20 }}
                    md={{ span: 20 }}
                    lg={{ span: 20 }}
                    xl={{ span: 20, offset: 0 }}
                  >
                    <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
                      <AntTable
                        isError={isError}
                        numberOfSkeletons={8}
                        isLoading={isLoading}
                        scroll={{ x: '', y: convertVhToPixels('29vh') }}
                        data={data?.data?.Data?.Result}
                        columns={columns(setSelectedRecordId, t)}
                      />
                    </Card>
                  </Col>
                </Row>
              </Row>
            </Form>
          </div>
        </center>
      </div>
    </>
  );
}
export default JobLots;
