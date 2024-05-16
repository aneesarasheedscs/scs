import React, { useRef, useState } from 'react';
import { Card, Col, Form, Row } from 'antd';
import SubTopicTable from './SubTopicTable';
import './style.scss';
import { AntButton, AntTable, PageLoader } from '@revisionary/components';
import AddUpdateRecord from './Table/Topics/AddUpdateRecord';
import { useGetTopics } from './Table/Topics/queries';
import { useGetSubTopics } from './Table/subTopics/queries';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { map } from 'lodash';
import { EditFilled } from '@ant-design/icons';

interface TopicTableProps {
  selectedSubject: string;
}

const TopicTable: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const { data, isError, isLoading } = useGetTopics();
  const { data: subTopic, isError: subError, isLoading: subTopicloading } = useGetSubTopics();
  const subTopicRef = useRef<HTMLDivElement>(null);
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
  const location = useLocation();
  const { subjectName } = location.state || {};
  const filteredTableData = data?.data?.apiData.filter((item: any) => item.subjectName === subjectName);
  const scrollToSubTopic = () => {
    if (subTopicRef.current) {
      subTopicRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Row gutter={[10, 10]}>
      <Col xxl={{ span: 20 }} xl={20} lg={22} md={22} sm={22}>
        <h2 className="topics_heading">{subjectName}</h2>
        <Card className="main-card">
          <Col xs={{ span: 5 }} sm={{ span: 5 }} md={{ span: 5 }} lg={{ span: 5 }} xl={{ span: 5 }} xxl={{ span: 5 }}>
            <h2>
              {t('topics_of')} {subjectName}
            </h2>
            <br />
          </Col>
          <Row style={{ marginTop: -20 }}>
            <Col xl={2} lg={3} md={3} sm={4} xs={3}>
              <AntButton label={t('add')} onClick={() => handleOpen()} />
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              xxl={{ span: 24 }}
            >
              <AddUpdateRecord open={open} form={form} handleClose={handleClose} selectedRecordId={selectedRecordId} />
              <Row gutter={10}>
                {map(filteredTableData, (item: any) => (
                  <Col xl={8} lg={10} md={12} sm={22}>
                    <Card hoverable style={{ height: 'auto' }}>
                      <h1 style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <a
                          onClick={() => {
                            setSelectedTopic(item.unitTopicDescription);
                            scrollToSubTopic();
                          }}
                          style={{ color: '#00a148' }}
                        >
                          1.{item.unitTopicNo} : &nbsp;&nbsp;
                          <span style={{ textDecoration: 'underline' }}>{item.unitTopicDescription}</span>
                        </a>
                        <AntButton
                          type="text"
                          icon={<EditFilled style={{ color: '#7a07ae' }} />}
                          onClick={() => handleOpen(item.unitTopicId)}
                        />
                      </h1>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col></Col>
          </Row>
        </Card>
        <Card className="main-card2" ref={subTopicRef}>
          <div className="main-card-inner">
            <SubTopicTable
              subTopicName={selectedTopic}
              isError={subError}
              isLoading={subTopicloading}
              isTopicsLoading={isLoading}
              data={subTopic?.data?.apiData || []}
              topicsData={data?.data?.apiData || []}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default TopicTable;
