import { columns } from './column';
import { useAtom } from 'jotai';
import { TFunction } from 'i18next';
import { AntTable } from '@tradePro/components';
import { Col, FormInstance, Row } from 'antd';
import { addtableData, deleteData, newTableData } from './Atom';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { InvStockAdjustmentDetail } from '../types';

function DetailEntryTable({ form, t, setIsEditMode, setEdit }: TDetailEntryProps) {
  const [tableData, setTableData] = useAtom(addtableData);
  const [delettableData, setDeleteTableData] = useAtom(deleteData);
  const [newtableData, setNewTableData] = useAtom(newTableData);
  const handleDeleteRow = (record: InvStockAdjustmentDetail) => {
    if (record?.Id > 0) {
      const recordsToDelete = Array.isArray(record) ? record : [record];
      setDeleteTableData((prevData) => [...prevData, ...recordsToDelete]);
    }
    console.log(record);
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.Id !== record?.Id || item.Id !== record?.Id);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
    setNewTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.LineId !== record?.Id || item.Id !== record?.Id);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  const handleEditRow = (record: InvStockAdjustmentDetail) => {
    setEdit(record);
    setTableData((prevData: any[]) => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex((item: any) => item.Id === record?.Id);
      if (rowIndex !== -1) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          Id: record?.Id,
          ItemId: record?.ItemId,
          Item: record?.ItemName,
          PackUom: record.PackUom,
          Qty: record.Qty,
          ItemRate: record.ItemRate,
          NetWeight: record.NetWeight,
          Amount: record.Amount,
          RemarksDetail: record.RemarksDetail,
          WarehouseId: record.WarehouseId,
          WareHouseName: record.WareHouseName,
          PackUomId: record.PackUomId,
          RateUomId: record.RateUomId,
          DebitAccountId: record.DebitAccountId,
          ActionTypeId: 1,
          RateUom: record.RateUom,
          AccountTitle: record.AccountTitle,
        };

        form.setFieldValue(['InvStockAdjustmentDetailslist', 0], updatedData[rowIndex]);
        setIsEditMode(true);
      }
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
          <AntTable
            numberOfSkeletons={12}
            scroll={{ x: '', y: convertVhToPixels('18vh') }}
            data={tableData || []}
            columns={columns(t, handleDeleteRow, handleEditRow)}
          />
        </Col>
      </Row>
    </>
  );
}

export default DetailEntryTable;
interface TDetailEntryProps {
  form: FormInstance;
  t: TFunction;
  setIsEditMode: (id: boolean) => void;
  setEdit: (record: InvStockAdjustmentDetail) => void;
}
