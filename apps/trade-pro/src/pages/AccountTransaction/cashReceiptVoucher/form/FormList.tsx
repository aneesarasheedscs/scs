import { AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Row, Form, FormInstance, Checkbox } from 'antd';
import { map } from 'lodash';
import { useGetCashReceiptTaxType, useGetTaxSchedule, useGetWHTAgainstAcSelect } from '../queries/queries';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { isWithHoldingCheckedAtom } from './Atom';
import { TFormDetailList } from './types';

const { useWatch } = Form;

const FormListt = ({ form }: FormListt) => {
  const { t } = useTranslation();
  const { setFields } = form;
  const [isWithHoldingChecked, setIsWithHoldingChecked] = useAtom(isWithHoldingCheckedAtom);
  const [taxData, setTaxData] = useState<any[]>([]);

  const { data: taxScheduleData } = useGetTaxSchedule();
  const { data: filter } = useGetWHTAgainstAcSelect();

  useEffect(() => {
    if (taxScheduleData) {
      setTaxData(taxScheduleData.data);
    }
  }, [taxScheduleData]);

  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    setIsWithHoldingChecked(isChecked);
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  const formValues = useWatch<TFormDetailList[]>('voucherDetailList', form);

  const initialValues = {
    TaxTypeId: '',
    TaxPercent: null,
    TotalAmount: null,
    Amount: null,
    TaxAmount: null,
    AgainstAccountId: '',
    IncludeWHT: '',
  };

  const handleItemChange = (obj: any, index: number) => {
    setFields([{ name: ['voucherDetailList', index, 'TaxPercent'], value: obj?.TaxPercent }]);
  };

  return (
    <>
      <br />
      <br />
      <Row gutter={[16, 16]} style={{ marginTop: '-3.2%' }}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingBottom: '1%' }}>
            <Form.List name="voucherDetailList" initialValue={[initialValues]}>
              {(fields, {}) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className="form-list-container">
                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 21, offset: 1 }}
                        md={{ span: 11, offset: 0 }}
                        lg={{ span: 11, offset: 0 }}
                        xl={{ span: 7, offset: 0 }}
                        className="formfield"
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('tax_type')}
                          fieldValue="Id"
                          fieldLabel="TaxName"
                          name={[field.name, 'TaxTypeId']}
                          query={useGetCashReceiptTaxType}
                          onSelectChange={(obj) => handleItemChange(obj, field.name)}
                        />
                      </Col>

                      {/* <Col
                        xs={{ span: 5, offset: 0 }}
                        sm={{ span: 4, offset: 0 }}
                        md={{ span: 3, offset: 0 }}
                        lg={{ span: 2, offset: 0 }}
                        xl={{ span: 1, offset: 0 }}
                      >
                        <label>
                          <Form.Item name="IncludeWHT" valuePropName="checked" initialValue={false}>
                            <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'IncludeWHT')}>
                              {t('wht')}
                            </Checkbox>
                          </Form.Item>
                        </label>
                      </Col> */}

                      <>
                        <Col
                          xs={{ span: 24, offset: 0 }}
                          sm={{ span: 21, offset: 1 }}
                          md={{ span: 11, offset: 1 }}
                          lg={{ span: 11, offset: 1 }}
                          xl={{ span: 7, offset: 1 }}
                          className="formfield"
                        >
                          <AntInputNumber
                            disabled={!isWithHoldingChecked}
                            bordered={false}
                            label={t('tax_percentage')}
                            formItemProps={{ ...field, name: [field.name, 'TaxPercent'] }}
                          />
                        </Col>

                        <Col
                          xs={{ span: 24, offset: 0 }}
                          sm={{ span: 21, offset: 1 }}
                          md={{ span: 11, offset: 0 }}
                          lg={{ span: 11, offset: 0 }}
                          xl={{ span: 7, offset: 1 }}
                          className="formfield"
                        >
                          <AntSelectDynamic
                            disabled={!isWithHoldingChecked}
                            bordered={false}
                            fieldValue="Id"
                            fieldLabel="AccountTitle"
                            formItemProps={{ ...field, name: [field.name, 'AgainstAccountId'] }}
                            label={t('wht_account')}
                            options={map(filter, (item: any) => ({
                              value: item.Id,
                              label: item.AccountTitle,
                            }))}
                          />
                        </Col>

                        <Col
                          xs={{ span: 24, offset: 0 }}
                          sm={{ span: 21, offset: 1 }}
                          md={{ span: 11, offset: 1 }}
                          lg={{ span: 11, offset: 1 }}
                          xl={{ span: 7, offset: 0 }}
                          className="formfield"
                          style={{ marginTop: '1%' }}
                        >
                          <AntInputNumber
                            disabled={!isWithHoldingChecked}
                            bordered={false}
                            label={t('amount')}
                            formItemProps={{ ...field, name: [field.name, 'Amount'] }}
                          />
                        </Col>

                        <Col
                          xs={{ span: 24, offset: 0 }}
                          sm={{ span: 21, offset: 1 }}
                          md={{ span: 11, offset: 0 }}
                          lg={{ span: 11, offset: 0 }}
                          xl={{ span: 7, offset: 1 }}
                          style={{ marginTop: '1%' }}
                          className="formfield"
                        >
                          <AntInputNumber
                            disabled={!isWithHoldingChecked}
                            bordered={false}
                            label={t('tax_amount')}
                            formItemProps={{ ...field, name: [field.name, 'TaxAmount'] }}
                          />
                        </Col>

                        <Col
                          xs={{ span: 24, offset: 0 }}
                          sm={{ span: 21, offset: 1 }}
                          md={{ span: 11, offset: 1 }}
                          lg={{ span: 11, offset: 1 }}
                          xl={{ span: 7, offset: 1 }}
                          style={{ marginTop: '1%' }}
                          className="formfield"
                        >
                          <AntInputNumber
                            disabled={!isWithHoldingChecked}
                            bordered={false}
                            label={t('total_amount')}
                            name="TotalAmount"
                          />
                        </Col>
                      </>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
            <br />
            <br />
          </Card>
        </Col>
      </Row>
    </>
  );
};

type FormListt = { form: FormInstance };

export default FormListt;
