import React, { useState } from 'react';
import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Space } from 'antd';
import { TActivitySummary } from './types';
// import CustomModal from './customModal';

export const Columns = (t: any, handleAccountCodeClick: any): AntColumnType<TActivitySummary>[] => {
  return [
    { title: t('sr#'), dataIndex: '', width: 70, render: (_, __, index) => index + 1 },
    {
      width: 150,
      title: t('account_code'),
      dataIndex: 'AccountCode',
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
      width: 200,
      title: t('opening'),
      dataIndex: 'Opening',
      showTotal: true,
      render: (Opening, recorde) => (
        <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}> {numberFormatter(Opening)}</Space>
      ),
    },
    {
      width: 200,
      title: t('debit'),
      dataIndex: 'Debit',
      showTotal: true,
      render: (Debit, recorde) => (
        <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}> {numberFormatter(Debit)}</Space>
      ),
    },
    {
      width: 200,
      title: t('credit'),
      dataIndex: 'Credit',
      showTotal: true,
      render: (Credit, recorde) => (
        <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}> {numberFormatter(Credit)}</Space>
      ),
    },
    {
      width: 200,
      title: t('closing'),
      dataIndex: 'Closing',
      showTotal: true,
      render: (Closing, record) => (
        <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Closing)}</Space>
      ),
    },
  ];
};
