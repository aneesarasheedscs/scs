import { Card, Col, Row, Tabs, Pagination, Divider, Form, message, Progress, Table } from 'antd';
import React, { useState } from 'react';
import './style2.scss';
import { AntButton } from '@scs/ui';
import { Link } from 'react-router-dom';
const cards1 = [
  {
    key: '1',
    description: 'Registration Code',
    entry: '10',
  },
  {
    key: '2',
    description: 'Registration Date',
    entry: '23',
  },
  {
    key: '3',
    description: 'Name',
    entry: 'Sana',
  },
  {
    key: '4',
    description: 'Father Name',
    entry: 'Akbar',
  },
  {
    key: '4',
    description: 'Class',
    entry: '12',
  },
  {
    key: '5',
    description: 'Class Year',
    entry: '2023',
  },
  {
    key: '6',
    description: 'Exam Board',
    entry: 'Lahore Board',
  },
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
  return (
    <div className="mainn">
      <Row gutter={16}>
        <Col xs={24} md={18}>
          <h1 style={{ marginLeft: '3%' }}>Select Syllabus</h1>
        </Col>
        <Col span={4}>
          <h4 className="progress">Overall Status</h4>
          <Col span={18}>
            <Progress
              className="pp"
              size={[240, 17]}
              strokeLinecap="butt"
              showInfo={false}
              strokeColor="#52C41A"
              percent={60}
              style={{ marginLeft: '40.5%' }}
            />
          </Col>
        </Col>
        <Col>
          <div className="cardmain">
            <Row gutter={[165, 165]}>
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
                        padding: '0%',
                        margin: '2% 0 ',
                        height: '115%',
                        width: '320%',
                        border: '2px solid #52C41A',
                        boxShadow: '0px 3px 6px #00000029',
                        borderTopLeftRadius: '2.7rem',
                        borderBottomRightRadius: '2.7rem',
                      }}
                      key={card.key}
                      bordered={false}
                    >
                      <div>
                        <p
                          style={{
                            fontWeight: 'bold',
                            paddingTop: '10%',
                            fontFamily: 'Poppins',
                            fontSize: '16px',
                            lineHeight: '12px',
                            textAlign: 'center',
                          }}
                        >
                          <u>{card.description}</u>
                        </p>
                        <p style={{ textAlign: 'center', paddingTop: '25%', fontSize: '1em' }}>
                          {card.entry}
                        </p>
                      </div>
                    </Card>
                  </Col>
                );
              })}
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
            <AntButton label="+ Add Subject" className="addsubject">
              <Link to=""></Link>
            </AntButton>
          </Col>
        </Row>
        <div
          style={{
            width: '95%',
            marginLeft: '2%',
            marginBottom: '5%',
            // height:'auto',
            marginTop: '1%',
            // border:'1px solid #52C41A',
            // background: 'rgb(250, 250, 250)',
            // boxShadow:
            //   'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
          }}
        >
          <div className="card-container">
            <Row gutter={[110, 110]}>
              {cards2.map((card) => {
                return (
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
                  >
                    <Card
                      className="cardd"
                      style={{
                        marginTop: '23%',
                        height: '75%',
                        width: '150%',
                        border: '2px solid #52C41A',
                        marginLeft: '45%',
                      }}
                      key={card.key}
                      bordered={false}
                    >
                      <div>
                        <div
                          style={{
                            background: '#52C41A',
                            padding:'3%',
                            paddingTop:"3%",
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
                            color:"white",
                            borderBottomLeftRadius: '16px',
                            borderBottomRightRadius: '16px',
                          }}
                        >
                          {card.code}
                        </div>
                        {/* <div
                          style={{
                            background: 'gray',
                            height: '2rem',
                            width: '50%',
                            position: 'relative',
                            top: '-1.4rem',
                            left: '-5%',
                            borderBottomLeftRadius: '16px',
                            borderBottomRightRadius: '16px',
                          }}
                        >
                          <p style={{ paddingTop: '6%', fontSize: '13px' }}>Pearson Edexel</p>
                        </div> */}
                        <p style={{ textAlign: 'left', marginTop: '45%', marginBottom:'5%' }}>{card.description}</p>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentSyllabus;