import {
  AntButton,
  AntDatePicker,
  AntInput,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import '../style.scss';

import { useTranslation } from 'react-i18next';

const { useForm, useWatch } = Form;
import { SaleOrderSearchCriteria } from '../table/types';
// import {
//   useApprovedStatus,
//   useCustomerName,
//   useItemCategory,
//   useItemName,
//   useItemType,
//   useParentCategory,
//   useStatus,
// } from '../query/queryOption';
// import { useSaleOrderTable } from '../query/query';

function SearchCriteriaForm() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<SaleOrderSearchCriteria>();
  const formValues = useWatch<SaleOrderSearchCriteria>([], form);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const {
  //   data: sale,
  //   isError: saleError,
  //   isLoading: saleLoading,

  //   isFetching: saleFetching,
  //   refetch,
  // } = useSaleOrderTable(false, form.getFieldsValue());

  const onFinish = (values: SaleOrderSearchCriteria) => {
    // refetch().then(() => handleClose());
    if (values.ApprovedFilter === 'All') {
      values.IsApproved = null;
    } else {
      if (values.IsApproved === true || values.IsApproved === false) {
        values.ApprovedFilter = null;
      }
    }
  };

  const { t } = useTranslation();

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="vertical" initialValues={formValues} style={{ marginTop: '5%' }}>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={12}>
            <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} className="formField" />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} className="formField" />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              name="DocumentType"
              fieldValue="Id"
              label={t('document_type')}
              // query={useParentCategory}
              fieldLabel="DocumentType"
              bordered={false}
              className="formField"
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntInputNumber name="FromDocNo" bordered={false} label={t('doc_no_from')} className="formField" />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntInputNumber name="ToDocNo" bordered={false} label={t('doc_no_to')} className="formField" />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntInputNumber name="ManualNo" bordered={false} label={t('manual_no')} className="formField" />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              name="AccountTitle"
              fieldValue="Id"
              label={t('account_title')}
              // query={useItemCategory}
              fieldLabel="CategoryDescription"
              bordered={false}
              className="formField"
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              name="CustomGroup"
              fieldValue="Id"
              label={t('custom_group')}
              // query={useItemType}
              fieldLabel="TypeDescription"
              bordered={false}
              className="formField"
            />
          </Col>
        </Row>
        <Row justify={'center'}>
          <Col xs={24} sm={24} md={8}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 4 }}
              // isError={saleError}
              // isLoading={saleLoading || saleFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteriaForm;
