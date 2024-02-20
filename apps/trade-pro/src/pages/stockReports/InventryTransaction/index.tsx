import { Card, Col, Row, theme } from 'antd';
import { useAtom } from 'jotai';
import InventryTransactionTable from './table';
import { selectedItems } from '../stockReportSimple/table/Atom';
import { useTranslation } from 'react-i18next';
import { BackButton } from '@tradePro/components';
import './style.scss';

function InventryTransactions() {
  const [selectedItem] = useAtom(selectedItems);
  const initialFormValues = {
    FromdateProp: selectedItem?.FromDate,
    ToDateProp: selectedItem?.ToDate,
    ItemId: selectedItem?.ItemId,
    WarehouseId: selectedItem?.WarehouseId,
  };
  const { FromdateProp, ToDateProp, WarehouseId, ItemId } = initialFormValues;
  const { t } = useTranslation();

  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={15} sm={10} md={12} lg={12} xl={20} xxl={16} className="">
          <h1 className="report_heading">{t('inventry_transaction')}</h1>
        </Col>
        <Col xs={3} sm={2} xxl={1} md={2} lg={2} xl={2} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={false} />
        </Col>
      </Row>

      <Row>
        <Col>
          <InventryTransactionTable
            FromdateProp={FromdateProp}
            ToDateProp={ToDateProp}
            WarehouseId={WarehouseId}
            ItemId={ItemId}
          />
        </Col>
      </Row>
    </div>
  );
}

export default InventryTransactions;
