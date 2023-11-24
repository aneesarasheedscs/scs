import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TGRNDetailTableHistory } from '../types';
import { Space, Tooltip } from 'antd';
import { AntButton } from '@tradePro/components';
import { EditFilled, PrinterOutlined } from '@ant-design/icons';

export const columns = (t: any): AntColumnType<TGRNDetailTableHistory>[] => [
  { title: <>{t('order_no')}</>, dataIndex: 'OrderNo', width: 110 },
  {
    width: 150,
    title: <>{t('order_date')}</>,
    searchableDate: true,
    dataIndex: 'OrderDate',
    render: (_, { OrderDate }) => formateDate(OrderDate),
  },
  { title: <>{t('grn_no')}</>, dataIndex: 'GrnNo', width: 110 },
  {
    width: 150,
    title: <>{t('grn_date')}</>,
    searchableDate: true,
    dataIndex: 'GrnDate',
    render: (_, { GrnDate }) => formateDate(GrnDate),
  },

  {
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    width: 300,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    title: <>{t('supplier_name')}</>,
    dataIndex: 'SupplierName',
    width: 250,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  {
    title: <>{t('ware_house_name')}</>,
    dataIndex: 'WareHouseName',
    width: 200,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WareHouseName.localeCompare(b.WareHouseName),
  },
  {
    title: <>{t('job_lot')}</>,
    dataIndex: 'JobLot',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLot.localeCompare(b.JobLot),
  },
  {
    title: <>{t('base_pack_uom')}</>,
    dataIndex: 'BaseUom',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.BaseUom.localeCompare(b.BaseUom),
  },
  {
    width: 150,
    title: <>{t('item_quantity')}</>,
    dataIndex: 'ItemQty',
    render: (_, { ItemQty }) => (
      <>
        <Space style={{ marginLeft: '80%' }}>{ItemQty}</Space>
      </>
    ),
  },

  {
    width: 160,
    title: <>{t('net_bill_weight')}</>,
    dataIndex: 'NetBillWeight',
    render: (_, { NetBillWeight }) => numberFormatter(NetBillWeight),
  },
  {
    width: 140,
    title: <>{t('bilty_no')}</>,
    dataIndex: 'BiltyNo',
  },
  {
    width: 140,
    title: <>{t('gp_no')}</>,
    dataIndex: 'GpNo',
  },

  {
    width: 140,
    title: <>{t('vehicle_no')}</>,
    dataIndex: 'VehicleNo',
    // render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
  {
    width: 140,
    title: <>{t('city_name')}</>,
    dataIndex: 'CityName',
  },

  {
    width: 180,
    title: <>{t('remarks')}</>,
    dataIndex: 'Remarks',
  },
  {
    width: 120,
    title: <>{t('action')} </>,
    dataIndex: 'Remarks',
    render: (_, record) => (
      <>
        <Tooltip title={t('edit')}>
          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'black' }} />}
            // onClick={() => setSelectedRecordId(record?.Id)}
          />
        </Tooltip>
        <Tooltip title={t('print')}>
          <AntButton
            type="text"
            icon={<PrinterOutlined style={{ color: 'red' }} />}
            // onClick={() => setSelectedRecordId(record?.Id)}
          />
        </Tooltip>
      </>
    ),
  },
];
