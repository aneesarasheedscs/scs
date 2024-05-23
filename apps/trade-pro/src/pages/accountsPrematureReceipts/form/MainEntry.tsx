import { AntButton, AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, FormInstance, Row } from 'antd';
import { FormRowGutter } from '@tradePro/globalAtoms';
import { useTranslation } from 'react-i18next';
import { forEach, map } from 'lodash';
import EntryTable from './EntryTable';
import { useGetReceiverAccount, useGetRepresentativeAccount, useGetSenderAccount, useGetSenderBank } from '../queries';
import { useEffect, useState } from 'react';
import { TAccountsPrematureReceiptsList } from '../types';
import BankName from './definitionScreens/BankName';
import DefineOtherParties from './definitionScreens/DefineOtherParties';

function MainEntry({ form, refetch, tableData, setTableData }: TMainEntrnyProps) {
  const { t } = useTranslation();
  // const [tableData, setTableData] = useState<TAccountsPrematureReceiptsList[]>([]);

  const handleAddFormValues = () => {
    const values = form.getFieldsValue();
    const slipAmount = values?.SlipAmount;
    // console.log(values);
    // setTableData([...tableData, values]);

    // If chequeNo is defined and not null
    if (slipAmount) {
      // Convert chequeNo to number and ensure it's a positive integer
      const numberOfEntries = parseInt(slipAmount);
      if (!isNaN(numberOfEntries) && numberOfEntries > 0) {
        // Create an array with length numberOfEntries filled with values
        const entriesToAdd = Array.from({ length: numberOfEntries }, () => values);
        // here divide the  slipamount with the cheque no to divide  amount in the rows
        // const updatedRecord = entriesToAdd.map((item) => ({
        //   ...item,
        //   SlipAmount: slipAmount / chequeNo,
        // }));
        // Add entries to tableData
        setTableData([...tableData, ...entriesToAdd]);
      }
    } else {
      // If chequeNo is not defined or null, simply add one entry
      setTableData([...tableData, values]);
    }
  };
  console.log(tableData);
  const voucherType: TVoucherType[] = [
    {
      Id: 3,
      Name: 'CRV',
    },
    {
      Id: 4,
      Name: 'BRV',
    },
    {
      Id: 5,
      Name: 'JV',
    },
  ];
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
  const handleVoucherTypeChange = (Id: number) => {
    if (Id === 3) {
      form.setFieldValue('VoucherType', 'CRV');
    } else if (Id === 4) {
      form.setFieldValue('VoucherType', 'BRV');
    } else if (Id === 5) {
      form.setFieldValue('VoucherType', 'JV');
    } else {
      form.setFieldValue('VoucherType', '');
    }
  };
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
