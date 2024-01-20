import React, { useState } from 'react';
import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Space } from 'antd';
import { TActivitySummary } from './types';
// import CustomModal from './customModal';

export const Columns = (t: any, handleAccountCodeClick: any): AntColumnType<TActivitySummary>[] => {
  return [
    // { title: t('sr#'), dataIndex: '', width: 150, render: (_, __, index) => index + 1 },
    {
      width: 200,
      title: t('account_code'),
      dataIndex: 'AccountCode',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.AccountCode - b.AccountCode,
      render: (_, { AccountCode, AccountId }) => (
        <>
          <a onClick={() => handleAccountCodeClick(AccountId)}>{AccountCode}</a>
        </>
      ),
    },

    {
      width: 300,
      searchableInput: true,
      title: t('account_title'),
      dataIndex: 'AccountTitle',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    },
    {
      width: 260,
      title: t('opening'),
      dataIndex: 'Opening',
      align: 'right',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Opening - b.Opening,
      showTotal: true,
      render: (Opening, recorde) => (
        <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '2px' }}>
          {' '}
          {numberFormatter(Opening)}
        </Space>
      ),
    },
    {
      width: 260,
      title: t('debit'),
      dataIndex: 'Debit',
      align: 'right',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Debit - b.Debit,
      showTotal: true,
      render: (Debit, recorde) => (
        <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '2px' }}> {numberFormatter(Debit)}</Space>
      ),
    },
    {
      width: 260,
      title: t('credit'),
      dataIndex: 'Credit',
      align: 'right',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Credit - b.Credit,
      showTotal: true,
      render: (Credit, recorde) => (
        <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '2px' }}> {numberFormatter(Credit)}</Space>
      ),
    },
    {
      width: 230,
      title: t('closing'),
      dataIndex: 'Closing',
      align: 'right',
      // searchableInput: true, //due to this number formatter is not working at a time we can have one thing
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Closing - b.Closing,
      showTotal: true,
      //  render: (closing, record) => numberFormatter(closing),
      render: (Closing, record) => (
        <Space style={{ display: 'flex', justifyContent: 'end', marginRight: '2px' }}>{numberFormatter(Closing)}</Space>
      ),
    },
  ];
};
