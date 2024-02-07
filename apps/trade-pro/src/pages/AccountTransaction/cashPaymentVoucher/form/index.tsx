import '../style.scss';
import dayjs from 'dayjs';
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';
import { useAtom } from 'jotai';
import { addtableData } from './Atom';
import Buttons from './Buttons';
import { useEffect, useState } from 'react';
import { Card, Form, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { TSaveCashPaymentVoucher } from './types';
import { useGetTaxSchedule } from '../queries/queries';
import { useAddCashPaymentVoucher, useUpdateCashPaymentVoucher } from '../queries/querySave';

const { useForm } = Form;

function CashPaymentVoucherForm({
  selectedRecordId,
  refetchCashPayment,
  isDataSuccess,
  addCashPayment,
  setSelectedRecordId,
}: TAddUpdateRecord) {
  const [form] = useForm<TSaveCashPaymentVoucher>();
  const { t } = useTranslation();
  const [bankId, setBankId] = useState<number | null>(null);
  const DocumentTypeId = 1;
  const [VoucherDate, setVoucherDate] = useState<Date>(new Date());
  const [TaxTypeId, setTaxTypeId] = useState<number | undefined>();
  const [SharedStateIncludeWHT, setSharedStateIncludeWHT] = useState(false);

  const [tableData, setTableData] = useAtom(addtableData);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(true);
  const {
    data: getTaxSchedule,
    isSuccess: TaxSuccess,
    refetch: TaxScheduleRefetch,
    isLoading: TaxLoading,
  } = useGetTaxSchedule(VoucherDate, TaxTypeId);
  const [printPreview, setPrintPreview] = useState(true);

  const { mutate: addCashPaymentVoucher, isSuccess: isEntrySuccessful, data: entryData } = useAddCashPaymentVoucher();
  const {
    mutate: updateCashPaymentVoucher,
    isSuccess: isUpdateEntrySuccessful,
    data: UpdateData,
  } = useUpdateCashPaymentVoucher(selectedRecordId);

  useEffect(() => {
    if (SharedStateIncludeWHT) {
      if (VoucherDate && TaxTypeId) {
        TaxScheduleRefetch();
      }
    }
  }, [SharedStateIncludeWHT, VoucherDate, TaxTypeId]);

  const handleTaxTypeChange = (TaxId: number) => {
    setTaxTypeId(TaxId);
  };
  const onFinish = (values: TSaveCashPaymentVoucher) => {
    values.PrintPreview = printPreview;

    const TaxableEntry: any = {};
    if (values.IncludeWHT) {
      TaxableEntry.AccountId = values.RefDocNoId;
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
      TaxableEntry.Amount = values.voucherDetailList?.[0]?.Amount;

      values.voucherDetailList = [...tableData, TaxableEntry];
    } else {
      values.voucherDetailList = values.voucherDetailList && tableData;
      //Above Line Meant This
      // if (!values.voucherDetailList) {
      //   values.voucherDetailList = tableData;
      // }
    }
    values.voucherDetailList = values.voucherDetailList = values.voucherDetailList.map((item) => ({
      ...item, // Copy all existing properties of the item
      AgainstAccountId: values.RefAccountId, // Update the specific field
    }));

    values.voucherDetailList = values.voucherDetailList.map((item) => {
      // Check if IsTaxable is not true
      if (item.IsTaxable !== true) {
        return {
          ...item,
          AgainstAccountId: values.RefAccountId,
        };
      } else {
        // If IsTaxable is true, return the item without modification
        return item;
      }
    });

    if (selectedRecordId) {
      updateCashPaymentVoucher(values);
      if (isUpdateEntrySuccessful) {
      }
    } else if (tableData.length === 0) {
      notification.error({
        message: 'Error',
        description: 'Please Enter Data in the Grid before Saving.',
      });
    } else {
      console.log(values);
      addCashPaymentVoucher(values);
      if (isEntrySuccessful === true && entryData?.data?.Status === true) {
      }
    }
  };

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldValue('VoucherCode', addCashPayment?.data?.Data?.Result?.VoucherCode);
      form.setFieldValue('VoucherDate', dayjs(addCashPayment?.data?.Data?.Result?.VoucherDate));
      form.setFieldValue(
        'Type',
        addCashPayment?.data?.Data?.Result?.Type === 0 ? 1 : addCashPayment?.data?.Data?.Result?.Type
      );
      form.setFieldValue('RefAccountId', addCashPayment?.data?.Data?.Result?.RefAccountId);
      form.setFieldValue('Remarks', addCashPayment?.data?.Data?.Result?.Remarks);
      form.setFieldValue('JobLotId', addCashPayment?.data?.Data?.Result?.JobLotDescription);
      form.setFieldValue('IncludeWHT', addCashPayment?.data?.Data?.Result?.IncludeWHT);
      setSharedStateIncludeWHT(addCashPayment?.data?.Data?.Result?.IncludeWHT);
      form.setFieldValue(
        ['voucherDetailList', 0, 'DCheqDate'],
        dayjs(addCashPayment?.data?.Data?.Result?.voucherDetailList?.DCheqDate)
      );
      const DetailList = addCashPayment?.data?.Data?.Result?.voucherDetailList.filter(
        (row: any) => row.DebitAmount > 0
      );
      setTableData(DetailList);
    }
  }, [isDataSuccess]);

  const handleKeyDown = (event: any) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      onFinish(form.getFieldsValue());
    }
    if (event.altKey && event.key === 'p') {
      event.preventDefault();
      setPrintPreview((prevPrintPreview) => !prevPrintPreview);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [form]);
  return (
    <Card className="main_card">
      <Form initialValues={{ remember: true }} form={form} layout="horizontal" onFinish={onFinish}>
        <Buttons
          form={form}
          entryData={entryData}
          isEntrySuccessful={isEntrySuccessful}
          UpdateData={UpdateData}
          isUpdateEntrySuccessful={isUpdateEntrySuccessful}
          addCashPayment={addCashPayment}
          DocumentTypeId={DocumentTypeId}
          selectedRecordId={selectedRecordId}
          setSelectedRecordId={setSelectedRecordId}
          setPrintPreview={setPrintPreview}
          printPreview={printPreview}
          setBankId={setBankId}
          setSharedStateIncludeWHT={setSharedStateIncludeWHT}
        />

        <MainEntry
          form={form}
          setBankId={setBankId}
          bankId={bankId}
          isAddButtonClicked={isAddButtonClicked}
          setSharedStateIncludeWHT={setSharedStateIncludeWHT}
          SharedStateIncludeWHT={SharedStateIncludeWHT}
          ScheduleData={getTaxSchedule?.data?.Data?.Result?.[0]}
        />
        <DynamicForm
          form={form}
          SharedStateIncludeWHT={SharedStateIncludeWHT}
          handleTaxTypeChange={handleTaxTypeChange}
          ScheduleData={getTaxSchedule?.data?.Data?.Result?.[0]}
        />
      </Form>
    </Card>
  );
}

type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  refetchCashPayment: any;
  isDataSuccess: any;
  addCashPayment: any;
  setSelectedRecordId: any;
};

export default CashPaymentVoucherForm;
