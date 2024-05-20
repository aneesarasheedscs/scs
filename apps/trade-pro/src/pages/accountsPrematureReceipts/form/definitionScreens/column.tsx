import { EditFilled, EyeTwoTone, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { TBankNameHistory, TDefineOtherPartiesHistory } from './types';

export const columns = (t: TFunction): AntColumnType<TBankNameHistory>[] => [
  {
    title: t('banck_name'),
    width: 180,
    dataIndex: 'BankName',

    // searchableInput: true,
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },

  //   {
  //     fixed: 'right',
  //     title: t('action'),
  //     width: 95,
  //     render: (_, record) => (
  //       <>
  //         <Tooltip title="Edit">
  //           <Space style={{ position: 'absolute', top: 10, left: 10 }}>
  //             <AntButton
  //               type="text"
  //               icon={<EditFilled style={{ color: '#006640' }} />}
  //               onClick={() => {
  //                 // setSelectedRecordId(record?.Id), setActiveTab('2');
  //               }}
  //             />
  //           </Space>
  //         </Tooltip>
  //         <Tooltip title="View Detail">
  //           <Space style={{ position: 'absolute', top: 10, right: 10 }}>
  //             <AntButton
  //               type="text"
  //               icon={<EyeTwoTone style={{ color: 'blue', marginLeft: 4 }} />}
  //               onClick={() => {
  //                 // setSelectedRecordDetailId(record.Id);
  //               }}
  //             />
  //           </Space>
  //         </Tooltip>
  //       </>
  //     ),
  //   },
];
export const defineOtherPartiesColumns = (t: TFunction): AntColumnType<TDefineOtherPartiesHistory>[] => [
  {
    title: t('party_name'),
    width: 200,
    dataIndex: 'PartyName',

    // searchableInput: true,
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: t('is_active'),
    width: 200,
    dataIndex: 'IsActive',
    render: (_, { IsActive }) => (IsActive === true ? 'true' : 'false'),

    // searchableInput: true,
    // sortDirections: ['ascend', 'descend'],
    // sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },

  //   {
  //     fixed: 'right',
  //     title: t('action'),
  //     width: 95,
  //     render: (_, record) => (
  //       <>
  //         <Tooltip title="Edit">
  //           <Space style={{ position: 'absolute', top: 10, left: 10 }}>
  //             <AntButton
  //               type="text"
  //               icon={<EditFilled style={{ color: '#006640' }} />}
  //               onClick={() => {
  //                 // setSelectedRecordId(record?.Id), setActiveTab('2');
  //               }}
  //             />
  //           </Space>
  //         </Tooltip>
  //         <Tooltip title="View Detail">
  //           <Space style={{ position: 'absolute', top: 10, right: 10 }}>
  //             <AntButton
  //               type="text"
  //               icon={<EyeTwoTone style={{ color: 'blue', marginLeft: 4 }} />}
  //               onClick={() => {
  //                 // setSelectedRecordDetailId(record.Id);
  //               }}
  //             />
  //           </Space>
  //         </Tooltip>
  //       </>
  //     ),
  //   },
];
