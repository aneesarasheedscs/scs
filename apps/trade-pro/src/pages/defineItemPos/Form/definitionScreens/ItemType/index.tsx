import { AntTable } from '@tradePro/components';
import { columns } from './column';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemTypeHistory } from './querie';
import { useState } from 'react';
import { Col, Row, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import AddUpdateRecord from './AddUpdateRecord';

const { useForm } = Form;
function ItemTypeTable() {
  const [form] = useForm();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { data, isError, isLoading } = useGetItemTypeHistory();
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

export default ItemTypeTable;
