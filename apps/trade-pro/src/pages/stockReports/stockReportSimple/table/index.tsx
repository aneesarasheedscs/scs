import { AntTable } from '@tradePro/components';
import { Card, Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';
import '../style2.scss';

import SearchCriteriaForm from './SearchCriteriaForm';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetStockReportSimpleTable } from '../queries';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function StockReportSimpleTable({ ItemId }: any) {
  const { data, isError, isLoading, refetch, isFetching } = useGetStockReportSimpleTable();
  const [SelectedItems, setSelectedItems] = useState<number | undefined>(undefined);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const handleItemNameClick = (ItemIds: number) => {
    console.log(ItemIds);
    navigate('/inventory-transaction-report-retail', {
      state: {
        ItemIds,
      },
    });
  };

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
            numberOfSkeletons={12}
            refetch={refetch}
            isLoading={isLoading || isFetching}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
            data={data?.data?.Data?.Result}
            searchCriteriaForm={<SearchCriteriaForm />}
            columns={columns(t, handleItemNameClick)}
          />
        </Col>
      </Row>
    </>
  );
}

export default StockReportSimpleTable;
