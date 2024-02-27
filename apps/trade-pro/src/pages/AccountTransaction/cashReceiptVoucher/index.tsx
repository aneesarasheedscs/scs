import './style.scss';
import { useAtom } from 'jotai';
import { viewDetailList } from './form/Atom';
import { useEffect, useState } from 'react';
import CashReceiptVoucherForm from './form';
import { useTranslation } from 'react-i18next';
import { Col, Row, Tabs, theme } from 'antd';
import CashReceiptTable from './table/cashReceiptVoucher';
import { useGetCashReceiptVoucherById, useGetCashReceiptVoucherDetailById } from './queries/querySave';

function CashReceiptVoucher() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [selectedRecordIdforDetail, setSelectedRecordIdforDetail] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);

  const {
    data: addCashReceipt,
    refetch: refetchCashReceipt,
    isSuccess: isDataSuccess,
  } = useGetCashReceiptVoucherById(selectedRecordId);
  const { data, refetch, isSuccess, isLoading } = useGetCashReceiptVoucherDetailById(selectedRecordIdforDetail);
  useEffect(() => {
    if (isSuccess) {
      const DetailList = data?.data?.Data?.Result?.voucherDetailList.filter((row: any) => row.DebitAmount <= 0);
      setViewDetail(DetailList);
    }
  }, [isSuccess, !isLoading]);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row>
        <Col span={24}>
          <h2 className="form-heading">{t('cash_receipt_voucher')}</h2>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('history')}>
              <CashReceiptTable
                setSelectedRecordId={setSelectedRecordId}
                setActiveTab={setActiveTab}
                setSelectedRecordIdforDetail={setSelectedRecordIdforDetail}
                refetch={refetch}
                isLoading={isLoading}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('form')}>
              <CashReceiptVoucherForm
                selectedRecordId={selectedRecordId}
                setSelectedRecordId={setSelectedRecordId}
                addCashReceipt={addCashReceipt}
                isDataSuccess={isDataSuccess}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}
export default CashReceiptVoucher;
