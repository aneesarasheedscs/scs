import { isNumber } from 'lodash';
import { useEffect, useState } from 'react';
import { getItemCategory, getItemClassGroup, getItemType } from '../../queryOptions';
import { useGetItemCategoryById } from './queries';
import { useTranslation } from 'react-i18next';
import { Checkbox, Col, Form, FormInstance, Input, Row } from 'antd';
import LookupFormModal from '@tradePro/components/LookupFormModal';
import { AntInput, AntSelectDynamic } from '@tradePro/components';

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
  } = useGetItemCategoryById(selectedRecordId);

  const onFinish = (values: any) => {
    // if (isNumber(selectedRecordId)) {
    //   mutate({ ...values, rowVersion: data?.data?.apiData?.rowVersion });
    // } else {
    //   mutate(values);
    // }
  };

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
          <AntInput name="CategoryCode" label={t('code')} />
        </Col>
        <Col xs={9}>
          <AntInput name="CategoryDescription" label={t('item_description')} />
        </Col>
        <Col xs={9}>
          <AntSelectDynamic
            required
            name="ItemClassGroupId"
            label={t('item_class_group')}
            fieldValue="Id"
            fieldLabel="ClassGroupName"
            query={getItemClassGroup}
          />
        </Col>
        <Col xs={7}>
          <AntInput name="SerialFrom" label={t('serial_from')} />
        </Col>
        <Col xs={7}>
          <AntInput name="SerialTo" label={t('serial_to')} />
        </Col>
        <Col xs={10}>
          <AntSelectDynamic
            fieldValue="Id"
            name="InventoryParentCategoriesId"
            label={t('parent_category')}
            fieldLabel="CategoryDescription"
            query={getItemCategory}
          />
        </Col>
        <Col xs={8}>
          <AntSelectDynamic
            required
            fieldValue="Id"
            name="InventoryAccountId"
            label={t('purchase_account_GL')}
            fieldLabel="InventoryAccountTitle"
            query={getItemCategory}
          />
        </Col>
        <Col xs={8}>
          <AntSelectDynamic
            required
            fieldValue="Id"
            name="RevenueAccountId"
            label={t('sale_account_GL')}
            fieldLabel="RevenueAccountTitle"
            query={getItemCategory}
          />
        </Col>
        <Col xs={8}>
          <AntSelectDynamic
            required
            fieldValue="Id"
            name="CGSAccountId"
            label={t('cgs_account_GL')}
            fieldLabel="CGSAccountTitle"
            query={getItemCategory}
          />
        </Col>
        <Col xs={3}>
          <Row justify={'space-around'}>
            <span style={{ marginTop: 5 }}> {t('status')} </span>

            <Checkbox name="CategoryStatus" />
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
