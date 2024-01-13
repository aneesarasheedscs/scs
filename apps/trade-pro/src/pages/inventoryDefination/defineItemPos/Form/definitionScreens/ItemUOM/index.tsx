import { AntTable } from '@tradePro/components';
import { columns } from './column';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemUOMHistory } from './queries';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Col, Form } from 'antd';

const { useForm } = Form;
function ItemUOMTable({ open, selectedRecordId, setSelectedRecordId }: TForm) {
  const { data, isError, isLoading } = useGetItemUOMHistory();
  const [form] = useForm();
  const { t } = useTranslation();

  return (
    <>
      {open ? (
        <>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24}>
            <AntTable
              isError={isError}
              columns={columns(setSelectedRecordId, t)}
              numberOfSkeletons={12}
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
              numberOfSkeletons={12}
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
  open: any;
  selectedRecordId?: number;
  setSelectedRecordId: (id: number) => void;
};
export default ItemUOMTable;
