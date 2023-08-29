import React, { useEffect, useState } from 'react';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { usehistoryTable } from './queries/Parent';
import { columns, ActionModal } from './columns';
import { AntTable } from '@tradePro/components';
import { theme, notification } from 'antd';

import { formhistory } from './type';
import './index.scss';

function History() {
  const {
    data: table,
    isError: tableError,
    isLoading: tableLoading,
    isSuccess: tableSuccess,
  } = usehistoryTable();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (tableSuccess) {
      // Assuming table?.data?.Data?.Result is the array of data from your API
      setData(table?.data?.Data?.Result || []);
    }
  }, [tableSuccess]);

  const handleUpdateAccountTitle = (record: formhistory, newTitle: string) => {
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
  return (
    <div>
      <AntTable
        data={table?.data?.Data?.Result || []}
        // dataSource={data}
        columns={columns(handleUpdateAccountTitle)}
        isLoading={tableLoading}
        numberOfSkeletons={15}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}

export default History;
