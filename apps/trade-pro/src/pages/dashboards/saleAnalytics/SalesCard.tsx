import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Avatar, Card, Col, Row, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import MyChartComponent from './graph/currentstaticsgraph';
import { map } from 'lodash';
import { ReactNode } from 'react';
const { useToken } = theme;
const { Title, Text } = Typography;
interface Props {
  title: any;
  value: any;
  icon: any;
  backgroundColor: any;
  desc: any;
  Amount: any;
  chart: any;
}
function SalesDashboardCard({ title, value, icon, backgroundColor, desc, Amount, chart }: Props) {
  const { t } = useTranslation();
  const colorPrimary = useToken().token.colorPrimary;

  return (
    <>
      <Card
        hoverable={true}
        className="card-container"
        style={{
          marginTop: '10px',
          borderBottom: `6px solid ${backgroundColor}`,

          textAlign: 'center',
          height: '12rem',
          boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
        }}
        cover={
          <>
            <Col span={24} style={{ marginTop: '2%' }}>
              <h2> ${numberFormatter(Amount)}</h2>

              <h3 className="card-description"> {desc}</h3>
            </Col>
            <Text>
              <Col className="card-content" span={24}>
                <p style={{ paddingLeft: 5 }}>
                  <h5> {t('from_date')}</h5>
                  <p className="from_date"> {formateDate(title)}</p>
                </p>
                <p style={{ paddingRight: 5 }}>
                  <h5> {t('to_date')}</h5>
                  <p className="from_date"> {formateDate(value)}</p>
                </p>
              </Col>
            </Text>
            <Col className="" style={{ marginTop: '-20%' }} span={24}>
              {chart}
            </Col>
          </>
        }
      ></Card>
    </>
  );
}

export function SalesPaymentCard({ percentOfTotal, icon, backgroundColor, desc, Amount }: any) {
  const { t } = useTranslation();

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xl={24} xs={24} sm={23} md={24} lg={24} xxl={24}>
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
            {/* <Card.Meta
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '-40%',
              }}
              avatar={<Avatar size={70} src={icon}></Avatar>}
            ></Card.Meta> */}
            <Col xl={24} xs={23} sm={24} md={20} lg={23} xxl={24} style={{ marginTop: '10px' }}>
              <h2> ${numberFormatter(Amount)}</h2>

              <Title
                level={5}
                style={{
                  fontSize: '16px',
                  color: 'green',
                }}
              >
                <p className="card-description"> {desc}</p>
              </Title>
            </Col>
            <Text>
              {/* <Col
                xl={24}
                xs={23}
                sm={23}
                md={20}
                lg={23}
                xxl={22}
                className=""
                // style={{ marginTop: '-60px', color: 'blue' }}
              >
                <p> {t('amount')}</p>
              </Col> */}
              {/* <b>
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
              </b> */}
              <b>
                <Col xl={24} xs={23} sm={23} md={20} lg={23} xxl={24} style={{ marginTop: '-5px', color: 'crimson' }}>
                  <p> {numberFormatter(percentOfTotal)}%</p>
                </Col>
              </b>
              {/* <b>
                <Col xl={24} xs={23} sm={23} md={20} lg={23} xxl={24} className="" style={{ textAlign: 'center' }}>
                  <p> {numberFormatter(percentOfTotal)}</p>
                </Col>
              </b> */}
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SalesDashboardCard;
