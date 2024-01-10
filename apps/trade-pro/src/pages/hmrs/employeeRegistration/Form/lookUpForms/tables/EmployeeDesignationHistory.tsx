import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemCategoryHistory } from './queries';
import { useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { column } from './columns';

const { useForm } = Form;

function EmployeeDesignationHistory() {
  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetItemCategoryHistory();

  return (
    <>
      <Row gutter={10} style={{ marginTop: 20 }}>
        <Col
          xxl={{ span: 16, offset: 4 }}
          xl={{ span: 16, offset: 3 }}
          lg={{ span: 16, offset: 3 }}
          md={{ span: 20, offset: 0 }}
          sm={{ span: 20, offset: 0 }}
          xs={{ span: 24, offset: 0 }}
        >
          <AntTable
            isError={isError}
            columns={column(t)}
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
export default EmployeeDesignationHistory;
