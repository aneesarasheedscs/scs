import { Card, Checkbox, Col, Radio, Row, Space } from 'antd';
import '../style2.scss';
import { AntButton } from '@revisionary/components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
const { Title } = Typography;

function Questions() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const { t } = useTranslation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const handleNextQuestion2 = () => {
    console.log('abc');
    navigate('/question_two');
  };
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const hardcodedQuestions = [
    {
      text: 'Which of the following signaling is involved in Paracrine signaling?',
      options: ['Chemical signaling', 'Synaptic transmission', 'Hormonal Communication', 'Autostimulation of cell'],
    },
    {
      text: 'Which of the following G-protein takes part in the regulation of vision?',
      options: [' Golf', 'Gi family', 'Gs family', 'Gq family'],
    },
  ];
  const currentQuestion = hardcodedQuestions[currentQuestionIndex];
  const handleNextQuestion = () => {
    if (currentQuestionIndex < hardcodedQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate('/result');
      // If there are no more questions, change the behavior to submit
      // You can implement the submission logic here
      console.log('Submit logic here');
    }
    // setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  return (
    <>
      <Row gutter={[10, 10]} style={{ marginLeft: '5%', marginTop: '2%' }}>
        <Col xxl={20} xl={20} lg={20} md={20} sm={20}>
          <Row>
            <Col xl={20}>
              <h1 className="h2"> GCSE Cell Biology</h1>
            </Col>
            <Col xl={4}>
              {' '}
              <Title className="time" level={5}>
                {currentTime}
              </Title>
            </Col>
          </Row>
        </Col>
        <Col xl={20} lg={20} md={20} sm={20} style={{ marginTop: 10 }}>
          <h2> {t('practice_mcqs')} </h2>
        </Col>
        <Col xl={20} lg={20} md={20} sm={20} style={{ marginTop: 10 }}>
          <h2>{`${t('question')} ${currentQuestionIndex + 1}: `}</h2>
          <Card style={{ fontSize: 20, marginTop: 10 }}>
            <p>{currentQuestion?.text}</p>
            <br />
            <p style={{ marginLeft: 30 }}>
              <ol type="A">
                {currentQuestion?.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ol>
            </p>
          </Card>
        </Col>
        {/* <Col xl={20} lg={20} md={20} sm={20} style={{ marginTop: 10 }}>
          <h2>Question 1: </h2>
          <Card style={{ fontSize: 20, marginTop: 10 }}>
            <p>Which of the following signaling is involved in Paracrine signaling?</p>
            <br />
            <p style={{ marginLeft: 30 }}>
              <ol type="A">
                <li> Chemical signaling</li>
                <li> Synaptic transmission</li>
                <li>Hormonal Communication</li>
                <li> Autostimulation of cell</li>
              </ol>{' '}
            </p>
          </Card>
        </Col> */}
        <Col xl={20} lg={20} md={22} sm={20}>
          <h2> {t('chose_your_answer')} :</h2>
        </Col>
        <Col xl={12} lg={20} md={20} sm={20}>
          <Row gutter={10} style={{ marginLeft: 20 }}>
            <Col xl={12} lg={10} md={12} sm={10} xs={{ span: 20 }}>
              <h3 className="answers">
                <Radio
                  checked
                  style={{ marginRight: 20, border: '1px solid purple', borderRadius: 50, width: 18, height: 18 }}
                />
                A
              </h3>
            </Col>
            <Col xl={11} lg={10} md={11} sm={10} xs={{ span: 20, offset: 0 }} offset={1}>
              <h3 className="answers">
                <Radio
                  style={{ marginRight: 20, border: '1px solid purple', borderRadius: 50, width: 18, height: 18 }}
                />
                B
              </h3>
            </Col>
            <Col xl={12} lg={10} md={12} sm={10} xs={20}>
              <h3 className="answers">
                <Radio
                  style={{ marginRight: 20, border: '1px solid purple', borderRadius: 50, width: 18, height: 18 }}
                />
                C
              </h3>
            </Col>
            <Col xl={11} lg={10} md={11} sm={10} xs={{ span: 20, offset: 0 }} offset={1}>
              <h3 className="answers">
                <Radio
                  style={{ marginRight: 20, border: '1px solid purple', borderRadius: 50, width: 18, height: 18 }}
                />{' '}
                D
              </h3>
            </Col>
          </Row>
        </Col>
        <Col xl={20} lg={20} md={20} sm={20}>
          <Row gutter={16} style={{ display: 'flex', justifyContent: 'end', marginTop: '10rem' }}>
            <Col xl={3}>
              <AntButton ghost label={t('cancel')} />
            </Col>
            <Col xl={4} xxl={3}>
              <AntButton
                label={currentQuestionIndex < hardcodedQuestions.length - 1 ? t('next_question') : t('submit')}
                onClick={handleNextQuestion}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Questions;
