import './style.scss';
import { useAtom } from 'jotai';
import BillsReceivableForm from './form';
import { Col, Row, Tabs, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { viewDetailList } from './form/Atom';
import BillsReceivableHistory from './table/billsPayableHistory';
import { useGetBillsReceivableAccountsDetailById, useGetBillsReceivableVoucherById } from './query';

function BillsReceivableAccounts() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [selectedRecordDetailId, setSelectedRecordDetailId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const {
    data: addBillsPayable,
    refetch: refetchBillsPayable,
    isSuccess: isDataSuccess,
  } = useGetBillsReceivableVoucherById(selectedRecordId);
  const { data, refetch, isSuccess, isLoading } = useGetBillsReceivableAccountsDetailById(selectedRecordDetailId);
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
          <h2 className="form-heading">{t('bills_receivables_accounts')}</h2>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('history')}>
              <BillsReceivableHistory
                setSelectedRecordId={setSelectedRecordId}
                setActiveTab={setActiveTab}
                setSelectedRecordDetailId={setSelectedRecordDetailId}
                refetch={refetch}
                isLoading={isLoading}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('form')}>
              <BillsReceivableForm
                selectedRecordId={selectedRecordId}
                setSelectedRecordId={setSelectedRecordId}
                addBillsPayable={addBillsPayable}
                refetchBillsPayable={refetchBillsPayable}
                isDataSuccess={isDataSuccess}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default BillsReceivableAccounts;
