import { Card, Col, Row, Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';
import BankPaymentVoucherForm from './form';
import { useEffect, useState } from 'react';
import BankPaymentTable from './table/bankPaymentVoucher';
import { useGetBankPaymentVoucherById } from './queries/querySave';
import { useAtom } from 'jotai';
import { viewDetailList } from './form/Atom';

function BankPaymentVoucher() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const {
    data: addBankPayment,
    refetch: refetchBankPayment,
    isSuccess: isDataSuccess,
  } = useGetBankPaymentVoucherById(selectedRecordId);
  useEffect(() => {
    if (isDataSuccess) {
      setViewDetail(addBankPayment?.data?.Data?.Result?.voucherDetailList);
    }
  }, [isDataSuccess]);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row style={{ background: '', marginLeft: '', marginTop: '0%' }}>
        <Col span={24}>
          <h2 className="form-heading">{t('bank_payment_voucher')}</h2>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('history')}>
              <BankPaymentTable setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('form')}>
              <BankPaymentVoucherForm
                selectedRecordId={selectedRecordId}
                setSelectedRecordId={setSelectedRecordId}
                addBankPayment={addBankPayment}
                refetchBankPayment={refetchBankPayment}
                isDataSuccess={isDataSuccess}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}
export default BankPaymentVoucher;
