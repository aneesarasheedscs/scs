import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useGetJournalVoucherById } from './quries';
import { useAtom } from 'jotai';
import { viewDetailList } from './Form/Atom';
import JournalVoucherTable from './Table/journalVoucherTable';
import JournalVoucherDetailTable from './Table/DetailTable';
import JournalVoucherForm from './Form';

function JournalVoucher() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const {
    data: journalVoucherData,
    refetch: refetchJournal,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetJournalVoucherById(selectedRecordId);
  useEffect(() => {
    if (isDataSuccess) {
      setViewDetail(journalVoucherData?.data?.Data?.Result?.voucherDetailList);
    }
  }, [isDataSuccess]);
  return (
    <>
      <h2 className="form-heading"> Journal Voucher </h2>

      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('history')}>
          <JournalVoucherTable setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />
          <JournalVoucherDetailTable />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('form')}>
          <JournalVoucherForm
            selectedRecordId={selectedRecordId}
            refetchJournal={refetchJournal}
            journalVoucherData={journalVoucherData}
            isDataSuccess={isDataSuccess}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default JournalVoucher;
