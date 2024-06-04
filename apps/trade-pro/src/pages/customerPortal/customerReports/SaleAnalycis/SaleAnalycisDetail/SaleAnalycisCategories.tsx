import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Col, Row, theme } from 'antd';
import _, { map } from 'lodash';
import React, { useEffect, useState } from 'react';

const { useToken } = theme;
interface PurchaseAnalyticsDetailProps {
  saleInvoice: any;
  data: any;
  IpcId: number | null;
}

const SaleAnalycisCategories = ({ saleInvoice, data, IpcId }: PurchaseAnalyticsDetailProps) => {
  console.log(IpcId);
  const filteredRecords = saleInvoice?.data?.Data?.Result?.filter((item: any) => item.IpcId === IpcId);
  // console.log(data1,'1')

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [groupedData, setGroupedData] = useState<any>({});
  console.log(groupedData);
  useEffect(() => {
    const filteredRecords = saleInvoice?.data?.Data?.Result?.filter((item: any) => item.IpcId === IpcId);
    setGroupedData(filteredRecords);
  }, [data]);
  return (
    <div>
      <Row style={{ marginLeft: 5 }}>
        <Col xxl={24}>
          <Row style={{ marginLeft: 1, marginBottom: 10 }} justify="space-between" gutter={[24, 10]}>
            {map(groupedData, (item, index) => (
              <Col xxl={8}>
                <Row justify={'space-between'}>
                  <Col xxl={24}>
                    <Col>
                      <h3
                        style={{
                          background: colorPrimary,
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                          padding: 7,
                          color: 'white',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        {item.ItemName}
                      </h3>
                    </Col>

                    <div>
                      <Row
                        justify={'space-between'}
                        style={{ color: colorPrimary, fontSize: '17px', fontWeight: 'bold', background: 'lightblue' }}
                      >
                        <Col xxl={4} style={{ textAlign: 'center' }}>
                          Description
                        </Col>
                        <Col xxl={4}>
                          <p style={{ borderBottom: '1px solid grey', width: '200%' }}>Qty</p>
                        </Col>
                        <Col xxl={4}>
                          <p style={{ borderBottom: '1px solid grey', width: '350%' }}>Rate</p>
                        </Col>
                        <Col xxl={4}>Avg Rate</Col>
                        <Col xxl={4}>MinRate</Col>
                      </Row>
                    </div>
                    <div>
                      <Row
                        justify={'space-between'}
                        style={{
                          color: colorPrimary,
                          fontSize: '17px',
                          fontWeight: 'bold',
                          borderBottom: '1px solid grey',
                          background: 'lightblue',
                        }}
                      >
                        <Col xxl={5}></Col>
                        <Col xxl={5}>Weight</Col>
                        <Col xxl={5}>Exp/40kg</Col>
                        <Col xxl={5}>Exp+Amount</Col>
                        <Col xxl={4}>MaxRate</Col>
                      </Row>
                    </div>
                    <div>
                      <Row
                        justify={'space-between'}
                        style={{ fontSize: '17px', fontWeight: 'bold', background: '	#E6E6FA' }}
                      >
                        <Col xxl={4} style={{ color: colorPrimary, textAlign: 'center' }}>
                          {item.Descriptions}
                        </Col>
                        <Col xxl={4}>
                          <p style={{ borderBottom: '1px solid grey', width: '200%' }}>{numberFormatter(item.Qty)}</p>
                        </Col>
                        <Col xxl={4}>
                          <p style={{ borderBottom: '1px solid grey', width: '350%' }}>{numberFormatter(item.Rate)}</p>
                        </Col>
                        <Col xxl={4}>{numberFormatter(item.AvgRate)}</Col>
                        <Col xxl={4}>{numberFormatter(item.MinRate)}</Col>
                      </Row>
                    </div>
                    <div>
                      <Row
                        justify={'space-between'}
                        style={{ fontSize: '17px', fontWeight: 'bold', background: '	#E6E6FA' }}
                      >
                        <Col xxl={5}></Col>
                        <Col xxl={5}>{numberFormatter(item.NetWeight)}</Col>
                        <Col xxl={5}>{numberFormatter(item.Exp40Kg)}</Col>

                        <Col xxl={5}>{numberFormatter(item.AmountWithExp)}</Col>
                        <Col xxl={4}>{numberFormatter(item.MaxRate)}</Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SaleAnalycisCategories;
