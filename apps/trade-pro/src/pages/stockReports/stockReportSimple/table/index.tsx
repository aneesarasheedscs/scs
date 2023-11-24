import { AntTable } from '@tradePro/components';
import { Card, Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';
import '../style2.scss';
import { useGetStockReportSimpleTable } from '../queries/queries';
import SearchCriteriaForm from './SearchCriteriaForm';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function StockReportSimpleTable() {
  const { data, isError, isLoading } = useGetStockReportSimpleTable();

  const { t } = useTranslation();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24, offset: 0 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
            <AntTable
              rowKey="Id"
              isError={isError}
              numberOfSkeletons={8}
              isLoading={isLoading}
              scroll={{ x: '', y: convertVhToPixels('60vh') }}
              data={data?.data?.Data?.Result}
              searchCriteriaForm={<SearchCriteriaForm />}
              columns={columns(t)}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default StockReportSimpleTable;
