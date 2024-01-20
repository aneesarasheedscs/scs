import { AntButton, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  useAddOpeningBalance,
  useGetOpenBalanceHistory,
  useGetOpeningBalanceATitle,
  useUpdateOpeningBalance,
} from '../quries';
import OpeningBalanceTable from '../table';
import { useWatch } from 'antd/es/form/Form';
import { OpeningBalanceCriteriaTypes, TaddOpeningBalance } from '../types';
import { useEffect } from 'react';
import { isNumber } from 'lodash';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from '.././table/Atom';

const { useForm } = Form;

const OpeningBalance = ({ selectedRecordId }: any) => {
  const [form] = useForm<TaddOpeningBalance>();
  const formValues = useWatch<TaddOpeningBalance>([], form);
  // const [form] = useForm<TaddOpeningBalance>(); // Use a generic form with the expected type
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const { t } = useTranslation();

  const Id = form.getFieldValue('AccountTitle');
  const { data, isError, isLoading, isSuccess } = useGetOpeningBalanceATitle(true, Id);
  const { mutate: addData } = useAddOpeningBalance();
  const { mutate: updateData, isSuccess: isSuccessUpdate } = useUpdateOpeningBalance(selectedRecordId);

  const onFinish = (values: TaddOpeningBalance) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      updateData(values);
    } else {
      addData(values);
    }
  };

  const handleItemChange = (obj: OpeningBalanceCriteriaTypes, index: string) => {
    // form.setFields([{ name: 'AccountTitle', value: obj.Id }]);
    // if (isSuccess && !isLoading) {
    //   form.setFields([
    //     { name: 'DebitAmount', value: data?.data?.Data?.Result?.[0]?.YearObDebit },
    //     { name: 'CreditAmount', value: data?.data?.Data?.Result?.[0]?.YearObCredit },
    //   ]);
    // }
  };
  const accountTitle = selectedRows?.[0]?.AccountTitle;
  const debitBalance = selectedRows?.[0]?.DebitBalance;
  const creditBalance = selectedRows?.[0]?.CreditBalance;
  console.log(accountTitle);
  useEffect(() => {
    if (isSuccess && !isLoading) {
      form.setFields([
        { name: 'DebitAmount', value: data?.data?.Data?.Result?.[0]?.YearObDebit },
        { name: 'CreditAmount', value: data?.data?.Data?.Result?.[0]?.YearObCredit },
      ]);
    }
  }, [isSuccess, isLoading]);
  // const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  // form.setFields([{ name: 'AccountTitle', value: selectedRows }]);
  if (selectedRows && selectedRows.length > 0) {
    form.setFields([{ name: 'AccountTitle', value: accountTitle }]);
    form.setFields([{ name: 'DebitAmount', value: debitBalance }]);
    form.setFields([{ name: 'CreditAmount', value: creditBalance }]);
  }
  return (
    <div style={{ background: '#fff' }}>
      <Row>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={16} className="forms-heading-container">
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '10px' }}>{t('opening_balance')}</h1>
        </Col>
      </Row>

      <Row justify={'space-around'}>
        <Col xxl={23} xl={23} sm={23} xs={23} lg={23}>
          <Card>
            <Form onFinish={onFinish} form={form}>
              <Col xxl={15} xl={24} lg={24} xs={24}>
                <Row gutter={[16, 16]} justify={'space-between'}>
                  <Col xl={10} xs={24} sm={24} md={12} lg={12} xxl={11} className="formfield form-container">
                    <AntSelectDynamic
                      bordered={false}
                      label={t('account_title')}
                      name="AccountTitle"
                      fieldLabel="AccountTitle"
                      fieldValue="Id"
                      query={useGetOpenBalanceHistory}
                      onSelectChange={(obj) => handleItemChange(obj, 'AccountTitle')}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={6} xl={5} xxl={4} className="formfield form-container">
                    <AntInput label={t('debit_amount')} name="DebitAmount" bordered={false} />
                  </Col>
                  <Col xs={24} sm={11} md={5} lg={5} xl={5} xxl={4} className="formfield form-container">
                    <AntInput label={t('credit_amount')} name="CreditAmount" bordered={false} />
                  </Col>
                  {/* 
                <Col xs={24} sm={12} md={12} lg={12} xl={5} className="formfield" offset={1}>
                  <AntInput label={t('credit_amount')} name="AccountTitle2" bordered={false} />
                </Col> */}

                  <Col xs={10} sm={8} md={5} lg={5} xl={3} xxl={3} className="btn-margin-top">
                    <AntButton label={t('add')} htmlType="submit" />
                  </Col>
                </Row>
              </Col>
            </Form>
          </Card>
        </Col>
      </Row>

      <OpeningBalanceTable />
    </div>
  );
};
export default OpeningBalance;
