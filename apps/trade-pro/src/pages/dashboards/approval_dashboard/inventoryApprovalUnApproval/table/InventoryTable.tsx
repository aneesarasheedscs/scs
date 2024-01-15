import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useRequisitionOrderforApprovelHistory } from '../query';
import DetailTable from './DetailTable';

function InventoryTable({
  setSelectedRecordId,
  setActiveTab,
  setSelectedRecordIdforDetail,
  requisitionDetail,
  refetchDetail,
  loadingDetail,
}: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading, refetch, isFetching } = useRequisitionOrderforApprovelHistory();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row style={{ marginTop: '' }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={24}>
          {/* <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}> */}
          <AntTable
            refetch={refetch}
            isError={isError}
            numberOfSkeletons={8}
            isLoading={isLoading || isFetching}
            data={data?.data?.Data?.Result || []}
            scroll={{ x: '', y: convertVhToPixels('25vh') }}
            columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordIdforDetail)}
          />
          {/* </Card> */}
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={24}>
          <DetailTable requisitionDetail={requisitionDetail} refetch={refetchDetail} isLoading={loadingDetail} />
        </Col>
      </Row>
    </>
  );
}

type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setSelectedRecordIdforDetail: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
  requisitionDetail: any;
  refetchDetail: any;
  loadingDetail: any;
};

export default InventoryTable;
