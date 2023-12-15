import { Checkbox, Col, Form, FormInstance, Row } from 'antd';
import { useEffect, useState } from 'react';
import { AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useGetDestinationAndSourceLoc, useGetDestinationLoc, useGetRequestStatus } from '../quries';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { map } from 'lodash';

function MainEntry({ form }: TDynamicForm) {
  const { t } = useTranslation();
  const [disablefields, setDisablefields] = useState(true);
  const { data } = useGetDestinationLoc();

  // const Id = 1;
  const userDetail = storedUserDetail();

  useEffect(() => {
    form.setFieldValue('DocDate', dayjs(new Date()));
    form.setFieldValue('ReqStatus', 1);
    form.setFieldValue('SourceLocationId', userDetail?.CompanyId);
    form.setFieldValue('DestinationLocationId', 2);
  }, ['DocDate']);
  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  return (
    <Row gutter={[10, 10]} style={{ marginLeft: 10 }} justify={'space-between'}>
      <Col xl={7} xxl={5} sm={18} lg={11} xs={23} md={11} className="formfield">
        <AntDatePicker autoFocus required name="DocDate" label={t('document_date')} bordered={false} />
      </Col>
      <Col xl={7} xxl={6} sm={18} xs={23} lg={12} md={12} className="formfield">
        <AntSelectDynamic
          bordered={false}
          label={t('request_status')}
          fieldValue="Id"
          fieldLabel="status"
          query={useGetRequestStatus}
          name="ReqStatus"
          aria-readonly
          disabled={disablefields}
        />
      </Col>
      <Col xl={8} xxl={6} sm={18} lg={11} xs={23} md={11} className="formfield">
        <AntSelectDynamic
          bordered={false}
          label={t('source_location')}
          fieldValue="Id"
          fieldLabel="CompName"
          query={useGetDestinationAndSourceLoc}
          name="SourceLocationId"
          disabled={disablefields}
        />
      </Col>
      <Col xl={7} xxl={6} sm={18} lg={12} xs={23} md={12} className="formfield">
        <AntSelectDynamic
          bordered={false}
          label={t('destination_location')}
          fieldValue="Id"
          fieldLabel="CompName"
          name="DestinationLocationId"
          disabled={disablefields}
          options={map(data, (item: any) => ({
            value: item.Id,
            label: item.CompName,
          }))}
          // onSelectChange={(obj) => handleWarehouseFromChange(obj, field.name)}
        />
      </Col>

      <Col xl={11} xxl={12} lg={24} sm={18} xs={23} md={20} className="formfield">
        <AntInput name="RemarksHeader" label={t('remarks')} bordered={false} />
      </Col>

      <Col xl={4} xxl={5} sm={6} xs={12} md={3}>
        <Row style={{ marginLeft: 10, marginTop: 10 }}>
          <Form.Item name="PrintPreview" valuePropName="checked" initialValue={true}>
            <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'PrintPreview')} checked={true}>
              {t('preview')}
            </Checkbox>
          </Form.Item>
        </Row>
      </Col>
    </Row>
  );
}
type TDynamicForm = { form: FormInstance };

export default MainEntry;
