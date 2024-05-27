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
        <Col xxl={10} xl={13} lg={20} md={22} sm={24}>
          <Card style={{ height: '9vh' }}>
            <Col span={24} style={{ padding: 5 }}>
              <Form form={form} initialValues={{ FromDate, ToDate }} onFinish={onFinish}>
                <Col span={24}>
                  <Row gutter={CriteriaRowGutter} justify={'space-between'}>
                    <Col xxl={9} xl={10} xs={12} md={9} lg={9} sm={10} className="formfield">
                      <AntDatePicker placeholder="" name="FromDate" bordered={false} label={t('from_date')} />
                    </Col>
                    <Col xxl={9} xl={8} xs={11} md={8} lg={9} sm={10} className="formfield">
                      <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} placeholder="" />
                    </Col>

                    <Col xxl={4} xl={4} sm={3} lg={4}>
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
