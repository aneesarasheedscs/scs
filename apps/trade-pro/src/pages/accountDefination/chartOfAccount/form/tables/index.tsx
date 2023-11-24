import { columns } from './column';
import { theme } from 'antd';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { TChartAccountAllLevelData } from '../../types';
import { useGetReadAllLevelLeaveService } from '../querie';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

interface SelectedValues {
  accountLevel: number;
  accountTitle: string;
}
interface AnotherComponentProps {
  data: any;
  selectedRows: any;
  displayData: any;
}
function ChildAccountTable({ data, selectedRows, displayData }: AnotherComponentProps) {
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
  const AllLevelsData = table?.data?.Data?.Result || [];
  const AccountLeaveServiceData = data?.data?.Data?.Result?.[0]?.ParentCodeTitle;
  console.log(AllLevelsData);
  console.log(AccountLeaveServiceData);
  console.log(selectedRows);
  console.log(displayData);

  // const selectedAccountTitle = selectedRows.map((i: any) => i.AccountTitle);
  // const selectedAccountLevel = selectedRows.map((i: any) => i.Account_Level);

  const filteredTableData = AllLevelsData?.filter(
    (item: TChartAccountAllLevelData) => item.ParentAccountTitle === AccountLeaveServiceData
  );

  // const titleClass = selectedRows && selectedRows.length > 0 ? 'hideable-heading-selected' : 'hideable-heading';
  // const titleClass2 = displayData ? 'hideable-heading-selected' : 'hideable-heading';
  // const title = displayData
  //   ? `Child Accounts of ${displayData.accountTitle} Level ${displayData.accountLevel}`
  //   : ''
  //   ? selectedRows
  //   : `Child Accounts of ${selectedAccountTitle} Level ${selectedAccountLevel}`;
  return (
    <div className="childTables0">
      <h4
        style={{
          padding: '10px',
          borderRadius: 5,
          background: colorPrimary,
          textAlign: 'center',
          border: '2px ridge #ffeeee',
        }}
      >
        {/* {title && <h3>{title}</h3>} */}
        <h3>
          {t('child_account')} {t('of')} {displayData?.accountTitle} {t('level')} {displayData?.accountLevel}
        </h3>
      </h4>
      <AntTable
        refetch={refetch}
        isError={tableError}
        data={filteredTableData || []}
        columns={columns(t)}
        isLoading={tableLoading}
        numberOfSkeletons={6}
        scroll={{ x: '', y: convertVhToPixels('27vh') }}
      />
    </div>
  );
}

export default ChildAccountTable;

export function ChildAccountTableforView({ data, selectedRows }: AnotherComponentProps) {
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

  const AllLevelsData = table?.data?.Data?.Result || [];
  const AccountLeaveServiceData = data?.data?.Data?.Result?.[0]?.ParentCodeTitle;
  console.log(AllLevelsData);
  console.log(AccountLeaveServiceData);
  console.log(selectedRows);

  const selectedAccountTitle = selectedRows?.[0]?.AccountTitle;
  const selectedAccountLevel = selectedRows?.[0]?.Account_Level;
  console.log(selectedAccountTitle);
  const filteredTableData = AllLevelsData?.filter(
    (item: TChartAccountAllLevelData) => item.ParentAccountTitle === selectedAccountTitle
  );

  return (
    <div className="childTables0">
      <h4
        style={{
          padding: '10px',
          borderRadius: 5,
          background: colorPrimary,
          textAlign: 'center',
          border: '2px ridge #ffeeee',
        }}
      >
        <h3>
          {selectedRows && (
            <>
              {t('child_account')} {t('of')} {selectedAccountTitle} {t('level')} {selectedAccountLevel}{' '}
            </>
          )}
        </h3>
      </h4>
      <AntTable
        refetch={refetch}
        isError={tableError}
        data={filteredTableData || []}
        columns={columns(t)}
        isLoading={tableLoading}
        numberOfSkeletons={6}
        scroll={{ x: '', y: convertVhToPixels('20vh') }}
      />
    </div>
  );
}
