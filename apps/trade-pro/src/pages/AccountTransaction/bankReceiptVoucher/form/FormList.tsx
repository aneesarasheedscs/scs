import { AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Row, Form, FormInstance, Checkbox } from 'antd';
import { map } from 'lodash';
import { useGetBankReceiptTaxType, useGetTaxSchedule, useGetWHTAgainstAcSelect } from '../queries/queries';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { isWithHoldingCheckedAtom, totalValue } from './Atom';
import { TFormDetailList } from './types';
import { listAtomforTax } from '@tradePro/pages/bankPaymentVoucher/form/Atom';

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
  }, [form, totalDebitAmounts, voucherDetailListforTax]);
  console.log(form.getFieldValue(['voucherDetailList', 0, 'TaxTypeId']));

  return (
    <>
      <br />
      <br />
      <Row gutter={[16, 16]} style={{ marginTop: '-3.2%' }}>
        <Col span={24}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingBottom: '1%' }}>
            <Form.List name="voucherDetailList" initialValue={[initialValues]}>
              {(fields, {}) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className="form-list-container">
                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 22, offset: 1 }}
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
                          query={useGetBankReceiptTaxType}
                          onSelectChange={(obj) => handleItemChange(obj, field.name)}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 22, offset: 1 }}
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
                        sm={{ span: 22, offset: 1 }}
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
                        sm={{ span: 22, offset: 1 }}
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
                        sm={{ span: 22, offset: 1 }}
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
                        sm={{ span: 22, offset: 1 }}
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

type FormListt = { form: FormInstance };

export default FormListt;
