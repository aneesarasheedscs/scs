import { AntTable } from '@tradePro/components';
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

  return (
    <>
      <Row
        style={{
          marginBottom: '5px',
          width: '100%',
        }}
        className="row-border"
      >
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
          <h2 className="tableTitle">{t('sale_activity')}</h2>
        </Col>
      </Row>

      <AntTable
        refetch={SaleRefetch}
        isError={SaleError}
        columns={selectedColumns}
        numberOfSkeletons={12}
        isLoading={SaleLoading || SaleFetching}
        data={Sale?.data?.Data?.Result || []}
        searchCriteriaForm={<SearchCriteria />}
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
        footer={() => (
          <>
            {/* <div>
              <Row justify="center" gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6} xl={2}>
                  <p>{t('detail_total')}:</p>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={2}>
                  <p>{numberFormatter(totalSaleQty)}</p>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={2}>
                  <p>{numberFormatter(totalSaleWeight)}</p>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={2}>
                  <p>{numberFormatter(totalSaleAmount)}</p>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={2}>
                  <p>{numberFormatter(totalCgsAmount)}</p>
                </Col>

                <Col xs={24} sm={12} md={8} lg={6} xl={2}>
                  <p>{numberFormatter(totalGrossProfitLosst)}</p>
                </Col>
              </Row>
            </div> */}
          </>
        )}
      />
    </>
  );
}

export default SalesActivityTable;
