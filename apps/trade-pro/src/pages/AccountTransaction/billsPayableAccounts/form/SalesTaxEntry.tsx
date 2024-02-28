import dayjs from 'dayjs';
import { map, size } from 'lodash';
import { useEffect } from 'react';
import { TPaymentDuesSchedules } from '../types';
import { useTranslation } from 'react-i18next';
import { useGetCreditAccountSelect } from '../query';
import { Card, Col, Row, Form, FormInstance } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AntButton, AntDatePicker, AntInputNumber, AntSelectDynamic } from '@tradePro/components';

const { useWatch } = Form;
const SalesTaxEntry = ({
  form,
  bankId,
  handleTaxTypeChange,
  setIsAddButtonClicked,
  SharedStateIncludeWHT,
  ScheduleData,
}: TDynamicForm) => {
  const formValues = useWatch<TPaymentDuesSchedules[]>('PaymentDuesSchedules', form);
  const { t } = useTranslation();

  const { data: debit, isLoading } = useGetCreditAccountSelect();

  const initialValues = {
    DueDate: '',
    Amount: null,
    DuePercentage: null,
    DueDays: null,
    TaxPrcnt: null,
    RefdocNoId: null,
    refDocumentTypeId: null,
  };

  const handleItemChange = (obj: any, index: number) => {
    form.setFields([{ name: ['PaymentDuesSchedules', index, 'TaxName'], value: obj?.TaxName }]);
    handleTaxTypeChange(obj.Id);
  };

  const handleDueDate = (value: number | any, index: number) => {
    const currentDate = dayjs(new Date());
    const newDate = currentDate.add(value, 'day');
    if (value && typeof value === 'number') {
      form.setFields([{ name: ['PaymentDuesSchedules', index, 'DueDate'], value: dayjs(newDate) }]);
    } else {
      form.setFields([{ name: ['PaymentDuesSchedules', index, 'DueDate'], value: null }]);
    }
  };
  useEffect(() => {
    form.setFields([{ name: ['PaymentDuesSchedules', 0, 'refDocumentTypeId'], value: 6 }]);
  }, [formValues]);
  console.log(formValues);
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '0.8%' }}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingBottom: '0%' }}>
            <Form.List name="PaymentDuesSchedules" initialValue={[initialValues]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className="form-list-container">
                      <Row gutter={14} style={{ marginTop: '-1%' }}>
                        <>
                          <h2 style={{ fontSize: 18 }}>Sales Tax</h2>
                          <Card style={{ width: '100%' }} bordered={false}>
                            <Row justify={'space-between'}>
                              <Col
                                xs={{ span: 24 }}
                                sm={{ span: 24 }}
                                md={{ span: 12 }}
                                lg={{ span: 12 }}
                                xl={{ span: 7 }}
                                xxl={{ span: 7 }}
                                className="formfield"
                              >
                                <AntSelectDynamic
                                  bordered={false}
                                  fieldValue="Id"
                                  fieldLabel="AccountTitle"
                                  formItemProps={{ ...field, name: [field.name, 'RefdocNoId'] }}
                                  label={t('tax_account')}
                                  options={map(debit, (item: any) => ({
                                    value: item.Id,
                                    label: item.AccountTitle,
                                  }))}
                                  // onChange={(accountId) => handleAgainstAccountChange(accountId)}
                                />
                              </Col>
                              <Col
                                xs={{ span: 24 }}
                                sm={{ span: 24 }}
                                md={{ span: 11 }}
                                lg={{ span: 11 }}
                                xl={{ span: 6 }}
                                xxl={6}
                                className="formfield"
                              >
                                <AntSelectDynamic
                                  bordered={false}
                                  label={t('tax_type')}
                                  fieldValue="Id"
                                  fieldLabel="TaxName"
                                  name={[field.name, 'PaymentDueScheduleId']}
                                  // query={useGetBankPaymentTaxType}
                                  onSelectChange={(obj) => handleItemChange(obj, field.name)}
                                />
                              </Col>
                              <Col
                                xs={{ span: 24 }}
                                sm={{ span: 24 }}
                                md={{ span: 12 }}
                                lg={{ span: 12 }}
                                xl={{ span: 4 }}
                                xxl={{ span: 4 }}
                                className="formfield"
                              >
                                <AntInputNumber
                                  readOnly
                                  bordered={false}
                                  label={t('tax_percentage')}
                                  formItemProps={{ ...field, name: [field.name, 'TaxPrcnt'] }}
                                />
                              </Col>
                              <Col
                                xs={{ span: 24 }}
                                sm={{ span: 24 }}
                                md={{ span: 11 }}
                                lg={{ span: 11 }}
                                xl={{ span: 5 }}
                                xxl={{ span: 5 }}
                                style={{ marginTop: '0%' }}
                                className="formfield"
                              >
                                <AntInputNumber
                                  readOnly
                                  bordered={false}
                                  label={t('tax_amount')}
                                  formItemProps={{ ...field, name: [field.name, 'TaxAmount'] }}
                                />
                              </Col>
                              <Col
                                xs={{ span: 24 }}
                                sm={{ span: 24 }}
                                md={{ span: 12 }}
                                lg={{ span: 12 }}
                                xl={{ span: 7 }}
                                xxl={{ span: 7 }}
                                className="formfield"
                              >
                                <AntInputNumber
                                  type="number"
                                  bordered={false}
                                  label={t('due_days')}
                                  onChange={(value) => handleDueDate(value, field.name)}
                                  formItemProps={{ ...field, name: [field.name, 'DueDays'] }}
                                />
                              </Col>
                              <Col
                                xs={{ span: 24 }}
                                sm={{ span: 24 }}
                                md={{ span: 11 }}
                                lg={{ span: 11 }}
                                xl={{ span: 6 }}
                                xxl={{ span: 6 }}
                                className="formfield"
                              >
                                <AntDatePicker
                                  bordered={false}
                                  formItemProps={{ ...field, name: [field.name, 'DueDate'] }}
                                  label={t('due_date')}
                                />
                              </Col>
                              <Col
                                xs={{ span: 24 }}
                                sm={{ span: 24 }}
                                md={{ span: 12 }}
                                lg={{ span: 12 }}
                                xl={{ span: 4 }}
                                xxl={{ span: 4 }}
                                className="formfield"
                                style={{ marginTop: '0%' }}
                              >
                                <AntInputNumber
                                  bordered={false}
                                  label={t('due_percent')}
                                  formItemProps={{ ...field, name: [field.name, 'DuePercentage'] }}
                                />
                              </Col>
                              <Col
                                xs={{ span: 24 }}
                                sm={{ span: 24 }}
                                md={{ span: 11 }}
                                lg={{ span: 11 }}
                                xl={{ span: 5 }}
                                xxl={{ span: 5 }}
                                style={{ marginTop: '0%' }}
                                className="formfield"
                              >
                                <AntInputNumber
                                  bordered={false}
                                  label={t('amount')}
                                  formItemProps={{ ...field, name: [field.name, 'Amount'] }}
                                />
                                <AntInputNumber
                                  bordered={false}
                                  label={''}
                                  style={{ display: 'none', visibility: 'hidden' }}
                                  formItemProps={{ ...field, name: [field.name, 'refDocumentTypeId'] }}
                                />
                              </Col>
                            </Row>
                            <Col span={24}>
                              <Row justify={'end'}>
                                <Col>
                                  <AntButton
                                    title="Add"
                                    type="text"
                                    onClick={() => add()}
                                    icon={<PlusOutlined className="dynamic-add-button" />}
                                  />
                                </Col>
                                <Col>
                                  <AntButton
                                    title="Delete"
                                    type="text"
                                    icon={<MinusCircleOutlined className="dynamic-delete-button" />}
                                    onClick={() => {
                                      if (size(fields) > 1) remove(field.name);
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Card>
                        </>
                      </Row>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Card>
        </Col>
      </Row>
    </>
  );
};
type TDynamicForm = {
  form: FormInstance;
  bankId: number | null;
  handleTaxTypeChange: (TaxId: number) => void;
  setIsAddButtonClicked: (id: boolean) => void;
  SharedStateIncludeWHT: boolean;
  ScheduleData: any;
};

export default SalesTaxEntry;
