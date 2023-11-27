import { AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, Form, FormInstance, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useGetDestinationLocationSelect, useGetRequestStatusSelect, useGetSourceSelect } from '../queries/queries';
import { map } from 'lodash';

function MainEntry({ form }: TDynamicForm) {
  const { t } = useTranslation();

  const defaultStatus = 3;
  const [isErrorModalVisible, setIsErrorModalVisible] = useState<boolean>(false);
  const { data: source } = useGetSourceSelect();

  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  const defaultSourceLocationId = 2;

  useEffect(() => {
    form.setFieldsValue({ SourceLocationId: defaultSourceLocationId });
  }, [form, defaultSourceLocationId]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const { SourceLocationId, DestinationLocationId } = values;
      if (SourceLocationId && DestinationLocationId && SourceLocationId === DestinationLocationId) {
        setIsErrorModalVisible(true);
      } else {
        setIsErrorModalVisible(false);
      }
    });
  };

  const handleOk = () => {
    setIsErrorModalVisible(false);
  };

  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: '-2%' }}>
        <Col span={24}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray' }}>
            <Form.Item>
              <div className="form-list-container">
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 21, offset: 1 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 0 }}
                  style={{ marginBottom: '1%' }}
                  className="formfield date"
                >
                  <AntDatePicker bordered={false} name="DocDate" label={t('document_date')} />
                </Col>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 21, offset: 1 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 1 }}
                  style={{ marginBottom: '1%' }}
                  className="formfield balance"
                >
                  <AntSelectDynamic
                    disabled
                    bordered={false}
                    label={t('source_location')}
                    fieldValue="Id"
                    fieldLabel="CompName"
                    name="SourceLocationId"
                    options={map(source, (item: any) => ({
                      value: item.Id,
                      label: item.CompName,
                    }))}
                  />
                  <Modal
                    width={250}
                    title="Error"
                    visible={isErrorModalVisible}
                    onOk={handleOk}
                    centered
                    closable={false}
                  >
                    <p style={{ color: 'red' }}>{t('sourcelocation_and_destinationlocation_cant_be_same')}</p>
                  </Modal>
                </Col>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 21, offset: 1 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 1 }}
                  style={{ marginBottom: '1%' }}
                  className="formfield"
                >
                  <AntSelectDynamic
                    bordered={false}
                    label={t('dest_location')}
                    fieldValue="Id"
                    fieldLabel="CompName"
                    name="DestinationLocationId"
                    query={useGetDestinationLocationSelect}
                    onChange={handleSubmit}
                  />
                </Col>

                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 21, offset: 1 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 0 }}
                  className="formfield status"
                >
                  <AntSelectDynamic
                    disabled
                    value={defaultStatus}
                    bordered={false}
                    label={t('request_status')}
                    fieldValue="Id"
                    fieldLabel="status"
                    name="ReqStatus"
                    query={useGetRequestStatusSelect}
                  />
                </Col>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 21, offset: 1 }}
                  md={{ span: 23, offset: 0 }}
                  lg={{ span: 23, offset: 0 }}
                  xl={{ span: 15, offset: 1 }}
                  className="formfield"
                >
                  <AntInput bordered={false} name="RemarksHeader" label={t('remarks')} />
                </Col>

                <Col
                  xs={{ span: 18, offset: 0 }}
                  sm={{ span: 22, offset: 1 }}
                  md={{ span: 22, offset: 0 }}
                  lg={{ span: 24, offset: 0 }}
                  xl={{ span: 10, offset: 0 }}
                  style={{ marginTop: '1%', marginBottom: '-2%' }}
                  className="checkbox"
                >
                  <label>
                    <Form.Item name="IsApproved" valuePropName="checked" initialValue={true}>
                      <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'IsApproved')}>
                        {t('print_preview')}
                      </Checkbox>
                    </Form.Item>
                  </label>
                </Col>
              </div>
            </Form.Item>{' '}
          </Card>
        </Col>
      </Row>
    </>
  );
}

type TDynamicForm = { form: FormInstance };

export default MainEntry;
