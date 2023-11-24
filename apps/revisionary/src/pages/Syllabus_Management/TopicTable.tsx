//    TableComponent.tsx
import React, { useState } from 'react';
import { Card, Col, Form, Row } from 'antd';
import SubTopicTable from './SubTopicTable';
import { AntButton, AntTable } from '@revisionary/components';
import { columns } from './Table/Topics/columns';
import AddUpdateRecord from './Table/Topics/AddUpdateRecord';
import { useGetTopics } from './Table/Topics/queries';
import { useGetSubTopics } from './Table/subTopics/queries';
import { useTranslation } from 'react-i18next';

interface TopicTableProps {
  selectedSubject: string;
}

const TopicTable: React.FC<TopicTableProps> = ({ selectedSubject }) => {
  const { t } = useTranslation();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const { data, isError, isLoading } = useGetTopics();
  const { data: subTopic, isError: subError, isLoading: subTopicloading } = useGetSubTopics();

  const [form] = Form.useForm();
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

  const filteredTableData = data?.data?.apiData.filter((item: any) => item.subjectName === selectedSubject);

  if (isLoading) {
    return <div>{t ('loading')}</div>;
  }

  return (
    <Row gutter={[1, 1]}>
      <Col span={24} xxl={{ span: 24 }}>
        <Card className="main-card">
          <Col
            xs={{ span: 5 }}
            sm={{ span: 5 }}
            md={{ span: 5 }}
            lg={{ span: 5 }}
            xl={{ span: 5 }}
            xxl={{ span: 5 }}
          >
            <h2>Table for {selectedSubject}</h2>
            <br />
          </Col>

          <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              xxl={{ span: 24 }}
            >
              <AntButton label={t ('add')} onClick={() => handleOpen()} />
              <AddUpdateRecord
                open={open}
                form={form}
                handleClose={handleClose}
                selectedRecordId={selectedRecordId}
              />

              <AntTable
                scroll={{ y: 400 }}
                data={filteredTableData}
                columns={columns(setSelectedTopic, handleOpen,t)}
              />
            </Col>
            <Col>
              {selectedTopic !== null && (
                <div className="main-card-inner">
                  <br />

                  <SubTopicTable
                    subTopicName={selectedTopic}
                    isError={subError}
                    isLoading={subTopicloading}
                    isTopicsLoading={isLoading}
                    data={subTopic?.data?.apiData || []}
                    topicsData={data?.data?.apiData || []}
                  />
                </div>
              )}
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default TopicTable;
