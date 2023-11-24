import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useGetCashPaymentVoucherTable } from '../queries/queries';

function CashPaymentTable({ setSelectedRecordId, setActiveTab }: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetCashPaymentVoucherTable();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row style={{ marginTop: '0.5%' }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24, offset: 0 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
            <AntTable
              isError={isError}
              numberOfSkeletons={8}
              isLoading={isLoading}
              scroll={{ x: '', y: convertVhToPixels('45vh') }}
              data={data?.data?.Data?.Result || []}
              columns={columns(t, setSelectedRecordId, setActiveTab)}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
};

export default CashPaymentTable;