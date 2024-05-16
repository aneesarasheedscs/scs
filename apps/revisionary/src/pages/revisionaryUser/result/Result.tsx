import { Card, Checkbox, Col, Divider, Radio, Row, Space } from 'antd';
import '../style2.scss';
import { AntButton } from '@revisionary/components';
import { useNavigate } from 'react-router-dom';
import { CheckOutlined, CrownOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Result() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleNextQuestion = () => {
    navigate('/question_two');
  };

  const [questionSummaries, setQuestionSummaries] = useState([
    { question: `${t('question')} 1`, score: '1/1', color: '#5AC60A', iconColor: '#EEE703' },
    { question: `${t('question')} 2`, score: '0/1', color: 'red', iconColor: 'black' },
    { question: `${t('question')} 3`, score: '1/1', color: '#5AC60A', iconColor: '#EEE703' },
    { question: `${t('question')} 4`, score: '1/1', color: '#5AC60A', iconColor: '#EEE703' },
  ]);
  return (
    <>
      <Row gutter={[10, 10]} style={{ marginLeft: '5%', marginTop: '2%' }}>
        <Col xxl={20} xl={20} lg={20} md={20} sm={20}>
          <h1 className="h2"> GCSE Cell Biology</h1>
        </Col>
        <Col xl={20} lg={20} md={20} sm={20} style={{ marginTop: 10 }}>
          <h2> {t('practiced_mcqs')} </h2>
        </Col>
        <Col xl={20} lg={20} md={20} sm={20} style={{ marginTop: 10 }}>
          <h2> {t('result')} </h2>
          <br />
          <h2>
            {t('you_got')} <b style={{ color: '#5AC60A' }}>12 {t('correct')}</b> {t('and')}{' '}
            <b style={{ color: 'red' }}>6 {t('wrong')} </b> !
          </h2>

          <Col xxl={10} xl={12} lg={14} md={16} sm={20} xs={24}>
            <Card className="resultCard">
              <Row gutter={[10, 10]}>
                <Col
                  xxl={12}
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  style={{ borderRight: '1px solid black', paddingRight: 15 }}
                >
                  <Card className="result" bordered={false}>
                    <h2>
                      <CheckOutlined /> 12
                    </h2>
                  </Card>
                </Col>

                <Col
                  xxl={{ span: 11, offset: 1 }}
                  xl={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  md={{ span: 11, offset: 1 }}
                  sm={{ span: 11, offset: 1 }}
                  xs={{ span: 10, offset: 1 }}
                >
                  <Card className="result2" bordered={false}>
                    <h2>
                      <CloseOutlined /> 6
                    </h2>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Col>
        <Col xxl={20} xl={20} lg={20} md={22} sm={20} xs={20}>
          <h2> {t('questions_summary')} :</h2>
        </Col>

        <Col xxl={14} xl={12} lg={20} md={22} sm={20} xs={20} style={{ marginTop: 10 }}>
          {questionSummaries.map((summary, index) => (
            <Card key={index} hoverable style={{ marginTop: 5 }} onClick={index === 1 ? handleNextQuestion : undefined}>
              <Space className="questionscard">
                <h2 style={{ color: summary.color }}>
                  <CrownOutlined style={{ color: summary.iconColor, fontSize: 30, marginRight: 10 }} />{' '}
                  {summary.question}
                </h2>
                <h2 style={{ color: summary.color }}>{summary.score}</h2>
              </Space>
            </Card>
          ))}
        </Col>
      </Row>
    </>
  );
}

export default Result;
