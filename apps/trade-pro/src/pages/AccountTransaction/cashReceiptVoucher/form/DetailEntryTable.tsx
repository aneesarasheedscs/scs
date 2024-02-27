import { useAtom } from 'jotai';
import { TFunction } from 'i18next';
import { addtableData } from './Atom';
import { AntTable } from '@tradePro/components';
import { Col, FormInstance, Row } from 'antd';
import { TCashReceiptDetailEntry } from './types';
import { detailEntrycolumns } from '../table/columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function DetailEntryTable({ form, t, setIsEditMode, setEdit, setRefAccountId }: TDetailEntryProps) {
  const [tableData, setTableData] = useAtom(addtableData);
  const handleDeleteRow = (record: TCashReceiptDetailEntry) => {
    console.log(record);
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.CheqId !== record.CheqId);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  const handleEditRow = (record: TCashReceiptDetailEntry) => {
    form.setFieldValue(['voucherDetailList', 0], record);
    setIsEditMode(true);
    setEdit(record);
    setRefAccountId(record?.AccountId);
  };
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
          <AntTable
            numberOfSkeletons={12}
            scroll={{ x: '', y: convertVhToPixels('18vh') }}
            data={tableData || []}
            columns={detailEntrycolumns(t, handleDeleteRow, handleEditRow)}
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
  setEdit: (record: TCashReceiptDetailEntry) => void;
  setRefAccountId: (id: number) => void;
}
