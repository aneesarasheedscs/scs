import { AntButton, AntDatePicker, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { SearchCriteriaWrapper } from './seachCriteriaModal';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { Radio } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { actvitityPAtom } from './atom';
import { useGetPurchaseInvoice, usePurchaseInvoiceTable } from '../query';

import { TSearchCritariaPurchaseActivity } from '../types';
import { map } from 'lodash';
import dayjs from 'dayjs';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';

const { useForm, useWatch } = Form;

function SearchCriteria() {
  const { data: PurchaseInvoice } = useGetPurchaseInvoice();

  interface TReportType {
    Id: string;
    ReportType: string;
  }

  const ReportType: TReportType[] = [
    { Id: 'Purchase By Detail', ReportType: 'Purchase By Detail' },
    { Id: 'Purchase By Invoices & Supplier', ReportType: 'Purchase By Invoices & Supplier' },
    { Id: 'Purchase By Supplier', ReportType: 'Purchase By Supplier' },
    { Id: 'Purchase By Supplier & Item', ReportType: 'Purchase By Supplier & Item' },
    { Id: 'Purchase By Item,Category & Item Type', ReportType: 'Purchase By Item,Category & Item Type' },
    { Id: 'Purchase By Category', ReportType: 'Purchase By Category' },
    { Id: 'Purchase By Item Type', ReportType: 'Purchase By Item Type' },
    { Id: 'Purchase By Payment Terms', ReportType: 'Purchase By Payment Terms' },
    { Id: 'Purchase By Category & PackSize', ReportType: 'Purchase By Category & PackSize' },
  ];

  const [selectedOption, setSelectedOption] = useState('NetTotal');

  const handleRadioChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  const [open, setOpen] = useState(false);
  const [form] = useForm<TSearchCritariaPurchaseActivity>();
  const { setFields, getFieldValue } = form;
  // const formValues = useWatch<TSearchCritariaPurchaseActivity>([], form);

  // const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);

  const {
    data: purchase,
    isError: purchaseError,
    isLoading: purchaseLoading,

    isFetching: purchaseFetching,
    refetch,
  } = usePurchaseInvoiceTable(true, form.getFieldsValue(), selectedOption);

  const filteredWarehouse =
    PurchaseInvoice?.data?.Data?.Result.filter((item: any) => item.ActivityType === 'WareHouse').map((item: any) => ({
      label: item.Name,
      value: item.Id.toString(),
    })) || [];

  const filteredItemTypes =
    PurchaseInvoice?.data?.Data?.Result.filter((item: any) => item.ActivityType === 'ItemType').map((item: any) => ({
      label: item.Name,
      value: item.Id.toString(),
    })) || [];

  const filteredItemNames =
    PurchaseInvoice?.data?.Data?.Result.filter((item: any) => item.ActivityType === 'ItemName').map((item: any) => ({
      label: item.Name,
      value: item.Id.toString(),
    })) || [];

  const filteredItemCategories =
    PurchaseInvoice?.data?.Data?.Result.filter((item: any) => item.ActivityType === 'ItemCategory').map(
      (item: any) => ({
        label: item.Name,
        value: item.Id.toString(),
      })
    ) || [];

  const filteredItemParentCategories =
    PurchaseInvoice?.data?.Data?.Result.filter((item: any) => item.ActivityType === 'ItemParentCategory').map(
      (item: any) => ({
        label: item.Name,
        value: item.Id.toString(),
      })
    ) || [];

  const filteredItemClassGroups =
    PurchaseInvoice?.data?.Data?.Result.filter((item: any) => item.ActivityType === 'ItemClassGroup').map(
      (item: any) => ({
        label: item.Name,
        value: item.Id.toString(),
      })
    ) || [];

  const filteredSuppliers =
    PurchaseInvoice?.data?.Data?.Result.filter((item: any) => item.ActivityType === 'Supplier').map((item: any) => ({
      label: item.Name,
      value: item.Id.toString(),
    })) || [];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TSearchCritariaPurchaseActivity) => {
    refetch().then(() => handleClose());
  };

  const { t } = useTranslation();

  const [, setSelectedActivity] = useAtom(actvitityPAtom);

  const today = dayjs();
  const startOfMonth = today.startOf('month');
  const currentDate = today;

  useEffect(() => {
    setFields([{ name: 'FromDate', value: startOfMonth }]);
    setFields([{ name: 'ToDate', value: currentDate }]);
  }, []);

  const handleFromDateChange = (value: any) => {
    setFields([{ name: 'FromDate', value }]);
  };

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline">
        <Row
          style={{
            marginBottom: '5px',
            width: '100%',
          }}
          className="row-border"
        >
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
            <h2 className="tableTitle">{t('search_criteria')}</h2>
          </Col>
        </Row>
        <Row gutter={CriteriaRowGutter}>
          <Col xs={24} sm={12} md={12} className="formfield">
            <AntDatePicker
              name="FromDate"
              label="From Date"
              bordered={false}
              value={getFieldValue('FromDate')}
              onChange={handleFromDateChange}
            />
          </Col>

          <Col xs={24} sm={12} md={11} className="formfield" offset={1}>
            <AntDatePicker name="ToDate" label="To Date" bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={12} className="formfield">
            <AntInputNumber name="FromDocNo" label={t('from_doc_no')} bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={11} className="formfield" offset={1}>
            <AntInputNumber name="ToDocNo" label={t('to_doc_no')} bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('class_group')}
              name="ItemClassGroup"
              fieldLabel="Name"
              fieldValue="Id"
              options={filteredItemClassGroups}
              // options={map(status, (item: any) => ({
              //   value: item.Id,
              //   label: item.Name,
              // }))}
            />
          </Col>
          <Col xs={24} sm={12} md={11} className="formfield" offset={1}>
            <AntSelectDynamic
              bordered={false}
              label={t('parent_category')}
              name="ParentCategory"
              fieldLabel="Name"
              fieldValue="Id"
              options={filteredItemParentCategories}
            />
          </Col>
          <Col xs={24} sm={12} md={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('item_category')}
              name="ItemCategory"
              fieldLabel="Name"
              fieldValue="Id"
              options={filteredItemCategories}
            />
          </Col>
          <Col xs={24} sm={12} md={11} className="formfield" offset={1}>
            <AntSelectDynamic
              bordered={false}
              label={t('item_type')}
              name="ItemType"
              fieldLabel="Name"
              fieldValue="Id"
              options={filteredItemTypes}
            />
          </Col>

          <Col xs={24} sm={12} md={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('customer')}
              name="Suppliers"
              fieldLabel="Name"
              fieldValue="Id"
              options={filteredSuppliers}
            />
          </Col>
          <Col xs={24} sm={12} md={11} className="formfield" offset={1}>
            <AntSelectDynamic
              bordered={false}
              label={t('item_name')}
              name="ItemName"
              fieldLabel="Name"
              fieldValue="Id"
              options={filteredItemNames}
            />
          </Col>
          <Col xs={24} sm={12} md={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('ware_house')}
              name="WareHouse"
              fieldLabel="Name"
              fieldValue="Id"
              options={filteredWarehouse}
            />
          </Col>
          <Col xs={24} sm={12} md={11} xl={11} xxl={11} className="formfield" offset={1}>
            <AntSelectDynamic
              bordered={false}
              label={t('activity')}
              name="ReportType"
              fieldLabel="type"
              fieldValue="Id"
              // query={useGetPuchaseReportActivities}
              onChange={(value) => setSelectedActivity(value)}
              options={map(ReportType, (item: TReportType) => ({
                value: item.Id,
                label: item.ReportType,
              }))}
              defaultValue={ReportType[0].Id}
            />
          </Col>

          <Row
            style={{
              marginBottom: '5px',
              marginTop: '10px',
              width: '100%',
            }}
          >
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 4 }}>
              <h4 className="">{t('transaction_type')}</h4>
            </Col>

            <Col xs={24} sm={24} md={24} lg={20}>
              <Row
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Col xxl={12} xs={10}>
                  <Radio.Group
                    onChange={handleRadioChange}
                    value={selectedOption}
                    name="PaymentTermId"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Col xs={24} sm={24} md={6} lg={12} >
                      <Radio value="cashPurchase">{t('cash_purchase')}</Radio>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={12}>
                      <Radio value="creditPurchase">{t('credit_purchase')}</Radio>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={12}>
                      <Radio value="purchaseReturn">{t('purchase_return')}</Radio>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={24}>
                      <Radio value="NetTotal">{t('net_total')}</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <Col xs={24} sm={20} md={20} lg={20} xl={24} xxl={24}>
            <Row justify={'end'}>
              <Col xxl={3}>
                <AntButton
                  // className="buttons"
                  htmlType="submit"
                  isError={purchaseError}
                  isLoading={purchaseLoading || purchaseFetching}
                  label={t('Show')}
                />
              </Col>
              <Col xxl={3}>
                <AntButton
                  danger
                  ghost
                  htmlType="reset"
                  label={t('reset')}
                  icon={<SyncOutlined />}
                  style={{ marginLeft: 8 }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteria;
