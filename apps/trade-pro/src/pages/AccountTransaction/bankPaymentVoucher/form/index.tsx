import dayjs from 'dayjs';
import '../style.scss';
import MainEntry from './MainEntry';
import DynamicForm from './DetailEntry';
import { useAtom } from 'jotai';
import Buttons from './Buttons';
import { isNumber } from 'lodash';
import { useEffect, useState } from 'react';
import { Card, Form, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { TSaveBankPaymentVoucher } from './types';
import { addtableData, isWithHoldingCheckedAtom } from './Atom';
import { useAddBankPaymentVoucher, useUpdateBankPaymentVoucher } from '../queries/querySave';
import { useGetTaxSchedule } from '../queries/queries';

const { useForm } = Form;

function BankPaymentVoucherForm({
  selectedRecordId,
  setSelectedRecordId,
  refetchBankPayment,
  isDataSuccess,
  addBankPayment,
}: TAddUpdateRecord) {
  const [form] = useForm<TSaveBankPaymentVoucher>();
  const { t } = useTranslation();
  const [bankId, setBankId] = useState<number | null>(null);
  const DocumentTypeId = 2;
  const [tableData, setTableData] = useAtom(addtableData);
  // const [isWithHoldingChecked, setIsWithHoldingChecked] = useAtom(isWithHoldingCheckedAtom);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(true);
  const { mutate: addBankPaymentVoucher, data: saveData, isSuccess } = useAddBankPaymentVoucher(DocumentTypeId);
  const { mutate: updateBankPaymentVoucher } = useUpdateBankPaymentVoucher(DocumentTypeId, selectedRecordId);
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

  useEffect(() => {
    if (SharedStateIncludeWHT) {
      if (VoucherDate && TaxTypeId) {
        TaxScheduleRefetch();
      }
    }
  }, [SharedStateIncludeWHT, VoucherDate, TaxTypeId]);
  const onFinish = (values: TSaveBankPaymentVoucher) => {
    values.PrintPreview = printPreview;

    // const AgainstAccountId = values.voucherDetailList?.[0]?.AgainstAccountId;
    // const AccountId = values.voucherDetailList?.[0]?.AccountId;
    // const Amount = values.voucherDetailList?.[0]?.Amount;
    // const TaxTypeId = values.voucherDetailList?.[0]?.TaxTypeId;
    // const TaxPrcnt = values.voucherDetailList?.[0]?.TaxPrcnt;
    // const CreditAmount = values.voucherDetailList?.[0]?.CreditAmount;
    // const TaxesTotalAmount = values.voucherDetailList?.[0]?.TaxesTotalAmount;
    // const Comments = values.voucherDetailList?.[0]?.Comments;
    // const IsTaxable = 'False';
    // const includeWHTList = [
    //   { AgainstAccountId, AccountId, TaxTypeId, TaxPrcnt, Amount, CreditAmount, IsTaxable, TaxesTotalAmount, Comments },
    // ];
    // const includeWHTListEntry = includeWHTList.map((item) => ({
    //   ...item,
    // }));
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

      values.voucherDetailList = [...tableData, TaxableEntry];
    } else {
      values.voucherDetailList = values.voucherDetailList && tableData;
    }

    console.log(values);
    if (isNumber(selectedRecordId)) {
      // updateBankPaymentVoucher(values);
      console.log(values);
    } else if (tableData.length === 0) {
      notification.error({
        message: 'Error',
        description: 'Please enter data in the grid before saving.',
      });
    } else {
      console.log(values);
      // addBankPaymentVoucher(values);
    }
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchBankPayment();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldValue('VoucherDate', dayjs(addBankPayment?.data?.Data?.Result?.VoucherDate));
      form.setFieldValue('RefAccountId', addBankPayment?.data?.Data?.Result?.RefAccountId);
      form.setFieldValue('Remarks', addBankPayment?.data?.Data?.Result?.Remarks);
      form.setFieldValue(
        ['voucherDetailList', 0, 'DCheqDate'],
        dayjs(addBankPayment?.data?.Data?.Result?.voucherDetailList?.DCheqDate)
      );
      setTableData(addBankPayment?.data?.Data?.Result?.voucherDetailList);
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
          addBankPayment={addBankPayment}
          DocumentTypeId={DocumentTypeId}
          selectedRecordId={selectedRecordId}
          setSelectedRecordId={setSelectedRecordId}
          setPrintPreview={setPrintPreview}
          printPreview={printPreview}
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
      </Form>
    </Card>
  );
}
type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  setSelectedRecordId: (id: number | null) => void;
  refetchBankPayment: any;
  isDataSuccess: any;
  addBankPayment: any;
};

export default BankPaymentVoucherForm;
