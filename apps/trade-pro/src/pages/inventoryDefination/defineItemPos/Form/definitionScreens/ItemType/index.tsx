import { AntTable } from '@tradePro/components';
import { columns } from './column';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemTypeHistory } from './querie';
import { useState } from 'react';
import { Col, Row, Form } from 'antd';
import { useTranslation } from 'react-i18next';

const { useForm } = Form;
function ItemTypeTable({ openItemType, selectedRecordId, setSelectedRecordId }: TForm) {
  const [form] = useForm();
  const { t } = useTranslation();

  const { data, isError, isLoading } = useGetItemTypeHistory();

  return (
    <>
      {openItemType ? (
        <>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24}>
            <AntTable
              isError={isError}
              columns={columns(setSelectedRecordId, t)}
              numberOfSkeletons={8}
              isLoading={isLoading}
              data={data?.data?.Data?.Result || []}
              scroll={{ x: '', y: convertVhToPixels('42vh') }}
            />
          </Col>
        </>
      ) : (
        <>
          <Col xxl={17} xl={20} lg={24} md={24} sm={24}>
            <AntTable
              isError={isError}
              columns={columns(setSelectedRecordId, t)}
              numberOfSkeletons={8}
              isLoading={isLoading}
              data={data?.data?.Data?.Result || []}
              scroll={{ x: '', y: convertVhToPixels('42vh') }}
            />
          </Col>
        </>
      )}
    </>
  );
}
type TForm = {
  openItemType: boolean;
  selectedRecordId?: number | null;
  setSelectedRecordId: (id: number | undefined) => void;
};
export default ItemTypeTable;
