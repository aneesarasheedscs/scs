import { Card, Col, FormInstance, Row } from 'antd';
import { useEffect, useState } from 'react';
import { AntInput, AntSelectDynamic } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { useGetDestinationAndSourceLoc, useGetRequestStatus } from '../query';

function MainEntry({ form }: TDynamicForm) {
  const { t } = useTranslation();
  const [disablefields, setDisablefields] = useState(true);

  const userDetail = storedUserDetail();

  useEffect(() => {
    form.setFieldValue('DocDate', dayjs(new Date()));
    form.setFieldValue('ReqStatus', 1);
    form.setFieldValue('SourceLocationId', userDetail?.CompanyId);
  }, ['DocDate']);
  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  return (
    <>
      <Card style={{ boxShadow: '2px 4px 12px 1px gray', paddingTop: '-15%', marginBottom: '0.5%' }}>
        <Row gutter={[10, 10]} style={{ marginLeft: 10 }} justify={'space-between'}>
          <Col xl={5} xxl={4} sm={18} xs={23} lg={12} md={12} className="formfield">
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
          <Col xl={8} xxl={7} sm={18} lg={11} xs={23} md={11} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('location_from')}
              fieldValue="Id"
              fieldLabel="CompName"
              query={useGetDestinationAndSourceLoc}
              name="SourceLocationId"
              disabled={disablefields}
            />
          </Col>

          <Col xl={10} xxl={12} lg={24} sm={18} xs={23} md={20} className="formfield">
            <AntInput name="RemarksHeader" label={t('remarks')} bordered={false} />
          </Col>
        </Row>
      </Card>
    </>
  );
}
type TDynamicForm = { form: FormInstance };

export default MainEntry;
