import { isNumber } from 'lodash';
import { getItemType } from '../queryOptions';
import { useEffect, useState } from 'react';
import ItemTypeTable from './ItemType/index';
import { useTranslation } from 'react-i18next';
import { AddButtonforItems } from './AddButtonforItems';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Form, Row } from 'antd';
import { AntButton, AntInput, AntSelectDynamic } from '@tradePro/components';
import {
  TAddItemType,
  TAddItemTypeonUpdate,
  useAddItemType,
  useGetItemTypeById,
  useUpdateItemType,
} from './ItemType/querie';

const { useForm, useWatch } = Form;
interface Props {
  openItemType: any;
}
function ItemType({ openItemType }: Props) {
  const { t } = useTranslation();
  const [form] = useForm<TAddItemType>();
  const formValues = useWatch<TAddItemType>([], form);
  const [selectedRecordId, setSelectedRecordId] = useState<number | any>();
  const { mutate: addItemType } = useAddItemType();
  const { mutate: updateItemType, isSuccess } = useUpdateItemType(selectedRecordId);
  const { data, refetch, isSuccess: isSuccessById } = useGetItemTypeById(selectedRecordId);

  const handleFinish = (values: TAddItemType | TAddItemTypeonUpdate) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      updateItemType(values);
    } else {
      addItemType(values);
    }
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isSuccessById) {
      form.setFieldsValue(data?.data?.Data?.Result);
    }
  }, [isSuccessById]);
  const handleResetForm = () => {
    setSelectedRecordId(null);
  };
  return (
    <>
      <h4>
        {openItemType ? (
          <>
            {t('definitions')}
            <Divider></Divider>
          </>
        ) : (
          ''
        )}
      </h4>
      <Card>
        <h2 style={{ marginBottom: 20 }}> {t('item_type')}</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ remember: true }}
          style={{ width: '100%' }}
        >
          <Row gutter={[10, 10]}>
            {openItemType ? (
              <>
                <Col xs={24} sm={24} md={6} xl={5} xxl={5}>
                  <AntInput name="TypeCode" label={t('code')} />
                </Col>
                <Col xs={24} sm={24} md={8} xl={5} xxl={6}>
                  <AntInput name="TypeDescription" label={t('item_description')} />
                </Col>
                <Col xs={24} sm={24} md={7} xl={6} xxl={6}>
                  <AntSelectDynamic
                    fieldValue="Id"
                    name="TypeDescription"
                    label={t('item_type')}
                    fieldLabel="TypeDescription"
                    query={getItemType}
                  />
                </Col>
              </>
            ) : (
              <>
                <Col xs={24} sm={24} md={6} xl={5} xxl={4}>
                  <AntInput name="TypeCode" label={t('code')} />
                </Col>
                <Col xs={24} sm={24} md={8} xl={5} xxl={5}>
                  <AntInput name="TypeDescription" label={t('item_description')} />
                </Col>
                <Col xs={24} sm={24} md={7} xl={6} xxl={5}>
                  <AntSelectDynamic
                    fieldValue="Id"
                    name="TypeDescription"
                    label={t('item_type')}
                    fieldLabel="TypeDescription"
                    query={getItemType}
                  />
                </Col>
              </>
            )}

            <Col xs={24} sm={24} md={10} xl={7} xxl={7} style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Item>
                {openItemType ? (
                  <>
                    <Row gutter={[10, 10]} style={{ marginTop: '7%' }}>
                      <Col>
                        <AntButton
                          danger
                          ghost
                          htmlType="reset"
                          label={t('reset')}
                          onClick={handleResetForm}
                          icon={<SyncOutlined />}
                        />
                      </Col>
                      <>
                        <Col>
                          <AntButton label={t('save_and_more')} htmlType="submit" />
                        </Col>
                      </>
                      <Col>
                        <AntButton
                          ghost
                          label={isNumber(selectedRecordId) ? t('update') : t('save')}
                          htmlType="submit"
                          icon={<SaveOutlined />}
                        />
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <Row gutter={[10, 10]} style={{ marginTop: '12%' }}>
                      <Col>
                        <AntButton
                          danger
                          ghost
                          htmlType="reset"
                          onClick={handleResetForm}
                          label={t('reset')}
                          icon={<SyncOutlined />}
                        />
                      </Col>

                      <Col>
                        <AntButton
                          ghost
                          label={isNumber(selectedRecordId) ? t('update') : t('save')}
                          htmlType="submit"
                          icon={<SaveOutlined />}
                        />
                      </Col>
                    </Row>
                  </>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <ItemTypeTable
          openItemType={openItemType}
          selectedRecordId={selectedRecordId}
          setSelectedRecordId={setSelectedRecordId}
        />
      </Card>
    </>
  );
}

export default ItemType;
