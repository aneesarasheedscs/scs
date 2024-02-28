import _ from 'lodash';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import Buttons from './Buttons';
import MainEntry from './MainEntry';
import { isNumber } from 'lodash';
import { addtableData } from './Atom';
import DynamicForm from './DetailEntry';
import { useEffect, useState } from 'react';
import { Card, Form, notification } from 'antd';
import { TJournalVoucherData } from '../types';
import { useAddJournalVoucher, useUpdateJournalVoucher } from '../quries';

const { useForm } = Form;

function JournalVoucherForm({
  selectedRecordId,
  setSelectedRecordId,
  journalVoucherData,
  isDataSuccess,
}: TAddUpdateRecord) {
  const [form] = useForm<TJournalVoucherData>();
  const DocumentTypeId = 5;

  const [tableData, setTableData] = useAtom(addtableData);
  const { mutate: addJournalVoucher, isSuccess, data: saveData } = useAddJournalVoucher(DocumentTypeId);
  const { mutate: updateJournalVoucher, data: updateData } = useUpdateJournalVoucher(selectedRecordId, DocumentTypeId);
  const [printPreview, setPrintPreview] = useState(true);
  const [validate, setValidate] = useState<boolean>(false);
  const VoucherDate = form.getFieldValue('VoucherDate');

  const onFinish = (values: TJournalVoucherData) => {
    values.voucherDetailList = tableData;
    console.log(values);
    const TotalDebit: number = _.sumBy(values?.voucherDetailList, 'DebitAmount');
    const TotalCredit: number = _.sumBy(values?.voucherDetailList, 'CreditAmount');
    if (TotalDebit !== TotalCredit) {
      notification.error({ message: 'Credit And Debit Side not equal' });
    }
    values.VoucherAmount = TotalDebit;
    if (isNumber(selectedRecordId)) {
      updateJournalVoucher(values);
    } else {
      if (!validate) {
        console.log(values);
        addJournalVoucher(values);
      }
    }
  };

  useEffect(() => {
    const VoucherDate = form.getFieldValue('VoucherDate');
    if (VoucherDate === null) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  }, [form, validate, VoucherDate]);
  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldValue('VoucherDate', dayjs(new Date()));
      form.setFieldValue('VoucherCode', journalVoucherData?.data?.Data?.Result?.VoucherCode);
      form.setFieldValue('Remarks', journalVoucherData?.data?.Data?.Result?.Remarks);
      setTableData(journalVoucherData?.data?.Data?.Result?.voucherDetailList);
    }
  }, [isDataSuccess]);

  return (
    <>
      <Card>
        <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 25 }}>
          <Buttons
            form={form}
            isSuccess={isSuccess}
            saveData={saveData}
            updateData={updateData}
            journalVoucherData={journalVoucherData}
            DocumentTypeId={DocumentTypeId}
            selectedRecordId={selectedRecordId}
            setSelectedRecordId={setSelectedRecordId}
            setPrintPreview={setPrintPreview}
            printPreview={printPreview}
          />
          <MainEntry form={form} validate={validate} />
          <DynamicForm form={form} />
        </Form>
      </Card>
    </>
  );
}
type TAddUpdateRecord = {
  selectedRecordId: number | null;
  setSelectedRecordId: (id: number | null) => void;
  journalVoucherData: any;
  isDataSuccess: boolean;
};
export default JournalVoucherForm;
