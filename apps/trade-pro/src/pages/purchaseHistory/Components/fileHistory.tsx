import { Button, Card, Col, Row, Space } from 'antd';
import Search from 'antd/es/input/Search';
import './style.scss';
import {
  FilterOutlined,
  PrinterFilled,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import CustomerInformation from './customerInformation';
import React, { useEffect, useState } from 'react';

interface Users {
  name: string;
  street: string;
}

const Historyfile: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);

  const getUSers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    setUsers(await response.json());
    setRecords(users);
    console.log(users);
  };
  useEffect(() => {
    getUSers();
  }, [users]);

  return (
    <>
      <div>
        <Row className="row1">
          <Col lg={{ span: 8 }} sm={{ span: 24 }} className="columns">
            <Space className="col">
              <Search
                style={{ width: '30vw' }}
                //   onChange={(e)=> setRecords(e.target.value)}
                placeholder="Filter"
              />
              <FilterOutlined className="filter" />
            </Space>
            <Row className="row">
              <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 8 }} className="column">
                <b style={{ fontSize: 18 }}>
                  Doc# <SortAscendingOutlined /> <SortDescendingOutlined />
                </b>
              </Col>
              <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 8 }} className="column">
                <b style={{ fontSize: 18 }}>
                  {' '}
                  Date <SortAscendingOutlined /> <SortDescendingOutlined />
                </b>
              </Col>
              <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 8 }} className="column">
                <b style={{ fontSize: 18 }}>
                  {' '}
                  Supp <SortAscendingOutlined /> <SortDescendingOutlined />
                </b>
              </Col>
              <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 8 }} className="column">
                <b style={{ fontSize: 18 }}>
                  {' '}
                  Status <SortAscendingOutlined /> <SortDescendingOutlined />
                </b>
              </Col>
            </Row>
            <div className="container">
              <Card
                className="cards"
                cover={
                  <>
                    <div className="cardList">
                      <h3>Qurban Lahore</h3>
                      <span className="orders">Order# 1432</span>
                      <div className="card-items">
                        <span className="list-items">Open</span>
                        <span className="list-items2">Approved</span>
                      </div>
                      <div className="card-items">
                        <span className="date"> Oct 27, 2022</span>
                        <span className="amount">48000</span>
                      </div>
                    </div>
                  </>
                }
              />
              {users &&
                users
                  .filter((result) => {
                    return records === '' ? result : result.name.toLowerCase().includes(records);
                  })
                  .map((result, index) => {
                    return (
                      <>
                        <Card<Users>
                          key={index}
                          className="cards"
                          cover={
                            <>
                              <div className="cardList">
                                <h3>{result.name}</h3>
                                <p>{result.street}</p>
                                <span className="orders">Order# 1432</span>
                                <div className="card-items">
                                  <span className="list-items">Open</span>
                                  <span className="list-items2">Approved</span>
                                </div>
                                <div className="card-items">
                                  <span className="date"> Oct 27, 2022</span>
                                  <span className="amount">48000</span>
                                </div>
                              </div>
                            </>
                          }
                        />
                      </>
                    );
                  })}
            </div>
          </Col>
          <Col lg={{ span: 16 }} sm={{ span: 24 }} className="columns">
            <Row className="row">
              <Button className="button2">
                <PrinterFilled />{' '}
              </Button>
              <Button className="button2">
                <PrinterFilled />{' '}
              </Button>
            </Row>
            <CustomerInformation />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Historyfile;
