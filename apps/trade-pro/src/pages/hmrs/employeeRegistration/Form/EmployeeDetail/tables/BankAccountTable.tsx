import { AntTable } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';

const columns = (t?: any): AntColumnType<any>[] => [
  {
    title: <>{t('bank_name')}</>,
    dataIndex: 'ItemName',
    width: 200,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },

  {
    title: <>{t('account_title')}</>,
    dataIndex: 'PackUom',
    width: 200,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('account_no')}</>,
    dataIndex: 'PackUom',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('is_pay_roll')}</>,
    dataIndex: 'PackUom',
    width: 120,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
];
function BankAccountTable() {
  const { t } = useTranslation();
  return (
    <>
      <AntTable
        // refetch={refetch}
        // isError={isError}
        columns={columns(t)}
        numberOfSkeletons={12}
        // isLoading={isLoading || isFetching}
        // data={selectedRows}
        scroll={{ x: '', y: convertVhToPixels('20vh') }}
      />
    </>
  );
}

export default BankAccountTable;
