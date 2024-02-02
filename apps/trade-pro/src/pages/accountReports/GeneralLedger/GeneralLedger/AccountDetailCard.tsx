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
            <b>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <p> {/* {t('account title:')} {table2?.data?.Data?.Result?.[0]?.AccountTitle} */}</p>
                  <p>
                    {t('account_code: ')}
                    {DetailData?.[0]?.AccountCode}
                  </p>
                  <p>
                    {' '}
                    {t('account class: ')} {DetailData?.[0]?.ClassName}
                  </p>
                  <p>
                    {' '}
                    {t('account type: ')} {DetailData?.[0]?.AccountType}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    {t('opening_balance: ')} {numberFormatter(BalanceData?.[0]?.OpeningBalance.toFixed(2))}
                  </p>
                  <p>
                    {' '}
                    {t('debit_amount: ')} {numberFormatter(BalanceData?.[0]?.DebitAmount.toFixed(2))}
                  </p>
                  <p>
                    {' '}
                    {t('credit_amount:  ')}
                    {numberFormatter(BalanceData?.[0]?.CreditAmount.toFixed(2))}
                  </p>
                  <p>
                    {t('closing_balance: ')}
                    {numberFormatter(BalanceData?.[0]?.ClosingBalance.toFixed(2))}
                  </p>
                </Col>
              </Row>
            </b>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
export default AccountDetailCard;
