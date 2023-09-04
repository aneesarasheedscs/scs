import { isNumber } from 'lodash';
import { useEffect, useState } from 'react';
import { Checkbox, Col, Form, FormInstance, Input, Row } from 'antd';
import LookupFormModal from '@tradePro/components/LookupFormModal';
import { useTranslation } from 'react-i18next';
import { AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useGetItemUOMById } from './queries';

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
  } = useGetItemUOMById(selectedRecordId);

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
  const uomStatus = data?.data?.Data?.Result?.UOMStatus;
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
        <Col xs={6}>
          <AntInputNumber
            label={t('code')}
            name="UOMCode"
            className="input"
            style={{ width: '100%', border: '1px dashed blue' }}
            readOnly
          />
        </Col>
        <Col xs={10}>
          <AntInput
            required
            label={t('equivalent')}
            name="Equivalent"
            className="input"
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={6}>
          <Row>
            <p>{t('status')}</p>
            <Checkbox name="UOMStatus" checked={uomStatus === true} />
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
