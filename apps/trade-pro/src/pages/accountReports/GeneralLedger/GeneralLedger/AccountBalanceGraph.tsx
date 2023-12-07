import React from 'react';
import ReactECharts from 'echarts-for-react';

import { Col, Card, theme, Row } from 'antd';
import { map } from 'lodash';
import { useGetAccountBalance } from '../queryOptions';
import { useTranslation } from 'react-i18next';

const { useToken } = theme;

const AccountBalanceGraph = () => {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  // const AccountId = 1;
  const { data } = useGetAccountBalance(false, 1, 1, new Date(), new Date());

  return (
    <div>
      {map(data?.data?.Data?.Result, (card, index) => (
        <Col xs={24} md={24} lg={24} key={index}>
          <Card
            key={index}
            hoverable
            className="card-container"
            style={{
              border: `1px solid ${colorPrimary}`,
              // display: card.AccountDescription === 'Cash Balances' ? 'block' : 'none',
            }}
          >
            <Col span={24}>
              <ReactECharts
                option={{
                  title: {
                    text: `${t('account_balance')}`,
                  },
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow',
                    },
                  },
                  legend: {
                    textStyle: {
                      color: '#666',
                    },
                    data: ['ClosingBalance', 'CreditAmount', 'DebitAmount', 'OpeningBalance'],
                    top: 10,
                    right: 'center',
                  },
                  grid: {
                    top: '15%',
                    left: '5%',
                    right: '5%',
                    bottom: '15%',
                    containLabel: true,
                  },
                  xAxis: {
                    type: 'value',
                    boundaryGap: [0],
                    barCategoryGap: '30%',
                  },
                  yAxis: {
                    type: 'category',
                    data: [`${t('closing')}`, `${t('credit')}`, `${t('debit')}`, `${t('opening')}`],
                  },
                  series: [
                    {
                      name: '',
                      type: 'bar',
                      data: [
                        { value: card.ClosingBalance, itemStyle: { color: '#FF6363' } },
                        { value: card.CreditAmount, itemStyle: { color: '#3C91E6' } },
                        { value: card.DebitAmount, itemStyle: { color: '#60C17E' } },
                        { value: card.OpeningBalance, itemStyle: { color: '#FFB547' } },
                      ],
                    },
                  ],
                }}
                style={{ height: '250px', width: '400px' }} // adjust the height as needed
              />
            </Col>
          </Card>
        </Col>
      ))}
    </div>
  );
};

export default AccountBalanceGraph;
