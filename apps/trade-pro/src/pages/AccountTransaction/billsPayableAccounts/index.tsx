import { Col, Row, Tabs, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.scss';
import { useTranslation } from 'react-i18next';
import BillsPayableForm from './form';
import BillsPayableHistory from './table/billsPayableHistory';
import { useGetBillsPayableAccountsDetailById } from './query';
import { useAtom } from 'jotai';
import { viewDetailList } from './form/Atom';

function BillsPayableAccounts() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [selectedRecordDetailId, setSelectedRecordDetailId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  // const {
  //   data: addBankPayment,
  //   refetch: refetchBankPayment,
  //   isSuccess: isDataSuccess,
  // } = useGetBankPaymentVoucherById(selectedRecordId);
  const { data, refetch, isSuccess, isLoading } = useGetBillsPayableAccountsDetailById(selectedRecordDetailId);
  useEffect(() => {
    if (isSuccess) {
      setViewDetail(data?.data?.Data?.Result?.voucherDetailList);
    }
  }, [isSuccess, !isLoading]);
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <>
      <Row style={{ background: '', marginLeft: '', marginTop: '0%' }}>
        <Col span={24}>
          <h2 className="form-heading">{t('bills_payable_accounts')}</h2>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('history')}>
              <BillsPayableHistory
                setSelectedRecordId={setSelectedRecordId}
                setActiveTab={setActiveTab}
                setSelectedRecordDetailId={setSelectedRecordDetailId}
                refetch={refetch}
                isLoading={isLoading}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('form')}>
              <BillsPayableForm
                selectedRecordId={selectedRecordId}
                setSelectedRecordId={setSelectedRecordId}
                // addBankPayment={addBankPayment}
                // refetchBankPayment={refetchBankPayment}
                // isDataSuccess={isDataSuccess}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default BillsPayableAccounts;
