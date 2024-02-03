import './style.scss';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import CashPaymentVoucherForm from './form';
import { viewDetailList } from './form/Atom';
import { Card, Col, Row, Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import CashPaymentTable from './table/cashPaymentVoucher';
import { useGetCashPaymentVoucherById, useGetCashPaymentVoucherDetailById } from './queries/querySave';

function CashPaymentVoucher() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [selectedRecordIdforDetail, setSelectedRecordIdforDetail] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);

  const {
    data: addCashPayment,
    refetch: refetchCashPayment,
    isSuccess: isDataSuccess,
    isLoading,
  } = useGetCashPaymentVoucherById(selectedRecordId);
  const {
    data,
    refetch,
    isSuccess,
    isLoading: isLoadingDetail,
  } = useGetCashPaymentVoucherDetailById(selectedRecordIdforDetail);

  useEffect(() => {
    if (isSuccess && !isLoadingDetail) {
      const DetailList = data?.data?.Data?.Result?.voucherDetailList.filter((row: any) => row.DebitAmount > 0);
      setViewDetail(DetailList);
    }
  }, [isSuccess, !isLoadingDetail]);

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row style={{ background: '', marginLeft: '0%', marginTop: '0%' }}>
        <Col span={24}>
          <h2 className="form-heading">{t('cash_payment_voucher')}</h2>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('history')}>
              <CashPaymentTable
                setSelectedRecordId={setSelectedRecordId}
                setActiveTab={setActiveTab}
                setSelectedRecordIdforDetail={setSelectedRecordIdforDetail}
              />
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
        </Col>
      </Row>
    </>
  );
}
export default CashPaymentVoucher;
