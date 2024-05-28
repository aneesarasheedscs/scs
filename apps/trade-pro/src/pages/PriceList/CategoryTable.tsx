import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Card, Col, FormInstance, Row, Space } from 'antd';
import _, { groupBy, map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
interface Props {
  PriceLists: any;
  selectedRadio: number | null;
  form:FormInstance
}
function CategoryTable({ PriceLists, selectedRadio,form}: Props) {
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

  const TotalItemPrice = _.sumBy(PriceLists, 'ItemPrice');
  console.log(TotalItemPrice, 'total');

  console.log(selectedRadio);
  const [groupedData, setGroupedData] = useState<any>({});
  console.log(groupedData);
  useEffect(() => {
    if (selectedRadio == 1 ) {
      const groupDatabyCategory = groupBy(PriceLists, (item) => item.CategoryDescription);
      setGroupedData(groupDatabyCategory);
      form.setFieldValue('ItemTypeId',null)
    
    } else if (selectedRadio == 2) {
      const groupDatabyType = groupBy(PriceLists, (item) => item.TypeDescription);
      setGroupedData(groupDatabyType);
      form.setFieldValue('ItemCategoryId',null)
    }
  }, [PriceLists, selectedRadio]);

  return (
    <>
      <Row style={{ maxHeight: '70vh', marginBottom: 10, marginTop: 20 }}>
        <Col span={10}>
          <Card
            style={{ height: '60vh', boxShadow: '2px 2px 12px 2px lightgrey' }}
            cover={
              <>
                <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                  <div
                    style={{
                      backgroundColor: '#85C1E9',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      gridTemplateColumns: 'repeat(12, 1fr)', 
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
                            ></Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24} >
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
                                    <Col xxl={1}><h4>SNo</h4></Col>
                              <Col xxl={10} xl={10} lg={12}>
                                <h4 style={{  }}>{t('brand_name')} </h4>
                              </Col>
                        
                              <Col xxl={7} lg={12}>
                                <h4 style={{ textAlign: 'right', marginRight: 25 }}> {t('item_rate')} </h4>
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
                           <Col xxl={4}></Col>
                              <Col xxl={8} >
                                <h4 style={{ textAlign: 'left', }}>{category}</h4>
                              </Col>
                              <Col xxl={7}></Col>
                            
                              <Col xxl={7}> </Col>
                            </Row>
                            {groupedData[category].map((item: any, itemIndex: any) => (
                              <Row key={itemIndex}>
                                <Col xxl={24}>
                                  <Row
                                    style={{
                                      marginBottom: 5,
                                      padding: 5,
                                      paddingTop:0,
                                      paddingBottom:0,
                                      paddingLeft: 10,
                                      borderBottom: '1px solid lightgrey',
                                    }}
                                  >
                                     <Col xxl={4}>{itemIndex+1}</Col>
                                    <Col xxl={10}>
                                      <p style={{textAlign:'left'}}>{item.ItemName}</p>
                                    </Col>
                                    <Col xxl={4}></Col>
                                    <Col xxl={5}>
                                      <p style={{ textAlign: 'right', marginRight: 0 }}>{item.ItemRate}</p>
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

          {/* <Row
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
            <Col xxl={7}></Col>
            <Col xxl={7}>
              <h4 style={{ textAlign: 'right', marginRight: 20 }}>
                {' '}
                {t('total')}
                {numberFormatter(TotalItemPrice)}{' '}
              </h4>
            </Col>
          </Row> */}
        </Col>
      </Row>
    </>
  );
}

export default CategoryTable;
