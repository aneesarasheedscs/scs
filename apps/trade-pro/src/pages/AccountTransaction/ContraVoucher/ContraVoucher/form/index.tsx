import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { isNumber } from 'lodash';
import Buttons from './Buttons';
import MainEntryForm from './MainEntry';
import DynamicForm from './DetailEntry';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TSaveContraVoucher } from './types';
import { Card, Form, notification } from 'antd';
import { addtableData, dataforCreditAmount } from './Atom';
import { useAddContraVoucher, useUpdateContraVoucher } from '../queries/querySave';

const { useForm } = Form;

function ContraVoucherForm({
  selectedRecordId,
  setSelectedRecordId,
  ContraVoucherById,
  isDataSuccess,
}: TAddUpdateRecord) {
  const [form] = useForm<TSaveContraVoucher>();
  const { t } = useTranslation();
  const [bankId, setBankId] = useState<number | null>(null);
  const [printPreview, setPrintPreview] = useState(true);
  const [tableData, setTableData] = useAtom(addtableData);
  const [taableDataforCreditAmount, setTableDataforCreditAmount] = useAtom(dataforCreditAmount);

  const ContraVoucher = ContraVoucherById?.data?.Data?.Result;

  const DocumentTypeId = 10;
  const { mutate: addContraVoucher, isSuccess, data: saveData } = useAddContraVoucher(DocumentTypeId);
  const { mutate: updateContraVoucher, data: updateData } = useUpdateContraVoucher(selectedRecordId, DocumentTypeId);

  const onFinish = (values: TSaveContraVoucher) => {
    const AgainstAccountId = form.getFieldValue('RefAccountId');
    values.PrintPreview = printPreview;
    const updatedData = tableData?.map((item: any) => ({
      ...item,
      AgainstAccountId: AgainstAccountId,
    }));
    const combinedData = [...updatedData, ...taableDataforCreditAmount];
    values.voucherDetailList = values.voucherDetailList && combinedData;
    console.log(values);

    if (isNumber(selectedRecordId)) {
      if (tableData.length === 0) {
        notification.error({
          message: 'Error',
          description: 'Please Enter Data in the Grid before Update!',
        });
      } else {
        console.log(values);
        updateContraVoucher(values);
      }
    } else {
      if (tableData.length === 0) {
        notification.error({
          message: 'Error',
          description: 'Please Enter Data in the Grid before Save!',
        });
      } else {
        console.log(values);
        addContraVoucher(values);
      }
    }
  };

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldValue('VoucherDate', dayjs(new Date()));
      form.setFieldValue('ChequeDate', dayjs(new Date()));
      form.setFieldValue('VoucherCode', ContraVoucher?.VoucherCode);
      form.setFieldValue('CheqId', ContraVoucher?.CheqId);
      form.setFieldValue('PayTitle', ContraVoucher?.PayTitle);
      form.setFieldValue('RefAccountId', ContraVoucher?.RefAccountId);
      setBankId(ContraVoucher?.RefAccountId);
      form.setFieldValue('Remarks', ContraVoucher?.Remarks);
      const DetailList = ContraVoucher?.voucherDetailList.filter((row: any) => row.DebitAmount > 0);
      setTableData(DetailList);
      const DetailListCredit = ContraVoucher?.voucherDetailList.filter((row: any) => row.CreditAmount > 0);
      setTableDataforCreditAmount(DetailListCredit);
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
          ContraVoucher={ContraVoucher}
          DocumentTypeId={DocumentTypeId}
          selectedRecordId={selectedRecordId}
          setSelectedRecordId={setSelectedRecordId}
          setPrintPreview={setPrintPreview}
          printPreview={printPreview}
        />
        <MainEntryForm form={form} setBankId={setBankId} bankId={bankId} />
        <DynamicForm form={form} />
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId: null | number;
  setSelectedRecordId: (Id: number | null) => void;
  ContraVoucherById: any;
  isDataSuccess: boolean;
};

export default ContraVoucherForm;
