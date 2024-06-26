import './style.scss';
import { useAtom } from 'jotai';
import { Col, Row, Tabs } from 'antd';
import PaymentVoucherForm from './form';
import { useEffect, useState } from 'react';
import { viewDetailList } from './form/Atom';
import { useTranslation } from 'react-i18next';
import PaymentVoucherHistoryTable from './table/PaymentVoucherHistory';
import { useGetPaymentVoucherById, useGetPaymentVoucherDetailById } from './queries/querySave';

function PaymentVoucher() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [selectedRecordDetailId, setSelectedRecordDetailId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const {
    data: addBankPayment,
    refetch: refetchBankPayment,
    isSuccess: isDataSuccess,
  } = useGetPaymentVoucherById(selectedRecordId);
  const { data, refetch, isSuccess, isLoading } = useGetPaymentVoucherDetailById(selectedRecordDetailId);
  useEffect(() => {
    if (isSuccess) {
      setViewDetail(data?.data?.Data?.Result?.voucherDetailList);
    }
  }, [isSuccess, !isLoading]);

  return (
    <>
      <Row>
        <Col span={24}>
          <h2 className="form-heading">{t('payment_voucher')}</h2>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('history')}>
              <PaymentVoucherHistoryTable
                setSelectedRecordId={setSelectedRecordId}
                setActiveTab={setActiveTab}
                setSelectedRecordDetailId={setSelectedRecordDetailId}
                refetch={refetch}
                isLoading={isLoading}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('form')}>
              <PaymentVoucherForm
                selectedRecordId={selectedRecordId}
                setSelectedRecordId={setSelectedRecordId}
                addBankPayment={addBankPayment}
                isDataSuccess={isDataSuccess}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}
export default PaymentVoucher;
