import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteriaForm from './SearchCriteriaForm';
import { columns } from './column';
import { useTranslation } from 'react-i18next';
import { useInventoryReportHistory } from '../query';
import { Col, Row } from 'antd';

const InventoryEvaluationLedgerHistory: React.FC<{
  FromdateProp?: Date | string;
  ToDateProp?: Date | string;
  WarehouseId?: number;
  ItemId?: number;
}> = (props) => {
  const { t } = useTranslation();

  const { FromdateProp, ToDateProp, WarehouseId, ItemId } = props;
  const { data, isError, isFetching, isLoading, refetch } = useInventoryReportHistory();

  function CriteriaString() {
    return (
      <Row style={{ border: '1px solid #25A7DF', padding: 7, borderRadius: 5 }}>
        <h5> {data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    );
  }

  return (
    <Row justify={'space-around'}>
      <Col xxl={23} xl={23} lg={23} xs={23} sm={23} md={23}>
        <AntTable
          rowKey="Id"
          refetch={refetch}
          isError={isError}
          columns={columns(t)}
          numberOfSkeletons={12}
          isLoading={isLoading || isFetching}
          data={data?.data?.Data?.Result || []}
          // searchCriteriaReport={data?.data?.Data?.Result ? <CriteriaString/> : 'string is not edded'}
          searchCriteriaReport={
            <h5 style={{ border: '1px solid #25A7DF', padding: 7, borderRadius: 5 }}>string is not edded</h5>
          }
          searchCriteriaForm={
            <SearchCriteriaForm
              FromdateProp={FromdateProp}
              ToDateProp={ToDateProp}
              WarehouseId={WarehouseId}
              ItemId={ItemId}
            />
          }
          scroll={{ x: '', y: convertVhToPixels('62vh') }}
        />
      </Col>
    </Row>
  );
};

export default InventoryEvaluationLedgerHistory;
