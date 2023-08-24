import React from 'react';
import { Row, Col, Divider } from 'antd';
import CardWithProgress from '../Progress/Progress';

function SyllabusSTopic() {
  const cardArray = [
    { id: 1, title: 'Topic1: Cell Biology', progress: 50 },
    { id: 2, title: 'Card 2', progress: 75 },
    { id: 3, title: 'Card 3', progress: 75 },
    { id: 4, title: 'Card 4', progress: 75 },
    { id: 5, title: 'Card 5', progress: 75 },
    { id: 6, title: 'Card 6', progress: 75 },
    { id: 7, title: 'Card 7', progress: 75 },
    { id: 7, title: 'Card 7', progress: 75 },
    { id: 7, title: 'Card 7', progress: 75 },
    { id: 7, title: 'Card 7', progress: 75 },
    { id: 7, title: 'Card 7', progress: 75 },
    { id: 7, title: 'Card 7', progress: 75 },
    { id: 7, title: 'Card 7', progress: 75 },
  ];

  const chunkArray = (array: any, size: any) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  };

  const cardChunks = chunkArray(cardArray, 5); // Split into chunks of 5 cards

  return (
    <div>
      <center>
        <div>
          <div style={{ height: '110%' }}>
            <div>
              <div style={{ marginLeft: '70px', width: '70%', marginTop: '5%', marginBottom: '25px' }}>
                <center>
                  <Divider
                    orientation="center"
                    style={{
                      marginLeft: '-6rem',
                      width: '100%',
                      height: '2.3rem',
                      background: '#52c41a',
                      color: 'white',
                      paddingTop: '0.4%',
                      paddingBottom: '0.4%',
                    }}
                  >
                    <h3>Topic1: Cell Biology</h3>
                  </Divider>
                </center>
                <br />
                <br />
                <br />
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
          </div>
        </div>
      </center>
    </div>
  );
}

export default SyllabusSTopic;
