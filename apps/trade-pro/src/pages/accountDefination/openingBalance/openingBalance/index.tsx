import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, Form, Row, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, SaveOutlined } from '@ant-design/icons';
import {
  useAddOpeningBalance,
  useGetByIdOpeningBalnce,
  useGetOpenBalanceHistory,
  useUpdateOpeningBalance,
} from '../quries';
import { useWatch } from 'antd/es/form/Form';
import { OpeningBalanceCriteriaTypes, TaddOpeningBalance } from '../types';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from '.././table/Atom';
import { OpeningBalanceColumns } from '../table/Columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

const { useForm } = Form;
const OpeningBalance = ({}: TupdateOpeningBalance) => {
  const [form] = useForm<TaddOpeningBalance>();
  const formValues = useWatch<TaddOpeningBalance[]>([], form);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const initialValues = {
    Id: '',
    ChartOfAccountTitle: '',
    ChartOfAccountId: null,
    Account: '',
  };
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);

  const { t } = useTranslation();

  const {
    data: openingBalanceData,
    isError: isErrorOpeningBalance,
    isLoading: isLoadingOpeningBalance,
    refetch: openingRefetch,
  } = useGetOpenBalanceHistory();

  const handleEditButtonClick = (record: any) => {
    const { AccountTitle, DebitBalance, CreditBalance, ChartofAccountId } = record;
    setSelectedRows([record]);
    setSelectedRecordId(record.Id);
    console.log(record);
    form.setFields([
      { name: 'Account', value: AccountTitle },
      { name: 'ChartOfAccountId', value: ChartofAccountId },
      { name: 'ChartOfAccountTitle', value: AccountTitle },
      { name: 'YearObDebit', value: DebitBalance },
      { name: 'YearObCredit', value: CreditBalance },
    ]);
  };

  const { data, isError, isLoading, isSuccess } = useGetByIdOpeningBalnce(false, selectedRecordId);
  const { mutate: addData } = useAddOpeningBalance();
  const { mutate: updateData, isSuccess: isSuccessUpdate } = useUpdateOpeningBalance(selectedRecordId);
  const ChartOfAccountTitle = form.getFieldValue('ChartOfAccountTitle');
  const ChartOfAccountId = form.getFieldValue('ChartOfAccountId');
  console.log(ChartOfAccountId);
  const Id = form.getFieldValue('Id');

  const onFinish = (values: TaddOpeningBalance) => {
    // console.log(values);
    values.ChartOfAccountId = ChartOfAccountId;
    values.ChartOfAccountTitle = ChartOfAccountTitle;
    values.Id = Id;
    const { YearObDebit, YearObCredit } = values;

    console.log('Form values:', values);

    // if ((!isNaN(YearObDebit) && !isNaN(YearObCredit)) || (isNaN(YearObDebit) && isNaN(YearObCredit))) {
    //   // If both YearObDebit and YearObCredit are filled or both are not filled
    //   console.log('No validation required');
    // } else if (!isNaN(YearObDebit)) {
    //   // If only YearObDebit is filled, set YearObCredit to 0
    //   YearObCredit === 0;
    // } else if (!isNaN(YearObCredit)) {
    //   // If only YearObCredit is filled, set YearObDebit to 0
    //   YearObDebit === 0;
    // }

    if (selectedRecordId) {
      updateData(values);
    } else {
      addData(values);
    }
    setSelectedRecordId(null);
  };

  const handleItemChange = (obj: OpeningBalanceCriteriaTypes, index: string) => {
    // setSelectedRecordId(obj.Id);
    console.log(obj.ChartofAccountId);

    form.setFieldValue('ChartOfAccountId', obj.ChartofAccountId);
    form.setFieldValue('ChartOfAccountTitle', obj.AccountTitle);
    form.setFieldValue('Id', obj.Id);
    const formattedDebit = numberFormatter(obj?.DebitBalance);
    const formattedCredit = numberFormatter(obj?.CreditBalance);
    form.setFields([
      { name: 'YearObDebit', value: formattedDebit },
      { name: 'YearObCredit', value: formattedCredit },
    ]);
  };

  const handleDebitAmountChange = (amount: number | string | null, fieldName: string) => {
    if (typeof amount === 'number') {
      if (amount < 0) {
        const msg = 'Amount must not be negative!';
        return notification.error({
          message: 'Error',
          description: msg,
        });
      }
    } else if (!isNaN(Number(amount))) {
      const msg = 'Amount must be a non-alphabetic numeric value!';
      notification.error({
        message: 'Error',
        description: msg,
      });
    } else {
      const msg = 'Amount must be a non-alphabetic numeric value!';
      notification.error({
        message: 'Error',
        description: msg,
      });
    }
  };

  const handleCreditAmountChange = (amount: number | string | null, fieldName: string) => {
    if (typeof amount === 'number') {
      if (amount < 0) {
        const msg = 'Amount must not be negative!';
        return notification.error({
          message: 'Error',
          description: msg,
        });
      }
    } else if (!isNaN(Number(amount))) {
      const msg = 'Amount must be a non-alphabetic numeric value!';
      notification.error({
        message: 'Error',
        description: msg,
      });
    } else {
      const msg = 'Amount must be a non-alphabetic numeric value!';
      notification.error({
        message: 'Error',
        description: msg,
      });
    }
  };

  return (
    <div style={{ background: '#fff' }}>
      <Row>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={16} className="forms-heading-container">
          <h1 className="report_heading">{t('opening_balance')}</h1>
        </Col>
      </Row>

      <Row justify={'space-around'}>
        <Col xxl={23} xl={23} sm={23} xs={23} lg={23}>
          <Card>
            <Form onFinish={onFinish} form={form} initialValues={initialValues}>
              <Col xxl={20} xl={24} lg={24} xs={24}>
                <Row gutter={[16, 16]} justify={'space-between'}>
                  <Col xl={10} xs={24} sm={24} md={12} lg={12} xxl={7} className="formfield form-container">
                    <AntSelectDynamic
                      bordered={false}
                      autoFocus={true}
                      label={t('account_title')}
                      name="Account"
                      fieldLabel="AccountTitle"
                      fieldValue="Id"
                      query={useGetOpenBalanceHistory}
                      onSelectChange={(obj) => handleItemChange(obj, 'Account')}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={6} xl={5} xxl={5} className="formfield form-container">
                    <AntInputNumber
                      label={t('debit_amount')}
                      name="YearObDebit"
                      bordered={false}
                      onChange={(event) => handleDebitAmountChange(event, 'YearObDebit')}
                    />
                  </Col>
                  <Col xs={24} sm={11} md={5} lg={5} xl={5} xxl={5} className="formfield form-container">
                    <AntInputNumber
                      label={t('credit_amount')}
                      name="YearObCredit"
                      bordered={false}
                      onChange={(event) => handleCreditAmountChange(event, 'YearObCredit')}
                    />
                  </Col>
                  {/* 
                <Col xs={24} sm={12} md={12} lg={12} xl={5} className="formfield" offset={1}>
                  <AntInput label={t('credit_amount')} name="AccountTitle2" bordered={false} />
                </Col> */}
                  {/* 
                  <Col xs={10} sm={8} md={5} lg={5} xl={3} xxl={2} className="btn-margin-top">
                    <AntButton label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                  </Col> */}
                  <Col xs={10} sm={8} md={5} lg={5} xl={3} xxl={3} className="btn-margin-top">
                    <AntButton
                      label={selectedRecordId ? t('update') : t('save')}
                      htmlType="submit"
                      icon={<SaveOutlined />}
                    />
                  </Col>

                  <Col xs={10} sm={8} md={5} lg={5} xl={3} xxl={3} className="btn-margin-top">
                    <AntButton
                      danger
                      ghost
                      htmlType="reset"
                      onClick={() => {
                        form.resetFields();
                        setSelectedRows([]);
                      }}
                      label={t('reset')}
                      icon={<SyncOutlined />}
                    />
                  </Col>
                </Row>
              </Col>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row justify={'space-around'}>
        <Col xxl={23} xl={23} xs={23} lg={23} sm={23} md={23} style={{ marginTop: '10px' }}>
          <AntTable
            columns={OpeningBalanceColumns(t, handleEditButtonClick)}
            data={openingBalanceData?.data?.Data?.Result || []}
            scroll={{ x: '', y: convertVhToPixels('48vh') }}
            isError={isErrorOpeningBalance}
            isLoading={isLoadingOpeningBalance}
            refetch={openingRefetch}
          />
        </Col>
      </Row>
    </div>
  );
};
type TupdateOpeningBalance = {
  selectedRecordId?: number | null;
};
export default OpeningBalance;
