import { Card, Form } from 'antd';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import Buttons from './Buttons';
import { addtableData } from './Atom';
import MainEntryForm from './MainEntry';
import DynamicForm from './DetailEntry';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TSaveContraVoucher } from './types';
import { useAddContraVoucher, useUpdateContraVoucher } from '../queries/querySave';

const { useForm } = Form;

function ContraVoucherForm({
  selectedRecordId,
  setSelectedRecordId,
  refetchContra,
  ContraVoucherById,
  isDataSuccess,
}: TAddUpdateRecord) {
  const [form] = useForm<TSaveContraVoucher>();
  const { t } = useTranslation();
  const [bankId, setBankId] = useState<number | null>(null);
  const [printPreview, setPrintPreview] = useState(true);
  const [tableData, setTableData] = useAtom(addtableData);
  const [isTaxable, setIsTaxable] = useState(false);
  const ContraVoucher = ContraVoucherById?.data?.Data?.Result;

  const DocumentTypeId = 10;
  const { mutate: addContraVoucher, isSuccess, data: saveData } = useAddContraVoucher();
  const { mutate: updateContraVoucher } = useUpdateContraVoucher(selectedRecordId);

  const AgainstAccountId = form.getFieldValue('RefAccountId');

  const onFinish = (values: TSaveContraVoucher) => {
    const AgainstAccountId = form.getFieldValue('RefAccountId');
    values.PrintPreview = printPreview;
    const updatedData = tableData?.map((item: any) => ({
      ...item,
      AgainstAccountId: AgainstAccountId,
    }));
    values.voucherDetailList = values.voucherDetailList && updatedData;
    console.log(values);
    // if (isNumber(selectedRecordId)) {
    //   values.voucherDetailList = values.voucherDetailList && voucherDetailList;
    //   updateContraVoucher(values);
    // } else {
    //   values.voucherDetailList = values.voucherDetailList && voucherDetailList;
    //   addContraVoucher(values);
    // }
  };

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldValue('VoucherDate', dayjs(ContraVoucher?.VoucherDate));
      form.setFieldValue('ChequeDate', dayjs(ContraVoucher?.ChequeDate));
      form.setFieldValue('CheqId', ContraVoucher?.CheqId);
      form.setFieldValue('PayTitle', ContraVoucher?.PayTitle);
      form.setFieldValue('AgainstAccountId', ContraVoucher?.AgainstAccountId);
      form.setFieldValue('Remarks', ContraVoucher?.Remarks);
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
  selectedRecordId?: null | number;
  setSelectedRecordId: (Id: number | null) => void;

  refetchContra: any;
  ContraVoucherById: any;

  isDataSuccess: any;
};

export default ContraVoucherForm;
