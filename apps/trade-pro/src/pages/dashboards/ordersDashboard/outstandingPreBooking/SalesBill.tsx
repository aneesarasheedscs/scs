import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { Col, Row, Space, Tabs, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckCircleTwoTone, PrinterTwoTone } from '@ant-design/icons';
import {
  useGetOrdersDashboardforSalesBill,
  useGetOrdersDashboardSalesBillPdf,
  useGetOrdersDashboardSaleBillConfirmStatus,
} from '../quries';
import { AntButton, AntTablecopy } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { TSalesBill } from '../types';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useState } from 'react';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function SalesBill() {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedIdforStatus, setSelectedIdforStatus] = useState<number | null>(null);
  const { data, isLoading, isFetching } = useGetOrdersDashboardforSalesBill();
  const { refetch, isSuccess } = useGetOrdersDashboardSalesBillPdf(selectedId);
  const { refetch: refetchStatus } = useGetOrdersDashboardSaleBillConfirmStatus(selectedIdforStatus);
  const [pageSize, setPageSize] = useState<number | undefined>(10);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const mainData = data?.data?.Data?.Result || [];

  return (
    <>
      <Row>
        <Col span={24}>
          <AntTablecopy
            rowKey={'PackUom'}
            paginate
            tableId="pagination-example-id" // id must be unique
            pageSize={pageSize}
            currentPage={currentPage}
            totalItems={mainData[0]?.row_count}
            onChange={(pagination) => {
              setPageSize(pagination?.pageSize);
              setCurrentPage(pagination?.current);
            }}
            isLoading={isLoading || isFetching}
            showDefaultTableGrid={true}
            columns={columns(t, setSelectedId, setSelectedIdforStatus)}
            data={data?.data?.Data?.Result}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
          />
        </Col>
      </Row>
    </>
  );
}

export default SalesBill;
export const columns = (
  t: TFunction,
  setSelectedId: (id: number | null) => void,
  setSelectedIdforStatus: (id: number | null) => void
): AntColumnType<TSalesBill>[] => [
  {
    title: t('serial_no'),
    key: 'RNo',
    dataIndex: 'RNo',
    width: 60,
    sortDirections: ['ascend', 'descend'],
    render: (_, {}, index) => index + 1,
  },
  {
    title: t('bill_no'),
    key: 'DocNo',
    dataIndex: 'DocNo',
    width: 100,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.DocNo - b?.DocNo,
  },
  {
    title: t('bill_date'),
    key: 'DocDate',
    dataIndex: 'DocDate',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    render: (_, { DocDate }) => formateDate(DocDate),

    sorter: (a, b) => {
      const dateA = dayjs(a.DocDate);
      const dateB = dayjs(b.DocDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },

  {
    width: 150,
    align: 'right',
    showTotal: true,
    title: t('qty'),
    key: 'ItemQty',
    dataIndex: 'ItemQty',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.ItemQty - b?.ItemQty,
    render: (_, { ItemQty }) => numberFormatter(ItemQty),
  },

  {
    width: 150,
    title: t('weight'),
    align: 'right',
    showTotal: true,
    key: 'ItemWeight',
    dataIndex: 'ItemWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.ItemWeight - b?.ItemWeight,
    render: (_, { ItemWeight }) => numberFormatter(ItemWeight),
  },
  {
    width: 150,
    title: t('amount'),
    align: 'right',
    showTotal: true,
    key: 'BillAmount',
    dataIndex: 'BillAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.BillAmount - b?.BillAmount,
    render: (_, { BillAmount }) => numberFormatter(BillAmount),
  },

  {
    fixed: 'right',
    title: t('action'),
    width: 90,
    render: (_, record) => (
      <>
        <Row>
          <Tooltip title="Print">
            <Space style={{ position: 'absolute', top: 10, left: 5 }}>
              <AntButton
                type="text"
                icon={<PrinterTwoTone style={{ color: '', marginLeft: 0 }} />}
                onClick={() => {
                  setSelectedId(record?.Id);
                }}
              />
            </Space>
          </Tooltip>
          <Tooltip title="Confirm">
            <Space style={{ position: 'absolute', top: 10, left: 35 }}>
              <AntButton
                type="text"
                icon={<CheckCircleTwoTone style={{ color: '', marginLeft: 0 }} />}
                onClick={() => {
                  setSelectedIdforStatus(record?.Id);
                }}
              />
            </Space>
          </Tooltip>
        </Row>
      </>
    ),
  },
];
