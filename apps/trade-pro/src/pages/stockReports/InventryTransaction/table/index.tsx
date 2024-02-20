import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';
import { useGetInventryReportTable } from '../queries';
import SearchCriteriaForm from './SearchCriteriaForm';
import React from 'react';

const InventryTransactionTable: React.FC<{
  FromdateProp?: Date | string;
  ToDateProp?: Date | string;
  WarehouseId?: number;
  ItemId?: number;
}> = (props) => {
  const { t } = useTranslation();
  const { FromdateProp, ToDateProp, WarehouseId, ItemId } = props;
  const { data, isError, isLoading, refetch, isFetching } = useGetInventryReportTable(true);

  return (
    <>
      <Row gutter={10} justify={'space-around'}>
        <Col xs={23} sm={23} lg={23} xl={23} xxl={23}>
          <AntTable
            rowKey="Id"
            isError={isError}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            refetch={refetch}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={
              <SearchCriteriaForm
                FromdateProp={FromdateProp}
                ToDateProp={ToDateProp}
                WarehouseId={WarehouseId}
                ItemId={ItemId}
              />
            }
            columns={columns(t)}
          />
        </Col>
      </Row>
    </>
  );
};

export default InventryTransactionTable;
