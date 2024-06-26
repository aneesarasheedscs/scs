import dayjs from 'dayjs';
import '../style.scss';
import { useAtom } from 'jotai';
import Buttons from './Buttons';
import { isNumber } from 'lodash';
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';
import { addtableData } from './Atom';
import { TBillsReceivable } from '../types';
import { useEffect, useState } from 'react';
import { Card, Form, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAddBillsReceivablesVoucher, useGetTaxSchedule, useUpdateBillsReceivablesVoucher } from '../query';
import SalesTaxEntry from './SalesTaxEntry';

const { useForm } = Form;

function BillsReceivableForm({
  selectedRecordId,
  setSelectedRecordId,
  addBillsPayable,
  refetchBillsPayable,
  isDataSuccess,
}: TAddUpdateRecord) {
  const [form] = useForm<TBillsReceivable>();
  const { t } = useTranslation();
  const [bankId, setBankId] = useState<number | null>(null);
  const DocumentTypeId = 7;
  const [tableData, setTableData] = useAtom(addtableData);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(true);
  const {
    mutate: addBillsReceivableVoucher,
    data: saveData,
    isSuccess,
  } = useAddBillsReceivablesVoucher(DocumentTypeId);
  const { mutate: updateBillsReceivableVoucher, data: updateData } = useUpdateBillsReceivablesVoucher(
    DocumentTypeId,
    selectedRecordId
  );
  const [printPreview, setPrintPreview] = useState(true);
  const [VoucherDate, setVoucherDate] = useState<Date>(new Date());
  const [TaxTypeId, setTaxTypeId] = useState<number | undefined>();
  const {
    data: getTaxSchedule,
    isSuccess: TaxSuccess,
    refetch: TaxScheduleRefetch,
    isLoading: TaxLoading,
  } = useGetTaxSchedule(VoucherDate, TaxTypeId);
  const [SharedStateIncludeWHT, setSharedStateIncludeWHT] = useState(false);
  const AgainstAccountId = form.getFieldValue('AgainstAccountId');
  console.log(AgainstAccountId);
  useEffect(() => {
    if (SharedStateIncludeWHT) {
      if (VoucherDate && TaxTypeId) {
        TaxScheduleRefetch();
      }
    }
  }, [SharedStateIncludeWHT, VoucherDate, TaxTypeId]);

  const onFinish = (values: TBillsReceivable) => {
    values.PrintPreview = printPreview;
    values.AgainstAccountId = tableData?.[0]?.AccountId;
    // const TaxableEntry: any = {};
    // TaxableEntry.RefdocNoId = values.voucherDetailList[0]?.RefdocNoId;
    // TaxableEntry.TaxPrcnt = values.voucherDetailList[0]?.TaxPrcnt;
    // TaxableEntry.DueDays = values.voucherDetailList[0]?.DueDays;
    // TaxableEntry.DueDate = values.voucherDetailList[0]?.DueDate;
    // TaxableEntry.DuePercentage = values.voucherDetailList[0]?.DuePercentage;
    // TaxableEntry.Amount = values.voucherDetailList[0]?.Amount;
    // values.PaymentDuesSchedules = [TaxableEntry];

    values.voucherDetailList = values.voucherDetailList && tableData;

    if (isNumber(selectedRecordId)) {
      if (tableData.length === 0) {
        notification.error({
          message: 'Error',
          description: 'Please enter data in the grid before saving.',
        });
        return;
      }
      updateBillsReceivableVoucher(values);
      console.log(values);
      console.log(tableData);
    } else if (tableData.length === 0) {
      notification.error({
        message: 'Error',
        description: 'Please enter data in the grid before saving.',
      });
    } else {
      console.log(values);
      addBillsReceivableVoucher(values);
    }
  };

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldValue('VoucherCode', addBillsPayable?.data?.Data?.Result?.VoucherCode);
      form.setFieldValue('VoucherDate', dayjs(new Date()));
      form.setFieldValue('RefAccountId', addBillsPayable?.data?.Data?.Result?.RefAccountId);
      form.setFieldValue('AgainstAccountId', addBillsPayable?.data?.Data?.Result?.AgainstAccountId);
      form.setFieldValue('ManualBillNo', addBillsPayable?.data?.Data?.Result?.ManualBillNo);
      form.setFieldValue('Remarks', addBillsPayable?.data?.Data?.Result?.Remarks);
      form.setFieldValue('PaymentDuesSchedules', addBillsPayable?.data?.Data?.Result?.PaymentDuesSchedules);
      form.setFieldValue(
        ['PaymentDuesSchedules', 0, 'DueDate'],
        dayjs(addBillsPayable?.data?.Data?.Result?.PaymentDuesSchedules?.DueDate)
      );
      setBankId(addBillsPayable?.data?.Data?.Result?.RefAccountId);
      const DetailList = addBillsPayable?.data?.Data?.Result?.voucherDetailList.filter(
        (row: any) => row.CreditAmount > 0
      );
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
          addBillsPayable={addBillsPayable}
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
          isAddButtonClicked={isAddButtonClicked}
        />
        <DynamicForm
          form={form}
          bankId={bankId}
          handleTaxTypeChange={handleTaxTypeChange}
          setIsAddButtonClicked={setIsAddButtonClicked}
          SharedStateIncludeWHT={SharedStateIncludeWHT}
          ScheduleData={getTaxSchedule?.data?.Data?.Result?.[0]}
        />
        <SalesTaxEntry
          form={form}
          bankId={bankId}
          handleTaxTypeChange={handleTaxTypeChange}
          setIsAddButtonClicked={setIsAddButtonClicked}
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
  addBillsPayable: any;
  refetchBillsPayable: any;
  isDataSuccess: any;
};

export default BillsReceivableForm;
