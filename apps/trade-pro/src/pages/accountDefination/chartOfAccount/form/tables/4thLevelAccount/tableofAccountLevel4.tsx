import { theme } from 'antd';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { columns } from './column';
import { useGetReadAllLevelLeaveService } from '../../querie';
import { useAtom } from 'jotai';
import { TChartAccountAllLevelData } from '../../../types';
import { selectedRowsAtom, selectedChildRowsAtom } from '../../Atom';
import { useTranslation } from 'react-i18next';

function TableofAccountLevel4() {
  const {
    refetch,

    data: table,
    isError: tableError,
    isLoading: tableLoading,
    isSuccess: tableSuccess,
  } = useGetReadAllLevelLeaveService();
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const filteredTableData = table?.data?.Data?.Result?.filter((item: any) => item.Account_Level === 4) || [];
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
    <div className="childTables">
      <h4
        style={{
          padding: '10px',
          borderRadius: 5,
          background: colorPrimary,
          textAlign: 'center',
          border: '2px ridge #ffeeee',
        }}
      >
        {t('account_4th_level')}
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

export default TableofAccountLevel4;
