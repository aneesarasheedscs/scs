import { Card, Col, Row, Space } from 'antd';
import { groupBy, map } from 'lodash';
import React, { useEffect, useState } from 'react';
interface Props {
  PriceLists: any;
}
function CategoryTable({ PriceLists }: Props) {
  //   const [groupedData, setGroupedData] = useState<any>([]);
  const groupDatabyCategory = groupBy(PriceLists, (item) => item.CategoryDescription);
  console.log(groupDatabyCategory);
  //   console.log(groupedData);
  const group = PriceLists?.map((item) => item.CategoryDescription);
  console.log(group);
  useEffect(() => {
    const groupDatabyCategory = groupBy(PriceLists, (item) => item.CategoryDescription);
    console.log(groupDatabyCategory);
    setGroupedData(groupDatabyCategory);
  }, [PriceLists]);

  const [groupedData, setGroupedData] = useState<any>({});
  console.log(groupedData);
  useEffect(() => {
    const groupDatabyCategory = groupBy(PriceLists, (item) => item.CategoryDescription);
    setGroupedData(groupDatabyCategory);
  }, [PriceLists]);
  return (
    <>
      <Row style={{ marginTop: '1%', maxHeight: '40vh' }}>
        <Col xxl={10}>
          <Card
            style={{ height: '50vh' }}
            cover={
              <>
                <Space style={{ height: '50vh', overflowY: 'scroll', width: '100%' }}>
                  <Row
                    gutter={[0, 0]}
                    style={{
                      gridTemplateColumns: 'repeat(12, 1fr)', // Adjust based on the number of columns
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    <Col span={24}>
                      <Row style={{ border: ' ' }}>
                        <Col xxl={24}>
                          <Row
                            justify={'center'}
                            style={{
                              backgroundColor: '#85C1E9',
                              borderTopLeftRadius: 5,
                              borderTopRightRadius: 5,
                              //   marginLeft: 10,
                            }}
                          >
                            <Col>
                              <h4>Category</h4>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      span={24}
                      //   style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid' }}
                    >
                      <Row>
                        <Col xxl={24}>
                          <Row
                            style={{
                              marginBottom: 5,

                              padding: 5,
                              paddingLeft: 10,
                              background: '#85C1E9',
                              //   marginLeft: 10,
                            }}
                          >
                            <Col xxl={10}>
                              <h4 style={{ textAlign: 'left' }}> Brand Name </h4>
                            </Col>
                            <Col xxl={7}>{/* <h4 style={{ textAlign: 'right' }}> Item Price </h4> */}</Col>
                            <Col xxl={7}>
                              <h4 style={{ textAlign: 'right', marginRight: 10 }}> Item Rate </h4>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      {Object.keys(groupedData).map((category, index) => (
                        <Row key={category}>
                          <Col xxl={24}>
                            <Row
                              style={{
                                marginBottom: 5,
                                padding: 5,
                                paddingLeft: 10,
                                borderBottom: '1px solid lightgrey',
                              }}
                            >
                              <Col xxl={10}>
                                <h4 style={{ textAlign: 'left' }}>{category}</h4>
                              </Col>
                              <Col xxl={7}></Col>
                              <Col xxl={7}> </Col>
                            </Row>
                            {groupedData[category].map((item, itemIndex) => (
                              <Row key={itemIndex}>
                                <Col xxl={24}>
                                  <Row
                                    style={{
                                      marginBottom: 5,
                                      padding: 5,
                                      paddingLeft: 10,
                                      borderBottom: '1px solid lightgrey',
                                    }}
                                  >
                                    <Col xxl={10}>
                                      <p style={{ textAlign: 'left' }}>{item.ItemName}</p>
                                    </Col>
                                    <Col xxl={7}></Col>
                                    <Col xxl={7}>
                                      <p style={{ textAlign: 'right', marginRight: 10 }}>{item.ItemRate}</p>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            ))}
                          </Col>
                        </Row>
                      ))}

                      {map(groupedData, (item, index: number) => (
                        <>
                          <Row>
                            <Col xxl={24}>
                              <Row
                                gutter={0}
                                style={{
                                  marginBottom: 5,
                                  marginTop: -3,
                                  padding: 5,
                                  paddingLeft: 10,
                                  backgroundColor: index % 2 !== 0 ? '#EBF5FB' : '',
                                  borderBottom: '1px solid lightgrey',
                                  //   marginLeft: 10,
                                }}
                              >
                                <Col xxl={10}>
                                  <p style={{ textAlign: 'left' }}> {item[index]}</p>
                                </Col>
                                <Col xxl={7}>{/* <p style={{ textAlign: 'right' }}> {item.ItemPrice} </p> */}</Col>
                                <Col xxl={7}>
                                  {/* <p style={{ textAlign: 'right', marginRight: 10 }}> {item.ItemRate} </p> */}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </>
                      ))}
                    </Col>
                  </Row>
                </Space>
              </>
            }
          ></Card>
        </Col>
      </Row>
    </>
  );
}

export default CategoryTable;
