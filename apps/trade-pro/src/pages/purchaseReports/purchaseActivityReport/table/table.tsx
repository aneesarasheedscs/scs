import { AntTable ,BackButton} from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { useAtom } from 'jotai';
import { usePurchaseInvoiceTable } from '../query';
import {
  ColumnsDetail,
  columnsPurchaseByCategory,
  columnsPurchaseByCategoryandPackSize,
  columnsPurchaseByInvoicesSupplier,
  columnsPurchaseByItemCategoryItemType,
  columnsPurchaseByItemType,
  columnsPurchaseByPaymentTerms,
  columnsPurchaseBySupplier,
  columnsPurchaseBySupplierItem,
} from './columns';
import SearchCriteria from '../searchCriteria.tsx/SearchCriteriaForm';
import { actvitityPAtom } from '../searchCriteria.tsx/atom';
import { useEffect, useState } from 'react';

function PurchaseTable() {
  const {
    data: Purchase,
    isError: PurchaseError,
    isLoading: PurchaseLoading,

    isFetching: PurchaseFetching,
    refetch: PurchaseRefetch,
  } = usePurchaseInvoiceTable(true);
  console.log(Purchase?.data?.Data?.Result, 'puchase');

  const { t } = useTranslation();

  const [selectedActivity] = useAtom(actvitityPAtom);
  const selectedColumns = (() => {
    switch (selectedActivity) {
      case 'Purchase By Invoices & Supplier':
        return columnsPurchaseByInvoicesSupplier(t);
      case 'Purchase By Supplier':
        return columnsPurchaseBySupplier(t);
      case 'Purchase By Supplier & Item':
        return columnsPurchaseBySupplierItem(t);
      case 'Purchase By Item,Category & Item Type':
        return columnsPurchaseByItemCategoryItemType(t);
      case 'Purchase By Category':
        return columnsPurchaseByCategory(t);
      case 'Purchase By Item Type':
        return columnsPurchaseByItemType(t);
      case 'Purchase By Payment Terms':
        return columnsPurchaseByPaymentTerms(t);
      case 'Purchase By Category & PackSize':
        return columnsPurchaseByCategoryandPackSize(t);

      default:
        return ColumnsDetail(t);
    }
  })();

  const ReportCriteriaa = Purchase?.data?.Data?.Result;

  const ReportCriteriaArray = Purchase?.data?.Data?.Result?.[0]?.ReportCriteria;

  function CriteriaString() {
    return (
      <Row  style={{ border: '1px solid #25A7DF', padding: 7, borderRadius: 5 }}>
        <h5> {Purchase?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    );
  }

  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={12} sm={10} md={12} lg={12} xl={14} xxl={16} className="forms-heading-container">
          <h1 className="report_heading">{t('purchase_activity')}</h1>
        </Col>

        <Col xxl={1} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={true} />
        </Col>
      </Row>

      <Row justify={'space-around'}>
        <Col xl={23} xxl={23} xs={23} md={23} lg={23} sm={23} style={{ marginTop: '10px' }}>
      <AntTable
        refetch={PurchaseRefetch}
        isError={PurchaseError}
        columns={selectedColumns}
        numberOfSkeletons={12}
        isLoading={PurchaseLoading || PurchaseFetching}
        data={Purchase?.data?.Data?.Result || []}
        searchCriteriaForm={<SearchCriteria />}
        searchCriteriaReport={Purchase?.data?.Data?.Result?.[0]?.ReportCriteria  ? <CriteriaString/> : ''}
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
        footer={() => <></>}
          />
                </Col>
              </Row>
    </div>
  );
}

export default PurchaseTable;
