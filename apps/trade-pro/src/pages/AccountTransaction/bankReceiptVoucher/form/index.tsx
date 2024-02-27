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

  isDataSuccess,
}: TAddUpdateRecord) {
  const [form] = useForm<TSaveBankReceipt>();
  const { t } = useTranslation();
  const DocumentTypeId = 4;
  const [bankId, setBankId] = useState<number | null>(null);
  const [tableData, setTableData] = useAtom(addtableData);
  const [SharedStateIncludeWHT, setSharedStateIncludeWHT] = useState<boolean>(false);
  const [TaxTypeId, setTaxTypeId] = useState<number | undefined>();
  const [printPreview, setPrintPreview] = useState<boolean>(true);
  const [VoucherDate, setVoucherDate] = useState<Date>(new Date());
  const BankReceiptGetById = addBankReceipt?.data?.Data?.Result;
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
  const { mutate: updateBankReceiptVoucher, data: updateData } = useUpdateBankReceiptVoucher(
    selectedRecordId,
    DocumentTypeId
  );
  const handleAddBankReceipt = (values: TSaveBankReceipt) => {
    values.PrintPreview = printPreview;
    const AgainstAccountId = form.getFieldValue('AgainstAccountId');
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
    if (values.voucherDetailList?.[0] === null || values.voucherDetailList.length === 0) {
      const message = 'Please fill Detail!';
      notification.error({ message: message });
      return;
    }
    addBankReceiptVoucher(values);
  };

  const handleUpdateBankReceipt = (values: TSaveBankReceipt) => {
    values.PrintPreview = printPreview;
    const AgainstAccountId = form.getFieldValue('AgainstAccountId');
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
    if (values.voucherDetailList?.[0] === null || values.voucherDetailList.length === 0) {
      const message = 'Please fill Detail!';
      notification.error({ message: message });
      return;
    }
    updateBankReceiptVoucher(values);
  };

  const onFinish = (values: TSaveBankReceipt) => {
    values.PrintPreview = printPreview;
    if (isNumber(selectedRecordId)) {
      handleUpdateBankReceipt(values);
      console.log(values);
    } else {
      console.log(values);
      handleAddBankReceipt(values);
    }
  };

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldValue('ChequeDate', dayjs(new Date()));
      form.setFieldValue('VoucherDate', dayjs(new Date()));
      form.setFieldValue('VoucherCode', BankReceiptGetById?.VoucherCode);
      form.setFieldValue('RefAccountId', BankReceiptGetById?.RefAccountId);
      form.setFieldValue('CheqId', BankReceiptGetById?.CheqId > 0 ? BankReceiptGetById?.CheqId : null);
      form.setFieldValue('PayeeTitle', BankReceiptGetById?.PayeeTitle);
      form.setFieldValue(
        'AgainstAccountId',
        BankReceiptGetById?.AgainstAccountId > 0 ? BankReceiptGetById?.AgainstAccountId : null
      );
      form.setFieldValue('IncludeWHT', BankReceiptGetById?.IncludeWHT);
      if (BankReceiptGetById?.IncludeWHT === true) {
        setSharedStateIncludeWHT(true);
      }
      form.setFieldValue('Remarks', BankReceiptGetById?.Remarks);
      setBankId(BankReceiptGetById?.RefAccountId);
      form.setFieldValue(
        ['voucherDetailList', 0, 'TaxTypeId'],
        BankReceiptGetById?.voucherDetailList?.[0]?.TaxTypeId > 0
          ? BankReceiptGetById?.voucherDetailList?.[0]?.TaxTypeId
          : BankReceiptGetById?.voucherDetailList?.[0]?.TaxTypeId
      );
      form.setFieldValue(
        ['voucherDetailList', 0, 'AgainstAccountId'],
        BankReceiptGetById?.voucherDetailList?.[0]?.AgainstAccountId
      );
      const DetailList = BankReceiptGetById?.voucherDetailList.filter((row: any) => row.DebitAmount <= 0);
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
          updateData={updateData}
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
          bankId={bankId}
          setSharedStateIncludeWHT={setSharedStateIncludeWHT}
          SharedStateIncludeWHT={SharedStateIncludeWHT}
          ScheduleData={getTaxSchedule?.data?.Data?.Result?.[0]}
        />
        <DynamicForm
          form={form}
          handleTaxTypeChange={handleTaxTypeChange}
          SharedStateIncludeWHT={SharedStateIncludeWHT}
          ScheduleData={getTaxSchedule?.data?.Data?.Result?.[0]}
        />
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId: number | null;
  setSelectedRecordId: (id: number | null) => void;
  addBankReceipt: any;
  isDataSuccess: boolean;
};

export default BankPaymentVoucherForm;
