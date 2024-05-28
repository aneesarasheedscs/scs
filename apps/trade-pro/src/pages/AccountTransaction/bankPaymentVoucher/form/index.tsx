import dayjs from 'dayjs';
import '../style.scss';
import { useAtom } from 'jotai';
import Buttons from './Buttons';
import { isNumber } from 'lodash';
import { addtableData } from './Atom';
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';
import { useEffect, useState } from 'react';
import { Card, Form, notification } from 'antd';
import { TSaveBankPaymentVoucher } from './types';
import { useGetTaxSchedule } from '../queries/queries';
import { useAddBankPaymentVoucher, useUpdateBankPaymentVoucher } from '../queries/querySave';

const { useForm } = Form;

function BankPaymentVoucherForm({
  selectedRecordId,
  setSelectedRecordId,
  addBankPayment,
  isDataSuccess,
  isDataLoading,
}: TAddUpdateRecord) {
  const [form] = useForm<TSaveBankPaymentVoucher>();
  const [bankId, setBankId] = useState<number | null>(null);
  const DocumentTypeId = 2;
  const [tableData, setTableData] = useAtom(addtableData);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState<boolean>(true);
  const [SharedStateIncludeWHT, setSharedStateIncludeWHT] = useState<boolean>(false);
  const { mutate: addBankPaymentVoucher, data: saveData, isSuccess } = useAddBankPaymentVoucher(DocumentTypeId);
  const { mutate: updateBankPaymentVoucher, data: updateData } = useUpdateBankPaymentVoucher(
    DocumentTypeId,
    selectedRecordId
  );
  const [printPreview, setPrintPreview] = useState<boolean>(true);
  const [VoucherDate, setVoucherDate] = useState<Date>(new Date());
  const [TaxTypeId, setTaxTypeId] = useState<number | undefined>();
  const {
    data: getTaxSchedule,
    isSuccess: TaxSuccess,
    refetch: TaxScheduleRefetch,
    isLoading: TaxLoading,
  } = useGetTaxSchedule(VoucherDate, TaxTypeId);
  const AgainstAccountId = form.getFieldValue('AgainstAccountId');
  console.log(AgainstAccountId);
  useEffect(() => {
    if (SharedStateIncludeWHT) {
      if (VoucherDate && TaxTypeId) {
        TaxScheduleRefetch();
      }
    }
  }, [SharedStateIncludeWHT, VoucherDate, TaxTypeId]);

  const handleAddBankPayment = (values: TSaveBankPaymentVoucher) => {
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
    addBankPaymentVoucher(values);
  };

  const handleUpdateBankPayment = (values: TSaveBankPaymentVoucher) => {
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
    updateBankPaymentVoucher(values);
  };
  const onFinish = (values: TSaveBankPaymentVoucher) => {
    if (isNumber(selectedRecordId)) {
      handleUpdateBankPayment(values);
      console.log(values);
    } else {
      console.log(values);
      handleAddBankPayment(values);
    }
  };

  useEffect(() => {
    if (isDataSuccess && !isDataLoading) {
      form.setFieldValue('VoucherCode', addBankPayment?.VoucherCode);
      form.setFieldValue('VoucherDate', dayjs(new Date()));
      form.setFieldValue('RefAccountId', addBankPayment?.RefAccountId);
      form.setFieldValue('AgainstAccountId', addBankPayment?.AgainstAccountId);
      form.setFieldValue('IncludeWHT', addBankPayment?.IncludeWHT);
      form.setFieldValue('Remarks', addBankPayment?.Remarks);
      form.setFieldValue(['voucherDetailList', 0, 'DCheqDate'], dayjs(new Date()));
      form.setFieldValue(['voucherDetailList', 0, 'TaxTypeId'], addBankPayment?.voucherDetailList?.[0]?.TaxTypeId);
      form.setFieldValue(
        ['voucherDetailList', 0, 'AgainstAccountId'],
        addBankPayment?.voucherDetailList?.[0]?.AgainstAccountId
      );
      const DetailList = addBankPayment?.voucherDetailList.filter((row: any) => row.DebitAmount > 0);
      setTableData(DetailList);
    }
  }, [isDataSuccess]);
  const handleTaxTypeChange = (TaxId: number) => {
    setTaxTypeId(TaxId);
  };
  return (
    <Card className="main_card">
      <Form initialValues={{ remember: true }} form={form} layout="horizontal" onFinish={onFinish}>
        <Buttons
          form={form}
          setBankId={setBankId}
          isSuccess={isSuccess}
          saveData={saveData}
          updateData={updateData}
          addBankPayment={addBankPayment}
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
          SharedStateIncludeWHT={SharedStateIncludeWHT}
          setSharedStateIncludeWHT={setSharedStateIncludeWHT}
          ScheduleData={getTaxSchedule?.data?.Data?.Result?.[0]}
          isAddButtonClicked={isAddButtonClicked}
        />
        <DynamicForm
          form={form}
          bankId={bankId}
          handleTaxTypeChange={handleTaxTypeChange}
          SharedStateIncludeWHT={SharedStateIncludeWHT}
          setIsAddButtonClicked={setIsAddButtonClicked}
          ScheduleData={getTaxSchedule?.data?.Data?.Result?.[0]}
        />
      </Form>
    </Card>
  );
}
type TAddUpdateRecord = {
  selectedRecordId: number | null;
  setSelectedRecordId: (id: number | null) => void;
  addBankPayment: TSaveBankPaymentVoucher;
  isDataSuccess: boolean;
  isDataLoading: boolean;
};

export default BankPaymentVoucherForm;
