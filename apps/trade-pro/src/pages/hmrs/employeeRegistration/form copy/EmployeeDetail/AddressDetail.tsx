// import React from 'react'

// function AddressDetail() {
//   return (
//     <div>AddressDetail</div>
//   )
// }

// export default AddressDetail

import { size } from 'lodash';
import { useEffect, useState } from 'react';
import { Card, Col, Form, FormInstance, Row } from 'antd';
// import { TDetailItem, TDetailItemBaseUom, TPurchaseOrderDetailEntry } from '../type';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import { useGetItemsWithBaseUom, useGetJobLot, useGetUomByItemId } from '../queryOptions';
import { AntButton, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useTranslation } from 'react-i18next';

const { useWatch } = Form;

const AddressDetailForm = ({ form }: TDynamicForm) => {
  const { t } = useTranslation();
  const { setFields, getFieldValue } = form;
  const formValues = useWatch<any[]>('purchaseOrderDetailList', form);
  const initialValues = {
    Id: null,
    UOMCode: '',
    Amount: null,
    JobLotId: null,
    NetWeight: null,
    OrderItemId: null,
    OrderItemQty: null,
    ItemUomId: null,
    EquivalentRate: null,
    ActionTypeId: null,
    OrderItemRateUOMId: null,
  };
  const [rateUomEquivalent, setRateUomEquivalent] = useState<{ [key: number]: number }>({});
  const [rateUOMData, setRateUOMData] = useState<{ [itemId: number]: number }>({});
  const calculateWeight = (itemQty: number, equivalentRate: number) => itemQty * equivalentRate;
  const calculateAmount = (weight: number, rateUOM: number, itemRate: number) => {
    return (weight / rateUOM) * itemRate;
  };

  const handleItemChange = (obj: any, index: number) => {
    setFields([
      { name: ['purchaseOrderDetailList', index, 'UOMCode'], value: obj?.UOMCode },
      { name: ['purchaseOrderDetailList', index, 'EquivalentRate'], value: obj?.Equivalent },
      { name: ['purchaseOrderDetailList', index, 'OrderItemUOMId'], value: obj?.ItemUomId },
      { name: ['purchaseOrderDetailList', index, 'ActionTypeId'], value: 1 },
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

  const handleRateUOMChange = (equivalentRate: number, id: number, index: number) => {
    const weight = getFieldValue(['purchaseOrderDetailList', index, 'NetWeight']);
    const itemRate = getFieldValue(['purchaseOrderDetailList', index, 'OrderItemRate']);

    if (itemRate && weight && equivalentRate && id) {
      const amount = calculateAmount(weight, equivalentRate, itemRate);
      setFields([{ name: ['purchaseOrderDetailList', index, 'Amount'], value: amount }]);
      setFields([{ name: ['purchaseOrderDetailList', index, 'OrderItemRateUOMId'], value: id }]);

      setRateUomEquivalent({ ...rateUomEquivalent, [index]: equivalentRate });
    } else {
      setFields([{ name: ['purchaseOrderDetailList', index, 'Amount'], value: null }]);
    }
  };

  const handleItemRateChange = (itemRate: number | string | null, index: number) => {
    const weight = getFieldValue(['purchaseOrderDetailList', index, 'NetWeight']);
    const rateUOM = rateUomEquivalent[index];

    if (itemRate && typeof itemRate === 'number' && weight && rateUOM) {
      const amount = calculateAmount(weight, rateUOM, itemRate);

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
                <Col xl={6} lg={7} sm={10} xs={14}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label="Address Type"
                    fieldLabel="ItemName"
                    // query={useGetItemsWithBaseUom}
                    name={[field.name, 'OrderItemId']}
                    onSelectChange={(obj) => handleItemChange(obj, field.name)}
                  />
                </Col>

                <Col xl={6} lg={4} sm={5} xs={9}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label="Country"
                    // query={useGetJobLot}
                    fieldLabel="JobLotDescription"
                    name={[field.name, 'JobLotId']}
                  />
                </Col>
                <Col xl={6} lg={4} sm={5} xs={9}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label="Province"
                    // query={useGetJobLot}
                    fieldLabel="JobLotDescription"
                    name={[field.name, 'JobLotId']}
                  />
                </Col>
                <Col xl={6} lg={4} sm={5} xs={9}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label="City Name"
                    // query={useGetJobLot}
                    fieldLabel="JobLotDescription"
                    name={[field.name, 'JobLotId']}
                  />
                </Col>

                <Col xl={20}>
                  <AntInput
                    required
                    readOnly
                    label={'Address Detail'}
                    formItemProps={{ ...field, name: [field.name, 'UOMCode'] }}
                  />
                </Col>

                <Col xl={2} lg={2}>
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

export default AddressDetailForm;
