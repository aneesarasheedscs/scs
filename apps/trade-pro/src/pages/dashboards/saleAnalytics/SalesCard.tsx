import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Avatar, Card, Col, Row, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';

const { useToken } = theme;
const { Title, Text } = Typography;
function SalesDashboardCard({ title, value, icon, backgroundColor, desc, Amount }: any) {
  const { t } = useTranslation();
  const colorPrimary = useToken().token.colorPrimary;

  return (
    <div>
      <Card
        hoverable={true}
        className="card-container"
        style={{
          marginTop: '20px',
          backgroundColor: backgroundColor,
          border: '1px solid white',
          textAlign: 'center',
          height: '21vh',
          boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
        }}
      >
        <Card.Meta
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '-30%',
          }}
          avatar={<Avatar size={70} src={icon}></Avatar>}
        ></Card.Meta>
        <Col span={24} style={{ marginTop: '8px' }}>
          <Title level={5}>
            <p className="card-description"> {desc}</p>
          </Title>
        </Col>
        <Text>
          <Col className="card-content">
            <p> {t('from_date')}</p>
            <p> {formateDate(title)}</p>
          </Col>
          <Col className="card-content">
            <p> {t('to_date')}</p>
            <p> {formateDate(value)}</p>
          </Col>

          <Col className="" style={{ textAlign: 'center', marginTop: '-10px', fontSize: '15px' }}>
            <p> {t('amount')}</p>
          </Col>
          <b>
            <Col className="" style={{ textAlign: 'center', marginTop: '-10px', fontSize: '15px' }}>
              <p> {numberFormatter(Amount)}</p>
            </Col>
          </b>
        </Text>
      </Card>
    </div>
  );
}

export function SalesPaymentCard({ percentOfTotal, icon, backgroundColor, desc, Amount }: any) {
  const { t } = useTranslation();

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xl={24} xs={23} sm={23} md={24} lg={24} xxl={24}>
          <Card
            hoverable={true}
            className="card-container-sale-payment"
            style={{
              marginTop: '20px',
              backgroundColor: backgroundColor,
              border: '1px solid white',
              textAlign: 'center',
              boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
            }}
          >
            <Card.Meta
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '-40%',
              }}
              avatar={<Avatar size={70} src={icon}></Avatar>}
            ></Card.Meta>
            <Col xl={24} xs={23} sm={24} md={20} lg={23} xxl={24} style={{ marginTop: '10px' }}>
              <Title
                level={5}
                style={{
                  fontSize: '17px',
                  color: 'green',
                }}
              >
                <p className="card-description"> {desc}</p>
              </Title>
            </Col>
            <Text>
              <Col
                xl={24}
                xs={23}
                sm={23}
                md={20}
                lg={23}
                xxl={22}
                className=""
                style={{ marginTop: '-60px', color: 'blue' }}
              >
                <p> {t('amount')}</p>
              </Col>
              <b>
                <Col
                  xl={24}
                  xs={23}
                  sm={23}
                  md={20}
                  lg={23}
                  xxl={24}
                  className=""
                  style={{ textAlign: 'center', marginTop: '20xp' }}
                >
                  <p> {numberFormatter(Amount)}</p>
                </Col>
              </b>
              <b>
                <Col
                  xl={24}
                  xs={23}
                  sm={23}
                  md={20}
                  lg={23}
                  xxl={24}
                  className=""
                  style={{ marginTop: '-5px', color: 'crimson' }}
                >
                  <p> {t('Percent Of Total')}</p>
                </Col>
              </b>
              <b>
                <Col xl={24} xs={23} sm={23} md={20} lg={23} xxl={24} className="" style={{ textAlign: 'center' }}>
                  <p> {numberFormatter(percentOfTotal)}</p>
                </Col>
              </b>
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SalesDashboardCard;
