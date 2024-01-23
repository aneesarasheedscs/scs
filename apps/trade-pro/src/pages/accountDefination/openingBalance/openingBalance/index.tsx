import { AntButton, AntInput, AntSelectDynamic, AntTable } from '@tradePro/components';
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
import { isNumber } from 'lodash';
import { useAtom } from 'jotai';
import { selectedRowsAtom, tableDataList } from '.././table/Atom';
import { OpeningBalanceColumns } from '../table/Columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

const { useForm } = Form;

const OpeningBalance = ({}: TupdateOpeningBalance) => {
  const [form] = useForm<TaddOpeningBalance>();
  const formValues = useWatch<TaddOpeningBalance[]>([], form);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();

  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);

  const { t } = useTranslation();

  const {
    data: openingBalanceData,
    isError: isErrorOpeningBalance,
    isLoading: isLoadingOpeningBalance,
    refetch: openingRefetch,
  } = useGetOpenBalanceHistory();

  const handleEditButtonClick = (record: any) => {
    const { AccountTitle, DebitBalance, CreditBalance } = record;
    setSelectedRows([record]);
    setSelectedRecordId(record.Id);
    console.log(record);
    form.setFields([
      { name: 'AccountTitle', value: AccountTitle },
      { name: 'DebitAmount', value: DebitBalance },
      { name: 'CreditAmount', value: CreditBalance },
    ]);
  };

  const Id = form.getFieldValue('AccountTitle');
  const { data, isError, isLoading, isSuccess } = useGetByIdOpeningBalnce(true, selectedRecordId);
  const { mutate: addData } = useAddOpeningBalance();
  const { mutate: updateData, isSuccess: isSuccessUpdate } = useUpdateOpeningBalance(selectedRecordId);

  const onFinish = (values: TaddOpeningBalance) => {
    // console.log(values);

    const { DebitAmount, CreditAmount } = values;

    // Log form values
    console.log('Form values:', values);

    // Validate DebitAmount
    if (!isNaN(DebitAmount) && DebitAmount < 0) {
      notification.error({
        message: 'Error',
        description: 'DebitAmount must not be negative!',
      });
      return;
    }

    // Validate CreditAmount
    if (!isNaN(CreditAmount) && CreditAmount < 0) {
      notification.error({
        message: 'Error',
        description: 'CreditAmount must not be negative!',
      });
      return;
    }

    // Check if both DebitAmount and CreditAmount are filled
    // if (!isNaN(DebitAmount) && !isNaN(CreditAmount) && (DebitAmount !== 0 || CreditAmount !== 0)) {
    //   notification.error({
    //     message: 'Error',
    //     description: 'Either DebitAmount or CreditAmount should be filled',
    //   });
    //   return;
    // }
    if (selectedRecordId) {
      updateData(values);
    } else {
      addData(values);
    }
    setSelectedRecordId(null);
  };

  // const handleItemChange = (obj: OpeningBalanceCriteriaTypes, index: string) => {
  //   form.setFields([{ name: 'AccountTitle', value: obj.Id }]);
  //   if (isSuccess && !isLoading) {
  //     form.setFields([
  //       { name: 'DebitAmount', value: data?.data?.Data?.Result?.[0]?.YearObDebit },
  //       { name: 'CreditAmount', value: data?.data?.Data?.Result?.[0]?.YearObCredit },
  //     ]);
  //   }
  // };
  const handleItemChange = (obj: OpeningBalanceCriteriaTypes, index: string) => {
    setSelectedRecordId(obj.Id);
    form.setFields([{ name: 'AccountTitle', value: obj.Id }]);
    if (isSuccess && !isLoading) {
      form.setFields([
        { name: 'DebitAmount', value: data?.data?.Data?.Result?.[0]?.YearObDebit },
        { name: 'CreditAmount', value: data?.data?.Data?.Result?.[0]?.YearObCredit },
      ]);
    }
  };
  console.log('data', data?.data?.Data?.Result?.[0]?.YearObDebit);
  // const accountTitle = selectedRows?.[0]?.AccountTitle;
  // const debitBalance = selectedRows?.[0]?.DebitBalance;
  // const creditBalance = selectedRows?.[0]?.CreditBalance;
  // console.log(accountTitle);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      form.setFields([
        { name: 'DebitAmount', value: data?.data?.Data?.Result?.[0]?.YearObDebit },
        { name: 'CreditAmount', value: data?.data?.Data?.Result?.[0]?.YearObCredit },
      ]);
    }
  }, [isSuccess, isLoading]);

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
            <Form onFinish={onFinish} form={form}>
              <Col xxl={19} xl={24} lg={24} xs={24}>
                <Row gutter={[16, 16]} justify={'space-between'}>
                  <Col xl={10} xs={24} sm={24} md={12} lg={12} xxl={8} className="formfield form-container">
                    <AntSelectDynamic
                      bordered={false}
                      autoFocus={true}
                      label={t('account_title')}
                      name="AccountTitle"
                      fieldLabel="AccountTitle"
                      fieldValue="Id"
                      query={useGetOpenBalanceHistory}
                      onSelectChange={(obj) => handleItemChange(obj, 'AccountTitle')}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={6} xl={5} xxl={4} className="formfield form-container">
                    <AntInput
                      label={t('debit_amount')}
                      name="DebitAmount"
                      bordered={false}

                      // onChange={(itemQty) => handleItemQtyChange(itemQty !== undefined ? itemQty : null, field.name)}
                    />
                  </Col>
                  <Col xs={24} sm={11} md={5} lg={5} xl={5} xxl={4} className="formfield form-container">
                    <AntInput label={t('credit_amount')} name="CreditAmount" bordered={false} />
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
                      ghost
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
