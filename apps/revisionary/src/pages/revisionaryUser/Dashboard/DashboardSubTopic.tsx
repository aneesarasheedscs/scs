// import '../SyllabusStatus.css';
import React from 'react';
import { Row, Col, Divider } from 'antd';
import Dashboard1 from '../Progress/Dashboard/DashboardProgressBar';
// import Dashboard1 from './Dashboard';

export default function DashboardSubTopic() {
  const cardArray = [
    { id: 1, title: 'Cell_Biology', progress: 50 },
    { id: 2, title: 'Organization', progress: 75 },
    { id: 3, title: 'Homeostasis', progress: 75 },
    { id: 4, title: 'Inheritance', progress: 75 },
    { id: 5, title: 'Ecology', progress: 75 },
    { id: 6, title: 'Infection', progress: 75 },
    { id: 7, title: 'BioEnergetics', progress: 75 },
  ];

  const chunkArray = (array: any, size: any) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  };

  const cardChunks = chunkArray(cardArray, 3);

  return (
    <div className="syllabus-status">
      <center>
        {' '}
        {/* Center align the content */}
        <div className="flip" style={{ width: '90%', marginLeft: '-15%', maxWidth: '1200px' }}>
          <Divider orientation="center" className="divider-title">
            <h1>Biology</h1>
          </Divider>
          <div className="card-container">
            <Row gutter={[300, 300]}>
              {cardChunks.map((column, columnIndex) => (
                <React.Fragment key={columnIndex}>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    {column.map((card: any) => (
                      <Dashboard1 key={card.id} cardData={card} />
                    ))}
                  </Col>
                </React.Fragment>
              ))}
            </Row>
          </div>
        </div>
      </center>
    </div>
  );
}
