import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemScheduleUOMHistory } from './queries';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Col, Form } from 'antd';
import { columns } from './columns';

const { useForm } = Form;
function ItemScheduleUOMTable({ openItemSchudleUnit, selectedRecordId, setSelectedRecordId }: TForm) {
  const { data, isError, isLoading } = useGetItemScheduleUOMHistory();
  const [form] = useForm();
  const { t } = useTranslation();

  return (
    <>
      {openItemSchudleUnit ? (
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
          <Col xxl={17} xl={24} lg={24} md={24} sm={24}>
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
  openItemSchudleUnit: any;
  selectedRecordId?: number | null;
  setSelectedRecordId: (id: number) => void;
};
export default ItemScheduleUOMTable;
