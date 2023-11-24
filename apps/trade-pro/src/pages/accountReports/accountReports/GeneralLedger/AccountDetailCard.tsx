import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Card, Col, Row, Typography, theme } from 'antd';
import { map } from 'lodash';
import { useGetAccountDetail } from '../queryOptions';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const { useToken } = theme;
const AccountDetailCard = () => {
  const { t } = useTranslation();
  const {
    data: AccountDetail,
    isError: isAccountDetailError,
    isLoading: isAccountDetailLoading,
  } = useGetAccountDetail(1);

  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <Row gutter={[12, 12]}>
      <div>
        {map(AccountDetail?.data?.Data?.Result, (card, index) => (
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
                  <p> {t('account_detail')}</p>
                  <p className="card-description"> {card.AccountDescription}</p>
                </Title>
              </Col>

              <Text>
                <b>
                  <Col className="card-content">
                    <p> {t('account_code')}</p>
                    <p> {numberFormatter(card.AccountCode)}</p>
                  </Col>
                  <Col className="card-content">
                    <p> {t('account_class')}</p>
                    <p> {card.ClassName}</p>
                  </Col>
                  <Col className="card-content">
                    <p> {t('account_type')}</p>
                    <p> {card.AccountType}</p>
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

export default AccountDetailCard;
