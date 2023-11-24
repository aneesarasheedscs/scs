import { useEffect, useState } from 'react';
import { SyncOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Checkbox, Col, DatePicker, Divider, Form, Row, Typography } from 'antd';

import {
  AntButton,
  AntCheckbox,
  AntInput,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
// import { AddButtonforItems } from './AddButtonforItems';
// import {
//   TGLAccounts,
//   getItemCGSAccount,
//   getItemClassGroup,
//   getItemPurchaseGLAccount,
//   getItemSaleGLAccount,
//   getParentCategory,
// } from '../queryOptions';
// import ItemCategoryTable from './ItemCategory/index';
import { useTranslation } from 'react-i18next';
// import {
//   TAddItemCategory,
//   TAddItemCategoryonUpdate,
//   useAddItemCategory,
//   useGetItemCategoryById,
//   useUpdateItemCategory,
// } from './ItemCategory/queries';
import { useQuery } from 'react-query';
import { isNumber, map } from 'lodash';
import { AddButtonforItems } from '../AddButtonforItems';
import EmployeeCategoryHistory from './tables';

function EmployeeCategory() {
  const { useForm, useWatch } = Form;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  // const [form] = useForm<TAddItemCategory | TGLAccounts>();

  // const formValues = useWatch<TAddItemCategory | TGLAccounts>([], form);
  // const { data: filterCGS } = getItemCGSAccount();
  // const { data: filterPurchase } = getItemPurchaseGLAccount();
  // const { data: filterSale } = getItemSaleGLAccount();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedRecordId, setSelectedRecordId] = useState<number>();

  // const { mutate: addItemCategory } = useAddItemCategory();
  // const { mutate: updateItemCategory, isSuccess } = useUpdateItemCategory(selectedRecordId);

  // const {
  //   data,
  //   refetch,
  //   isSuccess: isDataSuccess,
  //   isLoading: isDataLoading,
  // } = useGetItemCategoryById(selectedRecordId);

  // const onFinish = (values: TAddItemCategory | TGLAccounts | TAddItemCategoryonUpdate) => {
  //   console.log(values);
  //   if (isNumber(selectedRecordId)) {
  //     updateItemCategory(values);
  //   } else {
  //     addItemCategory(values);
  //   }
  // };

  // useEffect(() => {
  //   if (isNumber(selectedRecordId)) {
  //     refetch();
  //   }
  // }, [selectedRecordId]);

  // useEffect(() => {
  //   if (isDataSuccess) {
  //     form.setFieldsValue(data?.data?.Data?.Result);
  //   }
  // }, [isDataSuccess]);

  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h4> Employee Category </h4>
      <Divider></Divider>

      <h2 style={{ marginBottom: 20 }}> Employee Category</h2>
      <Card>
        <Form layout="inline" initialValues={{ remember: true }}>
          <Row gutter={[10, 10]} justify={'space-between'} style={{ width: '100%' }}>
            <Col
              xxl={{ span: 12, offset: 1 }}
              xs={24}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 12, offset: 1 }}
              className="formfield"
            >
              <AntInput name="CategoryCode" label="Category Name" bordered={false} />
            </Col>
            <Col
              xxl={{ span: 12, offset: 1 }}
              xl={{ span: 12, offset: 1 }}
              lg={{ span: 12, offset: 1 }}
              xs={24}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 12, offset: 1 }}
              className="formfield"
            >
              <AntInput name="CategoryDescription" label="Short Name" bordered={false} />
            </Col>
          </Row>
          <Row gutter={10} style={{ width: '100%', marginTop: 15 }}>
            <Col xxl={24} xl={24} md={24}>
              <Form.Item>
                <Row gutter={10} justify={'end'}>
                  <Col>
                    <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                  </Col>
                  <Col>
                    <AntButton label={t('save_and_more')} htmlType="submit" />
                  </Col>
                  <Col>
                    <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
          {/* <Row align="middle" gutter={[10, 10]}>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              name="InventoryParentCategoriesId"
              label={t('parent_category')}
              fieldValue="Id"
              fieldLabel="InvParentCateDescription"
              // query={getParentCategory}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              name="ItemClassGroupId"
              label={t('item_class_group')}
              fieldValue="Id"
              fieldLabel="ClassGroupName"
              // query={getItemClassGroup}
            />
          </Col>

          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              fieldValue="Id"
              name="InventoryAccountId"
              label={t('purchase_account_GL')}
              fieldLabel="AccountTitle"
              // options={map(filterPurchase, (item: any) => ({
              //   value: item.Id,
              //   label: item.AccountTitle,
              // }))}
              // query={getItemPurchaseGLAccount}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              fieldValue="Id"
              name="RevenueAccountId"
              label={t('sale_account_GL')}
              fieldLabel="AccountTitle"
              // options={map(filterSale, (item: any) => ({
              //   value: item.Id,
              //   label: item.AccountTitle,
              // }))}
              // query={getItemSaleGLAccount}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntSelectDynamic
              required
              fieldValue="Id"
              name="CGSAccountId"
              label={t('cgs_account_GL')}
              fieldLabel="AccountTitle"
              // options={map(filterCGS, (item: any) => ({
              //   value: item.Id,
              //   label: item.AccountTitle,
              // }))}
              // query={getItemCGSAccount}
            />
          </Col>
          <Col xs={4} sm={4} md={2} style={{ marginTop: -10 }}>
            <Row justify={'space-around'}>
              <span style={{ marginTop: 5 }}> {t('status')} </span>

              <Checkbox name="Status" />
            </Row>
          </Col>
          <Col xs={24} sm={24} md={10} style={{ display: 'flex', flexDirection: 'row' }}>
            <Form.Item>
              <Row align="middle" gutter={10}>
                <Col>
                  <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                </Col>
                <Col>
                  <AntButton label={t('save_and_add_more')} htmlType="submit" />
                </Col>
                <Col>
                  <AntButton
                    ghost
                    label={isNumber(selectedRecordId) ? t('update') : t('save')}
                    htmlType="submit"
                    icon={<SaveOutlined />}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row> */}
        </Form>
      </Card>
      {/* <EmployeeCategoryHistory /> */}
      {/* <ItemCategoryTable selectedRecordId={selectedRecordId} setSelectedRecordId={setSelectedRecordId} /> */}
    </AddButtonforItems>
  );
}

type TForm = {
  selectedRecordId?: number | null;
  setSelectedRecordId: (id: number | undefined) => void;
};
export default EmployeeCategory;
