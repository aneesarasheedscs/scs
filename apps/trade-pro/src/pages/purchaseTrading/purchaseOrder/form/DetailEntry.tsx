import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col, Card } from 'antd';

const { Option } = Select;

const DynamicForm = () => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState([
    { item: 'item1', weight: '', unitPrice: '', totalPrice: '' },
  ]);

  useEffect(() => {
    form.setFieldsValue({ items: initialValues });
  }, []);

  return (
    <Card className="antCard card-shadow">
      <Form.List name="items" initialValue={initialValues}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Row key={field.key} gutter={16}>
                <Col span={6}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'item']}
                    rules={[{ required: true, message: 'Item is required' }]}
                  >
                    <Select placeholder="Select item">
                      <Option value="item1">Item 1</Option>
                      <Option value="item2">Item 2</Option>
                      {/* Add more options as needed */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'weight']}
                    rules={[{ required: true, message: 'Weight is required' }]}
                  >
                    <Input type="number" placeholder="Weight" />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'unitPrice']}
                    rules={[{ required: true, message: 'Unit price is required' }]}
                  >
                    <Input type="number" placeholder="Unit Price" />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item {...field} name={[field.name, 'totalPrice']}>
                    <Input type="number" placeholder="Total Price" disabled />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Button onClick={() => remove(field.name)}>Remove</Button>
                </Col>
              </Row>
            ))}
          </>
        )}
      </Form.List>
    </Card>
  );
};

export default DynamicForm;
