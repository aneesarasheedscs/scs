import { AntButton, AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, FormInstance, Row, notification } from 'antd';
import { FormRowGutter } from '@tradePro/globalAtoms';
import { useTranslation } from 'react-i18next';
import { forEach, map } from 'lodash';
import EntryTable from './EntryTable';
import { useGetReceiverAccount, useGetRepresentativeAccount, useGetSenderAccount, useGetSenderBank } from '../queries';
import { useEffect, useState } from 'react';
import { TAccountsPrematureReceiptsList } from '../types';
import BankName from './definitionScreens/BankName';
import DefineOtherParties from './definitionScreens/DefineOtherParties';
import { storedUserDetail } from '@tradePro/utils/storageService';

function MainEntry({ form, refetch, tableData, setTableData }: TMainEntrnyProps) {
  const { t } = useTranslation();
  const userDetail = storedUserDetail();

  const handleAddFormValues = () => {
    const values = form.getFieldsValue();
    const slipAmount = values?.SlipAmount;
    const senderBank = values?.BankId;
    const senderAccount = values?.ChartOfAccountIdSender;
    const receiverAccount = values?.ChartOfAccountIdReceiver;
    const representativeAccount = values?.SupplierCustomerIdSalesMan;
    const VouchersId = values?.VouchersId;
    const amount = values?.Amount;
    const tracking_slip = values?.TrackingSlipRef;

    if (slipAmount) {
      // Convert chequeNo to number and ensure it's a positive integer
      const numberOfEntries = parseInt(slipAmount);
      const Amount = parseInt(amount ? amount : 0);
      if (!isNaN(numberOfEntries) && numberOfEntries > 0) {
        // Create an array with length numberOfEntries filled with values
        const entriesToAdd = Array.from({ length: 1 }, () => values);

        const updatedRecord = entriesToAdd.map((item: any) => ({
          ...item,

          Amount,
        }));
        if (Amount > slipAmount) {
          notification.error({
            message: 'Error',
            description: 'Amount cannot be greater than SlipAmount!',
          });
          return;
        }

        if (tableData?.length > 0 && tracking_slip !== tableData?.[0]?.TrackingSlipRef) {
          notification.error({
            message: 'Error',
            description: 'Cannot add different Tracking Slip!',
          });
          return;
        }
        if (tableData?.length > 0 && slipAmount !== tableData?.[0]?.SlipAmount) {
          notification.error({
            message: 'Error',
            description: 'Cannot add different Slip Amount!',
          });
          return;
        }
        if (tableData?.length > 0 && VouchersId !== tableData?.[0]?.VouchersId) {
          notification.error({
            message: 'Error',
            description: 'Cannot add different Voucher against Tracking Slip!',
          });
          return;
        }
        if (tableData?.length > 0 && senderBank !== tableData?.[0]?.BankId) {
          notification.error({
            message: 'Error',
            description: 'Cannot add different Sender Bank against Tracking Slip!',
          });
          return;
        }
        if (tableData?.length > 0 && receiverAccount !== tableData?.[0]?.ChartOfAccountIdReceiver) {
          notification.error({
            message: 'Error',
            description: 'Cannot add different Receiver account against Tracking Slip!',
          });
          return;
        }
        if (tableData?.length > 0 && senderAccount !== tableData?.[0]?.ChartOfAccountIdSender) {
          notification.error({
            message: 'Error',
            description: 'Cannot add different sender account against Tracking Slip!',
          });
          return;
        }

        if (tableData?.length > 0 && representativeAccount !== tableData?.[0]?.SupplierCustomerIdSalesMan) {
          notification.error({
            message: 'Error',
            description: 'Cannot add different representative account against Tracking Slip!',
          });
          return;
        } else {
          setTableData([...tableData, ...updatedRecord]);
        }
        // Add entries to tableData
      }
    } else {
      // If slipAmount is not defined or null, show error

      notification.error({
        message: 'Error',
        description: 'SlipAmount  is not defined! ',
      });
      return;
      // setTableData([...tableData, values]);
    }
  };
  console.log(tableData);

  const Status: TStatus[] = [
    {
      Id: 1,
      Status: 'Pending',
    },
    {
      Id: 2,
      Status: 'Approved',
    },
    {
      Id: 3,
      Status: 'All',
    },
  ];

  const handleSelectSenderBank = (obj: TSenderBank) => {
    form.setFieldValue('SenderBank', obj?.BankName);
  };
  const handleSelectSenderAc = (obj: TSenderReceiverAccount) => {
    form.setFieldValue('SenderAccount', obj?.AccountTitle);
  };
  const handleSelectReceiverAc = (obj: TSenderReceiverAccount) => {
    form.setFieldValue('ReceiverAccount', obj?.AccountTitle);
  };
  const handleSelectRepresentativeAc = (obj: TRepresentativeAc) => {
    form.setFieldValue('RepresentativeAccount', obj?.PartyName);
  };
  useEffect(() => {
    form.setFieldValue('EntryStatus', 'Pending');
  }, []);
  const handleResetFields = () => {
    form.resetFields();
    refetch();
    form.setFieldValue('EntryStatus', 'Pending');
  };
  return (
    <>
      <Card className="header_card">
        <Row gutter={FormRowGutter} justify={'space-between'} style={{ border: '', marginTop: '-0.5%' }} align={'top'}>
          <Col xl={7} xxl={3} sm={18} xs={24} lg={11} md={11} className="formfield">
            <AntInput autoFocus name="TrackingSlipRef" label={t('tracking_slip')} bordered={false} />
          </Col>
          <Col xl={7} xxl={4} sm={18} xs={24} lg={12} md={12} className="formfield" style={{ marginRight: 0 }}>
            <AntInput required name="SlipAmount" label={t('slip_amount')} bordered={false} />
          </Col>

          <Col xl={8} xxl={5} sm={19} lg={11} xs={24} md={11} className="formfield_for_screen">
            <Row gutter={[10, 0]} justify={'space-between'}>
              <Col span={21} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  label={t('sender_bank')}
                  fieldValue="Id"
                  fieldLabel="BankName"
                  name="BankId"
                  query={useGetSenderBank}
                  onSelectChange={(obj) => handleSelectSenderBank(obj)}
                />
                <AntInput name="SenderBank" label="" style={{ display: 'none' }} />
              </Col>
              <Col span={3}>
                <Form.Item style={{ marginTop: 0, marginRight: 0 }}>
                  <BankName />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xl={7} xxl={6} sm={19} lg={12} xs={24} md={12} className="formfield_for_screen">
            <Row gutter={[10, 6]} justify={'space-between'}>
              <Col span={21} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  label={t('representative_account')}
                  fieldValue="Id"
                  fieldLabel="PartyName"
                  name="SupplierCustomerIdSalesMan"
                  query={useGetRepresentativeAccount}
                  onSelectChange={(obj) => handleSelectRepresentativeAc(obj)}
                />
                <AntInput name="RepresentativeAccount" label="" style={{ display: 'none' }} />
              </Col>
              <Col span={3}>
                <Form.Item style={{ marginTop: 0, marginRight: 0 }}>
                  <DefineOtherParties />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xl={7} xxl={5} sm={18} lg={11} xs={24} md={11} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('sender_account')}
              fieldValue="Id"
              fieldLabel="AccountTitle"
              name="ChartOfAccountIdSender"
              query={useGetSenderAccount}
              onSelectChange={(obj) => handleSelectSenderAc(obj)}
              disabled={userDetail?.PartyGlAccountId == 0 ? false : true}
            />
            <AntInput name="SenderAccount" label="" style={{ display: 'none' }} />
          </Col>
          <Col xl={8} xxl={7} sm={18} lg={12} xs={24} md={12} className="formfield_for_screen">
            <Row gutter={[6, 0]} justify={'center'} style={{ marginRight: -15 }}>
              <Col span={24} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  label={t('receiver_account')}
                  fieldValue="Id"
                  fieldLabel="AccountTitle"
                  name="ChartOfAccountIdReceiver"
                  query={() => useGetReceiverAccount(form.getFieldValue('VouchersId'))}
                  onSelectChange={(obj) => handleSelectReceiverAc(obj)}
                />
              </Col>
            </Row>
            <AntInput name="ReceiverAccount" label="" style={{ display: 'none' }} />
          </Col>
          <Col xl={7} xxl={5} sm={18} lg={11} xs={24} md={11} className="formfield" style={{ marginLeft: 10 }}>
            <AntInput bordered={false} label={t('cheque_no')} name="ChequeNo" />
          </Col>
          <Col xl={7} xxl={6} sm={18} lg={12} xs={24} md={12} className="formfield">
            <AntDatePicker name="ChequeDate" label={t('cheque_date')} bordered={false} />
          </Col>
          <Col xl={8} xxl={5} sm={18} lg={11} xs={24} md={11} className="formfield">
            <AntInput bordered={false} label={t('amount')} name="Amount" />
          </Col>
          <Col xl={7} xxl={7} sm={18} lg={12} xs={24} md={12} className="formfield_for_screen">
            <Row gutter={[6, 0]} justify={'center'} style={{ marginRight: -15 }}>
              <Col span={24} className="formfield">
                <AntSelectDynamic
                  bordered={false}
                  label={t('status')}
                  fieldValue="Id"
                  fieldLabel="Status"
                  name="EntryStatus"
                  disabled
                  options={map(Status, (item: any) => ({
                    value: item.Status,
                    label: item.Status,
                  }))}
                />
              </Col>
            </Row>
          </Col>

          <Col xl={16} xxl={12} lg={24} sm={18} xs={24} md={24} className="formfield_for_screen">
            <Row gutter={[10, 0]} justify={'center'} style={{ marginRight: -15 }}>
              <Col xxl={22} xl={23} lg={24} md={24} sm={24} xs={24} className="formfield">
                <AntInput name="RemarksHeader" label={t('remarks')} bordered={false} />
              </Col>
            </Row>
          </Col>
          <Col xl={11} xxl={5} lg={24} sm={18} xs={24} md={20} className=" ">
            <Row gutter={[6, 0]} justify={'start'}>
              <Col>
                <AntButton label="Add" onClick={handleAddFormValues} />
              </Col>
              <Col>
                <AntButton className="reset_btn" label="Cancel" onClick={handleResetFields} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <EntryTable form={form} tableData={tableData} setTableData={setTableData} />
    </>
  );
}

export default MainEntry;
interface TMainEntrnyProps {
  form: FormInstance;
  refetch: () => void;
  tableData: TAccountsPrematureReceiptsList[];
  setTableData: (ary: TAccountsPrematureReceiptsList[]) => void;
}
interface TVoucherType {
  Id: number;
  Name: string;
}
interface TStatus {
  Id: number;
  Status: string;
}
interface TSenderBank {
  Id: number;
  BankName: string;
}
interface TRepresentativeAc {
  Id: number;
  PartyName: string;
}
interface TSenderReceiverAccount {
  Id: number;
  AccountTitle: string;
}
