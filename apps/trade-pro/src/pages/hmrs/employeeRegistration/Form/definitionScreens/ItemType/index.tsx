import { AntTable } from '@tradePro/components';
import { columns } from './column';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemTypeHistory } from './querie';
import { useState } from 'react';
import { Col, Row, Form } from 'antd';
import { useTranslation } from 'react-i18next';

const { useForm } = Form;
function ItemTypeTable({ selectedRecordId, setSelectedRecordId }: TForm) {
  const [form] = useForm();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { data, isError, isLoading } = useGetItemTypeHistory();

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
  setSelectedRecordId: (id: number | undefined) => void;
};
export default ItemTypeTable;
