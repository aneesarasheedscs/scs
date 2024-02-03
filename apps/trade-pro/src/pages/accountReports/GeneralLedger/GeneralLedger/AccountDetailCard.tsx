import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Card, Col, Row, Typography, theme } from 'antd';
import { useGetAccountBalance, useGetAccountDetail, useGetAccountTitle } from '../queryOptions';
import { useTranslation } from 'react-i18next';
import { useGetGeneralLedgerDetail, useGetGeneralLedgerSummaryI } from '../queries';
import React, { useState } from 'react';

const { Title } = Typography;

const { useToken } = theme;
const AccountDetailCard: React.FC<{ DetailData: any; BalanceData: any }> = (props) => {
  const { DetailData, BalanceData } = props;
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Row>
      <Col xxl={24}>
        <Card
          hoverable
          style={{
            border: `1px solid ${colorPrimary}`,
            height: 155,
          }}
        >
          {/* <Row gutter={[12, 12]}></Row> */}
          <Col span={24}>
            <Title
              level={4}
              className="custom-title1"
              style={{
                backgroundColor: colorPrimary,
                color: '#fff',
              }}
            >
              <p style={{ marginTop: '-15px' }}> {t('account_detail')}</p>
            </Title>
          </Col>

          <div>
            {/* <b> */}
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <p> {/* {t('account title:')} {table2?.data?.Data?.Result?.[0]?.AccountTitle} */}</p>
                <p>
                  <b> {t('account_code')}</b>
                  <span className="marginleft"> {DetailData?.[0]?.AccountCode}</span>
                </p>
                <p>
                  {' '}
                  <b> {t('account class')}</b>
                  <span className="marginleft"> {DetailData?.[0]?.ClassName}</span>
                </p>
                <p>
                  {' '}
                  <b> {t('account_type')} </b>
                  <span className="marginleft"> {DetailData?.[0]?.AccountType}</span>
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <b> {t('opening')}</b>
                  <span className="marginleft2" style={{ marginLeft: 40 }}>
                    {numberFormatter(BalanceData?.[0]?.OpeningBalance)} &nbsp;
                    {BalanceData?.[0]?.OpeningBalance > 0 ? 'Dr' : 'Cr'}
                  </span>
                </p>
                <p>
                  {' '}
                  <b> {t('total_debit')}</b>
                  <span className="marginleft2" style={{ marginLeft: 20 }}>
                    {' '}
                    {numberFormatter(BalanceData?.[0]?.DebitAmount)} &nbsp;
                    {BalanceData?.[0]?.DebitAmount > 0 ? 'Dr' : 'Cr'}
                  </span>
                </p>
                <p>
                  {' '}
                  <b> {t('total_credit')}</b>
                  <span className="marginleft2" style={{ marginLeft: 15 }}>
                    {' '}
                    {numberFormatter(BalanceData?.[0]?.CreditAmount)} &nbsp;
                    {BalanceData?.[0]?.CreditAmount > 0 ? 'Dr' : 'Cr'}
                  </span>
                </p>
                <Col style={{ marginLeft: '-9px' }}>
                  <b> {t('closing')}</b>
                  <span className="marginleft2" style={{ marginLeft: 45 }}>
                    {' '}
                    {numberFormatter(BalanceData?.[0]?.ClosingBalance)} &nbsp;
                    {BalanceData?.[0]?.ClosingBalance > 0 ? 'Dr' : 'Cr'}
                  </span>
                </Col>
              </Col>
            </Row>
            {/* </b> */}
          </div>
        </Card>
      </Col>
    </Row>
  );
};
export default AccountDetailCard;
