import './style.scss';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Col, Row, Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { viewDetailList } from './form/Atom';
import ReceiptsVoucherForm from './form';
import ReceiptsTables from './table/ReceiptsVoucherHistory';
import { useGetBankReceiptVoucherById, useGetBankReceiptVoucherDetailById } from './queries/querySave';

function ReceiptsVouchers() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [selectedRecordDetailId, setSelectedRecordDetailId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);

  const {
    data: addBankReceipt,
    refetch: refetchBankReceipt,
    isSuccess: isDataSuccess,
  } = useGetBankReceiptVoucherById(selectedRecordId);
  const { data, refetch, isSuccess, isLoading } = useGetBankReceiptVoucherDetailById(selectedRecordDetailId);
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
      <Row style={{}}>
        <Col span={24}>
          <h2 style={{ textAlign: 'center' }}>{t('receipts_voucher')}</h2>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('history')}>
              <ReceiptsTables
                setSelectedRecordId={setSelectedRecordId}
                setActiveTab={setActiveTab}
                setSelectedRecordDetailId={setSelectedRecordDetailId}
                refetch={refetch}
                isLoading={isLoading}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('form')}>
              <ReceiptsVoucherForm
                selectedRecordId={selectedRecordId}
                setSelectedRecordId={setSelectedRecordId}
                addBankReceipt={addBankReceipt}
                refetchBankReceipt={refetchBankReceipt}
                isDataSuccess={isDataSuccess}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}
export default ReceiptsVouchers;
