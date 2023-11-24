import { Card, Col, Row, Tabs, Pagination, Divider, Form, message, Progress, Table } from 'antd';
import React, { useState } from 'react';
import '../style2.scss';
import { AntButton } from '@revisionary/components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <div className="mainn">
      <Row gutter={16}>
        <Col xs={19} md={20} xxl={15}>
          <Divider style={{ width: '116%' }}>
            {' '}
            <h1 style={{ marginLeft: '5%', textAlign: 'center' }}>{t ('select_syllabus')}</h1>
          </Divider>
        </Col>
        <Row />

        <Col xs={19} md={18}>
          <div className="cardmain">
            <h1 style={{ marginLeft: '4.5%', fontSize: '2rem' }}>{t ('student_info')}</h1>
            <Row gutter={[90, 90]}>
              {cards1.map((card) => {
                return (
                  <Col
                    className="col"
                    style={{ marginBottom: '4%' }}
                    xs={{ span: 10 }}
                    sm={{ span: 9 }}
                    md={{ span: 9 }}
                    lg={{ span: 9 }}
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
                          <u style={{ fontWeight: 'bold' }}>{t ('registration_code')}</u> &nbsp; &nbsp; &nbsp;
                          {card.code}
                        </p>
                        <br />
                        <p className="paragraph">
                          <u style={{ fontWeight: 'bold' }}>{t ('registration_date')}</u> &nbsp; &nbsp; &nbsp;
                          {card.date}
                        </p>
                        <br />

                        <p className="paragraph">
                          <u style={{ fontWeight: 'bold' }}>{t ('name')}</u> &nbsp; &nbsp; &nbsp;
                          {card.name}
                        </p>
                        <br />

                        <p className="paragraph">
                          <u style={{ fontWeight: 'bold' }}>{t ('father_name')}</u> &nbsp; &nbsp; &nbsp;
                          {card.father}
                        </p>
                        <br />

                        <p className="paragraph">
                          <u style={{ fontWeight: 'bold' }}>{t ('class')}</u> &nbsp; &nbsp; &nbsp;
                          {card.class}
                        </p>
                        <br />

                        <p className="paragraph">
                          <u style={{ fontWeight: 'bold' }}>{t ('class_year')}</u> &nbsp; &nbsp; &nbsp;
                          {card.classyear}
                        </p>
                        <br />

                        <p className="paragraph">
                          <u style={{ fontWeight: 'bold' }}>{t ('exam_board')}</u> &nbsp; &nbsp; &nbsp;
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
                <h4 className="progress">{t ('overall_status')}</h4>
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
          <Col xs={10} md={18}>
            <h1 style={{ marginLeft: '16%' }}>{t ('subject')}</h1>
            <h5
              style={{
                marginLeft: '18%',
                marginTop: '-0%',
                fontSize: '1rem',
                fontFamily: 'Poppins',
              }}
            >
              {t ('choose_your_subject')}
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

            marginTop: '1%',
          }}
        >
          <div className="card-container">
            <Row gutter={[180, 80]}>
              {cards2.map((card) => {
                return (
                  <Col
                    className="col1"
                    style={{ marginBottom: '-9%' }}
                    span={10}
                    xs={{ span: 18 }}
                    sm={{ span: 14 }}
                    md={{ span: 11 }}
                    lg={{ span: 10 }}
                    xl={{ span: 9 }}
                    xxl={{ span: 6 }}
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
                      key={card.key}
                      bordered={false}
                    >
                      <div>
                        <div
                          className="design"
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
                            top: '-1rem',
                            left: '0%',
                            color: 'white',
                            borderBottomLeftRadius: '16px',
                            borderBottomRightRadius: '16px',
                          }}
                        >
                          {card.code}
                        </div>

                        <p style={{ textAlign: 'left', marginTop: '45%', marginBottom: '5%' }}>
                          {card.description}
                        </p>
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
