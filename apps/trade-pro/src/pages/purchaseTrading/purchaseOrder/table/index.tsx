import { columns } from './columns';
import { AntTable } from '@tradePro/components';
import { useGetPurchaseOrder } from '../queries';
import SearchCriteriaFrom from './SearchCriteriaForm';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, theme } from 'antd';

const { useToken } = theme;

function PurchaseOrderTable() {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetPurchaseOrder();

  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <>
      <Card>
        <Row>
          <Col xl={8} style={{ textAlign: 'center' }}>
            {' '}
            <Card
              cover={<h3>Un-Approved Order </h3>}
              style={{ background: colorPrimary, height: '100%' }}
              className="purchase-cards"
            ></Card>{' '}
          </Col>
          <Col xl={8}>
            {' '}
            <Card></Card>{' '}
          </Col>
          <Col xl={8}>
            {' '}
            <Card></Card>{' '}
          </Col>
        </Row>
      </Card>

      <AntTable
        refetch={refetch}
        isError={isError}
        columns={columns(t)}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={data?.data?.Data?.Result || []}
        searchCriteriaForm={<SearchCriteriaFrom />}
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
      />
    </>
  );
}

export default PurchaseOrderTable;
