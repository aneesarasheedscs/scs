import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { Col, Row, Space, Tabs, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckCircleTwoTone, PrinterTwoTone } from '@ant-design/icons';
import {
  useGetOrdersDashboardforDeliveryInTransit,
  useGetOrdersDashboardDeliveryInTransitPdf,
  useGetOrdersDashboardDlvTransitConfirmStatus,
} from '../quries';
import { AntButton, AntTablecopy } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { TDeliveryInTransit } from '../types';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useState } from 'react';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function DeliveryInTransit() {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedIdforStatus, setSelectedIdforStatus] = useState<number | null>(null);
  const { data, isLoading, isFetching, isError } = useGetOrdersDashboardforDeliveryInTransit();
  const { refetch, isSuccess } = useGetOrdersDashboardDeliveryInTransitPdf(selectedId);
  const { refetch: refetchStatus } = useGetOrdersDashboardDlvTransitConfirmStatus(selectedIdforStatus);
  return (
    <>
      <Row>
        <Col span={24}>
          <AntTablecopy
            isError={isError}
            isLoading={isLoading || isFetching}
            showDefaultTableGrid={true}
            columns={columns(t, setSelectedId, setSelectedIdforStatus)}
            data={data?.data?.Data?.Result}
            // scroll={{ x: '', y: convertVhToPixels('60vh') }}
          />
        </Col>
      </Row>
    </>
  );
}

export default DeliveryInTransit;
export const columns = (
  t: TFunction,
  setSelectedId: (id: number | null) => void,
  setSelectedIdforStatus: (id: number | null) => void
): AntColumnType<TDeliveryInTransit>[] => [
  {
    title: t('serial_no'),
    key: 'RNo',
    dataIndex: 'RNo',
    width: 60,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.RNo - b?.RNo,
  },
  {
    title: t('out_date'),
    key: 'DocDate',
    dataIndex: 'DocDate',
    width: 250,
    sortDirections: ['ascend', 'descend'],
    render: (_, { DocDate }) => formateDate(DocDate),

    sorter: (a, b) => {
      const dateA = dayjs(a.DocDate);
      const dateB = dayjs(b.DocDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: t('time'),
    key: 'OutTime',
    dataIndex: 'OutTime',
    width: 200,
    sortDirections: ['ascend', 'descend'],
    render: (_, { OutTime }) => dayjs(OutTime).format('hh mm A'),
  },

  {
    width: 150,
    title: t('vehicle_no'),
    key: 'VehicleNo',
    dataIndex: 'VehicleNo',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.VehicleNo?.localeCompare(b?.VehicleNo),
  },
  {
    width: 200,
    title: t('cell_no'),
    key: 'DriverCellNo',
    dataIndex: 'DriverCellNo',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.DriverCellNo?.localeCompare(b?.DriverCellNo),
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
    key: 'NetWeight',
    dataIndex: 'NetWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a?.NetWeight - b?.NetWeight,
    render: (_, { NetWeight }) => numberFormatter(NetWeight),
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
