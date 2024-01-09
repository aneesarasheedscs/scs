import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemCategoryHistory } from './queries';
import { useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { sectionColumns } from './columns';

const { useForm } = Form;

function DefineSectionHistory() {
  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetItemCategoryHistory();

  return (
    <>
      <Row gutter={10} style={{ marginTop: 20 }}>
        <Col
          xxl={{ span: 24 }}
          xl={{ span: 24 }}
          lg={{ span: 24 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <AntTable
            isError={isError}
            columns={sectionColumns(t)}
            numberOfSkeletons={5}
            isLoading={isLoading}
            data={data?.data?.Data?.Result || []}
            scroll={{ x: '', y: convertVhToPixels('23vh') }}
          />
        </Col>
      </Row>
    </>
  );
}
type TForm = {
  selectedRecordId?: number | null;
  setSelectedRecordId: (id: number) => void;
};
export default DefineSectionHistory;
