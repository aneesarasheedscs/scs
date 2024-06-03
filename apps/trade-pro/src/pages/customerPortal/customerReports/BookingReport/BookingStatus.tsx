import { Card, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

function BookingOrderSatus({ bookingDemandData }: Props) {
  console.log(bookingDemandData?.Table?.[0]?.TotalCustomers);
  const { t } = useTranslation();

  const BookingOrderSatus = [
    {
      Id: 1,
      text: 'Customer',
      status: 101,
    },
    {
      Id: 2,
      text: 'Qty',
      status: 101,
    },
    {
      Id: 3,
      text: 'Weight',
      status: 101,
    },
    {
      Id: 4,
      text: 'Amount',
      status: 101,
    },
  ];
  return (
    <>
      <Row gutter={0} justify={'start'}>
        <Col xxl={4} xl={5} lg={6} md={5} sm={7} xs={12}>
          <Card
            className="purchase-cards"
            cover={
              <h4 style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', marginTop: -3 }}>
                <span className="">{t('customer')}</span>
                <span className="">{bookingDemandData?.Table?.[0]?.TotalCustomers}</span>
              </h4>
            }
          ></Card>
        </Col>
        <Col xxl={4} xl={5} lg={6} md={5} sm={7} xs={12}>
          <Card
            className="purchase-cards"
            cover={
              <h4 style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', marginTop: -3 }}>
                <span className="">{t('qty')}</span>
                <span className="">{numberFormatter(bookingDemandData?.Table?.[0]?.Qty)}</span>
              </h4>
            }
          ></Card>
        </Col>
        <Col xxl={4} xl={5} lg={6} md={5} sm={7} xs={12}>
          <Card
            className="purchase-cards"
            cover={
              <h4 style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', marginTop: -3 }}>
                <span className="">{t('weight')}</span>
                <span className="">{numberFormatter(bookingDemandData?.Table?.[0]?.Weight)}</span>
              </h4>
            }
          ></Card>
        </Col>
        <Col xxl={4} xl={5} lg={6} md={5} sm={7} xs={12}>
          <Card
            className="purchase-cards"
            cover={
              <h4 style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', marginTop: -3 }}>
                <span className="">{t('amount')}</span>
                <span className="">{numberFormatter(bookingDemandData?.Table?.[0]?.Amount)}</span>
              </h4>
            }
          ></Card>
        </Col>
      </Row>
    </>
  );
}

export default BookingOrderSatus;
interface Props {
  bookingDemandData: any;
}
