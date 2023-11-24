// TableComponent.tsx
import React, { useState } from 'react';
import { AntButton, AntTable } from '@revisionary/components';
import { columns } from './Table/subTopics/columns';
import { Form } from 'antd';
import AddUpdateRecord from './Table/subTopics/AddUpdateRecord';
import { useGetSubTopics } from './Table/subTopics/queries';
import { useTranslation } from 'react-i18next';
import { TSubTopicsData } from './types/subTopics';
import { TTopicsData } from './types/topics';

function SubTopicTable({ subTopicName, topicsData, isTopicsLoading }: TSubTopics) {
  const { data: subTopic, isError: subError, isLoading: subTopicloading } = useGetSubTopics();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number>();
  const { t } = useTranslation();

  const handleOpen = (id?: number) => {
    setOpen(true);
    setSelectedRecordId(id);
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
    setSelectedRecordId(undefined);
  };

  const filteredTableData2 = subTopic?.data?.apiData.filter((item: any) => item.unitTopicDescription === subTopicName);

  if (subTopicloading) {
    return <div>{t('loading')}</div>;
  }

  return (
    <div>
      <h2>Table for {subTopicName}</h2>
      <AntButton label={t('add')} onClick={() => handleOpen()} />
      <AddUpdateRecord
        open={open}
        form={form}
        topicsData={topicsData}
        handleClose={handleClose}
        isTopicsLoading={isTopicsLoading}
        selectedRecordId={selectedRecordId}
      />

      <AntTable data={filteredTableData2} columns={columns(handleOpen, t)} />
    </div>
  );
}

type TSubTopics = {
  isError: boolean;
  subTopicName: string;
  isLoading: boolean;
  isTopicsLoading: boolean;
  data: Array<TSubTopicsData>;
  topicsData: Array<TTopicsData>;
};

export default SubTopicTable;
