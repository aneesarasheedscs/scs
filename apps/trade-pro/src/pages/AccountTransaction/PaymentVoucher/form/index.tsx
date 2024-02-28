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
import { useTranslation } from 'react-i18next';
import { TSavePaymentVoucher } from './types';
import DynamicFormCPV from './DetailEntryCPV';
import { useGetTaxSchedule } from '../queries/queries';
import { useAddPaymentsVoucher, useUpdatePaymentsVoucher } from '../queries/querySave';

const { useForm } = Form;

function PaymentVoucherForm({
  selectedRecordId,
  setSelectedRecordId,
  isDataSuccess,
  addBankPayment,
}: TAddUpdateRecord) {
  const [form] = useForm<TSavePaymentVoucher>();
  const { t } = useTranslation();
  const [bankId, setBankId] = useState<number | null>(null);
  const [type, setType] = useState<number | null>(null);
  const DocumentTypeId = type === null ? 2 : type;
  const [tableData, setTableData] = useAtom(addtableData);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState<boolean>(true);
  const [SharedStateIncludeWHT, setSharedStateIncludeWHT] = useState<boolean>(false);
  const { mutate: addPaymentVoucher, data: saveData, isSuccess } = useAddPaymentsVoucher(DocumentTypeId);
  const { mutate: updatePaymentVoucher, data: updateData } = useUpdatePaymentsVoucher(DocumentTypeId, selectedRecordId);
  const [printPreview, setPrintPreview] = useState(true);
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
  const onFinish = (values: TSavePaymentVoucher) => {
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

    if (isNumber(selectedRecordId)) {
      if (tableData.length === 0) {
        notification.error({
          message: 'Error',
          description: 'Please enter data in the grid before saving.',
        });
        return;
      }
      updatePaymentVoucher(values);
      console.log(values);
    } else if (tableData.length === 0) {
      notification.error({
        message: 'Error',
        description: 'Please enter data in the grid before saving.',
      });
    } else {
      console.log(values);
      addPaymentVoucher(values);
    }
  };

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldValue('VoucherCode', addBankPayment?.data?.Data?.Result?.VoucherCode);
      form.setFieldValue('Type', addBankPayment?.data?.Data?.Result?.DocumentTypeId);
      form.setFieldValue('VoucherDate', dayjs(new Date()));
      form.setFieldValue('RefAccountId', addBankPayment?.data?.Data?.Result?.RefAccountId);
      form.setFieldValue('AgainstAccountId', addBankPayment?.data?.Data?.Result?.AgainstAccountId);
      form.setFieldValue('IncludeWHT', addBankPayment?.data?.Data?.Result?.IncludeWHT);
      form.setFieldValue('Remarks', addBankPayment?.data?.Data?.Result?.Remarks);
      form.setFieldValue(['voucherDetailList', 0, 'DCheqDate'], dayjs(new Date()));
      form.setFieldValue(
        ['voucherDetailList', 0, 'TaxTypeId'],
        addBankPayment?.data?.Data?.Result?.voucherDetailList?.[0]?.TaxTypeId
      );
      form.setFieldValue(
        ['voucherDetailList', 0, 'AgainstAccountId'],
        addBankPayment?.data?.Data?.Result?.voucherDetailList?.[0]?.AgainstAccountId
      );
      const DetailList = addBankPayment?.data?.Data?.Result?.voucherDetailList.filter(
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
          setSharedStateIncludeWHT={setSharedStateIncludeWHT}
          SharedStateIncludeWHT={SharedStateIncludeWHT}
          ScheduleData={getTaxSchedule?.data?.Data?.Result?.[0]}
          bankId={bankId}
          isAddButtonClicked={isAddButtonClicked}
          setType={setType}
        />
        {type === null || type === 2 ? (
          <DynamicForm
            form={form}
            bankId={bankId}
            handleTaxTypeChange={handleTaxTypeChange}
            setIsAddButtonClicked={setIsAddButtonClicked}
            SharedStateIncludeWHT={SharedStateIncludeWHT}
            ScheduleData={getTaxSchedule?.data?.Data?.Result?.[0]}
          />
        ) : (
          <DynamicFormCPV
            form={form}
            SharedStateIncludeWHT={SharedStateIncludeWHT}
            handleTaxTypeChange={handleTaxTypeChange}
            ScheduleData={getTaxSchedule?.data?.Data?.Result?.[0]}
          />
        )}
      </Form>
    </Card>
  );
}
type TAddUpdateRecord = {
  selectedRecordId: number | null;
  setSelectedRecordId: (id: number | null) => void;
  isDataSuccess: boolean;
  addBankPayment: any;
};

export default PaymentVoucherForm;
