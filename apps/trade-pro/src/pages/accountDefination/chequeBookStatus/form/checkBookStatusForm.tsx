import { AntButton, AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, Form, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import '../style2.scss';
import { useGetBankSelect, useGetChequeBookSelect } from '../queries/queries';
import { useState } from 'react';
interface Props {
  form: FormInstance;
}
function ChequeBookStatusForm({ form }: Props) {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [bankId, setBankId] = useState<any>(null);

  const { data: filter } = useGetBankSelect();
  const handleCheckboxChangeforWHT = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };
  console.log(form.getFieldValue('BankId'));
  const handleChange = (value: number) => {
    setBankId(value);
  };
  return (
    <>
      <Row gutter={[10, 10]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ height: 'auto', paddingBottom: '1%', boxShadow: '2px 4px 12px 1px gray' }}>
            <div className="form-list-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Col xs={22} sm={23} md={9} lg={9} xl={7} xxl={7} className="formfield ">
                <AntSelectDynamic
                  bordered={false}
                  label={t('bank_account')}
                  fieldValue="Id"
                  fieldLabel="AccountTitle"
                  name="BankId"
                  query={useGetBankSelect}
                  onChange={(value) => handleChange(value)}
                />
              </Col>
              <Col xs={14} sm={16} md={8} lg={8} xl={5} xxl={5} className="formfield ">
                <AntSelectDynamic
                  bordered={false}
                  label={t('cheque_book_no')}
                  fieldValue="Id"
                  fieldLabel="CheqNo"
                  name="Id"
                  query={() => useGetChequeBookSelect(bankId)}
                />
              </Col>

              <Col xs={8} sm={7} md={5} lg={5} xl={3} xxl={2}>
                <Form.Item className="box" name="CheqCancelStatus" valuePropName="checked" initialValue={false}>
                  <Row align={'middle'} style={{ marginTop: '1%' }}>
                    <Checkbox onChange={(e) => handleCheckboxChangeforWHT(e.target.checked, 'CheqCancelStatus')}>
                      {t('cheque_no')}
                    </Checkbox>
                  </Row>
                </Form.Item>
              </Col>

              <Col xs={22} sm={23} md={23} lg={23} xl={8} xxl={8} style={{ marginTop: '0%' }} className="formfield">
                <AntInput bordered={false} label="Remarks" name="OtherRemarks" />
              </Col>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ChequeBookStatusForm;
