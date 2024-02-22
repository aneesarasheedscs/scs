import { AntButton, AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useGetChequeBookTable } from '../queries/queries';

function ChequeBookTable() {
  const { data, isError, isLoading } = useGetChequeBookTable();

  const { t } = useTranslation();

  return (
    <>
      <Row style={{ marginLeft: '0%', marginTop: '0.1%' }}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 21 }}
          xxl={{ span: 16 }}
        >
          <AntTable
            isError={isError}
            numberOfSkeletons={10}
            isLoading={isLoading}
            scroll={{ x: '', y: convertVhToPixels('50vh') }}
            data={data?.data?.Data?.Result}
            columns={columns(t)}
          />
        </Col>
      </Row>
    </>
  );
}

export default ChequeBookTable;
