import { formhistory, child_account } from './type';
import { AntColumnType } from '@tradePro/globalTypes';
import { WindowsFilled } from '@ant-design/icons';
import { Space, Modal, Input, Button } from 'antd';
import React, { useState } from 'react';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const columns = (onUpdateAccountTitle: any): AntColumnType<formhistory>[] => [
  {
    title: 'Sr#',
    dataIndex: 'Id',
    render: (_, { Id }) => numberFormatter(Id),
    width: 60,
  },

  {
    title: 'Account Code',
    dataIndex: 'AccountCode',
    render: (_, { AccountCode }) => numberFormatter(AccountCode),
    width: 100,
  },
  {
    title: 'Account Title',
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),

    width: 170,
  },
  {
    title: 'Ac Level',
    dataIndex: 'Account_Level',
    width: 60,
  },
  {
    title: 'Ac Group',
    dataIndex: 'AccountGroup',
    width: 150,
  },
  {
    title: 'PL/BS Note',
    dataIndex: 'NoteTitle',
    width: 150,
  },
  {
    title: 'Account Class',
    dataIndex: 'AccountClass',
    sorter: (a, b) => a.AccountGroup.localeCompare(b.AccountGroup),
    width: 150,
  },
  {
    title: 'Account Type',
    dataIndex: 'AccountType',
    width: 150,
  },
  {
    title: 'Status',
    dataIndex: 'IsActive',
    render: (status) => (
      <Space
        style={{
          backgroundColor: status === 'Inactive' ? 'red' : '#5A54F9',
          color: 'white',
          borderRadius: '5px',
          width: '70%',
          border: '1px ridge white',
          boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
      >
        {status === 'Inactive' ? 'Inactive' : 'active'}
      </Space>
    ),
    width: 50,
  },
  {
    title: 'Action',
    dataIndex: '',
    width: 50,
    render: (record: any) => <ActionModal record={record} onUpdateAccountTitle={onUpdateAccountTitle} />,
  },
];

export const ActionModal = ({
  record,
  onUpdateAccountTitle,
}: {
  record: formhistory;
  onUpdateAccountTitle: Function;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newAccountTitle, setNewAccountTitle] = useState(record.AccountTitle);
  // const [newAccountTitle, setNewAccountTitle] = useState(record?.AccountTitle || '');

  const showModal = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    onUpdateAccountTitle(record, newAccountTitle);

    setModalVisible(false);
  };

  return (
    <>
      <WindowsFilled
        onClick={showModal}
        style={{
          color: '#5A54F9',
          borderRadius: '5px',
          boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',

          fontSize: '24px',
        }}
      />
      <Modal
        width={500}
        title="Edit Account Title"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
      >
        <Input value={newAccountTitle} onChange={(e) => setNewAccountTitle(e.target.value)} />
      </Modal>
    </>
  );
};
//child_account Table_columnss

export const columnss = (): AntColumnType<child_account>[] => [
  {
    title: 'Sr',
    dataIndex: 'Sr',
    key: 'Sr',
  },
  {
    title: 'Title',
    dataIndex: 'Title',
    key: 'Title',
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action',
  },
];
