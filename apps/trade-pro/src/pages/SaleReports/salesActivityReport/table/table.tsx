import { AntTable, BackButton } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { useAtom } from 'jotai';
import { useSaleInvoiceTable } from '../query';
import {
  ColumnsSaleDetail,
  columnsItemPurchaseAndSaleSummary,
  columnsSalesByCategory,
  columnsSalesByCategoryAndPackSize,
  columnsSalesByCustomer,
  columnsSalesByCustomerItemAndInvoice,
  columnsSalesByCustomerandItem,
  columnsSalesByItemCategoryandItemType,
  columnsSalesByItemType,
  columnsSalesByPaymentTerm,
  columnsTSalesByInvoices,
} from './columns';
import SearchCriteria from '../searchCriteria.tsx/SearchCriteriaForm';
import { actvititySaleAtom } from '../searchCriteria.tsx/atom';
import { storedFinancialYear } from '@tradePro/utils/storageService';

function SalesActivityTable() {
  const {
    data: Sale,
    isError: SaleError,
    isLoading: SaleLoading,

    isFetching: SaleFetching,
    refetch: SaleRefetch,
  } = useSaleInvoiceTable(true);

  const { t } = useTranslation();

  const [selectedActivity] = useAtom(actvititySaleAtom);
  const selectedColumns = (() => {
    switch (selectedActivity) {
      case 'Sales By Invoices':
        return columnsTSalesByInvoices(t);
      case 'Sales By Customer':
        return columnsSalesByCustomer(t);
      case 'Sales By Customer & Item':
        return columnsSalesByCustomerandItem(t);
      case 'Sales By Customer,Item & Invoice':
        return columnsSalesByCustomerItemAndInvoice(t);
      case 'Sales By Item,Category & Item Type':
        return columnsSalesByItemCategoryandItemType(t);
      case 'Sales By Category':
        return columnsSalesByCategory(t);
      case 'Sales By Item Type':
        return columnsSalesByItemType(t);
      case 'Sales By Payment Terms':
        return columnsSalesByPaymentTerm(t);
      case 'Sales By Category & PackSize':
        return columnsSalesByCategoryAndPackSize(t);
      case 'Item Purchase & Sale Summary':
        return columnsItemPurchaseAndSaleSummary(t);
      default:
        return ColumnsSaleDetail(t);
    }
  })();

  function CriteriaString() {
    return (
      <Row style={{ border: '1px solid #25A7DF', padding: 7, borderRadius: 5 }}>
        <h5> {Sale?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    );
  }

  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={15} sm={10} md={12} lg={12} xl={20} xxl={20} style={{ marginLeft: '0px' }}>
          <h1 className="report_heading">{t('sale_reports')}</h1>
        </Col>
        <Col xs={3} sm={2} xxl={1} md={2} lg={2} xl={2} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={false} />
        </Col>
      </Row>

      <Row justify={'space-around'}>
        <Col xxl={23} xs={23} xl={23} lg={23} sm={23} md={23}>
          <AntTable
            refetch={SaleRefetch}
            isError={SaleError}
            columns={selectedColumns}
            numberOfSkeletons={12}
            isLoading={SaleLoading || SaleFetching}
            data={Sale?.data?.Data?.Result || []}
            searchCriteriaForm={<SearchCriteria />}
            searchCriteriaReport={Sale?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
            scroll={{ x: '', y: convertVhToPixels('62vh') }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default SalesActivityTable;
