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
          xs={10}
          sm={4}
          md={6}
          lg={8}
          xl={14}
          style={{ display: 'flex', alignItems: 'center', alignContent: 'center', margin: '16px' }}
        >
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '0px' }}>{t('profit_loss')} </h1>
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify={'start'}>
        <Col xxl={12} xl={116} xs={18} sm={18} lg={18} style={{ marginLeft: 10 }}>
          <Card>
            <Form form={form} onFinish={onFinish} initialValues={formValues}>
              <Row gutter={[16, 16]} justify={'start'}>
                <Col xl={7} xxl={8} xs={24} md={12} className="form_fields form-container ">
                  <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
                </Col>

                <Col
                  xl={7}
                  xxl={{ span: 8, offset: 1 }}
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  className="form_fields form-container "
                >
                  <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
                </Col>

                <Col
                  xxl={{ span: 4, offset: 1 }}
                  xs={24}
                  md={{ span: 10 }}
                  xl={{ span: 3, offset: 1 }}
                  className="btn-margin-top"
                >
                  <AntButton label={t('show')} htmlType="submit" isError={isError} isLoading={isLoading} />
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
      <ProfitLoss />
    </div>
  );
}

export default ProfitLossCriteria;
