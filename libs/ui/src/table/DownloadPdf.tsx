import { useState } from 'react';
import jsPDF, { jsPDFOptions } from 'jspdf';
import { formateDatesInData } from './utils';
import { AntButton } from '../button/AntButton';
import { FilePdfOutlined } from '@ant-design/icons';
import autoTable, { UserOptions } from 'jspdf-autotable';
import { isEmpty, isNil, map, merge, size } from 'lodash';
import { Col, Dropdown, MenuProps, Tooltip, notification } from 'antd';

function DownloadPdf({
  data,
  columns,
  disabled,
  filteredData,
  options = { show: true, enabled: true, settings: { unit: 'mm', format: 'a1', orientation: 'p' } },
}: TDownloadPdf) {
  if (!options?.show) return null;

  const [isLoading, setLoading] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: 'Download selected data',
      onClick: () => {
        if (size(filteredData) === 0 && size(data) > 0) tableDataToPdf(data || []);
        else tableDataToPdf(filteredData);
      },
    },
    {
      key: '1',
      label: 'Download all data',
      onClick: () => tableDataToPdf(data || []),
    },
  ];

  const tableDataToPdf = (data: any[]) => {
    setLoading(true);

    new Promise<void>((resolve) => {
      const doc = new jsPDF(options?.settings);

      const columnStyles: any = map(columns, (column, index) => ({
        [index]: { cellWidth: doc.getTextWidth(column?.title) + 2 },
      }));

      const formattedData = formateDatesInData(data);

      const userOptions =
        !isNil(options?.pdfTableOptions) && !isEmpty(options?.pdfTableOptions)
          ? options?.pdfTableOptions
          : {
              body: formattedData,
              margin: { top: 12, left: 12, right: 12 },
              columnStyles: merge({}, ...columnStyles),
              columns: map(columns, (column) => ({ header: column?.title, dataKey: column?.dataIndex })),
            };

      autoTable(doc, userOptions);

      doc.save(options?.fileName ? `${options?.fileName}.pdf` : 'data.pdf');

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
      <Tooltip arrow title="Download pdf file">
        <Dropdown
          arrow
          menu={{ items }}
          trigger={['click']}
          placement="bottomRight"
          disabled={disabled || !options?.enabled}
        >
          <AntButton type="default" isLoading={isLoading} icon={<FilePdfOutlined />} />
        </Dropdown>
      </Tooltip>
    </Col>
  );
}

type TDownloadPdf = {
  data?: any[];
  columns?: any;
  disabled?: boolean;
  filteredData: any[];
  options?: {
    show?: boolean;
    enabled?: boolean;
    fileName?: string;
    settings?: jsPDFOptions;
    pdfTableOptions?: UserOptions;
  };
};

export default DownloadPdf;
