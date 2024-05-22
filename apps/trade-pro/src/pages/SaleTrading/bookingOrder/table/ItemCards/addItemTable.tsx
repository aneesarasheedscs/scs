import { Card, Col, Row } from 'antd';
import React from 'react';
import { PlusOutlined, FullscreenOutlined, CloseOutlined, MinusOutlined, SyncOutlined } from '@ant-design/icons';
import { AntButton } from '@tradePro/components';
import ItemEntryForm from './itemEntryForm';
import _, { map } from 'lodash';
const AddItemTable = ({ selectedItem }: TAddItem) => {
  //ary ki lenth obj ki ni
  const TotalItems = selectedItem?.length;

  return (
    <>
      <div>
        <Row justify={'space-between'} style={{ border: '1px solid ', padding: 4 }}>
          <Col xxl={24} lg={14} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col>
              <ItemEntryForm />
            </Col>
          </Col>
        </Row>
        <Row justify={'space-between'} style={{ border: '1px solid ', padding: 4 }}>
          <Col xxl={11} lg={14} style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <Col>
              <h5>
                Qty: <span style={{ background: 'lightgrey', borderRadius: 10, padding: 3 }}>24343</span>
              </h5>
            </Col>
            <Col>
              <h5>
                Item: <span style={{ background: 'lightgrey', borderRadius: 10, padding: 3 }}>{TotalItems}</span>
              </h5>
            </Col>
            <Col>
              <h5>
                Discount: <span style={{ background: 'lightgrey', borderRadius: 10, padding: 3 }}>000.0</span>
              </h5>
            </Col>
            <Col>
              <h5>
                Total: <span style={{ background: 'lightgrey', borderRadius: 10, padding: 3 }}>24343</span>
              </h5>
            </Col>
          </Col>
          <Col style={{ display: 'flex', justifyContent: 'end', padding: 0, color: 'green' }}>
            <Row gutter={[10, 16]}>
              <Col>
                <AntButton icon={<SyncOutlined />} />
              </Col>
              <Col>
                <AntButton icon={<FullscreenOutlined />} />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row justify={'space-between'} style={{ border: '1px solid ', padding: 4 }}>
          <Col xxl={14} lg={14} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col>
              <p style={{ color: '', textDecoration: 'line-through' }}>{selectedItem?.ItemName}</p>
              <Col xxl={10} lg={6} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ color: '', textDecoration: 'line-through' }}>Price: </p>
                <Col>
                  <span style={{ color: 'red', textDecoration: 'line-through', marginLeft: 10 }}>
                    {selectedItem?.ItemPrice}
                  </span>
                </Col>
              </Col>
            </Col>
          </Col>
          {/* <Col style={{display:'flex',justifyContent:'end',padding:0,color:'green'}}>
    <Row gutter={[10,16]}> */}
          <Col>
            <AntButton label="Unvoid" icon={<CloseOutlined />} style={{ background: 'green' }} />
          </Col>
          {/* <Col><FullscreenOutlined /></Col> */}
          {/* </Row>
     </Col> */}
        </Row>

        <Row justify={'space-between'} style={{ border: '1px solid ', padding: 4 }}>
          <Col xxl={14} lg={14} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Row justify={'space-between'}>
              <Col>
                <h5>
                  Qty:{' '}
                  <span
                    style={{ borderLeft: '1px solid grey', borderRight: '1px solid grey', padding: 3, color: 'red' }}
                  >
                    <MinusOutlined />
                  </span>
                </h5>
              </Col>

              <Col>
                <h5 style={{ textDecoration: 'line-through' }}>
                  2{' '}
                  <span
                    style={{ padding: 3, borderLeft: '1px solid grey', borderRight: '1px solid grey', color: 'green' }}
                  >
                    <PlusOutlined />
                  </span>
                </h5>
              </Col>
            </Row>
          </Col>
          <Col style={{ display: 'flex', justifyContent: 'end', padding: 0 }}>
            <Row gutter={[10, 16]}>
              <Col>
                <h3>28.000</h3>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* <Row justify={'space-between'} style={{ border: '1px solid ', padding: 4 }}>
        <Col xxl={14} lg={14} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Col>
            <p style={{ color: '' }}>{selectedItem?.ItemName}</p>
            <Col xxl={6} lg={6} style={{display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ color: '' }}>Price: </p>
              <Col>
                <span style={{ color: 'red',marginLeft:10 }}>{selectedItem?.ItemPrice}</span>
              </Col>
            </Col>
          </Col>
        </Col>

        <Col>
          <AntButton label="Void" icon={<CloseOutlined />} style={{ background: 'crimson' }} />
        </Col>
      </Row>

      <Row justify={'space-between'} style={{ border: '1px solid ', padding: 4 }}>
        <Col xxl={14} lg={14} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Row justify={'space-between'}>
            <Col>
              <h5>
                Qty:{' '}
                <span style={{ borderLeft: '1px solid grey', borderRight: '1px solid grey', padding: 4, color: 'red' }}>
                  <MinusOutlined />
                </span>
              </h5>
            </Col>

            <Col>
              <h5 style={{  }}>
                4{' '}
                <span
                  style={{ padding: 4, borderLeft: '1px solid grey', borderRight: '1px solid grey', color: 'green' }}
                >
                  <PlusOutlined />
                </span>
              </h5>
            </Col>
          </Row>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'end', padding: 0 }}>
          <Row gutter={[10, 16]}>
            <Col>
              <h3>28.000</h3>
            </Col>
          </Row>
        </Col>
      </Row> */}
        {map(selectedItem, (item) => (
          <>
            <Row justify={'space-between'} style={{ border: '1px solid ', padding: 4 }}>
              <Col xxl={14} lg={14} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Col>
                  <p style={{ color: '' }}>{item.ItemName}</p>
                  <Col xxl={6} lg={6} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ color: '' }}>Price: </p>
                    <Col>
                      <span style={{ color: 'red', marginLeft: 10 }}>{item.ItemPrice}</span>
                    </Col>
                  </Col>
                </Col>
              </Col>

              <Col>
                <AntButton label="Void" icon={<CloseOutlined />} style={{ background: 'crimson' }} />
              </Col>
            </Row>

            <Row justify={'space-between'} style={{ border: '1px solid ', padding: 4 }}>
              <Col xxl={14} lg={14} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Row justify={'space-between'}>
                  <Col>
                    <h5>
                      Qty:{' '}
                      <span
                        style={{
                          borderLeft: '1px solid grey',
                          borderRight: '1px solid grey',
                          padding: 4,
                          color: 'red',
                        }}
                      >
                        <MinusOutlined />
                      </span>
                    </h5>
                  </Col>

                  <Col>
                    <h5 style={{}}>
                      4{' '}
                      <span
                        style={{
                          padding: 4,
                          borderLeft: '1px solid grey',
                          borderRight: '1px solid grey',
                          color: 'green',
                        }}
                      >
                        <PlusOutlined />
                      </span>
                    </h5>
                  </Col>
                </Row>
              </Col>
              <Col style={{ display: 'flex', justifyContent: 'end', padding: 0 }}>
                <Row gutter={[10, 16]}>
                  <Col>
                    <h3>28.000</h3>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        ))}
      </div>
    </>
  );
};
export default AddItemTable;
interface TAddItem {
  selectedItem: any;
}
