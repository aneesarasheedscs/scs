import { Card, Col, Form, Row, Space, Spin, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import AddItemCriteria from '../../forms/addItemCriteria';
import './style.scss';
import { map } from 'lodash';
import { useGetItemWithPackUom } from '../../queries';
const { useToken } = theme;
import ERPLogo from './INAM-ECONOMY-SELLA-2.png';
import { PlusOutlined } from '@ant-design/icons';
import './style.scss';
import { AntButton } from '@scs/ui';

const { useForm, useWatch } = Form;
const AddItemsCards = ({ setSelectedItem, selectedItem }: TAddItem) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const onFinish = (_: any) => {
    // setformState(form.getFieldsValue());
  };
  const { data, isLoading, isSuccess } = useGetItemWithPackUom();
  const handleAddItem = (item: any) => {
    console.log(item);
    setSelectedItem([...selectedItem, item]);
  };
  const [filterdRecord, setFilteredRecord] = useState<any[]>([]);

// const { data, isLoading, isSuccess } = useGetItemWithPackUom();
useEffect(() => {
  setFilteredRecord(data?.data?.Data?.Result);
}, [data]);
return (
  <>
    <AddItemCriteria data={data} setFilteredRecord={setFilteredRecord} />
    
      <Row justify="center" style={{ marginTop: 5 }}>
        <Col xxl={24}>
          {isSuccess && !isLoading ? (
           
              <Row gutter={[5, 8]} style={{marginLeft:5}}>
                {/* {map(data?.data?.Data?.Result, (item) => ( */}
                {map(filterdRecord, (item) => (
                  <Col xxl={8} style={{ textAlign: 'center' }}>
                    <Card
                      className="addItemCardStyle "
                      style={{ width: '100%', justifyContent: 'space-between' }}
                      cover={
                        <>
                          <Col xxl={24} style={{ position: 'relative' }}>
                            <div className="circle" style={{ marginTop: -9, marginRight: -10 }}>
                              <AntButton
                                onClick={() => handleAddItem(item)}
                                className="circle"
                                icon={<PlusOutlined />}
                              />
                            </div>
                          </Col>
                          <Col
                            style={{ display: 'flex', justifyContent: 'space-between', marginTop: 13, marginLeft: -10 }}
                          >
                            <Col style={{ textAlign: 'left', display: 'flex', justifyContent: 'start' }}>
                              <img src={ERPLogo} width={'90rem'} height={'135'} style={{ textAlign: 'left' }} />
                            </Col>
                            <Col style={{ display: 'flex', alignSelf: 'center' }}>
                              <Col style={{ textAlign: 'right' }}>
                                <h5 style={{ textAlign: 'right', width: '100%', paddingTop: 5, paddingLeft: 10 }}>
                                  {item.ItemName}
                                </h5>
                                <h4 style={{ color: 'green' }}>
                                  <span></span>
                                  {item.RateUom}
                                </h4>
                                <p style={{ color: 'red' }}>
                                  Price
                                  {item.ItemPrice}/{item.PackUom}
                                </p>
                              </Col>
                            </Col>
                          </Col>
                        </>
                      }
                    ></Card>
                  </Col>
                ))}
              </Row>
         
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
interface TAddItem {
  setSelectedItem: (ary: any[]) => void;
  selectedItem: any[];
}
