import { Card, Col, DatePicker, Form, Row, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { AntButton, AntDatePicker } from '@scs/ui';
import '../style.scss';
import ProfitLoss from '.';

import { storedFinancialYear } from '@tradePro/utils/storageService';
import { useGetProfitLossHistory } from './queries';
import { TProfitLossSearchCritaria } from './type';

const { useForm, useWatch } = Form;

function ProfitLossCriteria() {
  const { t } = useTranslation();
  const [form] = useForm<TProfitLossSearchCritaria>();
  const formValues = useWatch<TProfitLossSearchCritaria>([], form);

  const { data, isError, isLoading, refetch } = useGetProfitLossHistory(form.getFieldsValue());

  const onFinish = (_: TProfitLossSearchCritaria) => {
    refetch();
  };

  const {
    token: { colorPrimary },
  } = theme.useToken();

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
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '0px' }}>{t('Profit Loss')} </h1>
        </Col>
      </Row>

      <Card style={{ width: '80vw', marginLeft: '50px', marginBottom: '15px' }}>
        <Form form={form} onFinish={onFinish} initialValues={formValues}>
          <Row gutter={16} style={{ marginTop: '15px', marginBottom: '-10px' }}>
            <Col xl={4} className="form_fields ">
              <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
            </Col>

            <Col xl={4} className="form_fields " offset={1}>
              <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
            </Col>

            <Col>
              <AntButton label={t('show')} htmlType="submit" isError={isError} isLoading={isLoading} />
            </Col>
          </Row>
        </Form>
      </Card>
      <ProfitLoss />
    </div>
  );
}

export default ProfitLossCriteria;
