import { AntButton, AntTable } from '@tradePro/components';
import { columns } from './columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemHistory } from './queries';
import { useTranslation } from 'react-i18next';
import { Col, Row, Form } from 'antd';
import { useState } from 'react';
import AddUpdateRecord from './AddUpdateRecord';

const { useForm } = Form;
function HistoryTable() {
  const [form] = useForm();
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetItemHistory();
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
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
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

export default HistoryTable;
