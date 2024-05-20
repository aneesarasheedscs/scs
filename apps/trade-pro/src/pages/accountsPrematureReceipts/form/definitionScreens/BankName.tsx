import { useEffect, useState } from 'react';
import { Col, Divider, Form, Row } from 'antd';
import { AntButton, AntInput, AntTablecopy } from '@tradePro/components';
import { SyncOutlined, SaveOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { AddButtonforItems } from '../AddButtonforItems';
import { TBankName } from './types';
import { useAddBankName, useGetBankNameById, useGetBankNameHistory, useUpdateBankName } from './query';
import { columns } from './column';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

const { useForm, useWatch } = Form;

function BankName() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TBankName>();
  const { t } = useTranslation();
  const formValues = useWatch<TBankName>([], form);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data } = useGetBankNameHistory();
  const { data: bankNameGetById, refetch, isSuccess, isLoading } = useGetBankNameById(selectedRecordId);
  const { mutate } = useAddBankName();
  const { mutate: updateBankName } = useUpdateBankName(selectedRecordId);
  const onFinish = (values: TBankName) => {
    console.log(values);
    if (selectedRecordId) {
      updateBankName(values);
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
      form.setFieldValue('BankName', bankNameGetById?.data?.Data?.Result?.BankName);
    }
  }, [form, isSuccess]);
  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h3> {t('bank')} </h3>
      <Divider></Divider>

      <Form form={form} layout="inline" initialValues={formValues} onFinish={onFinish}>
        <Row gutter={[0, 0]} justify={'space-between'}>
          <Col xs={24} sm={24} md={12} className="form_field">
            <AntInput name="BankName" label={t('bank_name')} bordered={false} />
          </Col>
          <Col xs={24} sm={24} md={11}>
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
            columns={columns(t)}
            data={data?.data?.Data?.Result || []}
            scroll={{ x: '', y: convertVhToPixels('20vh') }}
          />
        </Col>
      </Row>
    </AddButtonforItems>
  );
}

export default BankName;
