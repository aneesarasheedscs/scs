import { AntColumnType } from '@tradePro/globalTypes';

export const columns = (t: any): AntColumnType<any>[] => [
  {
    title: <>{t('department')}</>,
    width: 200,
    searchableInput: true,
    dataIndex: 'DocumentTypeCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },
  {
    title: <>{t('short_name')}</>,
    width: 160,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode.localeCompare(b.VoucherCode),
  },
  {
    title: <>{t('section_name')}</>,
    width: 160,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode.localeCompare(b.VoucherCode),
  },
  {
    title: <>{t('code')}</>,
    width: 160,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode.localeCompare(b.VoucherCode),
  },
];
