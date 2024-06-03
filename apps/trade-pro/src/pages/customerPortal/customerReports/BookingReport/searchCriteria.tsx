import { Col, Form, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { TFilters } from './types';
import dayjs from 'dayjs';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { AntButton, AntDatePicker, AntSelectDynamic } from '@tradePro/components';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';
import { useGetBookingReport, useGetItem } from './queries';

const { useToken } = theme;
const { useForm, useWatch } = Form;

const financialYear = storedFinancialYear();

const FromDate = dayjs(financialYear?.Start_Period);
const ToDate = dayjs(financialYear?.End_Period);

function SearchCriteria() {
  const { t } = useTranslation();
  const [form] = useForm<TFilters>();
  const formValues = useWatch<TFilters>([], form);
  const { data, refetch, isLoading, isFetching, isError } = useGetBookingReport(true, form.getFieldsValue());

  const onFinish = (_: TFilters) => {
    refetch();
  };
  return (
    <>
      <Row justify={'start'} style={{ marginLeft: 10 }}>
        <Col span={24}>
          <Form form={form} initialValues={{ FromDate, ToDate }} onFinish={onFinish}>
            <Col span={24}>
              <Row gutter={CriteriaRowGutter} justify={'space-between'}>
                <Col xxl={5} xl={5} xs={24} sm={12} md={7} lg={7} className="formfield">
                  <AntDatePicker placeholder="" name="FromDate" bordered={false} label={t('from_date')} />
                </Col>
                <Col xxl={5} xl={5} xs={24} sm={11} md={6} lg={6} className="formfield">
                  <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} placeholder="" />
                </Col>
                <Col xxl={5} xl={6} xs={24} sm={12} md={8} lg={8} className="formfield">
                  <AntSelectDynamic
                    name="ItemId"
                    bordered={false}
                    fieldValue="Id"
                    fieldLabel="ReferenceName"
                    label={t('item')}
                    placeholder=""
                    query={useGetItem}
                  />
                </Col>
                <Col xxl={8} xl={7} sm={11} xs={24} lg={2} md={2}>
                  <Row justify={'start'}>
                    <Col>
                      <AntButton
                        label={t('show')}
                        htmlType="submit"
                        isError={isError}
                        isLoading={isLoading || isFetching}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  );
}
export default SearchCriteria;
