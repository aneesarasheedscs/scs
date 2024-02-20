import { useTranslation } from 'react-i18next';
import InventoryEvaluationLedgerHistory from './table';
import { useAtom } from 'jotai';
import { selectedItems } from '../stockReportwithValues/table/Atom';
import './style.scss';
import { Col, Row } from 'antd';
import { BackButton } from '@scs/ui';

function InventoryEvaluationItemLedger() {
  const { t } = useTranslation();
  const [selectedItem] = useAtom(selectedItems);
  const initialFormValues = {
    FromdateProp: selectedItem?.FromDate,
    ToDateProp: selectedItem?.ToDate,
    ItemId: selectedItem?.ItemId,
    WarehouseId: selectedItem?.WarehouseId,
  };

  const { FromdateProp, ToDateProp, WarehouseId, ItemId } = initialFormValues;
  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={10} sm={10} md={12} lg={12} xl={12} xxl={16} className="">
          <h1 className="report_heading">{t('inventry_evaluation_item_ledger')}</h1>
        </Col>
        <Col xs={3} sm={2} xxl={1} md={2} lg={2} xl={2} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={false} />
        </Col>
      </Row>
      <InventoryEvaluationLedgerHistory
        FromdateProp={FromdateProp}
        ToDateProp={ToDateProp}
        WarehouseId={WarehouseId}
        ItemId={ItemId}
      />
    </div>
  );
}

export default InventoryEvaluationItemLedger;
