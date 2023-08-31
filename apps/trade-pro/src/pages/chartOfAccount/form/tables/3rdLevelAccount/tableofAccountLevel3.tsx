import { theme } from 'antd';
import { AntTable } from '@tradePro/components';
import { usegetAccountHistoryTable } from '../../../queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { columns } from './column';
import { usegetAccountLevels } from '../queries';

interface SelectedValues {
  accountLevel: number;
  accountTitle: string;
}

function TableofAccountLevel3() {
  const {
    refetch,

    data: table,
    isError: tableError,
    isLoading: tableLoading,
    isSuccess: tableSuccess,
  } = usegetAccountLevels();

  const {
    token: { colorPrimary },
  } = theme.useToken();
  const filteredTableData = table?.data?.Data?.Result?.filter((item: any) => item.Account_Level === 3) || [];

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
        Accounts(3rd Level)
      </h4>

      <AntTable
        refetch={refetch}
        isError={tableError}
        data={filteredTableData || []}
        columns={columns()}
        isLoading={tableLoading}
        numberOfSkeletons={15}
        scroll={{ x: '', y: convertVhToPixels('46vh') }}
      />
    </div>
  );
}

export default TableofAccountLevel3;
