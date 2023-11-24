import { AntButton, AntInput, AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useGetChequeStatusTable } from '../queries/queries';

function ChequeBookStatusTable() {
  const { t } = useTranslation();

  const { data, isError, isLoading } = useGetChequeStatusTable();

  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24, offset: 0 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
            <AntTable
              isError={isError}
              numberOfSkeletons={8}
              isLoading={isLoading}
              scroll={{ x: '', y: convertVhToPixels('38vh') }}
              data={data?.data?.Data?.Result}
              columns={columns(t)}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ChequeBookStatusTable;
