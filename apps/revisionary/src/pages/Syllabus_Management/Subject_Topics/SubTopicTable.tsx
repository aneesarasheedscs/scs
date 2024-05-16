import React, { useState } from 'react';
import { AntButton, AntTable } from '@revisionary/components';
import { Card, Col, Form, Row } from 'antd';
import AddUpdateRecord from './Table/subTopics/AddUpdateRecord';
import { useGetSubTopics } from './Table/subTopics/queries';
import { useTranslation } from 'react-i18next';
import { TSubTopicsData } from './types/subTopics';
import { TTopicsData } from './types/topics';
import { map } from 'lodash';
import { EditFilled } from '@ant-design/icons';

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
    <>
      <h2>
        {' '}
        {t('subtopics_of')} {subTopicName}
      </h2>
      <Col xs={{ span: 5 }} sm={{ span: 5 }} md={{ span: 5 }} lg={{ span: 3 }} xl={{ span: 2 }} xxl={{ span: 2 }}>
        <AntButton label={t('add')} onClick={() => handleOpen()} />
      </Col>
      <Row>
        {map(filteredTableData2, (item: any) => (
          <Col xl={8} lg={12} md={12} sm={22}>
            <Card hoverable>
              <h1 style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  1.{item.subTopicNo} : &nbsp;&nbsp;{item.subTopicDescription}
                </span>
                <AntButton
                  type="text"
                  onClick={() => handleOpen(item.subTopicId)}
                  icon={<EditFilled style={{ color: '#7a07ae' }} />}
                />
              </h1>
            </Card>
          </Col>
        ))}
      </Row>
      <AddUpdateRecord
        open={open}
        form={form}
        topicsData={topicsData}
        handleClose={handleClose}
        isTopicsLoading={isTopicsLoading}
        selectedRecordId={selectedRecordId}
      />

      {/* <AntTable scroll={{ y: 150 }} data={filteredTableData2} columns={columns(handleOpen, t)} /> */}
    </>
  );
}

type TSubTopics = {
  isError: boolean;
  subTopicName: string | null;
  isLoading: boolean;
  isTopicsLoading: boolean;
  data: Array<TSubTopicsData>;
  topicsData: Array<TTopicsData>;
};

export default SubTopicTable;
