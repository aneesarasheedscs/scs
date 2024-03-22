import FormFile from './ItemForm';
import { isNumber, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import ItemType from './definitionScreens/ItemType';
import { Card, Col, Form, Input, Row, theme } from 'antd';
import ItemCategory from './definitionScreens/ItemCategory';
import { useGetItemById, useSaveItemCategory } from './querieSave';
import { SyncOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import { AntButton, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { getItemCategory, getItemClass, getItemCode, getItemType } from './queryOptions';
import { TPurchaseOrderEntry } from '@tradePro/pages/purchaseTrading/purchaseOrder/type';
import { TDefineItemData, TDefineItemDataOnAdd, TDefineItemDataonUpdate } from './types';

const { useToken } = theme;
const { useForm, useWatch } = Form;

function ItemFormtoSave() {
  const [form] = useForm<TDefineItemData>();
  const formValues = useWatch<TDefineItemData>([], form);
  const { data, isError, isLoading } = getItemCode();
  const { token } = useToken();
  const [selectedRecordId, setSelectedRecordId] = useState<number>();

  const { mutate, isSuccess } = useSaveItemCategory(selectedRecordId);
  const { data: ItemgetbyId, refetch, isSuccess: isSuccessById } = useGetItemById(selectedRecordId);

  const onFinish = (values: TDefineItemDataOnAdd | TDefineItemDataonUpdate) => {
    console.log(values);
    mutate(values);
    if (isNumber(selectedRecordId)) {
      mutate({ ...values });
    } else {
      mutate(values);
    }
  };
  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);

  const { t } = useTranslation();
  return (
    <>
      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row align="middle" justify="space-between">
            <Col>
              <Row gutter={10} align="middle"></Row>
            </Col>

            <Col>
              <Form.Item>
                <Row align="middle" gutter={10}>
                  <Col>
                    <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                  </Col>
                  <Col>
                    <AntButton label={t('save_and_add_more')} htmlType="submit" />
                  </Col>
                  <Col>
                    <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
          <Row align="middle" justify="space-between">
            <Card style={{ marginBottom: -5, width: '100%' }} className="antCard card-shadow">
              <Row style={{ width: '100%', height: 70 }} className="row">
                <Col xl={{ span: 10 }} xs={{ span: 10 }} className="column">
                  <Col xl={22} xs={24} sm={20}>
                    <AntSelectDynamic
                      required
                      fieldValue="Id"
                      label={t('item_category')}
                      className="select"
                      placeholder="Select item Category"
                      fieldLabel="CategoryDescription"
                      name="ItemCategory"
                      style={{
                        width: '100%',
                        background: '#ffff',
                      }}
                      query={getItemCategory}
                      onSelectChange={() =>
                        form.setFieldValue(
                          'ItemCode',
                          map(data?.data?.Data?.Result, (item) => item.ItemCode)
                        )
                      }
                    />
                  </Col>
                  <Form.Item style={{ marginTop: 25, marginRight: 0 }}>
                    <ItemCategory />
                  </Form.Item>
                </Col>
                <Col xl={{ span: 4 }} xs={{ span: 10 }} style={{ marginRight: 10 }}>
                  <AntInputNumber
                    label={t('code')}
                    name="ItemCode"
                    className="input"
                    style={{ width: '100%', border: '1px dashed blue' }}
                    readOnly
                  />
                </Col>
                <Col xl={{ span: 9 }} xs={{ span: 23 }} className="column">
                  <Col xl={23} xs={24} sm={20}>
                    <AntSelectDynamic
                      required
                      fieldValue="Id"
                      label={t('item_type')}
                      className="select"
                      placeholder="Select item Type"
                      fieldLabel="TypeDescription"
                      name="ItemType"
                      style={{
                        width: '100%',
                        background: '#ffff',
                      }}
                      query={getItemType}
                    />
                  </Col>
                  <Form.Item style={{ marginTop: 25, marginRight: 10 }}>
                    <ItemType></ItemType>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Row>
          <FormFile />
        </Form>
      </Card>
    </>
  );
}

export default ItemFormtoSave;
