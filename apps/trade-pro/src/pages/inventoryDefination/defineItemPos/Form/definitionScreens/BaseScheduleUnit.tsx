import { isNumber } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ItemScheduleUOMTable from './ItemScheduleUnit';
import { AddButtonforItems } from './AddButtonforItems';
import { usegetItemNameUOMSchedule } from './queryOptions';
import { getItemType, getItemUOM } from '../queryOptions';
import { TItemTypeData, TItemTypeDataonUpdate } from './types';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { Card, Checkbox, Col, DatePicker, Divider, Form, Row, Table, Typography } from 'antd';
import { AntButton, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import {
  TAddScheduleUOM,
  TAddScheduleUOMonUpdate,
  useAddScheduleUOM,
  useGetUOMScheduleById,
  useUpdateScheduleUOM,
} from './ItemScheduleUnit/queries';

const { useForm, useWatch } = Form;
interface Props {
  openItemSchudleUnit: any;
}
function ItemBaseScheduleUOM({ openItemSchudleUnit }: Props) {
  const { t } = useTranslation();
  const [form] = useForm<TAddScheduleUOM>();
  const [selectedRecordId, setSelectedRecordId] = useState<number | any>();

  const { mutate: addScheduleUOM } = useAddScheduleUOM();
  const { mutate: updateScheduleUOM } = useUpdateScheduleUOM(selectedRecordId);
  const { data, refetch, isSuccess: isDataSuccess, isLoading: isDataLoading } = useGetUOMScheduleById(selectedRecordId);
  const formValues = useWatch<TAddScheduleUOM>([], form);

  const handleFinish = (values: TAddScheduleUOM | TAddScheduleUOMonUpdate) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      updateScheduleUOM(values);
    } else {
      addScheduleUOM(values);
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
  const handleResetForm = () => {
    setSelectedRecordId(null);
  };
  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };
  return (
    <>
      <h4>
        {' '}
        {openItemSchudleUnit ? (
          <>
            {t('definitions')}
            <Divider></Divider>
          </>
        ) : (
          ''
        )}
      </h4>
      <Card>
        <h2 style={{ marginBottom: 20 }}> {t('item_schedule_uom')} </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ remember: true }}
          style={{ width: '100%' }}
        >
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={24} md={6}>
              <AntSelectDynamic
                required
                fieldValue="Id"
                label={t('item_name')}
                name="ItemId"
                className="input"
                placeholder="Select Pack Unit"
                fieldLabel="ItemName"
                style={{
                  width: '100%',
                  background: '#ffff',
                }}
                query={usegetItemNameUOMSchedule}
              />
            </Col>
            <Col xs={24} sm={24} md={5} lg={4} xxl={4}>
              <AntSelectDynamic
                required
                fieldValue="Id"
                label={t('base_pack_unit')}
                className="select"
                placeholder="Select Pack Unit"
                fieldLabel="UOMDescription"
                name="ScheduleUnitId"
                style={{
                  width: '100%',
                  background: '#ffff',
                }}
                query={getItemUOM}
              />
            </Col>
            <Col xs={24} sm={24} md={5} lg={3} xxl={4}>
              <AntInput name="Equivalent" label={t('equivalent')} />
            </Col>

            <Col xs={24} sm={24} md={5} lg={3} xl={3} xxl={2}>
              <Row style={{ marginTop: 25 }} justify={'start'}>
                <Form.Item name="BaseRateUom" valuePropName="checked" initialValue={false}>
                  <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'BaseRateUom')}>
                    {t('pack_uom')}
                  </Checkbox>
                </Form.Item>
              </Row>
            </Col>

            <Col xs={24} sm={24} md={12} lg={8} xxl={7} style={{ display: 'flex', flexDirection: 'row' }}>
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
                  {openItemSchudleUnit ? (
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

        <ItemScheduleUOMTable
          openItemSchudleUnit={openItemSchudleUnit}
          selectedRecordId={selectedRecordId}
          setSelectedRecordId={setSelectedRecordId}
        />
      </Card>
    </>
  );
}

export default ItemBaseScheduleUOM;
