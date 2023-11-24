import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { gdnRegisterHistory } from './type';

export const columns = (t: any): AntColumnType<gdnRegisterHistory>[] => [
  { title: 'Doc No', dataIndex: 'DocNo', width: 100 },

  {
    width: 150,
    title: 'Doc Date',
    searchableDate: true,
    dataIndex: 'DocDate',
    render: (_, { DocDate }) => formateDate(DocDate),
  },
  {
    width: 150,
    title: 'Sale Order Date',
    dataIndex: 'SaleOrderDate',
    searchableDate: true,
    render: (_, { SaleOrderDate }) => formateDate(SaleOrderDate),
  },
  {
    width: 300,
    searchableInput: true,
    title: 'Customer Name',
    dataIndex: 'CustomerName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CustomerName.localeCompare(b.CustomerName),
  },
  { title: 'Item Name', dataIndex: 'ItemName', width: 350 },
  {
    width: 300,
    searchableInput: true,
    title: 'Transporter Name',
    dataIndex: 'TransporterName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TransporterName.localeCompare(b.TransporterName),
  },
  {
    width: 300,
    searchableInput: true,
    title: 'WareHouse Name',
    dataIndex: 'WareHouse',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WareHouse.localeCompare(b.WareHouse),
  },
  {
    width: 170,
    searchableInput: true,
    title: 'JobLot Name',
    dataIndex: 'JobLot',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.JobLot.localeCompare(b.JobLot),
  },
  { title: 'Pack UOM', dataIndex: 'PackUom', width: 120 },
  {
    width: 120,
    title: 'Item Qty',
    showTotal: true,
    dataIndex: 'ItemQty',
    render: (_, { ItemQty }) => numberFormatter(ItemQty),
  },
  {
    width: 120,
    title: 'Short Weight',
    dataIndex: 'ShortWeight',
    showTotal: true,
    render: (_, { ShortWeight }) => numberFormatter(ShortWeight),
  },
  {
    width: 120,
    title: 'Stock Weight',
    dataIndex: 'StockWeight',
    showTotal: true,
    render: (_, { StockWeight }) => numberFormatter(StockWeight),
  },
  {
    width: 120,
    showTotal: true,
    title: 'Net Bill Weight',
    dataIndex: 'NetBillWeight',
    render: (_, { NetBillWeight }) => numberFormatter(NetBillWeight),
  },

  { title: 'Vehicle No', dataIndex: 'VehicleNo', width: 120 },
  { title: 'Bilty No', dataIndex: 'BiltyNo', width: 120 },
  // {
  //     width: 120,
  //     title: 'Entry Date',
  //     dataIndex: 'EntryDate',

  //     render: (_, { EntryDate }) => formateDate(EntryDate),
  // },
  // {
  //     width: 120,
  //     title: 'Modify Date',
  //     dataIndex:'ModifyDate',
  //     render: (_, { ModifyDate }) => formateDate(ModifyDate),
  // }
];
