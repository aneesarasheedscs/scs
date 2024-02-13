import '../style.scss';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import Buttons from './Buttons';
import { isNumber } from 'lodash';
import MainEntry from './MainEntry';
import { Card, Form, notification } from 'antd';
import DynamicForm from './DetailEntry';
import { useEffect, useState } from 'react';
import { addtableData } from './Atom';
import { useTranslation } from 'react-i18next';
import { TSaveExpenseVoucher } from './types';
import { useAddExpenseVoucher, useUpdateExpenseVoucher } from '../queries/querySave';

const { useForm } = Form;

function ExpenseVoucherForm({
  selectedRecordId,
  setSelectedRecordId,
  refetchExpense,
  ExpenseVoucherById,
  isDataSuccess,
}: TAddUpdateRecord) {
  const [form] = useForm<TSaveExpenseVoucher>();
  const { t } = useTranslation();
  const [bankId, setBankId] = useState<number | null>(null);
  const [printPreview, setPrintPreview] = useState(true);
  const [tableData, setTableData] = useAtom(addtableData);
  const ExpenseVoucherData = ExpenseVoucherById?.data?.Data?.Result;

  const DocumentTypeId = 26;
  const { mutate: addExpenseVoucher, isSuccess, data: saveData } = useAddExpenseVoucher(DocumentTypeId);
  const { mutate: updateExpenseVoucher, data: updateData } = useUpdateExpenseVoucher(selectedRecordId, DocumentTypeId);

  const onFinish = (values: TSaveExpenseVoucher) => {
    const AgainstAccountId = form.getFieldValue('RefAccountId');
    values.PrintPreview = printPreview;
    const updatedData = tableData?.map((item: any) => ({
      ...item,
      AgainstAccountId: AgainstAccountId,
    }));
    values.voucherDetailList = values.voucherDetailList && updatedData;
    console.log(values);

    if (isNumber(selectedRecordId)) {
      if (tableData.length === 0) {
        notification.error({
          message: 'Error',
          description: 'Please Enter Data in the Grid before Update!',
        });
      } else {
        updateExpenseVoucher(values);
      }
    } else {
      if (tableData.length === 0) {
        notification.error({
          message: 'Error',
          description: 'Please Enter Data in the Grid before Save!',
        });
      } else {
        addExpenseVoucher(values);
      }
    }
  };

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldValue('VoucherDate', dayjs(new Date()));
      form.setFieldValue('ChequeDate', dayjs(new Date()));
      form.setFieldValue('VoucherCode', ExpenseVoucherData?.VoucherCode);
      form.setFieldValue('CheqId', ExpenseVoucherData?.CheqId);
      form.setFieldValue('PayTitle', ExpenseVoucherData?.PayTitle);
      form.setFieldValue('RefAccountId', ExpenseVoucherData?.RefAccountId);
      setBankId(ExpenseVoucherData?.RefAccountId);
      form.setFieldValue('Remarks', ExpenseVoucherData?.Remarks);
      const DetailList = ExpenseVoucherData?.voucherDetailList.filter((row: any) => row.DebitAmount > 0);
      setTableData(DetailList);
    }
  }, [isDataSuccess]);

  return (
    <Card className="main_card">
      <Form initialValues={{ remember: true }} form={form} layout="horizontal" onFinish={onFinish}>
        <Buttons
          form={form}
          setBankId={setBankId}
          isSuccess={isSuccess}
          saveData={saveData}
          updateData={updateData}
          ExpenseVoucherById={ExpenseVoucherById}
          DocumentTypeId={DocumentTypeId}
          selectedRecordId={selectedRecordId}
          setSelectedRecordId={setSelectedRecordId}
          setPrintPreview={setPrintPreview}
          printPreview={printPreview}
        />
        <MainEntry form={form} setBankId={setBankId} bankId={bankId} />
        <DynamicForm form={form} />
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  setSelectedRecordId: (Id: number | null) => void;
  refetchExpense: any;
  ExpenseVoucherById: any;
  isDataSuccess: any;
};
export default ExpenseVoucherForm;
