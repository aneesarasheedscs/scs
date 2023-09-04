import { size } from 'lodash';
import { useState } from 'react';
import { Card, Col, Form, FormInstance, Row } from 'antd';
import { TDetailItem, TPurchaseOrderDetailEntry } from '../type';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetItemsWithBaseUom, useGetJobLot, useGetUomByItemId } from '../queryOptions';
import { AntButton, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';

const { useWatch } = Form;

const DynamicForm = ({ form }: TDynamicForm) => {
  const { setFields, getFieldValue } = form;
  const formValues = useWatch<TPurchaseOrderDetailEntry[]>('purchaseOrderDetailList', form);
  const initialValues = {
    UOMCode: '',
    Amount: null,
    JobLotId: null,
    NetWeight: null,
    OrderItemId: null,
    OrderItemQty: null,
    EquivalentRate: null,
  };
  const [rateUomEquivalent, setRateUomEquivalent] = useState<{ [key: number]: number }>({});

  const calculateWeight = (itemQty: number, equivalentRate: number) => itemQty * equivalentRate;
  const calculateAmount = (weight: number, rateUOM: number, itemRate: number) => {
    return (weight / rateUOM) * itemRate;
  };

  const handleItemChange = (obj: TDetailItem, index: number) => {
    setFields([
      { name: ['purchaseOrderDetailList', index, 'UOMCode'], value: obj?.UOMCode },
      { name: ['purchaseOrderDetailList', index, 'EquivalentRate'], value: obj?.Equivalent },
    ]);

    const itemQty = getFieldValue(['purchaseOrderDetailList', index, 'OrderItemQty']);
    if (itemQty && obj?.Equivalent) {
      const weight = calculateWeight(itemQty, obj?.Equivalent);
      setFields([{ name: ['purchaseOrderDetailList', index, 'NetWeight'], value: weight }]);
    } else {
      setFields([{ name: ['purchaseOrderDetailList', index, 'NetWeight'], value: null }]);
    }
  };

  const handleItemQtyChange = (itemQty: number | string | null, index: number) => {
    const equivalentRate = getFieldValue(['purchaseOrderDetailList', index, 'EquivalentRate']);

    if (itemQty && typeof itemQty === 'number' && equivalentRate) {
      const weight = calculateWeight(itemQty, equivalentRate);
      setFields([{ name: ['purchaseOrderDetailList', index, 'NetWeight'], value: weight }]);
    } else {
      setFields([{ name: ['purchaseOrderDetailList', index, 'NetWeight'], value: null }]);
    }
  };

  const handleRateUOMChange = (equivalentRate: number, index: number) => {
    const weight = getFieldValue(['purchaseOrderDetailList', index, 'NetWeight']);
    const itemRate = getFieldValue(['purchaseOrderDetailList', index, 'OrderItemRate']);

    if (itemRate && weight && equivalentRate) {
      const amount = calculateAmount(weight, equivalentRate, itemRate);
      setFields([{ name: ['purchaseOrderDetailList', index, 'Amount'], value: amount }]);

      setRateUomEquivalent({ ...rateUomEquivalent, [index]: equivalentRate });
    } else {
      setFields([{ name: ['purchaseOrderDetailList', index, 'Amount'], value: null }]);
    }
  };

  const handleItemRateChange = (itemRate: number | string | null, index: number) => {
    const weight = getFieldValue(['purchaseOrderDetailList', index, 'NetWeight']);
<<<<<<< HEAD
    const equivalentRate = getFieldValue(['purchaseOrderDetailList', index, 'EquivalentRate']);

    if (itemRate && typeof itemRate === 'number' && weight && equivalentRate) {
      const amount = calculateAmount(weight, equivalentRate, itemRate);
=======
    const rateUOM = rateUomEquivalent[index];

    if (itemRate && typeof itemRate === 'number' && weight && rateUOM) {
      const amount = calculateAmount(weight, rateUOM, itemRate);

>>>>>>> 1c8869badafe9ea530acb103fc424c290543e2b1
      setFields([{ name: ['purchaseOrderDetailList', index, 'Amount'], value: amount }]);
    } else {
      setFields([{ name: ['purchaseOrderDetailList', index, 'Amount'], value: null }]);
    }
  };

  return (
    <Card className="antCard card-shadow">
      <Form.List name="purchaseOrderDetailList" initialValue={[initialValues]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <div key={field.key} className="form-list-container">
                <Col span={7}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label="Item Name"
                    fieldLabel="ItemName"
                    query={useGetItemsWithBaseUom}
                    name={[field.name, 'OrderItemId']}
                    onSelectChange={(obj) => handleItemChange(obj, field.name)}
                  />
                </Col>

                <Col span={3}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label="Job Lot"
                    query={useGetJobLot}
                    fieldLabel="JobLotDescription"
                    name={[field.name, 'JobLotId']}
                  />
                </Col>

                <Col span={3}>
                  <AntInput readOnly label="Base UOM" formItemProps={{ ...field, name: [field.name, 'UOMCode'] }} />
                </Col>

                <Col span={3}>
                  <AntInputNumber
                    label="Item Qty"
                    onChange={(itemQty) => handleItemQtyChange(itemQty, field.name)}
                    formItemProps={{ ...field, name: [field.name, 'OrderItemQty'] }}
                  />
                </Col>

                <Col span={3}>
                  <AntInputNumber
                    readOnly
                    label="Weight"
                    formItemProps={{ ...field, name: [field.name, 'NetWeight'] }}
                  />
                </Col>

                <Col span={3}>
                  <AntInputNumber
                    label="Item Rate"
                    formItemProps={{ ...field, name: [field.name, 'OrderItemRate'] }}
                    onChange={(itemRate) => handleItemRateChange(itemRate, field.name)}
                  />
                </Col>

                <Col span={4}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label="Rate UOM"
                    fieldLabel="UOMCode"
<<<<<<< HEAD
                    // name={[field.name, 'Rate UOM']}
                    name={[field.name, 'RateUOM']}
                    onSelectChange={(obj) => handleRateUOMChange(obj?.Equivalent, field.name)}
=======
                    name={[field.name, 'RateUom']}
>>>>>>> 1c8869badafe9ea530acb103fc424c290543e2b1
                    query={useGetUomByItemId(formValues?.[field.name]?.OrderItemId)}
                    onSelectChange={(obj) => handleRateUOMChange(obj?.Equivalent, field.name)}
                  />
                </Col>

                <Col span={3}>
                  <AntInputNumber label="Amount" formItemProps={{ ...field, name: [field.name, 'Amount'] }} />
                </Col>

                <Col span={2}>
                  <Row>
                    <Col>
                      <AntButton
                        type="text"
                        onClick={() => add()}
                        icon={<PlusOutlined className="dynamic-add-button" />}
                      />
                    </Col>
                    <Col>
                      <AntButton
                        type="text"
                        icon={<MinusCircleOutlined className="dynamic-delete-button" />}
                        onClick={() => {
                          if (size(fields) > 1) remove(field.name);
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              </div>
            ))}
          </>
        )}
      </Form.List>
    </Card>
  );
};

type TDynamicForm = { form: FormInstance };

export default DynamicForm;
