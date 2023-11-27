import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';
import { useGetDiscountCategoryHistory } from '../query';

function DiscountCategoryHistory({ setSelectedRecordId }: TForm) {
  const { t } = useTranslation();

  const { data, isError, isFetching, isLoading } = useGetDiscountCategoryHistory();
  return (
    <>
      <Row style={{ marginTop: 20 }}>
        <Col sm={24} md={24} lg={24} xl={24} xxl={18}>
          <AntTable
            isError={isError}
            isLoading={isLoading || isFetching}
            columns={columns(t, setSelectedRecordId)}
            numberOfSkeletons={8}
            data={data?.data?.Data?.Result || []}
            scroll={{ x: '', y: convertVhToPixels('30vh') }}
          />
        </Col>
      </Row>
    </>
  );
}
type TForm = {
  selectedRecordId?: number | null;
  setSelectedRecordId?: (selectedRecordId: number | null) => void;
};

export default DiscountCategoryHistory;
