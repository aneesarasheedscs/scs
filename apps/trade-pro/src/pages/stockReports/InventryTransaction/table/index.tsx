import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';
import { useGetInventryReportTable } from '../queries/queries';
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
  const { data, isError, isLoading } = useGetInventryReportTable();

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
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default InventryTransactionTable;
