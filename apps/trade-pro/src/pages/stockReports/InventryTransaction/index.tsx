import { Card, theme } from 'antd';
import { useAtom } from 'jotai';
import InventryTransactionTable from './table';
import { selectedItems } from '../stockReportSimple/table/Atom';
import { useTranslation } from 'react-i18next';

function InventryTransactions() {
  const [selectedItem] = useAtom(selectedItems);
  const initialFormValues = {
    FromdateProp: selectedItem?.FromDate,
    ToDateProp: selectedItem?.ToDate,
    ItemId: selectedItem?.ItemId,
    WarehouseId: selectedItem?.WarehouseId,
  };

  const { FromdateProp, ToDateProp, WarehouseId, ItemId } = initialFormValues;

  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { t } = useTranslation();
  const formHeading = {
    fontFamily: 'Times New Roman',
    borderRadius: '5px',
    padding: '5px',
    boxShadow: '2px 4px 12px 1px gray',
    marginBottom: '7px',
    fontSize: '1.8rem',
  };
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>{t('inventry_transaction')}</h2>

      {/* <Card style={{ background: 'transparent' }}> */}
      <InventryTransactionTable
        FromdateProp={FromdateProp}
        ToDateProp={ToDateProp}
        WarehouseId={WarehouseId}
        ItemId={ItemId}
      />
      {/* </Card> */}
    </>
  );
}

export default InventryTransactions;
