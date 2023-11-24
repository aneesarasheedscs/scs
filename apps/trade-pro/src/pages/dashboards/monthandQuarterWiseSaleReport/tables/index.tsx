import { column, columns } from './columns';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { Card, theme } from 'antd';

const { useToken } = theme;

function SaleReportbyMonth({ getMonthandQuarter, refetch, isError, isLoading, isFetching }: any) {
  const { t } = useTranslation();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <AntTable
        printData={{ enabled: false, show: false }}
        downloadPdf={{ enabled: false, show: false }}
        columnChooser={{ enabled: false, show: false }}
        downloadExcel={{ enabled: false, show: false }}
        groupByColumns={{ enabled: false, show: false }}
        refreshData={{ enabled: false, show: false }}
        rowKey="Id"
        refetch={refetch}
        isError={isError}
        columns={columns(t)}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={getMonthandQuarter?.data?.Data?.Result?.Table2 || []}
        scroll={{ x: '', y: convertVhToPixels('14vh') }}
      />
    </>
  );
}

export default SaleReportbyMonth;

export function SaleReportbyQuarter({ getMonthandQuarter, refetch, isError, isLoading, isFetching }: any) {
  const { t } = useTranslation();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <AntTable
        printData={{ enabled: false, show: false }}
        downloadPdf={{ enabled: false, show: false }}
        columnChooser={{ enabled: false, show: false }}
        downloadExcel={{ enabled: false, show: false }}
        groupByColumns={{ enabled: false, show: false }}
        refreshData={{ enabled: false, show: false }}
        rowKey="Id"
        refetch={refetch}
        isError={isError}
        columns={column(t)}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={getMonthandQuarter?.data?.Data?.Result?.Table1 || []}
        scroll={{ x: '', y: convertVhToPixels('14vh') }}
      />
    </>
  );
}
