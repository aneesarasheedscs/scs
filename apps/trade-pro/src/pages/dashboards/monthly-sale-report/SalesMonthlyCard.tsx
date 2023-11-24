import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Avatar, Card, Col, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';

const { useToken } = theme;
const { Title, Text } = Typography;
function MonthlySaleReportCard({ icon, backgroundColor, desc, Amount, percentOfTotal }: any) {
  const { t } = useTranslation();
  const colorPrimary = useToken().token.colorPrimary;

  return (
    <div>
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
        <Col span={24} style={{ marginTop: '-10px' }}>
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
          <Col className="" style={{ marginTop: '-10px', color: 'blue' }}>
            <p> {t('Amount')}</p>
          </Col>
          <b>
            <Col className="" style={{ textAlign: 'center', marginTop: '-20xp' }}>
              <p> {numberFormatter(Amount)}</p>
            </Col>
          </b>
          <b>
            <Col className="" style={{ marginTop: '-5px', color: 'crimson' }}>
              <p> {t('% Of Total')}</p>
            </Col>
          </b>
          <b>
            <Col className="" style={{ textAlign: 'center' }}>
              <p> {numberFormatter(percentOfTotal)}</p>
            </Col>
          </b>
        </Text>
      </Card>
    </div>
  );
}

export function SalesAvgCard({ icon, backgroundColor, desc, Amount }: any) {
  const { t } = useTranslation();

  return (
    <div>
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
        <Col span={24} style={{ marginTop: '-10px' }}>
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
          <Col className="" style={{ marginTop: '-10px', color: 'blue' }}>
            <p> {t('sale_amount')}</p>
          </Col>
          <b>
            <Col className="" style={{ textAlign: 'center', marginTop: '-20xp' }}>
              <p> {numberFormatter(Amount)}</p>
            </Col>
          </b>
        </Text>
      </Card>
    </div>
  );
}

export function SalesMaxCard({ icon, backgroundColor, desc, Amount, value }: any) {
  const { t } = useTranslation();

  return (
    <div>
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
            marginTop: '-35%',
          }}
          avatar={<Avatar size={70} src={icon}></Avatar>}
        ></Card.Meta>
        <Col span={24} style={{ marginTop: '-1px' }}>
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
          <Col style={{ marginTop: '-12px', color: 'crimson' }}>
            <p> {t('Max sale Day')}</p>
          </Col>

          <Col style={{ marginTop: '-10px' }}>
            <p> {formateDate(value)}</p>
          </Col>

          <Col className="" style={{ marginTop: '-10px', color: 'blue' }}>
            <p> {t('sale_amount')}</p>
          </Col>
          <b>
            <Col className="" style={{ textAlign: 'center', marginTop: '-20xp' }}>
              <p> {numberFormatter(Amount)}</p>
            </Col>
          </b>
        </Text>
      </Card>
    </div>
  );
}

export function SalesMinCard({ icon, backgroundColor, desc, Amount, value }: any) {
  const { t } = useTranslation();

  return (
    <div>
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
            marginTop: '-35%',
          }}
          avatar={<Avatar size={70} src={icon}></Avatar>}
        ></Card.Meta>
        <Col span={24} style={{ marginTop: '-10px' }}>
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
          <Col style={{ marginTop: '-12px', color: 'crimson' }}>
            <p> {t('Min sale Day')}</p>
          </Col>

          <Col style={{ marginTop: '-10px' }}>
            <p> {formateDate(value)}</p>
          </Col>

          <Col className="" style={{ marginTop: '-10px', color: 'blue' }}>
            <p> {t('sale_amount')}</p>
          </Col>
          <b>
            <Col className="" style={{ textAlign: 'center', marginTop: '-20xp' }}>
              <p> {numberFormatter(Amount)}</p>
            </Col>
          </b>
        </Text>
      </Card>
    </div>
  );
}
export default MonthlySaleReportCard;
