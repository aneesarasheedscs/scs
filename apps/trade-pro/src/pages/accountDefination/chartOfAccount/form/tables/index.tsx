import { columns } from './column';
import { theme } from 'antd';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { TChartAccountAllLevelData } from '../../types';
import { useGetReadAllLevelLeaveService } from '../querie';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

interface AnotherComponentProps {
  data: any;
  selectedRows?: any;
}
function ChildAccountTable({ data, selectedRows }: AnotherComponentProps) {
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
  console.log(selectedRows);

  const [title, settitle] = useState<any>('');
  const [level, setLevel] = useState<any>(0);

  const filteredTableData = AllLevelsData?.filter(
    (item: TChartAccountAllLevelData) => item.ParentAccountTitle === AccountLeaveServiceData
  );
  useEffect(() => {
    if (filteredTableData?.[0]?.Account_Level === 2) {
      setLevel(1);
    } else if (filteredTableData?.[0]?.Account_Level === 3) {
      setLevel(2);
    } else if (filteredTableData?.[0]?.Account_Level === 4) {
      setLevel(3);
    } else if (filteredTableData?.[0]?.Account_Level === 5) {
      setLevel(4);
    } else {
      setLevel(selectedRows?.[0]?.Account_Level);
    }
    if (filteredTableData && filteredTableData.length > 0) {
      settitle(filteredTableData?.[0]?.ParentAccountTitle);
    } else {
      settitle(selectedRows?.[0]?.AccountTitle);
    }
  }, [title, level, selectedRows, filteredTableData]);
  // console.log(filteredTableData);

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
          {t('child_account_of')} {title} {t('level')} {level}
        </h3>
      </h4>
      <AntTable
        refetch={refetch}
        isError={tableError}
        data={filteredTableData || []}
        columns={columns(t)}
        isLoading={tableLoading}
        numberOfSkeletons={14}
     
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
      />
    </div>
  );
}

export default ChildAccountTable;

// export function ChildAccountTableforView({ data, selectedRows }: AnotherComponentProps) {
//   const {
//     refetch,
//     data: table,
//     isError: tableError,
//     isLoading: tableLoading,
//     isSuccess: tableSuccess,
//   } = useGetReadAllLevelLeaveService();

//   const {
//     token: { colorPrimary },
//   } = theme.useToken();

//   const AllLevelsData = table?.data?.Data?.Result || [];
//   const AccountLeaveServiceData = data?.data?.Data?.Result?.[0]?.ParentCodeTitle;
//   console.log(AllLevelsData);
//   console.log(AccountLeaveServiceData);
//   console.log(selectedRows);

//   const selectedAccountTitle = selectedRows?.[0]?.AccountTitle;
//   const selectedAccountLevel = selectedRows?.[0]?.Account_Level;
//   console.log(selectedAccountTitle);
//   const filteredTableData = AllLevelsData?.filter(
//     (item: TChartAccountAllLevelData) => item.ParentAccountTitle === selectedAccountTitle
//   );

//   return (
//     <div className="childTables0">
//       <h4
//         style={{
//           padding: '10px',
//           borderRadius: 5,
//           background: colorPrimary,
//           textAlign: 'center',
//           border: '2px ridge #ffeeee',
//         }}
//       >
//         <h3>
//           {selectedRows && (
//             <>
//               {t('child_account_of')} {selectedAccountTitle} {t('level')} {selectedAccountLevel}{' '}
//             </>
//           )}
//         </h3>
//       </h4>
//       <AntTable
//         refetch={refetch}
//         isError={tableError}
//         data={filteredTableData || []}
//         columns={columns(t)}
//         isLoading={tableLoading}
//         numberOfSkeletons={6}
//         scroll={{ x: '', y: convertVhToPixels('20vh') }}
//       />
//     </div>
//   );
// }
