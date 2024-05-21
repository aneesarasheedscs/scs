import { Card, Col, FormInstance, Row, Space, Spin, theme } from 'antd';
import React from 'react';
import AddItemCriteria from '../../forms/addItemCriteria';
import './style.scss';
import { map } from 'lodash';
import { useGetItemWithPackUom } from '../../queries';
const { useToken } = theme;
import ERPLogo from './INAM-ECONOMY-SELLA-2.png';
import './style.scss'
const AddItemsCards = ({ form }: TAddItem) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { data, isLoading, isSuccess } = useGetItemWithPackUom();

  return (
    <>
      <AddItemCriteria form={form} />
      <Row justify="center" style={{ marginTop: 5 }}>
        <Col xxl={24}>
          {isSuccess && !isLoading ? (
            <Card>
              <Row gutter={[5, 8]}>
                {map(data?.data?.Data?.Result, (item) => (
                  <Col xxl={8} style={{ textAlign: 'center' }}>
                    <Card className="addItemCardStyle" style={{ width: '100%', justifyContent: 'space-between' }}
                    cover={
                    <>
                    
                      <Col style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Col style={{ textAlign: 'left', display: 'flex', justifyContent: 'start' }}>
                          <img
                            src={ERPLogo}
                            width={'90rem'}
                            height={'135'}
                            style={{  textAlign: 'left' }}
                          />
                        </Col>
                        <Col style={{display:'flex',alignSelf:'center'}}>
                          <Col style={{ textAlign: 'right',}}>
                            {/* <h5 style={{  }}>{item.ItemName}</h5> */}
                            <h5 style={{ textAlign: 'right', width: '100%',paddingTop:5,paddingLeft:10 }}>{item.ItemName}</h5>
                            <h4 style={{ color: 'green' }}>
                              <span></span>
                              {item.RateUom}
                            </h4>
                            <p style={{ color: 'red' }}>
                              Price 
                              {item.ItemPrice}
                              /{item.PackUom}
                            </p>
                          </Col>
                        </Col>
                      </Col>
                    </>
                    }
                    >
                    
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          ) : (
            <Space style={{ height: 100, display: 'flex', justifyContent: 'center' }}>
              Loading<Spin size="default"></Spin>
            </Space>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AddItemsCards;

type TAddItem = { form: FormInstance };
