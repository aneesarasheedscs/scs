import { ReceivablesAgingRegisterHistory } from './type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const columns = (t: any): AntColumnType<ReceivablesAgingRegisterHistory>[] => [
    // {
    //     title: <>{t('sr#')}</>,
    //     dataIndex: '',
    //     width: 50,
    //     render: (_, __, index) => index + 1,
    //   },

    {
        width: 150,
        title: 'Ac1LevelCode',
        dataIndex:'Ac1LevelCode',
        render: (_, { Ac1LevelCode }) => numberFormatter(Ac1LevelCode),
    },

    {
        width: 300,
        searchableInput: true,
        title: 'Ac1levelTitle',
        dataIndex: 'Ac1LevelTitle',
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => a.Ac1levelTitle.localeCompare(b.Ac1levelTitle),
    },

    {
        width: 150,
        title: 'Ac2LevelCode',
        dataIndex:'Ac2LevelCode',
        render: (_, { Ac2LevelCode }) => numberFormatter(Ac2LevelCode),
    },

    {
        width: 300,
        searchableInput: true,
        title: 'Ac2levelTitle',
        dataIndex: 'Ac2LevelTitle',
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => a.Ac2levelTitle.localeCompare(b.Ac2levelTitle),
    },

    {
        width: 150,
        title: 'Ac3LevelCode',
        dataIndex:'Ac3LevelCode',
        render: (_, { Ac3LevelCode }) => numberFormatter(Ac3LevelCode),
    },

    {
        width: 300,
        searchableInput: true,
        title: 'Ac3levelTitle',
        dataIndex: 'Ac3LevelTitle',
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => a.Ac3levelTitle.localeCompare(b.Ac3levelTitle),
    },

    {
        width: 150,
        title: 'Ac4LevelCode',
        dataIndex:'Ac4LevelCode',
        render: (_, { Ac4LevelCode }) => numberFormatter(Ac4LevelCode),
    },

    {
        width: 300,
        searchableInput: true,
        title: 'AccountTitle',
        dataIndex: 'AccountTitle',
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    },

    {
        width: 120,
        title: 'Opening Balance',
        showTotal:true,
        dataIndex:'Opening',
        render: (_, { Opening }) => numberFormatter(Opening),
    },

    {
        width: 120,
        title: 'Interval 1st',
        showTotal:true,
        dataIndex:'Interval1st',
        render: (_, { Interval1st }) => numberFormatter(Interval1st),
    },

    {
        width: 120,
        title: 'Interval 2nd',
        showTotal:true,
        dataIndex:'Interval2nd',
        render: (_, { Interval2nd }) => numberFormatter(Interval2nd),
    },

    {
        width: 120,
        title: 'Interval 3rd',
        showTotal:true,
        dataIndex:'Interval3rd',
        render: (_, { Interval3rd }) => numberFormatter(Interval3rd),
    },

    {
        width: 120,
        title: 'Interval Above',
        showTotal:true,
        dataIndex:'IntervalAbove',
        render: (_, { IntervalAbove }) => numberFormatter(IntervalAbove),
    },
    
    {
        width: 200,
        title: 'Closing Balance',
        showTotal:true,
        dataIndex:'Closing',
        render: (_, { Closing }) => numberFormatter(Closing),
    },
    // {
    //     width: 120,
    //     title: 'Modify Date',
    //     dataIndex:'ModifyDate',
    //     render: (_, { ModifyDate }) => formateDate(ModifyDate),
    // }
];
