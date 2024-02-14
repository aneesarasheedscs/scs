import { columns } from './column';
import { AntButton, AntDatePicker, AntInputNumber, AntSelectDynamic, AntTable, BackButton } from '@tradePro/components';
import { useGetCustomer, useGetReceivablesAgingRegister } from './queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import './style.scss';
import { t } from 'i18next';
import { Card, Col, Form, Row } from 'antd';
import { ReceivablesAgingSearchCriteria } from './type';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const { useForm, useWatch } = Form;

function ReceivablesAgingRegisterTable() {
  const [form] = useForm<ReceivablesAgingSearchCriteria>();
  const formValues = useWatch<ReceivablesAgingSearchCriteria>([], form);

  const { data, refetch, isFetching, isError: isError, isLoading: isLoading } = useGetReceivablesAgingRegister();

  const onFinish = (_: ReceivablesAgingSearchCriteria) => {
    refetch();
  };
  useEffect(() => {
    form.setFields([{ name: 'EndDate', value: dayjs() }]);
  }, []);

  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={10} sm={10} md={12} lg={8} xl={6} xxl={4} className="forms-heading-container">
          <h1 className="report_heading" style={{ textAlign: 'center' }}>
            {t('receivables_aging')}
          </h1>
        </Col>
        <Col xxl={1} style={{ marginRight: '49px' }}>
          <BackButton goToDashboard={false} />
        </Col>
      </Row>

      <Row justify={'space-around'}>
        <Col xxl={23} xl={23} sm={23} xs={23} lg={23}>
          <Card>
            <Form form={form} onFinish={onFinish} initialValues={formValues}>
              <Col xxl={18} xl={24} lg={24} xs={24}>
                <Row gutter={[16, 16]} justify={'space-between'}>
                  <Col xs={24} sm={24} md={12} xxl={9} className="form_field">
                    <AntSelectDynamic
                      bordered={false}
                      name="CompanyId"
                      label="CompanyName"
                      fieldValue="Id"
                      fieldLabel="CompName"
                      query={useGetCustomer}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} xxl={5} className="form_field">
                    <AntDatePicker name="EndDate" label="End Date" bordered={false} />
                  </Col>
                  <Col xs={24} sm={24} md={12} xxl={5} className="form_field">
                    <AntInputNumber name="IntervalDays" label="Interval Days" bordered={false} />
                  </Col>
                  <Col xs={24} sm={24} md={8} xxl={3}>
                    <AntButton
                      label="Show"
                      htmlType="submit"
                      style={{ marginTop: 2 }}
                      isError={isError}
                      isLoading={isLoading || isFetching}
                    />
                  </Col>
                </Row>
              </Col>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row justify={'space-around'}>
        <Col xxl={23} style={{ marginTop: 10 }}>
          <AntTable
            rowKey="Id"
            refetch={refetch}
            isError={isError}
            columns={columns(t)}
            numberOfSkeletons={12}
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
