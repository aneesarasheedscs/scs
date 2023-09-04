// CardComponent.tsx
import React from 'react';
import { Card, Col, Row } from 'antd';
import { map } from 'lodash';
import './style.scss';
import { useGetTopics } from './Table/Topics/queries';
import { useTranslation } from 'react-i18next';

interface CardComponentProps {
  onSelectSubject: (subjectName: string) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ onSelectSubject }) => {
  const handleCardClick = (subjectName: string) => {
    onSelectSubject(subjectName);
  };
  const { data, isError, isLoading } = useGetTopics();
  
  const { t } = useTranslation();
  
  
  if (isLoading) {
    return <div>{t ('loading')}</div>;
  }
  return (
    <div className="boxesContainer">
      <Row gutter={[150, 0]}>
        {map(data?.data?.apiData, (item: any) => (
          <Col
            span={4}
            xs={{ span: 10 }}
            sm={{ span: 7 }}
            md={{ span: 7 }}
            lg={{ span: 7 }}
            xl={{ span: 6 }}
            xxl={{ span: 4 }}
            style={{ marginBottom: '3%' }}
          >
            <div className="cardBox">
              <div className="card">
                <div className="cardfront">
                  <Card
                    key={item.id}
                    bordered={false}
                  >
                    <p className="subjects-heading">{item.subjectName}</p>
                    <h4 onClick={() => handleCardClick(item.subjectName)} className="topic-heading">
                     {t ('topic')}
                    </h4>
                  </Card>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default CardComponent;
