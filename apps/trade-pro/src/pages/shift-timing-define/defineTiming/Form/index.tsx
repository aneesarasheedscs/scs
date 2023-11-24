import FormFile from './DutyTiming';
import { isNumber, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import ItemType from './definitionScreens/ItemType';
import { Card, Checkbox, Col, Form, Input, Row, theme } from 'antd';
import ItemCategory from './definitionScreens/ItemCategory';
import { useGetItemById, useSaveItemCategory, useUpdateItemCategory } from './querieSave';
import { SyncOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import { AntButton, AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { getItemCategory, getItemClass, getItemCode, getItemType } from './queryOptions';
import LocationForm from './location/index';

import { TDefineItemDataOnSave, TItemCode } from './types';
import DutyTiming from './DutyTiming';
import InTiming from './definitionScreens/InTiming';
import ShiftLookUpForm from './shiftLookUpForm';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

const { useToken } = theme;
const { useForm, useWatch } = Form;

function MainForm({ selectedRecordId }: any) {
  const [form] = useForm<TDefineItemDataOnSave>();
  const formValues = useWatch<TDefineItemDataOnSave>([], form);
  const { data, isError, isLoading } = getItemCode();
  const { token } = useToken();

  const { mutate: addItem, isSuccess } = useSaveItemCategory();
  const { mutate: updateItem, isSuccess: isSuccessUpdate } = useUpdateItemCategory(selectedRecordId);
  const { data: ItemgetbyId, refetch, isSuccess: isSuccessById } = useGetItemById(selectedRecordId);

  const onFinish = (values: TDefineItemDataOnSave) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      updateItem(values);
    } else {
      addItem(values);
    }
  };
  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isSuccessById) {
      form.setFieldsValue(ItemgetbyId?.data?.Data?.Result);
    }
  }, [isSuccessById]);
  const { t } = useTranslation();
  return (
    <>
      <Card>
        <Form form={form} layout="horizontal" onFinish={onFinish}>
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
                  <Col>
                    <AntButton ghost label={t('duty_roaster')} htmlType="submit" />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xl={17} sm={20} xs={24}>
              <Card className="card-container2">
                <h2>{t('main')}</h2>
                <Row>
                  <Col xl={{ span: 10 }} xs={{ span: 24 }} className="column">
                    <Col xl={24} xs={20} sm={20} className="formfield">
                      <AntSelectDynamic
                        fieldValue="Id"
                        label={t('shift')}
                        className=""
                        placeholder=""
                        fieldLabel=""
                        name=""
                        bordered={false}
                        query={getItemCategory}
                        onSelectChange={() => {
                          const selectedItem = data?.data?.Data?.Result.find((item: TItemCode) => item.ItemCode);
                          if (selectedItem) {
                            form.setFieldValue('ItemCode', selectedItem.ItemCode);
                          }
                        }}
                      />
                    </Col>

                    <Form.Item style={{ marginTop: 8, marginRight: 0 }} className="formItem">
                      <ShiftLookUpForm />
                    </Form.Item>
                  </Col>

                  <Col xl={{ span: 10, offset: 2 }} xs={22} sm={{ span: 20, offset: 0 }} className="formfield ">
                    <AntDatePicker label={t('start_date')} className="" placeholder="" name="" bordered={false} />
                  </Col>

                  <Col xl={10} xs={20} sm={20} className="formfield" style={{ marginTop: '-10px' }}>
                    <AntSelectDynamic
                      bordered={false}
                      fieldValue="Id"
                      label={t('shift_location')}
                      className="select"
                      placeholder=""
                      fieldLabel="TypeDescription"
                      name="ItemTypeId"
                      query={getItemType}
                    />
                  </Col>
                  <Form.Item style={{ marginTop: -2, marginRight: 10 }} className="formItem">
                    <LocationForm />
                  </Form.Item>

                  <Col xl={{ span: 10, offset: 1 }} xs={22} sm={20} className="formfield" style={{ marginTop: -10 }}>
                    <AntDatePicker label={t('end_date')} className="" placeholder="" name="" bordered={false} />
                  </Col>

                  <Col xl={18} xs={22} sm={20} className="formfield" style={{ marginTop: -10 }}>
                    <AntInput
                      bordered={false}
                      label={t('description')}
                      className="select"
                      placeholder=""
                      name="ItemTypeId"
                    />
                  </Col>
                  <Checkbox style={{ marginTop: 10, marginLeft: '15px' }}>{t('next_day_closed')}</Checkbox>
                </Row>
              </Card>
            </Col>
            <Col xl={5} xs={24} offset={1}>
              <AntTable
                columns={[
                  {
                    title: <>{t('day_name')}</>,
                  },
                ]}
                scroll={{ x: '', y: convertVhToPixels('35vh') }}
              />
            </Col>
          </Row>
          <Row>
            <Col xl={17}>
              {' '}
              <DutyTiming form={form} />
            </Col>
          </Row>
          <Row>
            <Col>
              {' '}
              <Col xl={17}>
                <InTiming form={form} />
              </Col>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}

export default MainForm;
