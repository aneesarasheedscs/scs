import React, { useState } from 'react';
import CardComponent from './CardComponent';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import TopicTable from './TopicTable';

const CardTable: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSelectSubject = (subjectName: string) => {
    setSelectedSubject(subjectName);
  };
  return (
    <div className="Main">
      <Row gutter={[0, 0]}>
        <Col xs={7} sm={10} md={12} lg={13} xl={19} xxl={24}>
          <h1 className="subjectHeading">{t ('subject_topics')}</h1>{' '}
        </Col>
      </Row>
      <Row>
        <Col>
          <CardComponent onSelectSubject={handleSelectSubject} />
        </Col>
      </Row>

      <div>
        <Row>
          <Col span={12}>{selectedSubject && <TopicTable selectedSubject={selectedSubject} />}</Col>
        </Row>
      </div>
    </div>
  );
};

export default CardTable;
