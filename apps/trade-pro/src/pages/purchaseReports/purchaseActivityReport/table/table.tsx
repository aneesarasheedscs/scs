import { AntTable } from '@tradePro/components';
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

function PurchaseTable() {
  const {
    data: Purchase,
    isError: PurchaseError,
    isLoading: PurchaseLoading,

    isFetching: PurchaseFetching,
    refetch: PurchaseRefetch,
  } = usePurchaseInvoiceTable(true);
  console.log(Purchase?.data?.Data?.Result);
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
          <h2 className="tableTitle">{t('purchase_activity')}</h2>
        </Col>
      </Row>

      <AntTable
        refetch={PurchaseRefetch}
        isError={PurchaseError}
        columns={selectedColumns}
        numberOfSkeletons={12}
        isLoading={PurchaseLoading || PurchaseFetching}
        data={Purchase?.data?.Data?.Result || []}
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

export default PurchaseTable;
