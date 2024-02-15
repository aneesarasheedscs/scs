import './styles.scss';
import { Tabs } from 'antd';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { viewDetailList } from './Form/Atom';
import JournalVoucherForm from './Form';
import JournalVoucherTable from './Table/JournalVoucherHistory/journalVoucherTable';
import { useGetJournalVoucherById, useGetJournalVoucherDetailById } from './quries';

function JournalVoucher() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [selectedRecordDetailId, setSelectedRecordDetailId] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const {
    data: journalVoucherData,
    refetch: refetchJournal,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetJournalVoucherById(selectedRecordId);
  const { data, refetch, isSuccess, isLoading } = useGetJournalVoucherDetailById(selectedRecordDetailId);
  useEffect(() => {
    if (isSuccess && !isLoading) {
      setViewDetail(data?.data?.Data?.Result?.voucherDetailList);
    }
  }, [isSuccess && !isLoading]);
  return (
    <>
      <h2 className="form-heading"> {t('journal_voucher')} </h2>
      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        className="tabs-margin-bottom-0"
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.TabPane key="1" tab={t('history')}>
          <JournalVoucherTable
            setSelectedRecordId={setSelectedRecordId}
            setActiveTab={setActiveTab}
            setSelectedRecordDetailId={setSelectedRecordDetailId}
            refetch={refetch}
            isLoading={isLoading}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t('form')}>
          <JournalVoucherForm
            selectedRecordId={selectedRecordId}
            setSelectedRecordId={setSelectedRecordId}
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
