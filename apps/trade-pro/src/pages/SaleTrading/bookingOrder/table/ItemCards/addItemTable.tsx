import { Card, Col, InputNumber, Row } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons';
import { AntButton } from '@tradePro/components';
import ItemEntryForm from './itemEntryForm';
import _, { map } from 'lodash';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

const AddItemTable = ({ setSelectedItem, selectedItem }: TAddItem) => {
  const [showUnVoidItem, setShowUnVoidItm] = useState<boolean>(false);
  const [showVoidItem, setShowVoidItm] = useState<boolean>(true);

  const handleUnVoidItem = () => {
    setShowUnVoidItm(true);
  };
  const handleVoidItem = (ItemId: number) => {
    const updatedSelectedItem = selectedItem.filter((item) => item.ItemId !== ItemId);
    setSelectedItem(updatedSelectedItem);
  };

  const handleRemoveUnvoid = () => {
    setShowUnVoidItm(false);
  };

  // Function to handle increment

  const handleIncrement = (index: number) => {
    const updatedRecord = [...selectedItem]; // Create a copy of selectedItem array
    if (updatedRecord[index].OrderItemQty) {
      // Ensure the quantity is greater than 0
      updatedRecord[index].OrderItemQty++; // Decrement the quantity of the item at the specified index
      updatedRecord[index].Amount = updatedRecord[index].OrderItemQty * updatedRecord[index].ItemPrice; // Recalculate the amount
      updatedRecord[index].TotalAmount = updatedRecord[index].Amount; // Update the total amount if needed
      setSelectedItem(updatedRecord); // Update the state with the modified record
    }
  };

  // Function to handle decrement

  const handleDecrement = (index: number) => {
    const updatedRecord = [...selectedItem]; // Create a copy of selectedItem array
    if (updatedRecord[index].OrderItemQty) {
      // Ensure the quantity is greater than 0
      updatedRecord[index].OrderItemQty--; // Decrement the quantity of the item at the specified index
      updatedRecord[index].Amount = updatedRecord[index].OrderItemQty * updatedRecord[index].ItemPrice; // Recalculate the amount
      updatedRecord[index].TotalAmount = updatedRecord[index].Amount; // Update the total amount if needed
      setSelectedItem(updatedRecord); // Update the state with the modified record
    }
  };
  const handdleQty = (value: number, index: number) => {
    const updatedRecord = selectedItem?.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          OrderItemQty: value,
          Amount: value * item.ItemPrice,
          TotalAmount: value * item.ItemPrice,
        };
      } else {
        return item; // Return unchanged item for other indices
      }
    });
    setSelectedItem(updatedRecord);
  };

  return (
    <>
      <div>
        <Row justify={'space-between'} style={{ border: '1px solid grey', padding: 0 }}>
          <Col xxl={24} lg={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col>
              <ItemEntryForm setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
            </Col>
          </Col>
        </Row>

        {showUnVoidItem ? (
          <>
            {map(selectedItem, (item) => (
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

        {showVoidItem ? (
          <>
            {map(selectedItem, (item, index) => (
              <>
                <Row justify={'space-between'} style={{ padding: 4 }}>
                  <Col xxl={14} lg={14} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Col>
                      <p style={{ color: '' }}>
                        {item.ItemName} <b style={{ marginLeft: 0 }}></b>
                        <span style={{ marginLeft: 10 }}>Price:</span>
                        <span style={{ color: 'red', marginLeft: 10 }}>
                          {item.ItemPrice}/{item.RateUom}
                        </span>
                      </p>
                    </Col>
                  </Col>

                  <Col>
                    <AntButton
                      label="Void"
                      icon={<CloseOutlined onClick={() => handleVoidItem(item.ItemId)} />}
                      style={{ background: 'crimson' }}
                    />
                  </Col>
                </Row>

                <Row
                  justify={'space-between'}
                  style={{
                    border: '1px solid grey',
                    borderRight: 'none',
                    borderLeft: 'none',
                    padding: 3,
                  }}
                >
                  <Col xxl={14} lg={14} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Row justify={'space-between'} style={{ padding: 0 }}>
                      <Col>
                        <h5>
                          Qty:{' '}
                          <span
                            style={{
                              padding: 4,
                              color: 'red',
                            }}
                          >
                            <MinusOutlined style={{ marginTop: 6 }} onClick={() => handleDecrement(index)} />
                          </span>
                        </h5>
                      </Col>
                      <Col
                        xxl={11}
                        style={{ borderLeft: '1px solid', borderRight: '1px solid', marginTop: -2, marginLeft: -10 }}
                      >
                        <InputNumber
                          bordered={false}
                          style={{}}
                          value={item.OrderItemQty}
                          onChange={(value) => handdleQty(value, index)}
                        />
                      </Col>
                      <Col>
                        <h5 style={{}}>
                          <span
                            style={{
                              padding: 4,
                              color: 'green',
                            }}
                          >
                            <PlusOutlined style={{ marginTop: 6 }} onClick={() => handleIncrement(index)} />
                          </span>
                        </h5>
                      </Col>
                    </Row>
                  </Col>
                  <Col style={{ display: 'flex', justifyContent: 'end', padding: 0 }}>
                    <Row gutter={[10, 16]}>
                      <Col>
                        <h3>{numberFormatter(item.Amount)}</h3>
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
      </div>
    </>
  );
};
export default AddItemTable;
interface TAddItem {
  setSelectedItem: (ary: any[]) => void;
  selectedItem: any[];
}
