import { useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Space, Tooltip } from 'antd';
import { EditFilled, PrinterOutlined } from '@ant-design/icons';
import { TContraVoucherHistory } from './types';
import { useGetContraVoucherTable } from '../queries/queries';
import { map } from 'lodash';
import { AntButton, AntTable } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { useTranslation } from 'react-i18next';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

function ContraTable({ setSelectedRecordId, setActiveTab }: TFrom) {
  const { t } = useTranslation();
  const { data: apidata, isError, isLoading } = useGetContraVoucherTable();
  const [expandedId, setExpandedId] = useState(null);

  const expandedRowRender = (record: any) => {
    if (record && record.Id === expandedId) {
      const detailedData = apidata?.data?.Data?.Result.find((item: any) => item.Id === expandedId);

      const columns1: TableColumnsType<TContraVoucherHistory> = [
        { title: 'Date', dataIndex: 'VoucherDate', key: 'VoucherDate' },
        { title: 'Voucher Code', dataIndex: 'VoucherCode', key: 'VoucherCode' },
        { title: 'Document Type', dataIndex: 'DocumentTypeCode', key: 'DocumentTypeCode' },
        { title: 'Account Title', dataIndex: 'AccountTitle', key: 'AccountTitle' },
        { title: 'Remarks', dataIndex: 'Remarks', key: 'Remarks' },
        { title: 'Voucher Amount', dataIndex: 'VoucherAmount', key: 'VoucherAmount' },
        { title: 'User Name', dataIndex: 'UserName', key: 'UserName' },
        { title: 'Cheque No', dataIndex: 'CheqNo', key: 'CheqNo' },
      ];

      return <AntTable columns={columns1} dataSource={[detailedData]} pagination={false} />;
    }

    return null;
  };

  const columns2 = (t: any, setSelectedRecordId?: any, setActiveTab?: any): AntColumnType<TContraVoucherHistory>[] => [
    {
      title: <>{t('document_type_code')}</>,
      width: 250,
      searchableInput: true,
      dataIndex: 'DocumentTypeCode',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
    },
    {
      title: <>{t('voucher_code')}</>,
      width: 200,
      searchableInput: true,
      dataIndex: 'VoucherCode',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.VoucherCode.localeCompare(b.VoucherCode),
    },
    {
      title: <>{t('voucher_date')}</>,
      width: 160,
      dataIndex: 'VoucherDate',
      render: (_, { VoucherDate }) => formateDate(VoucherDate),
    },
    {
      title: <>{t('account_title')}</>,
      width: 180,
      dataIndex: 'AccountTitle',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    },
    {
      title: <>{t('remarks')}</>,
      width: 190,
      dataIndex: 'Remarks',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
    },
    {
      title: <>{t('voucher_amount')}</>,
      width: 160,
      dataIndex: 'VoucherAmount',
      showTotal: true,
      render: (_, { VoucherAmount }) => <span>{numberFormatter(VoucherAmount)}</span>,
    },
    {
      title: <>{t('user_name')}</>,
      width: 200,
      dataIndex: 'UserName',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.UserName.localeCompare(b.UserName),
    },
    {
      title: <>{t('cheque_no')}</>,
      width: 160,
      dataIndex: 'CheqNo',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
    },
    {
      title: <>{t('attachment')}</>,
      width: 160,
      dataIndex: 'Attachment',
    },
    {
      title: <>{t('action')}</>,
      width: 120,
      render: (_, record) => (
        <Tooltip title={t('actions')}>
          <Space>
            <AntButton
              type="text"
              icon={<EditFilled style={{ color: 'black' }} />}
              onClick={() => {
                setSelectedRecordId(record?.Id), setActiveTab('2');
              }}
            />
            <AntButton type="text" icon={<PrinterOutlined style={{ color: 'red', marginLeft: '-1rem' }} />} />
          </Space>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <AntTable
        columns={columns2(t, setSelectedRecordId, setActiveTab)}
        expandable={{
          expandedRowRender,
          onExpand: (expanded, record) => {
            if (expanded) {
              setExpandedId(record.Id);
            } else {
              setExpandedId(null);
            }
          },
          defaultExpandedRowKeys: ['0'],
        }}
        dataSource={map(apidata?.data?.Data?.Result)}
        isError={isError}
        numberOfSkeletons={12}
        isLoading={isLoading}
      />
    </>
  );
}

type TFrom = {
  setSelectedRecordId: (Id: string | null) => void;
  setActiveTab: (tab: string) => void;
};

export default ContraTable;
