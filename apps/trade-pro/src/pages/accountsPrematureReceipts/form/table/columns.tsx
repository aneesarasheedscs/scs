import { EditFilled, CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton } from '@tradePro/components';
import { Row, Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { TAccountsPrematureReceiptsHistory } from '../../types';

export const columns = (
  t: TFunction,

  setUpdateRecord: (selectedRecordId: number) => void,
  setCancelPrematureRecord: (selectedRecordId: number) => void
): AntColumnType<TAccountsPrematureReceiptsHistory>[] => [
  {
    title: t('doc_no'),
    width: 120,
    searchableInput: true,
    dataIndex: 'DocNo',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocNo - b.DocNo,
  },

  {
    title: t('doc_date'),
    width: 140,
    searchableDate: true,
    dataIndex: 'DocDate',
    sortDirections: ['ascend', 'descend'],
    render: (_, { DocDate }) => formateDate(DocDate),

    sorter: (a, b) => {
      const dateA = dayjs(a.DocDate);
      const dateB = dayjs(b.DocDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: t('tracking_slip'),
    width: 150,
    searchableInput: true,
    dataIndex: 'TrakingNo',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TrakingNo - b.TrakingNo,
  },

  {
    title: t('banck_name'),
    width: 180,
    dataIndex: 'BankName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BankName.localeCompare(b.BankName),
  },
  {
    title: t('representative_account'),
    width: 200,

    searchableInput: true,
    dataIndex: 'RepresentativeAc',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RepresentativeAc.localeCompare(b.RepresentativeAc),
  },
  {
    title: t('sender_account'),
    width: 180,

    searchableInput: true,
    dataIndex: 'SenderAccount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SenderAccount.localeCompare(b.SenderAccount),
  },
  {
    title: t('receiver_account'),
    width: 180,

    searchableInput: true,
    dataIndex: 'RecieverAccount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RecieverAccount.localeCompare(b.RecieverAccount),
  },
  {
    title: t('cheque_no'),
    width: 150,
    dataIndex: 'ChequeNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ChequeNo.localeCompare(b.ChequeNo),
  },
  {
    title: t('cheque_date'),
    dataIndex: 'ChequeDate',
    sortDirections: ['ascend', 'descend'],
    searchableDate: true,
    render: (_, { ChequeDate }) => formateDate(ChequeDate),
    sorter: (a, b) => {
      const dateA = dayjs(a.ChequeDate);
      const dateB = dayjs(b.ChequeDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    width: 150,
  },
  {
    title: t('amount'),
    align: 'right',
    width: 140,
    dataIndex: 'Amount',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Amount - b.Amount,
    render: (_, { Amount }) => numberFormatter(Amount),
  },
  {
    title: t('status'),
    width: 110,
    dataIndex: 'EntryStatus',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryStatus.localeCompare(b.EntryStatus),
  },
  {
    title: t('remarks'),
    width: 200,
    dataIndex: 'RemarksHeader',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RemarksHeader.localeCompare(b.RemarksHeader),
  },

  {
    title: t('attachments'),
    width: 100,
    dataIndex: 'NoOfAttachments',
    sortDirections: ['ascend', 'descend'],
  },
  {
    align: 'center',
    fixed: 'right',
    title: t('action'),
    width: 90,
    render: (_, record) => (
      <>
        <Row>
          <Tooltip title="Confirm">
            <Space style={{ position: 'absolute', top: 10, left: 25 }}>
              <AntButton
                type="text"
                icon={<CheckCircleTwoTone style={{ color: '', marginLeft: 0 }} />}
                onClick={() => {
                  setUpdateRecord(record?.Id);
                }}
              />
            </Space>
          </Tooltip>
          <Tooltip title="Cancel">
            <Space style={{ position: 'absolute', top: 10, left: 50 }}>
              <AntButton
                type="text"
                icon={<CloseCircleTwoTone style={{ color: 'blue', marginLeft: 0 }} />}
                onClick={() => {
                  setCancelPrematureRecord(record?.Id);
                }}
              />
            </Space>
          </Tooltip>
        </Row>
      </>
    ),
  },
];
