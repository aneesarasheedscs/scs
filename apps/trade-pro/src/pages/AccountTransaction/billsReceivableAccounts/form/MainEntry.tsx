import { map } from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, FormInstance } from 'antd';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useGetAccountsBalance, useGetBPAProjectSelect, useGetCreditAccountSelect } from '../query';

import dayjs from 'dayjs';
function MainEntry({
  form,
  setBankId,
  bankId,
  setSharedStateIncludeWHT,
  SharedStateIncludeWHT,
  ScheduleData,
  isAddButtonClicked,
}: TDynamicForm) {
  const { t } = useTranslation();
  const { data: credit } = useGetCreditAccountSelect();
  const { data } = useGetAccountsBalance(bankId);
  const { data: project, isSuccess, isLoading } = useGetBPAProjectSelect();
  useEffect(() => {
    if (isSuccess && !isLoading) {
      form.setFieldValue('ProjectId', project?.data?.Data?.Result?.[0]?.ProjectName);
      form.setFieldValue('DueDate', dayjs(new Date()));
    }
  }, [isSuccess, !isLoading]);

  useEffect(() => {
    if (data?.data?.Data?.Result?.[0]?.Balance !== undefined) {
      form.setFieldsValue({ Balance: data?.data?.Data?.Result?.[0]?.Balance.toFixed(2) });
    }
  }, [credit, bankId, data?.data?.Data?.Result]);
  // useEffect(() => {
  //   if (SharedStateIncludeWHT && ScheduleData) {
  //     form.setFieldValue('AgainstAccountId', ScheduleData?.TaxGLAccountId);
  //   } else {
  //     form.setFieldValue('AgainstAccountId', ScheduleData?.TaxGLAccountId);
  //   }
  // }, [form, SharedStateIncludeWHT, ScheduleData]);
  const handleCreditAccountChange = (accountId?: any, index?: any) => {
    setBankId(accountId);
  };

  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-0.5%' }}>
        <Col span={24}>
          <Card style={{ paddingBottom: '0.5%', boxShadow: '2px 4px 12px 1px gray' }}>
            <Row gutter={[10, 10]} justify={'space-between'} style={{ marginLeft: 10 }}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 23 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 7 }}
                xxl={{ span: 6 }}
                className="formfield"
              >
                <AntSelectDynamic
                  aria-readonly
                  bordered={false}
                  label={t('project')}
                  fieldValue="Id"
                  fieldLabel="ProjectName"
                  name="ProjectId"
                  query={useGetBPAProjectSelect}
                />
              </Col>

              <Col
                xs={{ span: 24 }}
                sm={{ span: 23 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 9 }}
                xxl={{ span: 7 }}
                className="formfield"
              >
                <p style={{ marginTop: -18, marginLeft: '65%' }} className="cr">
                  Dr :<b> {numberFormatter(data?.data?.Data?.Result?.[0]?.Balance)}</b>
                </p>

                <p style={{ marginTop: -4 }}>
                  <AntSelectDynamic
                    required
                    bordered={false}
                    label={t('debit_account')}
                    fieldValue="Id"
                    fieldLabel="AccountTitle"
                    name="RefAccountId"
                    options={map(credit, (item) => ({
                      value: item.Id,
                      label: item.AccountTitle,
                    }))}
                    query={useGetCreditAccountSelect}
                    onChange={(accountId) => handleCreditAccountChange(accountId)}
                    disabled={!isAddButtonClicked}
                  />
                </p>
              </Col>

              <Col
                xs={{ span: 24 }}
                sm={{ span: 23 }}
                md={{ span: 11 }}
                lg={{ span: 11 }}
                xl={{ span: 7 }}
                xxl={{ span: 5 }}
                className="formfield"
              >
                <AntDatePicker bordered={false} name="DueDate" label={t('invoice_date')} />
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 23 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 7 }}
                xxl={{ span: 4 }}
                style={{ marginTop: '0%' }}
                className="formfield"
              >
                <AntInputNumber name="ManualBillNo" label="Invoice No" bordered={false} />
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 23 }}
                md={{ span: 24 }}
                lg={{ span: 24 }}
                xl={{ span: 16 }}
                xxl={{ span: 13 }}
                style={{ marginTop: '0%' }}
                className="formfield"
              >
                <AntInput bordered={false} name="Remarks" label={t('remarks')} />
                <AntInput bordered={false} label={t('')} name="VoucherAmount" style={{ display: 'none' }} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}
type TDynamicForm = {
  form: FormInstance;
  setBankId: any;
  bankId: any;
  setSharedStateIncludeWHT: any;
  SharedStateIncludeWHT: any;
  ScheduleData: any;
  isAddButtonClicked: any;
};

export default MainEntry;
