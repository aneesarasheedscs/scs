import { column, columnforCity, columnforPackingSize, columns } from './columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { Table, theme } from 'antd';



function SalesComparisonReportforTopCustomers({ data }: any) {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const rawData = data?.data?.Data?.Result;
  const filteredCustomerData = rawData?.filter((item: any) => item.DescriptionTitle === 'Customer');

  return (
    <>
      <Table
        dataSource={filteredCustomerData}
        columns={columns(t)}
        pagination={false}
        size="small"
        scroll={{ x: '', y: convertVhToPixels('39vh') }}
      />
    </>
  );
}
export default SalesComparisonReportforTopCustomers;



export function SalesComparisonReportforTopItems({ data }: any) {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const rawData = data?.data?.Data?.Result;
  const filteredCustomerData = rawData?.filter((item: any) => item.DescriptionTitle === 'Item');

  return (
    <>
      <Table
        dataSource={filteredCustomerData || []}
        columns={column(t)}
        pagination={false}
        size="small"
        scroll={{ x: '', y: convertVhToPixels('39vh') }}
      />
    </>
  );
}


export function SalesComparisonReportforTopPackSize({ data }: any) {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const rawData = data?.data?.Data?.Result;
  const filteredCustomerData = rawData?.filter((item: any) => item.DescriptionTitle === 'PackingSize');

  return (
    <>
      <Table
        dataSource={filteredCustomerData || []}
        columns={columnforPackingSize(t)}
        pagination={false}
        size="small"
        scroll={{ x: '', y: convertVhToPixels('39vh') }}
      />
    </>
  );
}



export function SalesComparisonReportforTopCities({ data }: any) {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const rawData = data?.data?.Data?.Result;
  const filteredCustomerData = rawData?.filter((item: any) => item.DescriptionTitle === 'City');

  return (
    <>
      <Table
        dataSource={filteredCustomerData || []}
        columns={columnforCity(t)}
        pagination={false}
        size="small"
        scroll={{ x: '', y: convertVhToPixels('39vh') }}
      />
    </>
  );
}
