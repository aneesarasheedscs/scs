import { isNumber } from 'lodash';
import { useEffect, useState } from 'react';
import { Col, Form, FormInstance, Input, Row } from 'antd';
import LookupFormModal from '@tradePro/components/LookupFormModal';
import { useTranslation } from 'react-i18next';
import { useGetItemById, useSaveItemCategory } from '../Form/querieSave';
import { AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { getItemCategory, getItemClass, getItemType, getItemUOM } from '../Form/queryOptions';
// import { TSyllabusAuthorityFormDataOnAdd, TSyllabusAuthorityFormDataOnUpdate } from "@/types/syllabusAuthority";

function AddUpdateRecord({ open, form, handleClose, selectedRecordId }: TAddUpdateRecord) {
  const [btnClicked, setBtnClicked] = useState(false);
  const { t } = useTranslation();
  const { mutate, isSuccess, isLoading } = useSaveItemCategory(selectedRecordId);
  const {
    data,
    refetch,
    isSuccess: isDataSuccess,
    isFetching,
    isLoading: isDataLoading,
  } = useGetItemById(selectedRecordId);
  const { data: ItemCategory } = getItemCategory();

  const onFinish = (values: any) => {
    if (isNumber(selectedRecordId)) {
      mutate({ ...values, rowVersion: data?.data?.apiData?.rowVersion });
    } else {
      mutate(values);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      if (!btnClicked) handleClose();
    }
  }, [isSuccess]);

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
      isLoading={isLoading}
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
            name="ItemCode"
            className="input"
            style={{ width: '100%', border: '1px dashed blue' }}
            readOnly
          />
        </Col>
        <Col xs={10}>
          <AntInput
            required
            label={t('item_name')}
            name="ItemName"
            className="input"
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={8}>
          <AntSelectDynamic
            fieldValue="Id"
            name="TypeDescription"
            label="Type"
            fieldLabel="TypeDescription"
            query={getItemType}
          />
        </Col>
        <Col xs={12}>
          <AntSelectDynamic
            required
            fieldValue="Id"
            label={t('item_category')}
            className="select"
            placeholder="Select item Category"
            fieldLabel="CategoryDescription"
            name="ItemCategory"
            style={{
              width: '100%',
              background: '#ffff',
            }}
            query={getItemCategory}
          />
        </Col>

        <Col xs={12}>
          <AntSelectDynamic
            required
            fieldValue="Id"
            label={t('base_pack_uom')}
            className="select"
            placeholder="Select Pack Uom"
            fieldLabel="UOMDescription"
            name="RateUom"
            style={{
              width: '100%',
              background: '#ffff',
            }}
            query={getItemUOM}
          />
        </Col>
        <Col xs={12}>
          <AntSelectDynamic
            required
            fieldValue="Id"
            label={t('purchase_account_GL')}
            className="select"
            placeholder="Select Purchase Account"
            fieldLabel="InventoryAccountTitle"
            name="InventoryAccountTitle"
            style={{
              width: '100%',
              background: '#ffff',
            }}
            query={getItemCategory}
          />
        </Col>
        <Col xs={12}>
          <AntSelectDynamic
            required
            fieldValue="Id"
            label={t('sale_account_GL')}
            className="select"
            placeholder="Select Sale Account"
            fieldLabel="RevenueAccountTitle"
            name="RevenueAccountTitle"
            style={{
              width: '100%',
              background: '#ffff',
            }}
            query={getItemCategory}
          />
        </Col>
        <Col xs={12}>
          <AntSelectDynamic
            required
            fieldValue="Id"
            label={t('cgs_account_GL')}
            className="select"
            placeholder="Select CGS Account "
            fieldLabel="CGSAccountTitle"
            name="CGSAccountTitle"
            style={{
              width: '100%',
              background: '#ffff',
            }}
            query={getItemCategory}
          />
        </Col>
        <Col xs={12}>
          <AntInput
            required
            label={t('user_name')}
            name="UserName"
            className="input"
            style={{ width: '100%' }}
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
