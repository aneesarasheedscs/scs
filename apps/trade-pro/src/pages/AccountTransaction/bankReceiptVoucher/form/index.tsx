import '../style.scss';
import dayjs from 'dayjs';
import Buttons from './Buttons';
import { isNumber } from 'lodash';
import { useAtom } from 'jotai';
import { addtableData } from './Atom';
import { TSaveBankReceipt } from './types';
import { useEffect, useState } from 'react';
import DynamicForm from './DetailEntryForm';
import { useTranslation } from 'react-i18next';
import { Card, Form, notification } from 'antd';
import { useGetTaxSchedule } from '../queries/queries';
import { useAddBankReceiptVoucher, useUpdateBankReceiptVoucher } from '../queries/querySave';
import MainEntry from '@tradePro/pages/AccountTransaction/bankReceiptVoucher/form/MainEntry';

const { useForm } = Form;

function BankPaymentVoucherForm({
  selectedRecordId,
  setSelectedRecordId,
  addBankReceipt,
  refetchBankReceipt,
  isDataSuccess,
}: TAddUpdateRecord) {
  const [form] = useForm<TSaveBankReceipt>();
  const { t } = useTranslation();
  const DocumentTypeId = 2;
  const [bankId, setBankId] = useState<number | null>(null);
  const [tableData, setTableData] = useAtom(addtableData);
  const [SharedStateIncludeWHT, setSharedStateIncludeWHT] = useState(false);
  const [TaxTypeId, setTaxTypeId] = useState<number | undefined>();
  const [VoucherDate, setVoucherDate] = useState<Date>(new Date());

  const {
    data: getTaxSchedule,
    isSuccess: TaxSuccess,
    refetch: TaxScheduleRefetch,
    isLoading: TaxLoading,
  } = useGetTaxSchedule(VoucherDate, TaxTypeId);
  const handleTaxTypeChange = (TaxId: number) => {
    setTaxTypeId(TaxId);
  };

  useEffect(() => {
    if (SharedStateIncludeWHT) {
      if (VoucherDate && TaxTypeId) {
        TaxScheduleRefetch();
      }
    }
  }, [SharedStateIncludeWHT, VoucherDate, TaxTypeId]);
  const { mutate: addBankReceiptVoucher, data: saveData, isSuccess } = useAddBankReceiptVoucher(DocumentTypeId);
  const { mutate: updateBankReceiptVoucher } = useUpdateBankReceiptVoucher(selectedRecordId, DocumentTypeId);
  const [printPreview, setPrintPreview] = useState(true);
  const AgainstAccountId = form.getFieldValue('AgainstAccountId');
  console.log(AgainstAccountId);

  const onFinish = (values: TSaveBankReceipt) => {
    const AgainstAccountId = form.getFieldValue('AgainstAccountId');

    values.PrintPreview = printPreview;
    const TaxableEntry: any = {};
    if (values.IncludeWHT) {
      TaxableEntry.AccountId = values.RefAccountId;
      TaxableEntry.AgainstAccountId = values.voucherDetailList[0].AgainstAccountId;
      TaxableEntry.TaxTypeId = values.voucherDetailList?.[0]?.TaxTypeId;
      TaxableEntry.IsTaxable = 'True';
      TaxableEntry.Comments =
        'Tax Name' +
        '    ' +
        values.voucherDetailList?.[0]?.TaxName +
        '   ' +
        'Tax %' +
        '   ' +
        values.voucherDetailList?.[0]?.TaxPrcnt;
      TaxableEntry.TaxPrcnt = values.voucherDetailList?.[0]?.TaxPrcnt;
      TaxableEntry.TaxesTotalAmount = values.voucherDetailList?.[0]?.TotalAmount;
      TaxableEntry.CreditAmount = values.voucherDetailList?.[0]?.TaxAmount;
      if (SharedStateIncludeWHT && getTaxSchedule) {
        const updatedData = tableData?.map((item: any) => ({
          ...item,
          AgainstAccountId: AgainstAccountId,
        }));

        values.voucherDetailList = [...updatedData, TaxableEntry];
      } else {
        values.voucherDetailList = values.voucherDetailList && tableData;
      }
    } else {
      values.voucherDetailList = values.voucherDetailList && tableData;
    }

    if (isNumber(selectedRecordId)) {
      updateBankReceiptVoucher(values);
      console.log(values);
    } else if (tableData.length === 0) {
      notification.error({
        message: 'Error',
        description: 'Please enter data in the grid before saving.',
      });
    } else {
      console.log(values);
      addBankReceiptVoucher(values);
    }
  };

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldValue(
        'ChequeDate',
        addBankReceipt?.data?.Data?.Result?.ChequeDate !== null
          ? dayjs(addBankReceipt?.data?.Data?.Result?.ChequeDate)
          : ''
      );
      form.setFieldValue('VoucherDate', dayjs(addBankReceipt?.data?.Data?.Result?.VoucherDate));
      form.setFieldValue('VoucherCode', addBankReceipt?.data?.Data?.Result?.VoucherCode);
      form.setFieldValue('RefAccountId', addBankReceipt?.data?.Data?.Result?.RefAccountId);
      // form.setFieldValue('CheqId', addBankReceipt?.data?.Data?.Result?.CheqId > 0);
      form.setFieldValue('PayeeTitle', addBankReceipt?.data?.Data?.Result?.PayeeTitle);
      // form.setFieldValue('AgainstAccountId', addBankReceipt?.data?.Data?.Result?.AgainstAccountId > 0);
      form.setFieldValue('IncludeWHT', addBankReceipt?.data?.Data?.Result?.IncludeWHT);
      if (addBankReceipt?.data?.Data?.Result?.IncludeWHT === true) {
        setSharedStateIncludeWHT(true);
      }
      form.setFieldValue('Remarks', addBankReceipt?.data?.Data?.Result?.Remarks);
      setBankId(addBankReceipt?.data?.Data?.Result?.RefAccountId);
      form.setFieldValue(
        ['voucherDetailList', 0, 'TaxTypeId'],
        addBankReceipt?.data?.Data?.Result?.voucherDetailList?.[0]?.TaxTypeId > 0
      );
      form.setFieldValue(
        ['voucherDetailList', 0, 'AgainstAccountId'],
        addBankReceipt?.data?.Data?.Result?.voucherDetailList?.[0]?.AgainstAccountId
      );
      const DetailList = addBankReceipt?.data?.Data?.Result?.voucherDetailList.filter(
        (row: any) => row.DebitAmount <= 0
      );
      setTableData(DetailList);
    }
  }, [isDataSuccess]);

  return (
    <Card className="main_card">
      <Form form={form} initialValues={{ remember: true }} layout="horizontal" onFinish={onFinish}>
        <Buttons
          form={form}
          setBankId={setBankId}
          isSuccess={isSuccess}
          saveData={saveData}
          addBankReceipt={addBankReceipt}
          DocumentTypeId={DocumentTypeId}
          selectedRecordId={selectedRecordId}
          setSelectedRecordId={setSelectedRecordId}
          setPrintPreview={setPrintPreview}
          printPreview={printPreview}
          setSharedStateIncludeWHT={setSharedStateIncludeWHT}
        />
        <MainEntry
          form={form}
          setBankId={setBankId}
          setSharedStateIncludeWHT={setSharedStateIncludeWHT}
          SharedStateIncludeWHT={SharedStateIncludeWHT}
          ScheduleData={getTaxSchedule?.data?.Data?.Result?.[0]}
          bankId={bankId}
        />
        <DynamicForm
          form={form}
          bankId={bankId}
          handleTaxTypeChange={handleTaxTypeChange}
          SharedStateIncludeWHT={SharedStateIncludeWHT}
          ScheduleData={getTaxSchedule?.data?.Data?.Result?.[0]}
        />
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  setSelectedRecordId: (id: number | null) => void;
  addBankReceipt: any;
  refetchBankReceipt: any;
  isDataSuccess: any;
};

export default BankPaymentVoucherForm;
