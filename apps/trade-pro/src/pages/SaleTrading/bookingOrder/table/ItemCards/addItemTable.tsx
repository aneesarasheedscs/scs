import { Card, Col, InputNumber, Row } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined, FullscreenOutlined, CloseOutlined, MinusOutlined, SyncOutlined } from '@ant-design/icons';
import { AntButton } from '@tradePro/components';
import ItemEntryForm from './itemEntryForm';
import _, { map } from 'lodash';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
const AddItemTable = ({ setSelectedItem,selectedItem }: TAddItem) => {
  const [showUnVoidItem, setShowUnVoidItm] = useState<boolean>(false);
  const [showVoidItem, setShowVoidItm] = useState<boolean>(true);

  //ary ki lenth obj ki ni
  const TotalItems = selectedItem?.length;
  const handleUnVoidItem = () => {
    setShowUnVoidItm(true);
  };
  const handleVoidItem = (ItemId:number) => {
    // if(selectedItem?.length ===1 && selectedItem?.length > 1 ){
  

      const updatedSelectedItem = selectedItem.filter(item => item.ItemId !== ItemId);
      setSelectedItem(updatedSelectedItem);
    // }
  };

  const handleRemoveUnvoid = () => {
    setShowUnVoidItm(false);
  };



    const [quantity, setQuantity] = useState(0); // Initialize quantity state

  // Function to handle increment
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle decrement
  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
 

  const handdleQty =(value:any)=>{
    // console.log(value,'value')
    setQuantity(value)
  }

  return (
    <>
      <div>
        <Row justify={'space-between'} style={{ border: '1px solid ', padding: 4 }}>
          <Col xxl={24} lg={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col>
              <ItemEntryForm setSelectedItem={setSelectedItem} selectedItem={selectedItem}/>
            </Col>
          </Col>
        </Row>
        {/* <Row justify={'space-between'} style={{ border: '1px solid ', padding: 4 }}>
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
        </Row> */}

        {showUnVoidItem ? (
          <>
        {map(selectedItem,(item)=>(
          <>
              <Row justify={'space-between'} style={{ border: '1px solid ', padding: 4 }}>
              <Col xxl={14} lg={14} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Col>
                  <p style={{ color: '', textDecoration: 'line-through' }}>{item.ItemName}</p>
                  <Col xxl={10} lg={6} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ color: '', textDecoration: 'line-through' }}>Price: </p>
                    <Col>
                      <span style={{ color: 'red', textDecoration: 'line-through', marginLeft: 10 }}>
                        {item.ItemPrice}
                      </span>
                    </Col>
                  </Col>
                </Col>
              </Col>

              <Col>
                <AntButton
                  label="Unvoid"
                  icon={<CloseOutlined onClick={() => handleRemoveUnvoid()} />}
                  style={{ background: 'green' }}
                />
              </Col>
            </Row>

            <Row justify={'space-between'} style={{ padding: 4 }}>
              <Col xxl={14} lg={14} md={14} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Row justify={'space-between'}>
                  <Col>
                    <h5>
                      Qty:{' '}
                      <span
                        style={{
                          borderLeft: '1px solid grey',
                          borderRight: '1px solid grey',
                          padding: 3,
                          color: 'red',
                        }}
                      >
                        <MinusOutlined />
                      </span>
                    </h5>
                  </Col>

                  <Col>
                    <h5 style={{ textDecoration: 'line-through' }}>
                      2{' '}
                      <span
                        style={{
                          padding: 3,
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
          </>
        ) : (
          ''
        )}


  {showVoidItem?(
  <>
   
        {map(selectedItem, (item) => (
          <>
            <Row justify={'space-between'} style={{  padding: 4 }}>
              <Col xxl={14} lg={14} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Col>
                  <p style={{ color: '' }}>{item.ItemName} <b style={{marginLeft:0}}></b>
                  <span style={{marginLeft:10}}>Price:</span>
                  <span style={{ color: 'red', marginLeft: 10 }}>{item.ItemPrice}/{item.RateUom}</span>
                   </p>
          
                </Col>
              </Col>

              <Col>
                <AntButton
                  label="Void"
                  // icon={<CloseOutlined onClick={() => handleUnVoidItem()} />}
                  icon={<CloseOutlined onClick={() => handleVoidItem(item.ItemId)} />}
                  style={{ background: 'crimson' }}
                />
              </Col>
            </Row>

            <Row justify={'space-between'} style={{ border: '1px solid ',borderTop:'none',borderLeft:'none',borderRight:'none' , padding: 1 }}>
              <Col xxl={14} lg={14} style={{ display: 'flex', justifyContent: 'space-between', }}>
                <Row justify={'space-between'}>
                  <Col >
                    <h5>
                      Qty:{' '}
                      <span
                        style={{
                          // borderLeft: '1px solid grey',
                          // borderRight: '1px solid grey',
                          padding: 4,
                          color: 'red',
                        
                        }}
                      >
                        <MinusOutlined   onClick={handleDecrement} />
                      </span>
                    </h5> 
                  </Col>
                 <Col xxl={11} style={{borderLeft:'1px solid',borderRight:'1px solid', marginTop:-5,marginLeft:-10}}> 
                 <InputNumber bordered={false} style={{}}  value={item.OrderItemQty} onChange={(value)=> handdleQty(value)} />
                 </Col>
                  <Col>
                    <h5 style={{}}>
          
                      <span
                        style={{
                          // borderLeft: '1px solid grey',
                          // borderRight: '1px solid grey',
                          padding: 4,
                          color: 'green',
                        }}

                      >
                        <PlusOutlined  onClick={handleIncrement}/>
                      </span>
                    </h5>
                  </Col>
                </Row>
              </Col>
              <Col style={{ display: 'flex', justifyContent: 'end', padding: 0 }}>
                <Row gutter={[10, 16]}>
                  <Col>
                    <h3>{numberFormatter(item.ItemPrice*quantity)}</h3>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        ))}
   
  </>):''}
      </div>
    </>
  );
};
export default AddItemTable;
interface TAddItem {
  setSelectedItem : (ary: any[])=> void
  selectedItem: any[];
}
