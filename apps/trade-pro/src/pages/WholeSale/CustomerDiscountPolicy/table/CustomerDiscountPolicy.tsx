import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';
import { useGetCustomerDetailPolicyTable } from '../queries';

function CustomerDiscountPolicyTable({ setSelectedRecordId }: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetCustomerDetailPolicyTable();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row style={{ marginTop: '0.5%' }}>
        <Col span={24}>
          <h2 className="form-heading" style={{ margin: '0.7% 0' }}>
            {t('history')}
          </h2>

          <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
            <AntTable
              isError={isError}
              numberOfSkeletons={8}
              isLoading={isLoading}
              scroll={{ x: '', y: convertVhToPixels('34vh') }}
              data={data?.data?.Data?.Result || []}
              columns={columns(t, setSelectedRecordId)}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
type TFrom = {
  setSelectedRecordId: (Id: number | null) => void;
};

export default CustomerDiscountPolicyTable;
