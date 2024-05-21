import { AntTablecopy } from '@scs/ui';
import React from 'react';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { TAccountsPrematureReceiptsList } from '../types';
import { FormInstance } from 'antd';
import dayjs from 'dayjs';

function EntryTable({ form, tableData, setTableData }: Props) {
  const { t } = useTranslation();
  // const [tableData, setTableData] = useAtom(addtableData);
  const handleDeleteRow = (record: TAccountsPrematureReceiptsList) => {
    console.log(record);
    setTableData((prevData: TAccountsPrematureReceiptsList[]) => {
      const updatedData = prevData.filter((item: any) => item.ChequeNo !== record.ChequeNo);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  const handleEditRow = (record: TAccountsPrematureReceiptsList) => {
    // setEdit(record);
    setTableData((prevData: any[]) => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex((item: any) => item.ChequeNo === record.ChequeNo);

      if (rowIndex !== -1) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          // AccountIdDebit: record.AccountTitle,
          // JobLotId: record.JobLotDescription,
          // DebitAmount: record.DebitAmount,
          ChequeDate: dayjs(record.ChequeDate),
          // CheqNoDetail: record.CheqNoDetail,
          // PayeeTitle: record.PayeeTitle,
          // Comments: record.Comments,
        };
        // form.setFieldValue(['voucherDetailList', 0], updatedData[rowIndex]);
        form.setFieldsValue(updatedData[rowIndex]);
        // setIsEditMode(true);
      }
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  return (
    <>
      <AntTablecopy
        showDefaultTableGrid={true}
        data={tableData || []}
        columns={columns(t, handleDeleteRow, handleEditRow)}
        scroll={{ x: '', y: convertVhToPixels('20vh') }}
      />
    </>
  );
}

export default EntryTable;
interface Props {
  form: FormInstance;
  tableData: TAccountsPrematureReceiptsList[];
  setTableData: (ary: TAccountsPrematureReceiptsList[] | any) => void;
}
