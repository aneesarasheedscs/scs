import { AntButton, AntInput, AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useGetChequeStatusTable } from '../queries/queries';

function ChequeBookStatusTable({ setSelectedRecordId }: Props) {
  const { t } = useTranslation();

  const { data, isError, isLoading, refetch, isFetching } = useGetChequeStatusTable();

  return (
    <>
      <Row style={{ marginTop: '0.8%' }}>
        <Col span={24}>
          <AntTable
            refetch={refetch}
            isError={isError}
            numberOfSkeletons={8}
            isLoading={isLoading || isFetching}
            scroll={{ x: '', y: convertVhToPixels('34vh') }}
            data={data?.data?.Data?.Result}
            columns={columns(t, setSelectedRecordId)}
          />
        </Col>
      </Row>
    </>
  );
}

export default ChequeBookStatusTable;
interface Props {
  setSelectedRecordId: (id: number | null) => void;
}
