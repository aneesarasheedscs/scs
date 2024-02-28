import './style.scss';
import { useAtom } from 'jotai';
import BillsPayableForm from './form';
import { Col, Row, Tabs, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { viewDetailList } from './form/Atom';
import BillsPayableHistory from './table/billsPayableHistory';
import { useGetBillsPayableAccountsDetailById, useGetBillsPayableVoucherById } from './query';

function BillsPayableAccounts() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [selectedRecordDetailId, setSelectedRecordDetailId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const {
    data: addBillsPayable,
    refetch: refetchBillsPayable,
    isSuccess: isDataSuccess,
  } = useGetBillsPayableVoucherById(selectedRecordId);
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
      <Row>
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
                addBillsPayable={addBillsPayable}
                isDataSuccess={isDataSuccess}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default BillsPayableAccounts;
