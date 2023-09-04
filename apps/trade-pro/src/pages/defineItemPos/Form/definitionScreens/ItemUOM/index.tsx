import { AntTable } from '@tradePro/components';
import { columns } from './column';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemUOMHistory } from './queries';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Form } from 'antd';
import AddUpdateRecord from './AddUpdateRecod';

const { useForm } = Form;
function ItemUOMTable() {
  const { data, isError, isLoading } = useGetItemUOMHistory();
  const [form] = useForm();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
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
        scroll={{ x: '', y: convertVhToPixels('42vh') }}
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

export default ItemUOMTable;
