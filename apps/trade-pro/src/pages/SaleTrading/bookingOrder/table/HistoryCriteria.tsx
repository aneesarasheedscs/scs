import { Card, Col, Form, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { AntButton, AntDatePicker } from '@tradePro/components';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';
import { useGetBookingOrder } from '../queries';

const { useToken } = theme;
const { useForm, useWatch } = Form;

const financialYear = storedFinancialYear();

const FromDate = dayjs(financialYear?.Start_Period);
const ToDate = dayjs(financialYear?.End_Period);

function ModalCriteria() {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetBookingOrder(true);
  const [form] = useForm<any>();
  const formValues = useWatch<any>([], form);

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const onFinish = (_: any) => {
    // setformState(form.getFieldsValue());
    refetch();
  };
  return (
    <>
      <Row justify={'start'}>
        <Col xxl={14}>
          <Card style={{ height: '9vh' }}>
            <Col xxl={18} xl={23} sm={23} xs={23} lg={23} style={{ padding: 15 }}>
              <Form form={form} initialValues={{ FromDate, ToDate }} onFinish={onFinish}>
                <Col xxl={24} xl={14} lg={15} md={5} xs={24}>
                  <Row gutter={CriteriaRowGutter} justify={'space-between'}>
                    <Col xxl={9} xl={10} xs={12} md={6} lg={8} className="formfield">
                      <AntDatePicker placeholder="" name="FromDate" bordered={false} label={t('from_date')} />
                    </Col>
                    <Col xxl={9} xl={8} xs={11} md={6} lg={7} className="formfield">
                      <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} placeholder="" />
                    </Col>

                    <Col xxl={4} xl={4} sm={6} lg={4}>
                      <AntButton
                        label={t('show')}
                        htmlType="submit"
                        isError={isError}
                        isLoading={isLoading || isFetching}
                      />
                    </Col>
                  </Row>
                </Col>
              </Form>
            </Col>
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default ModalCriteria;
