import React, { useState } from 'react';
import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Space } from 'antd';
import { TActivitySummary } from './types';
// import CustomModal from './customModal';

export const Columns = (t: any): AntColumnType<TActivitySummary>[] => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAccountCode, setSelectedAccountCode] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState(''); // Add this line

  const showModal = (AccountCode: any, AccountId: any) => {
    setSelectedAccountCode(AccountCode);
    setSelectedAccountId(AccountId); // Set the selectedAccountID
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setSelectedAccountCode('');
    setSelectedAccountId(selectedAccountId); // Reset the selectedAccountID
    setIsModalVisible(false);
  };

  const handleAccountCodeClick = (AccountCode: number, AccountId: number) => {
    // event.preventDefault();
    showModal(AccountCode, AccountId);
  };

  return [
    { title: <>{t('sr#')}</>, dataIndex: '', width: 70, render: (_, __, index) => index + 1 },
    {
      width: 150,
      title: <>{t('account_code')}</>,
      searchableDate: true,
      dataIndex: 'AccountCode',
      render: (_, { AccountCode, AccountId }) => (
        <>
          <a href={`/${AccountCode}`} onClick={() => handleAccountCodeClick(AccountCode, AccountId)}>
            {AccountCode}
          </a>
          {/* <CustomModal
            visible={isModalVisible}
            handleCancel={handleCancel}
            selectedAccountCode={selectedAccountCode}
            selectedAccountId={selectedAccountId}
          /> */}
        </>
      ),
    },

    {
      width: 300,
      searchableInput: true,
      title: <>{t('account_title')}</>,
      dataIndex: 'AccountTitle',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    },
    {
      width: 120,
      title: <>{t('opening')}</>,
      dataIndex: 'Opening',
      showTotal: true,
      render: (Opening, recorde) => (
        <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}> {numberFormatter(Opening)}</Space>
      ),
    },
    {
      width: 150,
      title: <>{t('debit')}</>,
      dataIndex: 'Debit',
      showTotal: true,
      render: (Debit, recorde) => (
        <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}> {numberFormatter(Debit)}</Space>
      ),
    },
    {
      width: 150,
      title: <>{t('credit')}</>,
      dataIndex: 'Credit',
      showTotal: true,
      render: (Credit, recorde) => (
        <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}> {numberFormatter(Credit)}</Space>
      ),
    },
    {
      width: 150,
      title: <>{t('closing')}</>,
      dataIndex: 'Closing',
      showTotal: true,
      render: (Closing, record) => (
        <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Closing)}</Space>
      ),
    },
  ];
};
