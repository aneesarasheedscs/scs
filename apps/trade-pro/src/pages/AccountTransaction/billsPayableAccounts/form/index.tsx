import dayjs from 'dayjs';
import '../style.scss';
import { useAtom } from 'jotai';
import Buttons from './Buttons';
import { isNumber } from 'lodash';
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';
import { addtableData } from './Atom';
import { TBillsPayables } from '../types';
import { useEffect, useState } from 'react';
import SalesTaxEntry from './SalesTaxEntry';
import { Card, Form, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAddBillsPayableVoucher, useGetTaxSchedule, useUpdateBillsPayableVoucher } from '../query';

const { useForm } = Form;

function BillsPayableForm({
  selectedRecordId,
  setSelectedRecordId,
  addBillsPayable,
  refetchBillsPayable,
  isDataSuccess,
}: TAddUpdateRecord) {
  const [form] = useForm<TBillsPayables>();
  const { t } = useTranslation();
  const [bankId, setBankId] = useState<number | null>(null);
  const DocumentTypeId = 6;
  const [tableData, setTableData] = useAtom(addtableData);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(true);
  const { mutate: addBillsPayableVoucher, data: saveData, isSuccess } = useAddBillsPayableVoucher(DocumentTypeId);
  const { mutate: updateBillsPayableVoucher, data: updateData } = useUpdateBillsPayableVoucher(
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

  const onFinish = (values: TBillsPayables) => {
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
      updateBillsPayableVoucher(values);
      console.log(values);
      console.log(tableData);
    } else if (tableData.length === 0) {
      notification.error({
        message: 'Error',
        description: 'Please enter data in the grid before saving.',
      });
    } else {
      console.log(values);
      addBillsPayableVoucher(values);
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
      setBankId(addBillsPayable?.data?.Data?.Result?.RefAccountId);
      form.setFieldValue('PaymentDuesSchedules', addBillsPayable?.data?.Data?.Result?.PaymentDuesSchedules);
      form.setFieldValue(
        ['PaymentDuesSchedules', 0, 'DueDate'],
        dayjs(addBillsPayable?.data?.Data?.Result?.PaymentDuesSchedules?.DueDate)
      );

      const DetailList = addBillsPayable?.data?.Data?.Result?.voucherDetailList.filter(
        (row: any) => row.DebitAmount > 0
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

export default BillsPayableForm;
