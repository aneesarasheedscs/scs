import { theme } from 'antd';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { columns } from './column';
import { useGetReadAllLevelLeaveService } from '../../querie';
import { TChartAccountAllLevelData } from '../../../types';
import { useAtom } from 'jotai';
import { selectedRowsAtom, selectedChildRowsAtom } from '../../Atom';
import { useTranslation } from 'react-i18next';

function TableofAccountLevel3() {
  const {
    refetch,

    data: table,
    isError: tableError,
    isLoading: tableLoading,
    isSuccess: tableSuccess,
  } = useGetReadAllLevelLeaveService();

  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { t } = useTranslation();
  const filteredTableData = table?.data?.Data?.Result?.filter((item: any) => item.Account_Level === 3) || [];
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [selectedChildRows, setSelectedChildRows] = useAtom(selectedChildRowsAtom);

  const handleAccountSelect = (record: TChartAccountAllLevelData) => {
    setSelectedRows([record]);
    console.log('Record Data', record);
  };
  const handleChildAccount = (record: TChartAccountAllLevelData) => {
    setSelectedChildRows([record]);
    console.log('Record Data', record);
  };
  return (
    <div className="childTables1">
      <h4
        style={{
          padding: '10px',
          borderRadius: 5,
          background: colorPrimary,
          textAlign: 'center',
          border: '2px ridge #ffeeee',
        }}
      >
        {t('account_3rd_level')}
      </h4>

      <AntTable
        refetch={refetch}
        isError={tableError}
        data={filteredTableData || []}
        columns={columns(t, handleAccountSelect, handleChildAccount)}
        isLoading={tableLoading}
        numberOfSkeletons={10}
        scroll={{ x: '', y: convertVhToPixels('46vh') }}
      />
    </div>
  );
}

export default TableofAccountLevel3;
