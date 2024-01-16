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
      <Card style={{ boxShadow: '2px 4px 12px 1px gray' }}>
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 21 }}
            md={{ span: 11 }}
            lg={{ span: 11 }}
            xl={{ span: 8 }}
            style={{ marginBottom: '0%' }}
            className="formfield"
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
            <Modal width={250} title="Error" visible={isErrorModalVisible} onOk={handleOk} centered closable={false}>
              <p style={{ color: 'red' }}>{t('sourcelocation_and_destinationlocation_cant_be_same')}</p>
            </Modal>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 21 }}
            md={{ span: 11 }}
            lg={{ span: 11 }}
            xl={{ span: 8 }}
            style={{ marginBottom: '0%' }}
            className="formfield"
          >
            <AntSelectDynamic
              bordered={false}
              label={t('destination_location')}
              fieldValue="Id"
              fieldLabel="CompName"
              name="DestinationLocationId"
              query={useGetDestinationLocationSelect}
              onChange={handleSubmit}
            />
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 21 }}
            md={{ span: 11 }}
            lg={{ span: 11 }}
            xl={{ span: 7 }}
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
            xs={{ span: 24 }}
            sm={{ span: 21 }}
            md={{ span: 23 }}
            lg={{ span: 23 }}
            xl={{ span: 16 }}
            className="formfield"
          >
            <p className="remarksFieldinStockDirect">
              <AntInput bordered={false} name="RemarksHeader" label={t('remarks')} />
            </p>
          </Col>
        </Row>
      </Card>
    </>
  );
}

type TDynamicForm = { form: FormInstance };

export default MainEntry;
