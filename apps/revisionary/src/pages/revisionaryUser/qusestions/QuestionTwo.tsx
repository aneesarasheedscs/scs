import { Card, Checkbox, Col, Radio, Row, Space } from 'antd';
import React from 'react';
import '../style2.scss';
import { AntButton } from '@revisionary/components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function QuestionTwo() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleViewResult = () => {
    navigate('/result');
  };
  return (
    <>
      <Row gutter={[10, 10]} style={{ marginLeft: '5%', marginTop: '2%' }}>
        <Col xxl={20} xl={20} lg={20} md={20} sm={20}>
          <h1 className="h2"> GCSE Cell Biology</h1>
        </Col>
        <Col xl={20} lg={20} md={20} sm={20} style={{ marginTop: 10 }}>
          <h2> {t('practice_mcqs')} </h2>
        </Col>
        <Col xl={20} lg={20} md={20} sm={20} style={{ marginTop: 10 }}>
          <h2>{t('question')} 2: </h2>
          <Card style={{ fontSize: 20, marginTop: 10 }}>
            <p>Which of the following G-protein takes part in the regulation of vision</p>
            <br />
            <p style={{ marginLeft: 30 }}>
              <ol type="A">
                <li> Golf </li>
                <li> Gi family </li>
                <li> Gs family </li>
                <li> Gq family </li>
              </ol>{' '}
            </p>
          </Card>
        </Col>
        <Col xl={20} lg={20} md={22} sm={20}>
          <h2> {t('chose_your_answer')} :</h2>
        </Col>
        <Col xl={12} lg={20} md={20} sm={20}>
          <Row gutter={10} style={{ marginLeft: 20 }}>
            <Col xl={12} lg={10} md={12} sm={10} xs={{ span: 20 }}>
              <h3 className="answers">
                <Radio
                  style={{ marginRight: 20, border: '1px solid purple', borderRadius: 50, width: 18, height: 18 }}
                />
                A
              </h3>
            </Col>
            <Col xl={11} lg={10} md={11} sm={10} xs={{ span: 20, offset: 0 }} offset={1}>
              <h3 className="answers">
                <Radio
                  checked
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
              <AntButton label={t('submit')} onClick={handleViewResult} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default QuestionTwo;
