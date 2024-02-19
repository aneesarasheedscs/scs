import { AntTable } from '@tradePro/components';
import { Card, Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';
import '../style2.scss';

import SearchCriteriaForm from './SearchCriteriaForm';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetStockReportSimpleTable } from '../queries';

function StockReportSimpleTable() {
  const { data, isError, isLoading } = useGetStockReportSimpleTable();

  const { t } = useTranslation();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row justify={'space-around'}>
        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 23 }}
          lg={{ span: 23 }}
          xl={{ span: 23, offset: 0 }}
          xxl={{ span: 23, offset: 0 }}
        >
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
        </Col>
      </Row>
    </>
  );
}

export default StockReportSimpleTable;
