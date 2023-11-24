import React, { useState } from 'react';
import { Col, Row, theme } from 'antd';
import './Form/style.scss';
import { useTranslation } from 'react-i18next';
import MainForm from './Form';

const { useToken } = theme;

function ShiftTimingDefine() {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();

  return (
    <>
      <Row>
        <Col
          xs={24}
          sm={4}
          md={6}
          lg={8}
          xl={14}
          style={{ display: 'flex', alignItems: 'center', alignContent: 'center', margin: '16px' }}
        >
          <h1 style={{ fontFamily: 'Poppins', fontSize: '22px', padding: '10px' }}>{t('shift_timing_define')} </h1>
        </Col>
      </Row>

      <MainForm selectedRecordId={selectedRecordId} />
    </>
  );
}

export default ShiftTimingDefine;
