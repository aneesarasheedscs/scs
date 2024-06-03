import { AntTablecopy } from '@tradePro/components';
import { Col, Row } from 'antd';
import { useGetSalesReportTable } from '../queries';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteria from './SearchCriteria';

function SaleOrderTable() {
  const { data, refetch, isLoading, isFetching, isError } = useGetSalesReportTable();
  function CriteriaString() {
    return (
      <Row style={{ border: '1px solid #25A7DF', padding: 7, borderRadius: 5 }}>
        <h5> {data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    );
  }
  const { t } = useTranslation();
  return (
    <>
      <Row justify={'space-around'}>
        <Col span={24}>
          <AntTablecopy
            refetch={refetch}
            isError={isError}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            columns={columns(t)}
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<SearchCriteria />}
            reportCriteriaString={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
            scroll={{ x: '', y: convertVhToPixels('50vh') }}
            rowKey="Id"
          />
        </Col>
      </Row>
    </>
  );
}

export default SaleOrderTable;
