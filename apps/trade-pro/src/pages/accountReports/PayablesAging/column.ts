import { PayablesAgingRegisterHistory } from './type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const columns = (t: any): AntColumnType<PayablesAgingRegisterHistory>[] => [
  
    {
        width: 300,
        searchableInput: true,
        title: 'Account Title',
        dataIndex: 'AccountTitle',
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    },
    // { title: 'Item Name', dataIndex: 'ItemName', width: 350 },
    // {
    //     width: 300,
    //     searchableInput: true,
    //     title: 'Transporter Name',
    //     dataIndex: 'TransporterName',
    //     sortDirections: ['ascend', 'descend'],
    //     sorter: (a, b) => a.TransporterName.localeCompare(b.TransporterName),
    // },
    // {
    //     width: 300,
    //     searchableInput: true,
    //     title: 'WareHouse Name',
    //     dataIndex: 'WareHouse',
    //     sortDirections: ['ascend', 'descend'],
    //     sorter: (a, b) => a.WareHouse.localeCompare(b.WareHouse),
    // },
    // {
    //     width: 170,
    //     searchableInput: true,
    //     title: 'JobLot Name',
    //     dataIndex: 'JobLot',
    //     sortDirections: ['ascend', 'descend'],
    //     sorter: (a, b) => a.JobLot.localeCompare(b.JobLot),
    // },
    // { title: 'Pack UOM', dataIndex: 'PackUom', width: 120 },
    // {
    //     width: 120,
    //     title: 'Item Qty',
    //     showTotal:true,
    //     dataIndex:'ItemQty',
    //     render: (_, { ItemQty }) => numberFormatter(ItemQty),
    // },
    // {
    //     width: 120,
    //     title: 'Short Weight',
    //     dataIndex:'ShortWeight',
    //     showTotal:true,
    //     render: (_, { ShortWeight }) => numberFormatter(ShortWeight),
    // },
    // {
    //     width: 120,
    //     title: 'Stock Weight',
    //     dataIndex:'StockWeight',
    //     showTotal: true,
    //     render: (_, { StockWeight }) => numberFormatter(StockWeight),
    // },
    // {
    //     width: 120,
    //     showTotal: true,
    //     title: 'Net Bill Weight',
    //     dataIndex: 'NetBillWeight',
    //     render: (_, { NetBillWeight }) => numberFormatter(NetBillWeight),
    // },    
    
    // { title: 'Vehicle No', dataIndex: 'VehicleNo', width: 120 },
    // { title: 'Bilty No', dataIndex: 'BiltyNo', width: 120 },
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
