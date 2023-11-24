import './style.scss';
import { Card, Col, Row } from 'antd';
import { CalculatorOutlined, RadarChartOutlined, PieChartOutlined } from '@ant-design/icons';
import img from './images/long-right-arrow.png';
import img1 from './images/long-left-arrow.png';
const timelineData = [
  {
    icon: <CalculatorOutlined />,
    title: 'Web Development',
    image: img,
    no: 1,
  },
  {
    icon: <RadarChartOutlined />,
    title: 'JavaScript',
    image: img,
    no: 2,
  },
  {
    icon: <PieChartOutlined />,
    title: 'JavaScript',
    image: img,
    no: 3,
  },
  {
    icon: <PieChartOutlined />,
    title: 'Web Development',
    image: img1,
    no: 4,
  },
  {
    icon: <RadarChartOutlined />,
    title: 'JavaScript',
    image: img1,
    no: 5,
  },
  {
    icon: <CalculatorOutlined />,
    title: 'JavaScript',
    image: img1,
    no: 6,
  },
];

function RoadMap() {
  return (
    <Card className="container">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2 className="heading">Deep Learning Road Map</h2>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="row ">
        {timelineData.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={8} className="col " key={index}>
            <Col
              style={{
                background: '#65c7d0',
                border: '5px solid black',
                borderRadius: '250px',
                width: '15rem',
                height: '15rem',
              }}
            >
              <div className="timeline-icon shake ">{item.icon}</div>

              <div className="main-timeline">
                <div className="timeline">{item.no}</div>
              </div>

              <h3 className="title">{item.title}</h3>

              <img src={item.image} className="img" />
            </Col>
            <br />
            <br />
          </Col>
        ))}
      </Row>
    </Card>
  );
}

export default RoadMap;
