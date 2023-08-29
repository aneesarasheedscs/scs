import { isNumber } from 'lodash';
import { useEffect, useState } from 'react';
import { Checkbox, Col, Form, FormInstance, Input, Row } from 'antd';
import LookupFormModal from '@tradePro/components/LookupFormModal';
import { useTranslation } from 'react-i18next';
import { AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useGetUOMScheduleById } from './queries';
import { usegetItemNameUOMSchedule } from '../queryOptions';
import { getItemUOM } from '../../queryOptions';

function AddUpdateRecord({ open, form, handleClose, selectedRecordId }: TAddUpdateRecord) {
  const [btnClicked, setBtnClicked] = useState(false);
  const { t } = useTranslation();
  //   const { mutate, isSuccess, isLoading } = useSaveItemCategory(selectedRecordId);
  const {
    data,
    refetch,
    isSuccess: isDataSuccess,
    isFetching,
    isLoading: isDataLoading,
  } = useGetUOMScheduleById(selectedRecordId);

  const onFinish = (values: any) => {
    // if (isNumber(selectedRecordId)) {
    //   mutate({ ...values, rowVersion: data?.data?.apiData?.rowVersion });
    // } else {
    //   mutate(values);
    // }
  };

  //   useEffect(() => {
  //     if (isSuccess) {
  //       form.resetFields();
  //       if (!btnClicked) handleClose();
  //     }
  //   }, [isSuccess]);

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

  const uomStatus = data?.data?.Data?.Result?.BaseRateUom;

  return (
    <LookupFormModal
      open={open}
      form={form}
      onFinish={onFinish}
      isLoading={isDataLoading}
      isFetching={isFetching}
      handleClose={handleClose}
      isDataLoading={isDataLoading}
      selectedRecordId={selectedRecordId}
      handleSaveMoreClick={() => setBtnClicked(true)}
    >
      <Row gutter={10} style={{ marginTop: 20 }}>
        <Col xs={24} sm={24} md={10}>
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
        <Col xs={24} sm={24} md={8}>
          <AntSelectDynamic
            required
            fieldValue="Id"
            label={t('base_pack_unit')}
            className="select"
            placeholder="Select Pack Unit"
            fieldLabel="UOMDescription"
            name="ScheduleUnitName"
            style={{
              width: '100%',
              background: '#ffff',
            }}
            query={getItemUOM}
          />
        </Col>
        <Col xs={24} sm={24} md={6}>
          <AntInput name="Equivalent" label={t('equivalent')} />
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Row>
            <p>{t('base_pack_uom')}</p>
            <Checkbox name="BaseRateUom" checked={uomStatus === true} />
          </Row>
        </Col>
      </Row>
    </LookupFormModal>
  );
}

type TAddUpdateRecord = {
  open: boolean;
  form: FormInstance<any>;
  handleClose: VoidFunction;
  selectedRecordId?: number;
};

export default AddUpdateRecord;
