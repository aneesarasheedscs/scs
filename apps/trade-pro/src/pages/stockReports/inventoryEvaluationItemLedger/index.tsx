import { useTranslation } from 'react-i18next';
import InventoryEvaluationLedgerHistory from './table';
import { useAtom } from 'jotai';
import { selectedItems } from '../stockReportwithValues/table/Atom';

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
    <>
      <h2 className="form-heading"> {t('inventory_evaluation_item_ledger')} </h2>

      <InventoryEvaluationLedgerHistory
        FromdateProp={FromdateProp}
        ToDateProp={ToDateProp}
        WarehouseId={WarehouseId}
        ItemId={ItemId}
      />
    </>
  );
}

export default InventoryEvaluationItemLedger;
