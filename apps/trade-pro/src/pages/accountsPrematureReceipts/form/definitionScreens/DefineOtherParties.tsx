import { useEffect, useState } from 'react';
import { Checkbox, Col, Divider, Form, Row } from 'antd';
import { AntButton, AntInput, AntTablecopy } from '@tradePro/components';
import { SyncOutlined, SaveOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { AddButtonforItems } from '../AddButtonforItems';
import { TDefineOtherParties } from './types';
import {
  useAddDefineOtherParties,
  useGetDefineOtherPartiesById,
  useGetDefineOtherPartiesHistory,
  useUpdateDefineOtherParties,
} from './query';
import { columns, defineOtherPartiesColumns } from './column';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

const { useForm, useWatch } = Form;

function DefineOtherParties() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TDefineOtherParties>();
  const { t } = useTranslation();
  const formValues = useWatch<TDefineOtherParties>([], form);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const DocumentTypeId = 159;
  const { data } = useGetDefineOtherPartiesHistory(DocumentTypeId);
  const {
    data: defineOtherPartiesGetById,
    refetch,
    isSuccess,
    isLoading,
  } = useGetDefineOtherPartiesById(selectedRecordId);
  const { mutate } = useAddDefineOtherParties(DocumentTypeId);
  const { mutate: updateDefineOtherParties } = useUpdateDefineOtherParties(DocumentTypeId, selectedRecordId);
  const onFinish = (values: TDefineOtherParties) => {
    console.log(values);
    if (selectedRecordId) {
      updateDefineOtherParties(values);
    } else {
      mutate(values);
    }
  };
  useEffect(() => {
    if (selectedRecordId) {
      refetch();
    }
  }, []);
  useEffect(() => {
    if (isSuccess && !isLoading) {
      form.setFieldValue('PartyName', defineOtherPartiesGetById?.data?.Data?.Result?.PartyName);
      form.setFieldValue('IsActive', defineOtherPartiesGetById?.data?.Data?.Result?.IsActive);
    }
    form.setFieldValue('IsActive', true);
  }, [form, isSuccess]);
  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };
  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h3> {t('define_other_parties')} </h3>
      <Divider></Divider>

      <Form form={form} layout="inline" initialValues={formValues} onFinish={onFinish}>
        <Row gutter={[0, 0]} justify={'space-between'}>
          <Col xs={24} sm={24} md={12} className="form_field">
            <AntInput name="PartyName" label={t('party_name')} bordered={false} />
          </Col>
          <Col xs={24} sm={24} md={4}>
            <Form.Item
              style={{ marginBottom: 0 }}
              className="box"
              name="IsActive"
              valuePropName="checked"
              initialValue={true}
            >
              <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'IsActive')}>{t('is_active')}</Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={7}>
            <Row align="middle" gutter={[10, 10]}>
              <Col xs={24} sm={24} md={10} style={{ display: 'flex', flexDirection: 'row' }}>
                <Form.Item>
                  <Row align="middle" gutter={10}>
                    <Col>
                      <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                    </Col>
                    <Col>
                      <AntButton label={t('save_and_more')} htmlType="submit" />
                    </Col>
                    <Col>
                      <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <Row style={{ marginTop: 10 }}>
        <Col>
          <AntTablecopy
            showDefaultTableGrid={true}
            columns={defineOtherPartiesColumns(t)}
            data={data?.data?.Data?.Result || []}
            scroll={{ x: '', y: convertVhToPixels('20vh') }}
          />
        </Col>
      </Row>
    </AddButtonforItems>
  );
}

export default DefineOtherParties;
