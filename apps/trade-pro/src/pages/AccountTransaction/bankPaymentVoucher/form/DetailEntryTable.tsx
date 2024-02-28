import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { TFunction } from 'i18next';
import { addtableData } from './Atom';
import { AntTable } from '@tradePro/components';
import { Col, FormInstance, Row } from 'antd';
import { TBankPaymentDetailEntry } from './types';
import { detailEntrycolumn } from '../table/columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function DetailEntryTable({ form, t, setIsEditMode, setEdit }: TDetailEntryProps) {
  const [tableData, setTableData] = useAtom(addtableData);
  const handleDeleteRow = (record: TBankPaymentDetailEntry) => {
    console.log(record);
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.CheqId !== record.CheqId);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  const handleEditRow = (record: TBankPaymentDetailEntry) => {
    setEdit(record);
    setTableData((prevData: any[]) => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex((item: any) => item.CheqId === record.CheqId);

      if (rowIndex !== -1) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          AccountIdDebit: record.AccountTitle,
          JobLotId: record.JobLotDescription,
          DebitAmount: record.DebitAmount,
          DCheqDate: dayjs(record.DCheqDate),
          CheqNoDetail: record.CheqNoDetail,
          PayeeTitle: record.PayeeTitle,
          Comments: record.Comments,
        };
        form.setFieldValue(['voucherDetailList', 0], updatedData[rowIndex]);
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
            columns={detailEntrycolumn(t, handleDeleteRow, handleEditRow)}
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
  setEdit: (record: TBankPaymentDetailEntry) => void;
}
