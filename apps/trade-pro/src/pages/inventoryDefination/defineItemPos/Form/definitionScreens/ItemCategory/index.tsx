import { AntTable } from '@tradePro/components';
import { columns } from './column';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemCategoryHistory } from './queries';
import { useState } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import ItemCategory from '../ItemCategory';

const { useForm } = Form;

function ItemCategoryTable({ selectedRecordId, setSelectedRecordId }: TForm) {
  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetItemCategoryHistory();

  return (
    <>
      <AntTable
        isError={isError}
        columns={columns(setSelectedRecordId, t)}
        numberOfSkeletons={12}
        isLoading={isLoading}
        data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('30vh') }}
      />
    </>
  );
}
type TForm = {
  selectedRecordId?: number | null;
  setSelectedRecordId: (id: number) => void;
};
export default ItemCategoryTable;
