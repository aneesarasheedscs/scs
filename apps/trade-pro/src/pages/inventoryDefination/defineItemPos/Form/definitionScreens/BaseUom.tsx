import { isNumber } from 'lodash';

import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { TItemTypeData, TItemTypeDataonUpdate } from './types';

import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { Card, Checkbox, Col, DatePicker, Divider, Form, Row, Table, Typography } from 'antd';
import { AntButton, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import ItemUOMTable from './ItemUOM';
import { TBaseUOM, TBaseUOMonUpdate, useGetItemUOMById, useGetUOMAdd, useGetUOMUpdate } from './ItemUOM/queries';

const { useForm, useWatch } = Form;
interface Props {
  open: any;
}
function ItemBaseUOM({ open }: Props) {
  const { t } = useTranslation();
  const [form] = useForm<TBaseUOM>();
  const [selectedRecordId, setSelectedRecordId] = useState<number | any>();

  const { mutate: addUOM } = useGetUOMAdd();
  const { mutate: updateItemUOM, isLoading, isSuccess } = useGetUOMUpdate(selectedRecordId);
  const { data, refetch, isSuccess: isDataSuccess, isLoading: isDataLoading } = useGetItemUOMById(selectedRecordId);

  const formValues = useWatch<TItemTypeData>([], form);

  const handleFinish = (values: TBaseUOM | TBaseUOMonUpdate) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      updateItemUOM(values);
    } else {
      addUOM(values);
    }
  };
  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldsValue(data?.data?.Data?.Result);
    }
  }, [isDataSuccess]);
  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };
  const handleResetForm = () => {
    setSelectedRecordId(null);
  };
  return (
    <>
      <h4>
        {' '}
        {open ? (
          <>
            {t('definitions')}
            <Divider></Divider>
          </>
        ) : (
          ''
        )}
      </h4>
      <Card>
        <h2 style={{ marginBottom: 20 }}> {t('item_uom')} </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ remember: true }}
          style={{ width: '100%' }}
        >
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={24} md={6}>
              <AntInput name="UOMCode" label={t('code')} />
            </Col>
            <Col xs={24} sm={24} md={6}>
              <AntInput name="Equivalent" label={t('equivalent')} />
            </Col>

            <Col xs={24} sm={24} md={3} lg={3} xxl={2}>
              <Row style={{ marginTop: 25 }} justify={'start'}>
                <Row style={{ marginLeft: 10 }}>
                  <Form.Item name="UOMStatus" valuePropName="checked" initialValue={false}>
                    <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'UOMStatus')}>
                      {t('status')}
                    </Checkbox>
                  </Form.Item>
                </Row>
              </Row>
            </Col>

            <Col xs={24} sm={24} md={8} lg={8} xxl={8} style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Item>
                <Row align="middle" gutter={10} style={{ marginTop: '6%' }}>
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
                  {open ? (
                    <>
                      <Col>
                        <AntButton label={t('save_and_more')} htmlType="submit" />
                      </Col>
                    </>
                  ) : (
                    ''
                  )}
                  <Col>
                    <AntButton
                      ghost
                      label={isNumber(selectedRecordId) ? t('update') : t('save')}
                      htmlType="submit"
                      icon={<SaveOutlined />}
                    />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <ItemUOMTable open={open} selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} />
      </Card>
    </>
  );
}

export default ItemBaseUOM;
