import './SyllabusStatus.css';
import React from 'react';
import { Row, Col, Divider } from 'antd';
import CardWithProgress from '../Progress/Progress';
import { useTranslation } from 'react-i18next';

function SyllabusStatus() {
  const cardArray = [
    { id: 1, title: 'Topic1: Cell Biology', progress: 50 },
    { id: 2, title: 'Card 2', progress: 75 },
    { id: 3, title: 'Card 3', progress: 75 },
    { id: 4, title: 'Card 4', progress: 75 },
    { id: 5, title: 'Card 5', progress: 75 },
    { id: 6, title: 'Card 6', progress: 75 },
    { id: 7, title: 'Card 7', progress: 75 },
    // ... more card data
  ];

  const chunkArray = (array: any, size: any) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  };

  const cardChunks = chunkArray(cardArray, 3);
  const { t } = useTranslation();
  return (
    <div className="syllabus-status">
      <center>
        <div className="flip" style={{ width: '70%', maxHeight: '15rem' }}>
          <Divider orientation="center" className="divider-title">
            <h1>{t('content')}</h1>
          </Divider>
          <div className="card-container">
            <Row gutter={[16, 16]}>
              {cardChunks.map((column, columnIndex) => (
                <React.Fragment key={columnIndex}>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    {column.map((card: any) => (
                      <CardWithProgress key={card.id} cardData={card} />
                    ))}
                  </Col>
                  {columnIndex !== cardChunks.length - 1 && (
                    <Col>
                      <Divider type="vertical" style={{ height: '100%', marginLeft: '60px' }} />
                    </Col>
                  )}
                </React.Fragment>
              ))}
            </Row>
          </div>
        </div>
      </center>
    </div>
  );
}

export default SyllabusStatus;
