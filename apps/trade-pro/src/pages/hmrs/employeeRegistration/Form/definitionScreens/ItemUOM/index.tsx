import { AntTable } from '@tradePro/components';
import { columns } from './column';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemUOMHistory } from './queries';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Form } from 'antd';

const { useForm } = Form;
function ItemUOMTable({ selectedRecordId, setSelectedRecordId }: TForm) {
  const { data, isError, isLoading } = useGetItemUOMHistory();
  const [form] = useForm();
  const { t } = useTranslation();

  return (
    <>
      <AntTable
        isError={isError}
        columns={columns(setSelectedRecordId, t)}
        numberOfSkeletons={12}
        isLoading={isLoading}
        data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('42vh') }}
      />
    </>
  );
}
type TForm = {
  selectedRecordId?: number;
  setSelectedRecordId: (id: number) => void;
};
export default ItemUOMTable;
