import React from 'react';
import { useState, useEffect } from 'react';
import { Badge, Col, Row, Table, TableColumnsType } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}
interface User {
  key: React.Key;
  name: string;
}

const Tablefile: React.FC = () => {
  const [columns, setColumns] = useState([
    {
      title: 'Item Name',
      dataIndex: 'title',
    },
    {
      title: 'Qty',
      dataIndex: 'price',
    },
    {
      title: 'UOM',
      dataIndex: 'discountPercentage',
    },
    {
      title: 'Net Weight Rate',
      dataIndex: 'stock',
      width: 'auto',
    },
    {
      title: 'Rate UOM',
      dataIndex: 'rating',
    },
    {
      title: 'Amount',
      dataIndex: 'price',
    },
    {
      title: 'Actions',
      render: (_: any, record: any) => {
        return (
          <>
            {' '}
            <ZoomInOutlined style={{ color: 'blue' }} />{' '}
          </>
        );
      },
    },
  ]);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('https://dummyjson.com/products/search?q=phone')
      .then((res) => res.json())
      .then((result) => {
        setDataSource(result.products);
        console.log(result.products);
      });
    setLoading(false);
  }, []);
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Job/Lot', dataIndex: 'date', key: 'date' },
      { title: 'Crop Year', dataIndex: 'name', key: 'name' },
      { title: 'Bag Weight', dataIndex: 'weight', key: 'w' },
      { title: 'Lab Sample', dataIndex: 'lab', key: 'lab' },
      {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="Finished" />,
      },
    ];

    const data = [];
    for (let i = 0; i < 1; ++i) {
      data.push({
        key: i.toString(),
        date: 'General',
        name: '2022-23',
        weight: '0.000',
        lab: '2',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  return (
    <>
      <div className="border">
        <Table<User>
          className="tablestyling"
          columns={columns}
          loading={loading}
          dataSource={dataSource}
          // expandable={{
          //     expandedRowRender: (record)=> <p>{record.description} { record.images} </p> ,
          //
          // }}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: [''] }}
          footer={() => {
            return (
              <>
                <div className="flex">
                  <h4>Detail Total</h4>
                  <h4>250.000</h4>
                  <h4>15,000.00</h4>
                  <h4>1,050,000.00</h4>
                </div>
              </>
            );
          }}
        />
        <Row className="customer-div3">
          <Col md={{ span: 12 }} lg={{ span: 12 }} className="bags">
            <h3>Empty Bags</h3>
            <Table
              title={() => {
                return (
                  <>
                    <div className="header">
                      <span>Item</span>
                      <span>Rate</span>
                      <span>Wt..Cut</span>
                    </div>
                  </>
                );
              }}
              columns={[
                {
                  dataIndex: 'item',
                },
                {
                  dataIndex: 'rate',
                },
                {
                  dataIndex: 'weight',
                },
              ]}
              dataSource={[
                {
                  key: '1',
                  item: ' ',
                  rate: '0',
                  weight: '1.00',
                },
                {
                  key: '2',
                  item: ' ',
                  rate: '0',
                  weight: '1.00',
                },
              ]}
              pagination={false}
            />
          </Col>
          <Col xl={{ span: 11 }} lg={{ span: 16 }} md={{ span: 20 }} className="total">
            <Col span={8}>
              {' '}
              <h2 style={{ fontFamily: 'times roman' }}>Grand Total</h2>
            </Col>
            <Col span={8}>
              {' '}
              <h2 style={{ fontFamily: 'times roman' }}>1,050,000.00</h2>{' '}
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Tablefile;
