import { AntButton, AntDatePicker, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { SearchCriteriaWrapper } from './seachCriteriaModal';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { Radio } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { actvititySaleAtom } from './atom';
import { useGetSaleInvoice, useSaleInvoiceTable } from '../query';
import { TSearchCritariaSaleActivity } from '../types';
import { map } from 'lodash';
import dayjs from 'dayjs';
import { storedFinancialYear } from '@tradePro/utils/storageService';

const { useForm, useWatch } = Form;

function SearchCriteria() {
  const financialYear = storedFinancialYear();

  const FromDate = dayjs(financialYear?.Start_Period);
  const ToDate = dayjs(new Date());
  const { data: SaleInvoice } = useGetSaleInvoice();

  interface TReportType {
    Id: string;
    ReportType: string;
  }

  const ReportType: TReportType[] = [
    { Id: 'Sales By Detail', ReportType: 'Sales By Detail' },
    { Id: 'Sales By Invoices', ReportType: 'Sales By Invoices' },
    { Id: 'Sales By Customer', ReportType: 'Sales By Customer' },
    { Id: 'Sales By Customer & Item', ReportType: 'Sales By Customer & Item' },
    { Id: 'Sales By Customer,Item & Invoice', ReportType: 'Sales By Customer,Item & Invoice' },
    { Id: 'Sales By Category', ReportType: 'Sales By Category' },
    { Id: 'Sales By Item,Category & Item Type', ReportType: 'Sales By Item,Category & Item Type' },
    { Id: 'Sales By Item Type', ReportType: 'Sales By Item Type' },
    { Id: 'Sales By Payment Terms', ReportType: 'Sales By Payment Terms' },
    { Id: 'Sales By Category & PackSize', ReportType: 'Sales By Category & PackSize' },
    { Id: 'Item Purchase & Sale Summary', ReportType: 'Item Purchase & Sale Summary' },
  ];

  const [selectedOption, setSelectedOption] = useState('NetTotal');

  const handleRadioChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  const [open, setOpen] = useState(false);
  const [form] = useForm<TSearchCritariaSaleActivity>();
  const { setFields, getFieldValue } = form;

  const {
    data: purchase,
    isError: saleError,
    isLoading: saleLoading,

    isFetching: saleFetching,
    refetch,
  } = useSaleInvoiceTable(true, form.getFieldsValue(), selectedOption);

  const filteredWarehouse =
    SaleInvoice?.data?.Data?.Result.filter((item: any) => item.Activity === 'WareHouse').map((item: any) => ({
      label: item.ReferenceName,
      value: item.Id.toString(),
    })) || [];

  const filteredItemTypes =
    SaleInvoice?.data?.Data?.Result.filter((item: any) => item.Activity === 'ItemType').map((item: any) => ({
      label: item.ReferenceName,
      value: item.Id.toString(),
    })) || [];

  const filteredItemNames =
    SaleInvoice?.data?.Data?.Result.filter((item: any) => item.Activity === 'ItemName').map((item: any) => ({
      label: item.ReferenceName,
      value: item.Id.toString(),
    })) || [];

  const filteredItemCategories =
    SaleInvoice?.data?.Data?.Result.filter((item: any) => item.Activity === 'ItemCategory').map((item: any) => ({
      label: item.ReferenceName,
      value: item.Id.toString(),
    })) || [];

  const filteredItemParentCategories =
    SaleInvoice?.data?.Data?.Result.filter((item: any) => item.Activity === 'ItemParentCategory').map((item: any) => ({
      label: item.ReferenceName,
      value: item.Id.toString(),
    })) || [];

  const filteredItemClassGroups =
    SaleInvoice?.data?.Data?.Result.filter((item: any) => item.Activity === 'ItemClassGroup').map((item: any) => ({
      label: item.ReferenceName,
      value: item.Id.toString(),
    })) || [];

  const filteredSuppliers =
    SaleInvoice?.data?.Data?.Result.filter((item: any) => item.Activity === 'Supplier').map((item: any) => ({
      label: item.ReferenceName,
      value: item.Id.toString(),
    })) || [];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TSearchCritariaSaleActivity) => {
    refetch().then(() => handleClose());
  };

  const { t } = useTranslation();

  const [, setSelectedActivity] = useAtom(actvititySaleAtom);

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={{ FromDate, ToDate }}>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={12} md={12} className="formfield">
            <AntDatePicker name="FromDate" label="From Date" bordered={false} />
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
              fieldLabel="ReferenceName"
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
              fieldLabel="ReferenceName"
              fieldValue="Id"
              options={filteredItemParentCategories}
            />
          </Col>
          <Col xs={24} sm={12} md={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('item_category')}
              name="ItemCategory"
              fieldLabel="ReferenceName"
              fieldValue="Id"
              options={filteredItemCategories}
            />
          </Col>
          <Col xs={24} sm={12} md={11} className="formfield" offset={1}>
            <AntSelectDynamic
              bordered={false}
              label={t('item_type')}
              name="ItemType"
              fieldLabel="ReferenceName"
              fieldValue="Id"
              options={filteredItemTypes}
            />
          </Col>

          <Col xs={24} sm={12} md={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('customer')}
              name="Suppliers"
              fieldLabel="ReferenceName"
              fieldValue="Id"
              options={filteredSuppliers}
            />
          </Col>
          <Col xs={24} sm={12} md={11} className="formfield" offset={1}>
            <AntSelectDynamic
              bordered={false}
              label={t('item_name')}
              name="ItemName"
              fieldLabel="ReferenceName"
              fieldValue="Id"
              options={filteredItemNames}
            />
          </Col>
          <Col xs={24} sm={12} md={12} className="formfield">
            <AntSelectDynamic
              bordered={false}
              label={t('ware_house')}
              name="WareHouse"
              fieldLabel="ReferenceName"
              fieldValue="Id"
              options={filteredWarehouse}
            />
          </Col>
          <Col xs={24} sm={12} md={11} className="formfield" offset={1}>
            <AntSelectDynamic
              bordered={false}
              label={t('activity')}
              name="ReportType"
              fieldLabel="type"
              fieldValue="Id"
              onChange={(value) => setSelectedActivity(value)}
              options={map(ReportType, (item: TReportType) => ({
                value: item.Id,
                label: item.ReportType,
              }))}
              defaultValue={ReportType[0].Id}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={21}>
            <p>{t('transaction_type')}:</p>
          </Col>
          <Col xs={24} sm={24} md={12} lg={21}>
            <Radio.Group onChange={handleRadioChange} value={selectedOption} name="PaymenetTermId">
              <Col xs={24} sm={24} md={12} lg={24}>
                <Radio value="cashSale">{t('cash_sale')}</Radio>
              </Col>
              <Col xs={24} sm={24} md={12} lg={24}>
                <Radio value="creditSale">{t('credit_sale')}</Radio>
              </Col>
              <Col xs={24} sm={24} md={12} lg={24}>
                <Radio value="saleReturn">{t('sale_return')}</Radio>
              </Col>
              <Col xs={24} sm={24} md={12} lg={22}>
                <Radio value="NetTotal">{t('net_total')}</Radio>
              </Col>
            </Radio.Group>
          </Col>
          <Col xs={24} sm={20} md={20} lg={20} xl={24} xxl={24}>
            <AntButton
              className="buttons"
              htmlType="submit"
              style={{ marginTop: 4 }}
              isError={saleError}
              isLoading={saleLoading || saleFetching}
              label={t('show')}
            />
            <AntButton className="buttons" danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteria;
