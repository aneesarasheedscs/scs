import { AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Row, Form, FormInstance, Checkbox } from 'antd';
import { map } from 'lodash';
import { useGetBankPaymentTaxType, useGetTaxSchedule, useGetWHTAgainstAcSelect } from '../queries/queries';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { isWithHoldingCheckedAtom } from './Atom';
import { TFormDetailList } from './types';
import { totalValue, listAtomforTax } from './Atom';

const { useWatch } = Form;

const FormListt = ({ form }: FormListt) => {
  const { t } = useTranslation();
  const { setFields } = form;
  const [isWithHoldingChecked, setIsWithHoldingChecked] = useAtom(isWithHoldingCheckedAtom);
  const [taxData, setTaxData] = useState<any[]>([]);
  const [voucherDetailListforTax, setVoucherDetailListforTax] = useAtom(listAtomforTax);
  const { data: taxScheduleData } = useGetTaxSchedule();
  const { data: filter } = useGetWHTAgainstAcSelect();
  const [totalDebitAmounts, setTotalDebitAmounts] = useAtom(totalValue);

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
    IncludeWHT: null,
    AccountId: null,
    IsTaxable: null,
    Comments: null,
    CreditAmount: null,
    Amount: null,
    TaxTypeId: null,
    TaxPrcnt: null,
    TaxesTotalAmount: null,
    AgainstAccountId: null,
  };

  const handleItemChange = (obj: any, index: number) => {
    setFields([{ name: ['voucherDetailList', index, 'TaxPrcnt'], value: obj?.TaxPercent }]);
    setVoucherDetailListforTax(form.getFieldValue(['voucherDetailList', 0, 'TaxTypeId']));
  };

  useEffect(() => {
    setFields([{ name: ['voucherDetailList', 0, 'TaxPrcnt'], value: voucherDetailListforTax }]);
    setFields([{ name: ['voucherDetailList', 0, 'Amount'], value: totalDebitAmounts }]);
    setFields([{ name: ['voucherDetailList', 0, 'TaxesTotalAmount'], value: totalDebitAmounts }]);
  }, [form, totalDebitAmounts, voucherDetailListforTax]);
  console.log(form.getFieldValue(['voucherDetailList', 0, 'TaxTypeId']));
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
                        xs={{ span: 18, offset: 0 }}
                        sm={{ span: 18, offset: 1 }}
                        md={{ span: 9, offset: 0 }}
                        lg={{ span: 10, offset: 0 }}
                        xl={{ span: 7, offset: 0 }}
                        className="formfield"
                      >
                        <AntSelectDynamic
                          bordered={false}
                          label={t('tax_type')}
                          fieldValue="Id"
                          fieldLabel="TaxName"
                          name={[field.name, 'TaxTypeId']}
                          query={useGetBankPaymentTaxType}
                          onSelectChange={(obj) => handleItemChange(obj, field.name)}
                        />
                      </Col>

                      <Col
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
                      </Col>

                      <>
                        <Col
                          xs={{ span: 24, offset: 0 }}
                          sm={{ span: 21, offset: 1 }}
                          md={{ span: 9, offset: 1 }}
                          lg={{ span: 10, offset: 1 }}
                          xl={{ span: 6, offset: 1 }}
                          className="formfield"
                        >
                          <AntInputNumber
                            readOnly
                            disabled={!isWithHoldingChecked}
                            bordered={false}
                            label={t('tax_percentage')}
                            formItemProps={{ ...field, name: [field.name, 'TaxPrcnt'] }}
                          />
                        </Col>

                        <Col
                          xs={{ span: 24, offset: 0 }}
                          sm={{ span: 21, offset: 1 }}
                          md={{ span: 9, offset: 0 }}
                          lg={{ span: 10, offset: 0 }}
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
                          md={{ span: 9, offset: 4 }}
                          lg={{ span: 10, offset: 3 }}
                          xl={{ span: 7, offset: 0 }}
                          className="formfield"
                          style={{ marginTop: '1%' }}
                        >
                          <AntInputNumber
                            readOnly
                            disabled={!isWithHoldingChecked}
                            bordered={false}
                            label={t('amount')}
                            formItemProps={{ ...field, name: [field.name, 'Amount'] }}
                          />
                        </Col>

                        <Col
                          xs={{ span: 24, offset: 0 }}
                          sm={{ span: 21, offset: 1 }}
                          md={{ span: 9, offset: 0 }}
                          lg={{ span: 10, offset: 0 }}
                          xl={{ span: 6, offset: 2 }}
                          style={{ marginTop: '1%' }}
                          className="formfield"
                        >
                          <AntInputNumber
                            readOnly
                            disabled={!isWithHoldingChecked}
                            bordered={false}
                            label={t('tax_amount')}
                            formItemProps={{ ...field, name: [field.name, 'CreditAmount'] }}
                          />
                        </Col>

                        <Col
                          xs={{ span: 24, offset: 0 }}
                          sm={{ span: 21, offset: 1 }}
                          md={{ span: 9, offset: 4 }}
                          lg={{ span: 10, offset: 3 }}
                          xl={{ span: 7, offset: 1 }}
                          style={{ marginTop: '1%' }}
                          className="formfield"
                        >
                          <AntInputNumber
                            readOnly
                            disabled={!isWithHoldingChecked}
                            bordered={false}
                            label={t('total_amount')}
                            formItemProps={{ ...field, name: [field.name, 'TaxesTotalAmount'] }}
                            // name="TaxesTotalAmount"
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
