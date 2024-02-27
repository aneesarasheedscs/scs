import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { map } from '@tradePro/utils/lodashUtils';
import { Card, Col, FormInstance, Row } from 'antd';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { AntInput, AntSelectDynamic } from '@tradePro/components';
import { useGetDestinationAndSourceLoc, useGetDestinationLoc, useGetRequestStatus } from '../quries';

function MainEntry({ form }: TDynamicForm) {
  const { t } = useTranslation();
  const [disablefields, setDisablefields] = useState(true);
  const { data, isSuccess, isLoading } = useGetDestinationLoc();
  const userDetail = storedUserDetail();
  useEffect(() => {
    form.setFieldValue('DocDate', dayjs(new Date()));
    form.setFieldValue('ReqStatus', 1);
    form.setFieldValue('SourceLocationId', userDetail?.CompanyId);
    if (isSuccess && !isLoading) {
      form.setFieldValue('DestinationLocationId', data?.[0]?.Id);
    }
  }, [isSuccess, 'DocDate']);

  return (
    <>
      <Card className="header_card">
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xl={7} xxl={4} sm={18} xs={23} lg={12} md={12} className="formfield">
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
              label={t('location_from')}
              fieldValue="Id"
              fieldLabel="CompName"
              query={useGetDestinationAndSourceLoc}
              name="SourceLocationId"
              disabled={disablefields}
            />
          </Col>
          <Col xl={8} xxl={6} sm={18} lg={12} xs={23} md={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('location_to')}
              fieldValue="Id"
              fieldLabel="CompName"
              name="DestinationLocationId"
              disabled={disablefields}
              options={map(data, (item: any) => ({
                value: item.Id,
                label: item.CompName,
              }))}
            />
          </Col>

          <Col xl={11} xxl={7} lg={24} sm={18} xs={23} md={20} className="formfield">
            <AntInput name="RemarksHeader" label={t('remarks')} bordered={false} />
          </Col>
        </Row>
      </Card>
    </>
  );
}
type TDynamicForm = { form: FormInstance };

export default MainEntry;
