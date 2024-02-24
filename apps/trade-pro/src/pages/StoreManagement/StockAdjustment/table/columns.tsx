import { EditFilled, EyeTwoTone } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';

import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { TStockAdjustmentHistory } from '../types';

export const columns = (
  t: TFunction,
  setSelectedRecordId: (id: number | null) => void,
  setActiveTab: (tab: string) => void,
  setSelectedRecordIdforDetail: (id: number | null) => void
): AntColumnType<TStockAdjustmentHistory>[] => [
  {
    title: t('doc_no'),
    dataIndex: 'DocNo',
    searchableInput: true,
    width: 120,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocNo - b.DocNo,
    showCount: true,
  },
  {
    title: t('doc_date'),
    dataIndex: 'DocDate',
    searchableDate: true,
    render: (_, { DocDate }) => formateDate(DocDate),
    width: 140,
    sorter: (a, b) => {
      const dateA = dayjs(a.DocDate);
      const dateB = dayjs(b.DocDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: t('entry_type'),
    dataIndex: 'EntryType',
    width: 200,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryType.localeCompare(b.EntryType),
  },
  {
    title: t('entry_user'),
    dataIndex: 'EntryUser',
    width: 210,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryUser.localeCompare(b.EntryUser),
  },

  {
    title: t('entry_date'),
    searchableDate: true,
    dataIndex: 'EntryDate',
    render: (_, { EntryDate }) => formateDate(EntryDate),
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.EntryDate);
      const dateB = dayjs(b.EntryDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: t('modify_user'),
    dataIndex: 'ModifyUser',
    width: 210,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ModifyUser.localeCompare(b.ModifyUser),
  },
  {
    title: t('modify_date'),
    dataIndex: 'ModifyDate',
    searchableDate: true,
    render: (_, { ModifyDate }) => formateDate(ModifyDate),
    width: 150,
    sorter: (a, b) => {
      const dateA = dayjs(a.ModifyDate);
      const dateB = dayjs(b.ModifyDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },

  {
    title: t('remarks'),
    dataIndex: 'Remarks',
    width: 150,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: t('no_of_attachments'),
    dataIndex: '',
    width: 150,
  },
  {
    title: t('action'),
    width: 90,
    render: (_, record) => (
      <>
        <Tooltip title="Edit">
          <Space style={{ position: 'absolute', top: 10, left: 10 }}>
            <AntButton
              type="text"
              icon={<EditFilled style={{ color: '#006640' }} />}
              onClick={() => {
                setSelectedRecordId(record?.Id), setActiveTab('2');
              }}
            />
          </Space>
        </Tooltip>
        <Tooltip title="View Detail">
          <Space style={{ position: 'absolute', top: 10, right: 15 }}>
            <AntButton
              type="text"
              icon={<EyeTwoTone style={{}} />}
              onClick={() => {
                setSelectedRecordIdforDetail(record.Id);
              }}
            />
          </Space>
        </Tooltip>
      </>
    ),
  },
];
