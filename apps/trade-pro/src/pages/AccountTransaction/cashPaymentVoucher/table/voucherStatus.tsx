import { Card, Col, Row } from 'antd';
import { map } from 'lodash';

interface TVoucherStatus {
  totalUnApprovedVouchers: number;
  totalApprovedVouchers: number;
  totalVouchers: number;
}
function VouchersStatus({ totalUnApprovedVouchers, totalApprovedVouchers, totalVouchers }: TVoucherStatus) {
  const status = [
    {
      desc: 'Total Vouchers',
      value: totalVouchers,
    },
    {
      desc: 'Approved Vouchers',
      value: totalApprovedVouchers,
    },
    {
      desc: 'UnApproved Vouchers',
      value: totalUnApprovedVouchers,
    },
  ];
  return (
    <>
      <>
        {totalApprovedVouchers && totalUnApprovedVouchers && totalVouchers ? (
          <Row gutter={6} justify={'end'}>
            {map(status, (heading, index) => (
              <Col xxl={4} xl={5} lg={6} md={6} sm={7} xs={12} key={index}>
                <Card
                  className="purchase-cards"
                  cover={
                    <h4 style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="">{heading.desc}</span>
                      <span className="">{heading.value}</span>
                    </h4>
                  }
                ></Card>
              </Col>
            ))}
          </Row>
        ) : (
          ''
        )}
      </>
      {/* <Card style={{ height: '12vh' }}>
        <Row gutter={6} justify={'center'}>
          {map(purchaseOrderStatus?.data?.Data?.Result, (heading, index) => (
            <Col xxl={3} xl={4} lg={6} md={5} sm={7} xs={12} key={index}>
              <Card
                className="purchase-cards"
                cover={
                  <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="">{heading.Activity}</span>
                    <span className="">{heading.OrderStatus}</span>
                  </h3>
                }
              ></Card>
            </Col>
          ))}
        </Row>
      </Card> */}
    </>
  );
}

export default VouchersStatus;
