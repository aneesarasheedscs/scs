import { PayablesReportHistory } from './type';
import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const columns = (t: any): AntColumnType<PayablesReportHistory>[] => [

    { title: 'Account Code', dataIndex: 'AcoountCode', width: 200 },

    {
        width: 200,
        title: 'Account Class',
        searchableDate: true,
        dataIndex: 'AccountClass',
        sorter: (a, b) => a.AccountClass.localeCompare(b.AccountClass),
    },
    {
        width: 200,
        title: 'Account Group',
        dataIndex: 'AccountGroup',
        searchableDate: true,
        sorter: (a, b) => a.AccountGroup.localeCompare(b.AccountGroup),
    },
    { title: 'City Name', dataIndex: 'CityName', width: 120 },
    {
        width: 150,
        title: 'Ob Debit',
        showTotal: true,
        dataIndex: 'ObDebit',
        render: (_, { ObDebit }) => numberFormatter(ObDebit),
    },
    {
        width: 150,
        title: 'Ob Credit',
        showTotal: true,
        dataIndex: 'ObCredit',
        render: (_, { ObCredit }) => numberFormatter(ObCredit),
    },
    {
        width: 150,
        title: 'Curr Debit',
        showTotal: true,
        dataIndex: 'CurrDebit',
        render: (_, { CurrDebit }) => numberFormatter(CurrDebit),
    },
    {
        width: 150,
        title: 'Curr Credit',
        showTotal: true,
        dataIndex: 'CurrCredit',
        render: (_, { CurrCredit }) => numberFormatter(CurrCredit),
    },
    {
        width: 150,
        title: 'CLosing Debit',
        showTotal: true,
        dataIndex: 'ClDebit',
        render: (_, { ClDebit }) => numberFormatter(ClDebit),
    },
];
