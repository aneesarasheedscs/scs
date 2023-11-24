import { useState } from 'react';
import { map, size } from 'lodash';
import { formateDatesInData } from './utils';
import { AntButton } from '../button/AntButton';
import { FileExcelOutlined } from '@ant-design/icons';
import { Col, Dropdown, MenuProps, Tooltip, notification } from 'antd';

function DownloadExcel({
  data,
  columns,
  disabled,
  filteredData,
  options = { show: true, enabled: true },
}: TDownloadExcel) {
  if (!options?.show) return null;

  const [isLoading, setLoading] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: 'Download selected data',
      onClick: () => {
        if (size(filteredData) === 0 && size(data) > 0) handleCsvDownload(data || []);
        else handleCsvDownload(filteredData);
      },
    },
    {
      key: '1',
      label: 'Download all data',
      onClick: () => handleCsvDownload(data || []),
    },
  ];

  const handleCsvDownload = (data: any[]) => {
    setLoading(true);

    new Promise<void>((resolve) => {
      const csvHeader = map(columns, (column) => column.title).join(',');

      const formattedData = formateDatesInData(data);

      const csvContent = map(formattedData, (record) => map(columns, (column) => record[column?.dataIndex]).join(','));

      const csvData = [csvHeader, ...csvContent].join('\n');

      const blob = new Blob([csvData], { type: 'text/csv' });

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = options?.fileName ? `${options?.fileName}.csv` : 'data.csv';

      downloadLink.click();

      resolve();
    })
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        notification.error({ message: 'Sorry, something went wrong, Please try again.' });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Col>
      <Tooltip arrow title="Download excel file">
        <Dropdown
          arrow
          menu={{ items }}
          trigger={['click']}
          placement="bottomRight"
          disabled={disabled || !options?.enabled}
        >
          <AntButton type="default" isLoading={isLoading} icon={<FileExcelOutlined />} />
        </Dropdown>
      </Tooltip>
    </Col>
  );
}

type TDownloadExcel = {
  data?: any[];
  columns?: any;
  disabled?: boolean;
  filteredData: any[];
  options?: { enabled?: boolean; show?: boolean; fileName?: string };
};

export default DownloadExcel;
