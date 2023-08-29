import { columns } from './column';
import { theme, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { AntTable } from '@tradePro/components';
import { usegetAccountHistoryTable } from '../queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function AccountHistoryTable() {
  const {
    refetch,

    data: table,
    isError: tableError,
    isLoading: tableLoading,
    isSuccess: tableSuccess,
  } = usegetAccountHistoryTable();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const handleUpdateAccountTitle = (record: any, newTitle: string) => {
    // Update the account title in your data or state
    const newData: any = data.map((item: any) =>
      item.Id === record.Id
        ? {
            ...item,
            AccountTitle: newTitle,
            IsActive: item.IsActive === 'Inactive' ? 'active' : 'Inactive',
          }
        : item
    );
    setData(newData);

    notification.success({
      message: 'Account Title Updated',
      description: `Account title for Sr# ${record.Id} has been successfully updated.`,
    });
  };
  useEffect(() => {
    if (tableSuccess) {
      setData(table?.data?.Data?.Result || []);
    }
  }, [tableSuccess]);

  return (
    <div>
      <AntTable
        refetch={refetch}
        isError={tableError}
        data={table?.data?.Data?.Result || []}
        columns={columns(handleUpdateAccountTitle)}
        isLoading={tableLoading}
        numberOfSkeletons={15}
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
      />
    </div>
  );
}

export default AccountHistoryTable;
