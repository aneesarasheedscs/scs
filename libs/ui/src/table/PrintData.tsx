import { useState } from 'react';
import jsPDF, { jsPDFOptions } from 'jspdf';
import { formateDatesInData } from './utils';
import { AntButton } from '../button/AntButton';
import { PrinterOutlined } from '@ant-design/icons';
import autoTable, { UserOptions } from 'jspdf-autotable';
import { map, merge, size, isNil, isEmpty } from 'lodash';
import { Col, Dropdown, MenuProps, Tooltip, notification } from 'antd';

function PrintData({
  data,
  columns,
  disabled,
  filteredData,
  options = { show: true, enabled: true, settings: { unit: 'mm', format: 'a4', orientation: 'p' } },
}: TPrintData) {
  if (!options?.show) return null;

  const [isLoading, setLoading] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: 'Print selected data',
      onClick: () => {
        if (size(filteredData) === 0 && size(data) > 0) return printPdf(data || []);
        else return printPdf(filteredData);
      },
    },
    {
      key: '1',
      label: 'Print all data',
      onClick: () => printPdf(data || []),
    },
  ];

  const printPdf = (data: any[]) => {
    setLoading(true);

    new Promise<void>((resolve) => {
      const doc = new jsPDF(options?.settings);

      // const columnStyles: any = map(columns, (column, index) => ({
      //   [index]: { cellWidth: doc.getTextWidth(column?.title) + 2 },
      // }));
      const columnStyles: any = map(columns, (column, index) => ({
        [index]: { cellWidth: 50 },
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

      doc.autoPrint();
      let oHiddFrame: any = document.createElement('iframe');
      oHiddFrame.style.position = 'fixed';
      oHiddFrame.style.visibility = 'hidden';
      oHiddFrame.src = doc.output('bloburl');
      document.body.appendChild(oHiddFrame);

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
      <Tooltip arrow title="Print table data">
        <Dropdown
          arrow
          menu={{ items }}
          trigger={['click']}
          placement="bottomRight"
          disabled={disabled || !options?.enabled}
        >
          <AntButton type="default" isLoading={isLoading} icon={<PrinterOutlined />} />
        </Dropdown>
      </Tooltip>
    </Col>
  );
}

type TPrintData = {
  data?: any[];
  columns?: any;
  disabled?: boolean;
  filteredData: any[];
  options?: { enabled?: boolean; show?: boolean; settings?: jsPDFOptions; pdfTableOptions?: UserOptions };
};

export default PrintData;
