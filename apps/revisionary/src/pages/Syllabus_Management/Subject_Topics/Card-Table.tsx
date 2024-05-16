import React, { useState } from 'react';
import CardComponent from './CardComponent';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import TopicTable from './TopicTable';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const CardTable: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSelectSubject = (subjectName: string) => {
    setSelectedSubject(subjectName);

    navigate('/subject-topics');
    if (subjectName !== undefined) {
      navigate('/subject-topics', {
        state: {
          subjectName,
        },
      });
    } else {
      // message.error(messageText + ' has no Transaction');
    }
    console.log(subjectName);
  };

  return (
    <>
      <div className="Main">
        <Row gutter={[10, 10]}>
          <Col xs={7} sm={10} md={12} lg={13} xl={19} xxl={24}>
            <h1 className="subjectHeading">{t('subject_topics')}</h1>
          </Col>
          <Col xl={18} style={{ border: ' ' }}>
            <CardComponent onSelectSubject={handleSelectSubject} />
          </Col>
        </Row>
        <div></div>
      </div>
    </>
  );
};

export default CardTable;
