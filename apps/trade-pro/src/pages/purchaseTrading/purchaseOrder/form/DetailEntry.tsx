import { size } from 'lodash';
import { useEffect, useState } from 'react';
import { Card, Col, Form, FormInstance, Row } from 'antd';
import { TDetailItem, TDetailItemBaseUom, TPurchaseOrderDetailEntry } from '../type';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetItemsWithBaseUom, useGetJobLot, useGetUomByItemId } from '../queryOptions';
import { AntButton, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useTranslation } from 'react-i18next';

const { useWatch } = Form;

const DynamicForm = ({ form }: TDynamicForm) => {
  const { t } = useTranslation();
  const { setFields, getFieldValue } = form;
  const formValues = useWatch<TPurchaseOrderDetailEntry[]>('purchaseOrderDetailList', form);
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

  const handleItemChange = (obj: TDetailItem, index: number) => {
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
    <Card style={{ paddingBottom: '0.5%', boxShadow: '2px 4px 12px 1px gray' }}>
      <Form.List name="purchaseOrderDetailList" initialValue={[initialValues]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Row justify={'space-between'} key={field.key}>
                <Col xl={5} lg={7} sm={10} xs={14} className="formfield">
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label={t('item_name')}
                    fieldLabel="ItemName"
                    query={useGetItemsWithBaseUom}
                    name={[field.name, 'OrderItemId']}
                    onSelectChange={(obj) => handleItemChange(obj, field.name)}
                    bordered={false}
                  />
                </Col>

                <Col xl={3} lg={4} sm={5} xs={9} className="formfield">
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label={t('job_lot')}
                    query={useGetJobLot}
                    fieldLabel="JobLotDescription"
                    name={[field.name, 'JobLotId']}
                    bordered={false}
                  />
                </Col>

                <Col xl={3} className="formfield">
                  <AntInput
                    required
                    readOnly
                    label={t('pack_uom')}
                    formItemProps={{ ...field, name: [field.name, 'UOMCode'] }}
                    bordered={false}
                  />
                </Col>

                <Col xl={3} className="formfield">
                  <AntInputNumber
                    required
                    label={t('item_quantity')}
                    onChange={(itemQty) => handleItemQtyChange(itemQty, field.name)}
                    formItemProps={{ ...field, name: [field.name, 'OrderItemQty'] }}
                    bordered={false}
                  />
                </Col>

                <Col xl={3} className="formfield">
                  <AntInputNumber
                    required
                    readOnly
                    label={t('weight')}
                    formItemProps={{ ...field, name: [field.name, 'NetWeight'] }}
                    bordered={false}
                  />
                </Col>

                <Col xl={3} className="formfield">
                  <AntInputNumber
                    required
                    label={t('item_rate')}
                    formItemProps={{ ...field, name: [field.name, 'OrderItemRate'] }}
                    onChange={(itemRate) => handleItemRateChange(itemRate, field.name)}
                    bordered={false}
                  />
                </Col>

                <Col xl={3} lg={3} sm={5} xs={7} className="formfield">
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label={t('rate_uom')}
                    fieldLabel="UOMCode"
                    name={[field.name, 'RateUom']}
                    bordered={false}
                    query={useGetUomByItemId(formValues?.[field.name]?.OrderItemId)}
                    onSelectChange={(obj) => handleRateUOMChange(obj?.Equivalent, obj?.Id, field.name)}
                  />
                </Col>

                <Col xl={3} className="formfield">
                  <AntInputNumber
                    required
                    label={t('amount')}
                    formItemProps={{ ...field, name: [field.name, 'Amount'] }}
                    bordered={false}
                  />
                </Col>

                <Col xl={20} lg={2}>
                  <Row style={{ marginTop: 10 }}>
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
              </Row>
            ))}
          </>
        )}
      </Form.List>
    </Card>
  );
};

type TDynamicForm = { form: FormInstance };

export default DynamicForm;
