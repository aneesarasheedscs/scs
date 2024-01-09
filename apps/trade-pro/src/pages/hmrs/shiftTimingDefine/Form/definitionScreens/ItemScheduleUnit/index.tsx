import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemScheduleUOMHistory } from './queries';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Form } from 'antd';
import { columns } from './columns';

const { useForm } = Form;
function ItemScheduleUOMTable({ selectedRecordId, setSelectedRecordId }: TForm) {
  const { data, isError, isLoading } = useGetItemScheduleUOMHistory();
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
  selectedRecordId?: number | null;
  setSelectedRecordId: (id: number) => void;
};
export default ItemScheduleUOMTable;
