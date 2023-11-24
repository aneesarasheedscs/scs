import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Card, Col, Row, Typography, theme } from 'antd';
import { map } from 'lodash';
import { useGetAccountBalance, useGetAccountDetail } from '../queryOptions';

const { Title, Text } = Typography;
import { useTranslation } from 'react-i18next';

const { useToken } = theme;
const AccountBalanceCard = () => {
  const { t } = useTranslation();
  const {
    data: AccountBalance,
    isError: isAccountDetailError,
    isLoading: isAccountDetailLoading,
  } = useGetAccountBalance(1, new Date(), new Date());

  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <Row gutter={[12, 12]}>
      <div>
        {map(AccountBalance?.data?.Data?.Result, (card, index) => (
          <Col xs={24} md={24} lg={24}>
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
                <Title
                  level={5}
                  className="custom-title1"
                  style={{
                    backgroundColor: colorPrimary,
                    color: '#fff',
                  }}
                >
                  <p> {t('account_balance')}</p>
                  <p className="card-description"> {card.AccountDescription}</p>
                </Title>
              </Col>

              <Text>
                <b>
                  <Col className="card-content">
                    <p> {t('opening')}</p>
                    <p> {numberFormatter(card.OpeningBalance)}</p>
                  </Col>
                  <Col className="card-content">
                    <p> {t('debit')}</p>
                    <p> {numberFormatter(card.DebitAmount)}</p>
                  </Col>
                  <Col className="card-content">
                    <p> {t('credit')}</p>
                    <p> {numberFormatter(card.CreditAmount)}</p>
                  </Col>
                  <Col className="card-content">
                    <p> {t('closing')}</p>
                    <p> {numberFormatter(card.ClosingBalance)}</p>
                  </Col>
                </b>
              </Text>
            </Card>
          </Col>
        ))}
      </div>
    </Row>
  );
};

export default AccountBalanceCard;
