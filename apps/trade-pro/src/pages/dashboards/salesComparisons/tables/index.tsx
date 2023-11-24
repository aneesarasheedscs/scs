import { column, columnforCity, columnforPackingSize, columns } from './columns';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { Card, theme } from 'antd';
// import { useGetMonthandQuarterWiseSaleReport } from '../query';

const { useToken } = theme;

function SalesComparisonReportforTopCustomers({
  data,
  refetch,
  isSaleReportLoading,
  isSaleReportError,
  isFetching,
}: any) {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const rawData = data?.data?.Data?.Result;
  const filteredCustomerData = rawData?.filter((item: any) => item.DescriptionTitle === 'Customer');

  return (
    <>
      <AntTable
        rowKey="Id"
        refetch={refetch}
        isError={isSaleReportError}
        columns={columns(t)}
        numberOfSkeletons={12}
        isLoading={isSaleReportLoading || isFetching}
        data={filteredCustomerData || []}
        scroll={{ x: '', y: convertVhToPixels('17vh') }}
      />
    </>
  );
}

export default SalesComparisonReportforTopCustomers;

export function SalesComparisonReportforTopItems({
  data,
  refetch,
  isSaleReportLoading,
  isSaleReportError,
  isFetching,
}: any) {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const rawData = data?.data?.Data?.Result;
  const filteredCustomerData = rawData?.filter((item: any) => item.DescriptionTitle === 'Item');

  return (
    <>
      <AntTable
        rowKey="Id"
        refetch={refetch}
        isError={isSaleReportError}
        columns={column(t)}
        numberOfSkeletons={12}
        isLoading={isSaleReportLoading || isFetching}
        data={filteredCustomerData || []}
        scroll={{ x: '', y: convertVhToPixels('17vh') }}
      />
    </>
  );
}
export function SalesComparisonReportforTopCities({
  data,
  refetch,
  isSaleReportLoading,
  isSaleReportError,
  isFetching,
}: any) {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const rawData = data?.data?.Data?.Result;
  const filteredCustomerData = rawData?.filter((item: any) => item.DescriptionTitle === 'City');

  return (
    <>
      <AntTable
        rowKey="Id"
        refetch={refetch}
        isError={isSaleReportError}
        columns={columnforCity(t)}
        numberOfSkeletons={12}
        isLoading={isSaleReportLoading || isFetching}
        data={filteredCustomerData || []}
        scroll={{ x: '', y: convertVhToPixels('17vh') }}
      />
    </>
  );
}
export function SalesComparisonReportforTopPackSize({
  data,
  refetch,
  isSaleReportLoading,
  isSaleReportError,
  isFetching,
}: any) {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const rawData = data?.data?.Data?.Result;
  const filteredCustomerData = rawData?.filter((item: any) => item.DescriptionTitle === 'PackingSize');

  return (
    <>
      <AntTable
        rowKey="Id"
        refetch={refetch}
        isError={isSaleReportError}
        columns={columnforPackingSize(t)}
        numberOfSkeletons={12}
        isLoading={isSaleReportLoading || isFetching}
        data={filteredCustomerData || []}
        scroll={{ x: '', y: convertVhToPixels('17vh') }}
      />
    </>
  );
}
