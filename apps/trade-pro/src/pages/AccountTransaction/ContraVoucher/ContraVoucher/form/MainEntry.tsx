import { map } from 'lodash';
import {
  useGetAccountsBalances,
  useGetConfigration,
  useGetContraChequeNoSelect,
  useGetContraCreditAccountSelect,
  useGetContraProjectSelect,
} from '../queries/queries';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, FormInstance } from 'antd';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';

const MainEntry = ({ form, setBankId, bankId }: TDynamicForm) => {
  const { t } = useTranslation();
  const { data } = useGetAccountsBalances(bankId);
  const { data: project, isSuccess, isLoading } = useGetContraProjectSelect();
  const [chequeBookEnabled, setChequeBookEnabled] = useState(false);
  const { data: credit } = useGetContraCreditAccountSelect();
  const { data: chequeBooks } = useGetContraChequeNoSelect(bankId);
  const { data: chequeNoCompulsoryConfig } = useGetConfigration('ChequeNoCompulsoryOnBpv');
  const isChequeNoCompulsory = chequeNoCompulsoryConfig?.data?.Data?.Result === 'True';
  useEffect(() => {
    if (data?.data?.Data?.Result?.[0]?.Balance !== undefined) {
      form.setFieldsValue({ Balance: data?.data?.Data?.Result?.[0]?.Balance });
    }
  }, [credit, bankId, data?.data?.Data?.Result]);
  useEffect(() => {
    if (isSuccess && !isLoading) {
      form.setFieldValue('ProjectId', project?.data?.Data?.Result?.[0]?.ProjectName);
    }
  }, [isSuccess, !isLoading]);

  const handleCreditAccountChange = (accountId?: any) => {
    setBankId(accountId);
  };

  const chequeBookOptions =
    chequeBooks?.data?.Data?.Result?.map((chequeBook: any) => ({
      label: chequeBook.CheqNo,
      value: chequeBook.Id,
    })) || [];
  console.log(form.getFieldValue('VoucherAmount'));
  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-0.3%', marginBottom: '0.5%' }}>
        <Col span={24}>
          <Card style={{ paddingBottom: '0.5%', boxShadow: '2px 4px 12px 1px gray' }}>
            <div className="form-list-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Col
                xs={{ span: 23 }}
                sm={{ span: 22 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 10 }}
                xxl={{ span: 6 }}
                className="formfield"
              >
                <AntSelectDynamic
                  disabled
                  bordered={false}
                  label={t('cost_center')}
                  fieldValue="Id"
                  fieldLabel="ProjectName"
                  name="ProjectId"
                  query={useGetContraProjectSelect}
                />
              </Col>
              <Col
                xs={{ span: 23 }}
                sm={{ span: 22 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 6 }}
                xxl={{ span: 5 }}
                className="formfield"
              >
                <AntDatePicker bordered={false} name="ChequeDate" label={t('cheque_date')} />
              </Col>

              <Col
                xs={{ span: 23 }}
                sm={{ span: 22 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 7 }}
                xxl={{ span: 7 }}
                className="formfield credit"
              >
                <p style={{ marginLeft: '55%' }} className="cr">
                  Dr : <b> {numberFormatter(data?.data?.Data?.Result?.[0]?.Balance)}</b>
                </p>

                <p style={{ marginTop: -6 }}>
                  <AntSelectDynamic
                    required
                    bordered={false}
                    label={t('credit_account')}
                    fieldValue="Id"
                    fieldLabel="AccountTitle"
                    name="RefAccountId"
                    options={map(credit, (item: any) => ({
                      value: item.Id,
                      label: item.AccountTitle,
                    }))}
                    value={bankId}
                    onChange={(value) => handleCreditAccountChange(value)}
                  />
                </p>
              </Col>

              <Col
                xs={{ span: 23 }}
                sm={{ span: 22 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 5 }}
                xxl={{ span: 4 }}
                className="formfield"
              >
                {chequeBookEnabled ? (
                  <AntInput bordered={false} label={t('cheque_no')} name="CheqId" required={isChequeNoCompulsory} />
                ) : (
                  <AntSelectDynamic
                    bordered={false}
                    fieldValue="Id"
                    fieldLabel="ChequeNo"
                    name="CheqId"
                    label={t('cheque_no')}
                    required={isChequeNoCompulsory}
                    options={chequeBookOptions}
                  />
                )}
              </Col>
              <Col
                xs={{ span: 23 }}
                sm={{ span: 22 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 11 }}
                xxl={{ span: 6 }}
                className="formfield paytitle"
              >
                <AntInput name="PayTitle" bordered={false} label={t('pay_title')} />
              </Col>
              <Col
                xs={{ span: 23 }}
                sm={{ span: 22 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 7 }}
                xxl={{ span: 13 }}
                className="formfield"
              >
                <AntInput bordered={false} name="Remarks" label={t('remarks')} />
              </Col>
              <Col
                xs={{ span: 0 }}
                sm={{ span: 0 }}
                md={{ span: 0 }}
                lg={{ span: 0 }}
                xl={{ span: 0 }}
                xxl={{ span: 4 }}
                className="formfield2"
              >
                <AntInput
                  bordered={false}
                  label={t('')}
                  name="VoucherAmount"
                  style={{ display: 'none', visibility: 'hidden' }}
                />
              </Col>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

type TDynamicForm = {
  form: FormInstance;
  setBankId: (id: number | null) => void;
  bankId: number | null;
};

export default MainEntry;
