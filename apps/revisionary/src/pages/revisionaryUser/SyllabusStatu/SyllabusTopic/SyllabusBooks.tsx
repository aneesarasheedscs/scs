import React, { useState } from 'react';
import { Card, Col, Row, List, Progress, Divider, Input, Button } from 'antd';
import { green } from '@ant-design/colors';
// import './SyllabusBooks.css';
import '../style/SyllabusBooks.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CardWithProgress from '../../Progress/Progress';
import { useGetSubjectCategories } from '@revisionary/pages/Syllabus_Management/queries';

function SyllabusBooks() {
  const handleClick = () => {
    navigate('./SyllabusTopic');
    console.log('dfs');
  };
  const navigate = useNavigate();
  const { data: cards2, isError, isLoading } = useGetSubjectCategories();

  const { t } = useTranslation();
  return (
    <div className="assessment" style={{ height: '100hv', padding: 20 }}>
      <Divider orientation="center" style={{ marginTop: '40px' }}>
        <h1>{t('syllabus_status')}</h1>
      </Divider>
      <div>
        <Row gutter={[16, 16]} style={{ marginTop: '  2rem' }}>
          {cards2?.data?.apiData.map((item: any) => (
            <Col xs={8} xl={3} sm={8} md={6} key={item.subjectCategoryId}>
              <Card
                style={{ width: '100%', textAlign: 'center', border: '1px solid #00A148' }}
                className="singleCard"
              >
                <p>{item.subjectCategoryDescription}</p>
                <Progress percent={90} showInfo={true} size={'small'} strokeColor={'#52c41a'} />

                {/* <CardWithProgress key={item.id} cardData={item.subjectCategoryDescription} /> */}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Divider />

      {/* <A */}
    </div>
  );
}
export default SyllabusBooks;
