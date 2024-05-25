import { Card, Col, Row, Space } from 'antd';
import { groupBy, map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
interface Props {
  PriceLists: any;
  selectedRadio: number | null;
}
function CategoryTable({ PriceLists, selectedRadio }: Props) {
  const { t } = useTranslation();
  // //   const [groupedData, setGroupedData] = useState<any>([]);
  // const groupDatabyCategory = groupBy(PriceLists, (item) => item.CategoryDescription);
  // console.log(groupDatabyCategory);
  // //   console.log(groupedData);
  // const group = PriceLists?.map((item) => item.CategoryDescription);
  // console.log(group);
  // useEffect(() => {
  //   const groupDatabyCategory = groupBy(PriceLists, (item) => item.CategoryDescription);
  //   console.log(groupDatabyCategory);
  //   setGroupedData(groupDatabyCategory);
  // }, [PriceLists]);
  console.log(selectedRadio);
  const [groupedData, setGroupedData] = useState<any>({});
  console.log(groupedData);
  useEffect(() => {
    // yaha py condition lahani hy hy radio buttons ki base pu group kana
    if (selectedRadio == 1) {
      const groupDatabyCategory = groupBy(PriceLists, (item) => item.CategoryDescription);
      setGroupedData(groupDatabyCategory);
    } else if (selectedRadio == 2) {
      const groupDatabyType = groupBy(PriceLists, (item) => item.TypeDescription);
      setGroupedData(groupDatabyType);
    }
  }, [PriceLists, selectedRadio]);

  return (
    <>
      <Row style={{ maxHeight: '40vh', marginBottom: 10, marginTop: 20 }}>
        <Col span={10} >
          <Card
            style={{ height: '40vh', boxShadow: '2px 2px 12px 2px lightgrey' }}
            cover={
              <>
                <div style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                  <div
                    style={{
                      backgroundColor: '#85C1E9',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      gridTemplateColumns: 'repeat(12, 1fr)', // Adjust based on the number of columns
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
                      paddingTop: 0,
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <Row
                      gutter={[0, 0]}
                      style={{
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
                            justify={'space-between'}
                              style={{
                                marginBottom: 5,

                                padding: 5,
                                paddingLeft: 10,
                                background: '#85C1E9',
                                //   marginLeft: 10,
                              }}
                            >
                              <Col xxl={10} xl={10} lg={12}>
                                <h4 style={{ textAlign: 'left' }}> Brand Name </h4>
                              </Col>
                              <Col xxl={7}>{/* <h4 style={{ textAlign: 'right' }}> Item Price </h4> */}</Col>
                              <Col xxl={7} lg={12}>
                                <h4 style={{ textAlign: 'right', marginRight: 10 }}> Item Rate </h4>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
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
                            {groupedData[category].map((item:any, itemIndex:any) => (
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
                </div>
              </>
            }
          ></Card>

          <Row
            justify={'space-between'}
            style={{
              position: 'sticky',
              bottom: 0,
              zIndex: 2,
              backgroundColor: '#ffff',
              borderTop: '1px solid lightgrey',
              marginTop: -20,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          >
            <Col xxl={10}>
              <h4 style={{ textAlign: 'left' }}> </h4>
            </Col>
            <Col xxl={7}>{/* <h4 style={{ textAlign: 'right' }}> Item Price </h4> */}</Col>
            <Col xxl={7}>
              <h4 style={{ textAlign: 'right', marginRight: 20 }}> Total: 0000 </h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default CategoryTable;
