import { isNumber } from 'lodash';
import { useEffect, useState } from 'react';
import { Col, Form, FormInstance, Input, Row } from 'antd';
import LookupFormModal from '@tradePro/components/LookupFormModal';
import { useTranslation } from 'react-i18next';
import { AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { useGetItemTypeById } from '../querySave';
import { getItemType } from '../../queryOptions';

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
  } = useGetItemTypeById(selectedRecordId);

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
      // form.setFieldValue('ItemCategory', ItemCategory?.data?.Data?.Result);
    }
  }, [isDataSuccess]);

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
          <AntInput name="TypeCode" label={t('code')} />
        </Col>
        <Col xs={9}>
          <AntInput name="TypeDescription" label={t('item_description')} />
        </Col>
        <Col xs={9}>
          <AntSelectDynamic
            fieldValue="Id"
            name="TypeDescription"
            label={t('item_type')}
            fieldLabel="TypeDescription"
            query={getItemType}
          />
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
