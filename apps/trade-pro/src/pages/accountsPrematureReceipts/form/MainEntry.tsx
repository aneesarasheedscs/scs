import { AntButton, AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, FormInstance, Row } from 'antd';
import { FormRowGutter } from '@tradePro/globalAtoms';
import { useTranslation } from 'react-i18next';
import { map } from 'lodash';
import EntryTable from './EntryTable';
import { useGetReceiverAccount, useGetRepresentativeAccount, useGetSenderAccount, useGetSenderBank } from '../queries';
import { useEffect, useState } from 'react';
import { TAccountsPrematureReceiptsList } from '../types';
import BankName from './definitionScreens/BankName';
import DefineOtherParties from './definitionScreens/DefineOtherParties';

function MainEntry({ form }: TMainEntrnyProps) {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState<TAccountsPrematureReceiptsList[]>([]);
  const formValues = form.getFieldsValue();
  const handleAddFormValues = () => {
    console.log(form.getFieldsValue());

    setTableData([formValues]);
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
  const handleSelectSenderAc = (obj: any) => {
    form.setFieldValue('SenderAccount', obj);
  };
  const handleSelectReceiverAc = (obj: any) => {
    form.setFieldValue('ReceiverAccount', obj);
  };
  const handleSelectRepresentativeAc = (obj: TRepresentativeAc) => {
    form.setFieldValue('RepresentativeAccount', obj?.PartyName);
  };
  useEffect(() => {
    form.setFieldValue('EntryStatus', 'Pending');
  }, []);
  return (
    <>
      <Card className="header_card">
        <Row gutter={FormRowGutter} justify={'space-between'} style={{ border: '', marginTop: '-1%' }} align={'top'}>
          <Col xl={7} xxl={4} sm={18} xs={23} lg={12} md={12} className="formfield">
            <AntInput name="TrackingSlipRef" label={t('tracking_slip')} bordered={false} />
          </Col>
          <Col xl={7} xxl={4} sm={18} xs={23} lg={12} md={12} className="formfield">
            <AntInput name="SlipAmount" label={t('slip_amount')} bordered={false} />
          </Col>
          <Col xl={8} xxl={4} sm={18} lg={11} xs={23} md={11} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('voucher_type')}
              fieldValue="Id"
              fieldLabel="Name"
              name="VouchersId"
              options={map(voucherType, (item) => ({
                value: item.Id,
                label: item.Name,
              }))}
              onSelect={(Id) => handleVoucherTypeChange(Id)}
            />
            <AntInput name="VoucherType" label="" style={{ display: 'none' }} />
          </Col>
          <Col xl={8} xxl={5} sm={18} lg={12} xs={23} md={12} className="formfield_for_screen">
            <Row gutter={[10, 0]} justify={'space-between'}>
              <Col span={20} className="formfield">
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
              <Col span={4}>
                <Form.Item style={{ marginTop: 0, marginRight: 0 }}>
                  <BankName />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xl={8} xxl={6} sm={18} lg={12} xs={23} md={12} className="formfield_for_screen">
            <Row gutter={[10, 6]} justify={'space-between'}>
              <Col span={20} className="formfield">
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
              <Col span={4}>
                <Form.Item style={{ marginTop: 0, marginRight: 0 }}>
                  <DefineOtherParties />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xl={8} xxl={5} sm={18} lg={12} xs={23} md={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('sender_account')}
              fieldValue="Id"
              fieldLabel="CompName"
              name="ChartOfAccountIdSender"
              query={useGetSenderAccount}
              onSelectChange={(obj) => handleSelectSenderAc(obj)}
            />
            <AntInput name="SenderAccount" label="" style={{ display: 'none' }} />
          </Col>
          <Col xl={8} xxl={5} sm={18} lg={12} xs={23} md={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('receiver_account')}
              fieldValue="Id"
              fieldLabel="CompName"
              name="ChartOfAccountIdReceiver"
              query={useGetReceiverAccount}
              onSelectChange={(obj) => handleSelectReceiverAc(obj)}
            />
            <AntInput name="ReceiverAccount" label="" style={{ display: 'none' }} />
          </Col>
          <Col xl={8} xxl={4} sm={18} lg={12} xs={23} md={12} className="formfield">
            <AntInput bordered={false} label={t('cheque_no')} name="ChequeNo" />
          </Col>
          <Col xl={8} xxl={5} sm={18} lg={12} xs={23} md={12} className="formfield">
            <AntDatePicker autoFocus required name="ChequeDate" label={t('cheque_date')} bordered={false} />
          </Col>
          <Col xl={8} xxl={4} sm={18} lg={12} xs={23} md={12} className="formfield">
            <AntInput bordered={false} label={t('amount')} name="Amount" />
          </Col>
          <Col xl={8} xxl={4} sm={18} lg={12} xs={23} md={12} className="formfield">
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

          <Col xl={11} xxl={6} lg={24} sm={18} xs={23} md={20} className="formfield">
            <AntInput name="RemarksHeader" label={t('remarks')} bordered={false} />
          </Col>
          <Col xl={11} xxl={13} lg={24} sm={18} xs={23} md={20} className=" ">
            <Row gutter={[6, 0]} justify={'start'}>
              <Col>
                <AntButton label="Add" onClick={handleAddFormValues} />
              </Col>
              <Col>
                <AntButton className="reset_btn" label="Cancel" onClick={() => form.resetFields()} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <EntryTable tableData={tableData} />
    </>
  );
}

export default MainEntry;
interface TMainEntrnyProps {
  form: FormInstance;
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
