import dayjs from 'dayjs';
import { map } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, FormInstance, Row } from 'antd';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { AntInput, AntSelectDynamic } from '@tradePro/components';
import { useGetEntryType } from '../quries';

function MainEntry({ form, setAjusmentTypeId }: TDynamicForm) {
  const { t } = useTranslation();
  const [disablefields, setDisablefields] = useState(true);
  // const { data, isSuccess, isLoading } = useGetDestinationLoc();
  const userDetail = storedUserDetail();
  useEffect(() => {
    form.setFieldValue('DocDate', dayjs(new Date()));
    // form.setFieldValue('AdjustmentTypeId', 1);
    form.setFieldValue('SourceLocationId', userDetail?.CompanyId);
    // if (isSuccess && !isLoading) {
    //   form.setFieldValue('DestinationLocationId', data?.[0]?.Id);
    // }
  }, ['DocDate']);
  console.log(form.getFieldValue('AdjustmentTypeId'));
  const handleTypeChange = (value: number) => {
    setAjusmentTypeId(value);
  };
  return (
    <>
      <Card className="header_card">
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xl={7} xxl={4} sm={18} xs={23} lg={12} md={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('entry_type')}
              fieldValue="Id"
              fieldLabel="type"
              query={useGetEntryType}
              name="AdjustmentTypeId"
              // aria-readonly
              onChange={(value) => handleTypeChange(value)}
              // disabled={disablefields}
            />
          </Col>

          <Col xl={11} xxl={11} lg={24} sm={18} xs={23} md={20} className="formfield">
            <AntInput name="RemarksHeader" label={t('remarks')} bordered={false} />
          </Col>
          <Col xl={5} xxl={8} sm={6} xs={12} md={3}></Col>
        </Row>
      </Card>
    </>
  );
}
type TDynamicForm = { form: FormInstance; setAjusmentTypeId: (Id: number) => void };

export default MainEntry;
