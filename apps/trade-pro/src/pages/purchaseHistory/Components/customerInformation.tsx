import { Col, Row } from 'antd';
import Tablefile from './tablefile';

const CustomerInformation = () => {
  return (
    <>
      <Row className="customer-div">
        <Col span={24} className="companyDiv">
          <div className="company">
            {/*<img src={image1} alt="" className='company-image' />*/}
            <h4 className="companytitle">EccountBook Cloud ERP</h4>
          </div>
          <h2 className="customer-info">ORDER# 1432</h2>
        </Col>
        <Col span={8} className="customer-orders">
          <Col>Order Date</Col>
          <span>15 Oct 2022</span>
        </Col>
        <Col span={8} className="customer-orders">
          <Col>Order Due Date</Col>
          <span>19 Oct 2022</span>
        </Col>
        <Col span={7} className="customer-orders">
          <Col>Order Category</Col>
          <span>General</span>
        </Col>
        <Col span={22}>
          <Row className="customer-div2">
            <Col span={10} className="">
              <h4 className="heading"> Supplier</h4>
              <h3 className="Cust-names"> QURBAN LAHORE</h3>
              <h4 className="heading">Phone#</h4>
              <h4 className="heading">Email</h4>
              <h4 className="heading">Address</h4>
            </Col>
            <Col lg={{ span: 10 }} md={{ span: 8 }} className="">
              <h4 className="heading">Commision Agent</h4>
              <h3 className="Cust-names">UMAR RICE TRADERS MUZANG LAHORE</h3>
              <h4 className="heading">
                Comm Weight Rate <span className="span">50</span>{' '}
              </h4>
              <h4 className="heading">
                {' '}
                Rate UOM <span className="span">40</span>
              </h4>
              <h4 className="heading">
                Amount <span className="span">18,750.000</span>{' '}
              </h4>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Tablefile />
        </Col>
      </Row>
    </>
  );
};
export default CustomerInformation;
