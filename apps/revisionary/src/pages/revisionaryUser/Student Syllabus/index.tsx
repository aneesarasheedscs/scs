import { Card, Col, Row, Tabs, Pagination, Divider, Form, message, Progress, Table } from 'antd';
import React, { useState } from 'react';
import '../style2.scss';
import { AntButton } from '@scs/ui';
import { Link } from 'react-router-dom';
import { useGetSubjectCategories } from '@revisionary/pages/Syllabus_Management/queries';

const cards1 = [
  {
    key: '1',
    code: '10',
    date: '23',
    name: 'Sana',
    father: 'Akbar',
    class: '12',
    classyear: '2023',
    board: 'Lahore Board',
  },
  // {
  //   key:'1',
  //   entry:'222',
  // }
];

const cards2 = [
  {
    key: '1',
    code: 'AQA',
    description: 'English Language',
  },
  {
    key: '2',
    code: 'Person Edexcel',
    description: 'Math',
  },
  {
    key: '3',
    code: 'AQA',
    description: 'English Language',
  },
  {
    key: '4',
    code: 'AQA',
    description: 'English Language',
  },
  {
    key: '5',
    code: 'AQA',
    description: 'Biology',
  },
  {
    key: '6',
    code: 'AQA',
    description: 'English Language',
  },
  {
    key: '7',
    code: 'Person Edexcel',
    description: 'English Language',
  },
  {
    key: '8',
    code: 'AQA',
    description: 'Chemistry',
  },
];

const StudentSyllabus: React.FC = () => {
  const { data: cards2, isError, isLoading } = useGetSubjectCategories();
  return (
    <div className="mainn">
      <Row gutter={16}>
        <Col xs={24} md={18}>
          <Divider>
            {' '}
            <h1 style={{ marginLeft: '100%', textAlign: 'center' }}>Select Syllabus</h1>
          </Divider>
        </Col>
        <Row />

        <Col>
          <div className="cardmain">
            <h1 style={{ marginLeft: '4.5%', fontSize: '2rem' }}>Student Info</h1>
            <Row gutter={[90, 90]}>
              {cards1.map((card) => {
                return (
                  <Col
                    className="col"
                    style={{ marginBottom: '4%' }}
                    xs={{ span: 9 }}
                    sm={{ span: 7 }}
                    md={{ span: 5 }}
                    lg={{ span: 5 }}
                    xl={{ span: 4 }}
                    xxl={{ span: 3 }}
                  >
                    <Card
                      className="cardd"
                      style={{
                        paddingLeft: '55%',
                        paddingTop: '15%',
                        margin: '2% 0',
                        marginLeft: '15%',
                        height: '110%',
                        width: '280%',
                        // fontWeight:'bold',
                        border: '2px solid #52c41a',
                        boxShadow: '0px 3px 6px #00000029',
                        borderTopLeftRadius: '2.7rem',
                        borderBottomRightRadius: '2.7rem',
                        textAlign: 'left',
                      }}
                      key={card.key}
                      bordered={false}
                    >
                      <div>
                        <p className="paragraph">
                          <u style={{ fontWeight: 'bold' }}>Registration Code:</u> &nbsp; &nbsp; &nbsp;
                          {card.code}
                        </p>
                        <br />
                        <p className="paragraph">
                          <u style={{ fontWeight: 'bold' }}>Registration Date:</u> &nbsp; &nbsp; &nbsp;
                          {card.date}
                        </p>
                        <br />

                        <p className="paragraph">
                          <u style={{ fontWeight: 'bold' }}>Name:</u> &nbsp; &nbsp; &nbsp;
                          {card.name}
                        </p>
                        <br />

                        <p className="paragraph">
                          <u style={{ fontWeight: 'bold' }}>Father Name:</u> &nbsp; &nbsp; &nbsp;
                          {card.father}
                        </p>
                        <br />

                        <p className="paragraph">
                          <u style={{ fontWeight: 'bold' }}>Class:</u> &nbsp; &nbsp; &nbsp;
                          {card.class}
                        </p>
                        <br />

                        <p className="paragraph">
                          <u style={{ fontWeight: 'bold' }}>Class Year:</u> &nbsp; &nbsp; &nbsp;
                          {card.classyear}
                        </p>
                        <br />

                        <p className="paragraph">
                          <u style={{ fontWeight: 'bold' }}>Exam Board:</u> &nbsp; &nbsp; &nbsp;
                          {card.board}
                        </p>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col span={5}>
                <h4 className="progress">Overall Status</h4>
                <Col span={18}>
                  <Progress
                    className="pp"
                    size={[240, 17]}
                    strokeLinecap="butt"
                    showInfo={false}
                    strokeColor="#52c41a"
                    percent={60}
                    style={{ marginLeft: '26.5%' }}
                  />
                </Col>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <div className="subject">
        <Row>
          <Col span={10}>
            <h1 style={{ marginLeft: '16%' }}>Subject</h1>
            <h5
              style={{
                marginLeft: '18%',
                marginTop: '-0%',
                fontSize: '1rem',
                fontFamily: 'Poppins',
              }}
            >
              Choose Your Subject
            </h5>
          </Col>

          <Col span={6}>
            <Link to="/subject">
              <AntButton label="+ Add Subject" className="addsubject" />
            </Link>
          </Col>
        </Row>

        <div
          style={{
            width: '95%',
            marginLeft: '2%',
            marginBottom: '5%',
            // height:'auto',
            marginTop: '1%',
            // border:'1px solid #52c41a',
            // background: 'rgb(250, 250, 250)',
            // boxShadow:
            //   'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
          }}
        >
          <div className="card-container">
            <Row gutter={[110, 110]}>
              {cards2?.data?.apiData.map((item: any) => (
                <Col
                  className="col1"
                  style={{ marginBottom: '-9%' }}
                  span={10}
                  xs={{ span: 18 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 8 }}
                  xl={{ span: 5 }}
                  xxl={{ span: 5 }}
                  key={item.subjectCategoryId}
                >
                  <Card
                    className="cardd"
                    style={{
                      marginTop: '23%',
                      height: '75%',
                      width: '150%',
                      border: '2px solid #52c41a',
                      marginLeft: '45%',
                    }}
                    bordered={false}
                  >
                    <div>
                      <div
                        style={{
                          background: '#52c41a',
                          padding: '3%',
                          paddingTop: '3%',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          lineHeight: '14px',
                          marginTop: '-4%',
                          fontFamily: 'Poppins',
                          textAlign: 'center',
                          height: '2.3rem',
                          width: 'auto',
                          position: 'relative',
                          top: '-1.2rem',
                          left: '0%',
                          color: 'white',
                          borderBottomLeftRadius: '16px',
                          borderBottomRightRadius: '16px',
                        }}
                      >
                        {item.code}
                      </div>

                      <p style={{ textAlign: 'left', marginTop: '45%', marginBottom: '5%' }}>
                        {item.subjectCategoryDescription}
                      </p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentSyllabus;
