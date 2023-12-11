import { Card, Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { useEffect, useState } from 'react';
import CashPaymentTable from './table/cashPaymentVoucher';
import CashPaymentVoucherForm from './form';
import { useAtom } from 'jotai';
import { useGetCashPaymentVoucherById } from './queries/querySave';
import { viewDetailList } from './form/Atom';

function CashPaymentVoucher() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);

  const {
    data: addCashPayment,
    refetch: refetchCashPayment,
    isSuccess: isDataSuccess,
    isLoading,
  } = useGetCashPaymentVoucherById(selectedRecordId);

  useEffect(() => {
    if (isDataSuccess && !isLoading) {
      setViewDetail(addCashPayment?.data?.Data?.Result?.WsRmRequisitionPoDetailsList);
    }
  }, [isDataSuccess, !isLoading]);

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Card style={{ background: 'transparent', marginLeft: '-1%', marginTop: '-2%' }}>
        <h2 style={{ textAlign: 'center' }}>{t('cash_payment_voucher')}</h2>
        <Tabs
          type="card"
          size="large"
          activeKey={activeTab}
          className="tabs-margin-bottom-0"
          onChange={(key) => setActiveTab(key)}
        >
          <Tabs.TabPane key="1" tab={t('history')}>
            <CashPaymentTable setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />
          </Tabs.TabPane>

          <Tabs.TabPane key="2" tab={t('form')}>
            <CashPaymentVoucherForm
              selectedRecordId={selectedRecordId}
              setSelectedRecordId={setSelectedRecordId}
              isDataSuccess={isDataSuccess}
              refetchCashPayment={refetchCashPayment}
              addCashPayment={addCashPayment}
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
}
export default CashPaymentVoucher;
