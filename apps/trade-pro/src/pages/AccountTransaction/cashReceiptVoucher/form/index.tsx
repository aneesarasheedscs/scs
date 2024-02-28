import '../style.scss';
import dayjs from 'dayjs';
import { isNumber } from 'lodash';
import MainEntry from './MainEntry';
import { useAtom } from 'jotai';
import { addtableData } from './Atom';
import Buttons from './Buttons';
import { TSaveCashReceiptVoucher } from './types';
import { useEffect, useState } from 'react';
import DynamicForm from './DetailEntryForm';
import { useTranslation } from 'react-i18next';
import { Card, Form, notification } from 'antd';
import { useGetTaxSchedule } from '../queries/queries';
import { useAddCashReceiptVoucher, useUpdateCashReceiptVoucher } from '../queries/querySave';

const { useForm } = Form;

function CashReceiptVoucherForm({
  selectedRecordId,
  setSelectedRecordId,
  addCashReceipt,
  isDataSuccess,
}: TAddUpdateRecord) {
  const [form] = useForm<TSaveCashReceiptVoucher>();
  const { t } = useTranslation();
  const [bankId, setBankId] = useState<number | null>(null);
  const [printPreview, setPrintPreview] = useState(true);
  const [SharedStateIncludeWHT, setSharedStateIncludeWHT] = useState<boolean>(false);
  const [tableData, setTableData] = useAtom(addtableData);
  const DocumentTypeId = 3;
  const CashReceiptGetById = addCashReceipt?.data?.Data?.Result;
  const [TaxTypeId, setTaxTypeId] = useState<number | undefined>();
  const [VoucherDate, setVoucherDate] = useState<Date>(new Date());

  const {
    data: getTaxSchedule,
    isSuccess: TaxSuccess,
    refetch: TaxScheduleRefetch,
    isLoading: TaxLoading,
  } = useGetTaxSchedule(VoucherDate, TaxTypeId);
  const { mutate: addBankPaymentVoucher, isSuccess, data: saveData } = useAddCashReceiptVoucher(DocumentTypeId);
  const { mutate: updateBankPaymentVoucher, data: updateData } = useUpdateCashReceiptVoucher(
    selectedRecordId,
    DocumentTypeId
  );
  useEffect(() => {
    if (SharedStateIncludeWHT) {
      if (VoucherDate && TaxTypeId) {
        TaxScheduleRefetch();
      }
    }
  }, [SharedStateIncludeWHT, VoucherDate, TaxTypeId]);
  const handleAddCashReceipt = (values: TSaveCashReceiptVoucher) => {
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
      TaxableEntry.DebitAmount = values.voucherDetailList?.[0]?.Amount;
      TaxableEntry.Amount = values.voucherDetailList?.[0]?.Amount;
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
    addBankPaymentVoucher(values);
  };

  const handleUpdateCashReceipt = (values: TSaveCashReceiptVoucher) => {
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
      TaxableEntry.DebitAmount = values.voucherDetailList?.[0]?.Amount;
      TaxableEntry.Amount = values.voucherDetailList?.[0]?.Amount;
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
    updateBankPaymentVoucher(values);
  };
  const onFinish = (values: TSaveCashReceiptVoucher) => {
    values.PrintPreview = printPreview;
    if (isNumber(selectedRecordId)) {
      handleUpdateCashReceipt(values);
      console.log(values);
    } else {
      console.log(values);
      handleAddCashReceipt(values);
    }
  };
  const handleTaxTypeChange = (TaxId: number) => {
    setTaxTypeId(TaxId);
  };

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldValue('ChequeDate', dayjs(new Date()));
      form.setFieldValue('VoucherDate', dayjs(new Date()));
      form.setFieldValue('VoucherCode', CashReceiptGetById?.VoucherCode);
      form.setFieldValue('RefAccountId', CashReceiptGetById?.RefAccountId);
      form.setFieldValue('CheqId', CashReceiptGetById?.CheqId > 0 ? CashReceiptGetById?.CheqId : null);
      form.setFieldValue('PayeeTitle', CashReceiptGetById?.PayeeTitle);
      form.setFieldValue(
        'AgainstAccountId',
        CashReceiptGetById?.AgainstAccountId > 0 ? CashReceiptGetById?.AgainstAccountId : null
      );
      form.setFieldValue('IncludeWHT', CashReceiptGetById?.IncludeWHT);
      if (CashReceiptGetById?.IncludeWHT === true) {
        setSharedStateIncludeWHT(true);
      }
      form.setFieldValue('Remarks', CashReceiptGetById?.Remarks);
      setBankId(CashReceiptGetById?.RefAccountId);
      form.setFieldValue(
        ['voucherDetailList', 0, 'TaxTypeId'],
        CashReceiptGetById?.voucherDetailList?.[0]?.TaxTypeId > 0
          ? CashReceiptGetById?.voucherDetailList?.[0]?.TaxTypeId
          : CashReceiptGetById?.voucherDetailList?.[0]?.TaxTypeId
      );
      form.setFieldValue(
        ['voucherDetailList', 0, 'AgainstAccountId'],
        CashReceiptGetById?.voucherDetailList?.[0]?.AgainstAccountId
      );
      const DetailList = CashReceiptGetById?.voucherDetailList.filter((row: any) => row.DebitAmount <= 0);
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
          addCashReceipt={addCashReceipt}
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
  addCashReceipt: any;
  isDataSuccess: boolean;
};

export default CashReceiptVoucherForm;
