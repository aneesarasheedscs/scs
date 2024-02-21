import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { gdnRegisterHistory } from './type';
import dayjs from 'dayjs';
import { Space } from 'antd';

export const columns = (t: any): AntColumnType<gdnRegisterHistory>[] => [
  {
    title: t('doc_date'),
    showCount: true,
    width: 150,
    searchableDate: true,
    dataIndex: 'DocDate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.DocDate);
      const dateB = dayjs(b.DocDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { DocDate }) => formateDate(DocDate),
  },
  {
    title: t('doc_no'),
    dataIndex: 'DocNo',
    width: 150,
    sorter: (a, b) => a.DocNo - b.DocNo,
  },
  {
    width: 150,
    title: t('order_date'),
    dataIndex: 'SaleOrderDate',
    searchableDate: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.SaleOrderDate);
      const dateB = dayjs(b.SaleOrderDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { SaleOrderDate }) => formateDate(SaleOrderDate),
  },
  {
    title: t('order_no'),
    dataIndex: 'SaleOrderNo',
    width: 150,
    render: (_, { SaleOrderNo }) => <a onClick={() => {}}>{SaleOrderNo}</a>,
    sorter: (a, b) => a.SaleOrderNo - b.SaleOrderNo,
  },

  {
    width: 300,
    searchableInput: true,
    title: t('customer_name'),
    dataIndex: 'CustomerName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CustomerName.localeCompare(b.CustomerName),
  },
  {
    width: 300,
    searchableInput: true,
    title: t('transporter'),
    dataIndex: 'TransporterName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TransporterName.localeCompare(b.TransporterName),
  },

  {
    title: t('item_name'),
    dataIndex: 'ItemName',
    width: 350,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    title: t('pack_uOM'),
    dataIndex: 'PackUom',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    width: 150,
    title: t('item_qty'),
    showTotal: true,
    dataIndex: 'ItemQty',
    sorter: (a, b) => a.ItemQty - b.ItemQty,
    align: 'right',
    render: (_, { ItemQty }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ItemQty)}</Space>
    ),
  },
  {
    width: 150,
    title: t('short_weight'),
    dataIndex: 'ShortWeight',
    sorter: (a, b) => a.ShortWeight - b.ShortWeight,
    showTotal: true,
    align: 'right',
    render: (_, { ShortWeight }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(ShortWeight)}</Space>
    ),
  },
  {
    width: 150,
    title: t('stock_weight'),
    dataIndex: 'StockWeight',
    sorter: (a, b) => a.StockWeight - b.StockWeight,
    showTotal: true,
    align: 'right',
    render: (_, { StockWeight }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(StockWeight)}</Space>
    ),
  },
  {
    width: 150,
    showTotal: true,
    align: 'right',
    sorter: (a, b) => a.NetBillWeight - b.NetBillWeight,
    title: t('net_bill_weight'),
    dataIndex: 'NetBillWeight',
    render: (_, { NetBillWeight }) => (
      <Space style={{ display: 'flex', justifyContent: 'end' }}>{numberFormatter(NetBillWeight)}</Space>
    ),
  },
  {
    width: 200,
    searchableInput: true,
    title: t('wareHouse_name'),
    dataIndex: 'WareHouse',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WareHouse.localeCompare(b.WareHouse),
  },
  {
    width: 150,
    searchableInput: true,
    title: t('jobLot_name'),
    dataIndex: 'JobLot',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLot.localeCompare(b.JobLot),
  },

  { title: t('vehicle_no'), dataIndex: 'VehicleNo', width: 150, sorter: (a, b) => a.VehicleNo - b.VehicleNo },
  { title: t('bilty_no'), dataIndex: 'BiltyNo', width: 150, sorter: (a, b) => a.BiltyNo - b.BiltyNo },
  {
    width: 150,
    title: 'Entry Date',
    dataIndex: 'EntryDate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.SaleOrderDate);
      const dateB = dayjs(b.SaleOrderDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { EntryDate }) => formateDate(EntryDate),
  },
  {
    width: 120,
    title: t('entry_user'),
    dataIndex: 'EntryUser',
    sorter: (a, b) => a.EntryUser.localeCompare(b.EntryUser),
  },
  {
    width: 150,
    title: t('modify_date'),
    dataIndex: 'ModifyDate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const dateA = dayjs(a.ModifyDate);
      const dateB = dayjs(b.ModifyDate);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    render: (_, { ModifyDate }) => formateDate(ModifyDate),
  },
  {
    width: 150,
    title: t('modify_user'),
    dataIndex: 'ModifyUser',
    sorter: (a, b) => a.ModifyUser.localeCompare(b.ModifyUser),
  },
];
