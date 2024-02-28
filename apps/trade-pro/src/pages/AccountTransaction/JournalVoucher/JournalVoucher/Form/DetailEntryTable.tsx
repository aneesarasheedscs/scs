import { useAtom } from 'jotai';
import { addtableData } from './Atom';
import { detailcolumns } from './column';
import { TVoucherDetailList } from '../types';
import { useTranslation } from 'react-i18next';
import { Col, FormInstance, Row } from 'antd';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function DetailEntryTable({ form, setIsEditMode, setEdit }: TDetailEntryProps) {
  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);

  const handleDeleteRow = (record: TVoucherDetailList) => {
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter(
        (item: any) => item.LineId !== record.LineId && item.LineId !== record.LineId - 1
      );
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  const handleEditRow = (record: TVoucherDetailList) => {
    console.log(record);
    setEdit(record);
    setTableData((prevData: any[]) => {
      const editedRowIndex = prevData.findIndex((item: any) => item.LineId === record.LineId);

      if (editedRowIndex >= 0) {
        const currentRow = { ...prevData[editedRowIndex] };

        if (editedRowIndex > 0) {
          const aboveRow = { ...prevData[editedRowIndex - 1] };
          form.setFieldValue(['voucherDetailList', 0, 'AccountIdD'], aboveRow.AccountId);
          form.setFieldValue(['voucherDetailList', 0, 'AccountTitleD'], aboveRow.AccountTitle);
        } else {
          form.setFieldValue(['voucherDetailList', 0, 'AccountIdD'], '');
          form.setFieldValue(['voucherDetailList', 0, 'AccountTitleD'], '');
        }

        form.setFieldValue(['voucherDetailList', 0, 'AccountIdC'], currentRow.AccountId);
        form.setFieldValue(['voucherDetailList', 0, 'AccountTitleC'], currentRow.AccountTitle);
        form.setFieldValue(['voucherDetailList', 0, 'CheqNoDetail'], record.CheqNoDetail);
        form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], record.CreditAmount);
        form.setFieldValue(['voucherDetailList', 0, 'Comments'], record.Comments);
      }

      setIsEditMode(true);
      console.log('New tableData:', prevData);
      return prevData;
    });
  };

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
          <>
            <AntTable
              numberOfSkeletons={12}
              scroll={{ x: '', y: convertVhToPixels('20vh') }}
              data={tableData || []}
              columns={detailcolumns(t, handleDeleteRow, handleEditRow)}
            />
          </>
        </Col>
      </Row>
    </>
  );
}

interface TDetailEntryProps {
  form: FormInstance;
  setIsEditMode: (id: boolean) => void;
  setEdit: (record: TVoucherDetailList) => void;
}

export default DetailEntryTable;
