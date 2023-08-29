import { AntTable } from '@tradePro/components';
import { columns } from './column';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemCategoryHistory } from './queries';
import AddUpdateRecord from './AddUpdateRecord';
import { useState } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

const { useForm } = Form;
function ItemCategoryTable() {
  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetItemCategoryHistory();
  const [selectedRecordId, setSelectedRecordId] = useState<number>();
  const handleOpen = (id?: number) => {
    setOpen(true);
    setSelectedRecordId(id);
  };
  const handleClose = () => {
    setOpen(false);
    form.resetFields();
    setSelectedRecordId(undefined);
  };
  return (
    <>
      <AntTable
        isError={isError}
        columns={columns(handleOpen, t)}
        numberOfSkeletons={12}
        isLoading={isLoading}
        data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('30vh') }}
      />
      <AddUpdateRecord
        open={open}
        form={form}
        handleClose={handleClose}
        selectedRecordId={selectedRecordId}
      />
    </>
  );
}

export default ItemCategoryTable;
