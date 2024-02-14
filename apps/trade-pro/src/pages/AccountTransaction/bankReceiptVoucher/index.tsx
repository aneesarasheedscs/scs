import './style.scss';
import { useEffect, useState } from 'react';
import { Card, Col, Row, Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import BankReceiptVoucherForm from './form';
import BankReceiptTable from './table/bankReceiptVoucher';
import { useGetBankReceiptVoucherById, useGetBankReceiptVoucherDetailById } from './queries/querySave';
import { useAtom } from 'jotai';
import { viewDetailList } from './form/Atom';

function BankReceiptVoucher() {
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
          <h2 style={{ textAlign: 'center' }}>{t('bank_receipt_voucher')}</h2>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('history')}>
              <BankReceiptTable
                setSelectedRecordId={setSelectedRecordId}
                setActiveTab={setActiveTab}
                setSelectedRecordDetailId={setSelectedRecordDetailId}
                refetch={refetch}
                isLoading={isLoading}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('form')}>
              <BankReceiptVoucherForm
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
export default BankReceiptVoucher;
