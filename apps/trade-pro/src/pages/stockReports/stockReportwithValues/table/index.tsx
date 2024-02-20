import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteriaForm from './SearchCriteriaForm';
import { columns } from './column';
import { useTranslation } from 'react-i18next';
import { useGetStockReportHistory } from '../query';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

function StockReportHistoryTable() {
  const { t } = useTranslation();
  const { data, isError, isFetching, isLoading, refetch } = useGetStockReportHistory(true);

  const navigate = useNavigate();
  const handleItemNameClick = (ItemIds: number) => {
    console.log(ItemIds);
    navigate('/Inventory-Evaluation-Item-Ledger', {
      state: {
        ItemIds,
      },
    });
  };
  return (
    <Row justify={'space-around'}>
      <Col xxl={23} xl={23} lg={23} xs={23} sm={23} md={23}>
        <AntTable
          rowKey="Id"
          refetch={refetch}
          isError={isError}
          columns={columns(t, handleItemNameClick)}
          numberOfSkeletons={12}
          isLoading={isLoading || isFetching}
          data={data?.data?.Data?.Result || []}
          searchCriteriaForm={<SearchCriteriaForm />}
          scroll={{ x: '', y: convertVhToPixels('62vh') }}
        />
      </Col>
    </Row>
  );
}

export default StockReportHistoryTable;
