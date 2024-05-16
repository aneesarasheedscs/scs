import React, { useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Columns } from './columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { AntTable } from '@scs/ui';
import { useTranslation } from 'react-i18next';
import { AccountOpeningBalanceColumns } from '@tradePro/pages/OpeningBalance/Table/columns';
import { useGetOpeningBalanceTable } from '@tradePro/pages/OpeningBalance/queries/table';

interface DataRow {
  key: string;
  name: string;
  age: number;
  details: string[];
}

const ExpandableTable: React.FC = () => {
  const [expandedRowKey, setExpandedRowKey] = useState<string | null>(null);
  const {
    refetch,

    data: OpeningBalance,
    isError: tableError,
    isLoading: tableLoading,
    isSuccess: tableSuccess,
  } = useGetOpeningBalanceTable();
  const handleExpand = (expanded: boolean, record: DataRow) => {
    if (expanded) {
      setExpandedRowKey(record.key);
    } else {
      setExpandedRowKey(null);
    }
  };

  const { t } = useTranslation();

  const columns: ColumnsType<DataRow> = [
    ...Columns(t), // Use the Columns function you provided for the main table columns
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: 100,
      render: (_, record) => (
        <span onClick={() => handleExpand(!expandedRowKey, record)} style={{ cursor: 'pointer' }}>
          {expandedRowKey === record.key ? 'Collapse' : 'Expand'}
        </span>
      ),
    },
  ];

  return (
    <AntTable
      refetch={refetch}
      isError={tableError}
      // data={filteredTableData || []}
      data={OpeningBalance?.data?.Data?.Result}
      columns={AccountOpeningBalanceColumns(t)}
      // isLoading={tableLoading}
      numberOfSkeletons={15}
      scroll={{ x: '', y: convertVhToPixels('38vh') }}
      expandable={{
        expandedRowRender: (record: DataRow) => (
          // Use the same Columns function for the inner table columns
          <AntTable
            columns={Columns(t)}
            dataSource={record.details.map((detail: any, index: any) => ({
              key: index.toString(),
              ...detail, // Assuming 'details' contains objects with properties matching the columns
            }))}
            pagination={false}
          />
        ),
        rowExpandable: (record) => !!record.details.length,
        onExpand: handleExpand,
        expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
      }}
    />
  );
};

export default ExpandableTable;
