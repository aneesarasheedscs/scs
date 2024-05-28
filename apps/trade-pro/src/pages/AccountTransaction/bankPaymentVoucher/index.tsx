import './style.scss';
import { useAtom } from 'jotai';
import { viewDetailList } from './form/Atom';
import BankPaymentVoucherForm from './form';
import { useEffect, useState } from 'react';
import { Col, Row, Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import BankPaymentTable from './table/bankPaymentVoucher';
import { useGetBankPaymentVoucherById, useGetBankPaymentVoucherDetailById } from './queries/querySave';

function BankPaymentVoucher() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [selectedRecordDetailId, setSelectedRecordDetailId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const {
    data: addBankPayment,
    refetch: refetchBankPayment,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetBankPaymentVoucherById(selectedRecordId);
  const { data, refetch, isSuccess, isLoading } = useGetBankPaymentVoucherDetailById(selectedRecordDetailId);
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
      <Row>
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
              <BankPaymentTable
                setSelectedRecordId={setSelectedRecordId}
                setActiveTab={setActiveTab}
                setSelectedRecordDetailId={setSelectedRecordDetailId}
                refetch={refetch}
                isLoading={isLoading}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('form')}>
              <BankPaymentVoucherForm
                selectedRecordId={selectedRecordId}
                setSelectedRecordId={setSelectedRecordId}
                addBankPayment={addBankPayment?.data?.Data?.Result}
                isDataSuccess={isDataSuccess}
                isDataLoading={isDataLoading}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}
export default BankPaymentVoucher;
