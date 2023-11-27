import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useState } from 'react';
import { Col, Row, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';
import { useGetDiscountTypeHistory } from '../query';

const { useForm } = Form;
function DiscountTypeTable({ setSelectedRecordId }: TForm) {
  const [form] = useForm();
  const { t } = useTranslation();

  const { data, isError, isFetching, isLoading } = useGetDiscountTypeHistory();
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

export default DiscountTypeTable;
