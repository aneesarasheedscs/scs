import {
  AntButton,
  AntDatePicker,
  AntInput,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { useEffect, useState } from 'react';
import { Col, Form, Radio, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { selectedItems, selectedRadio, tableColumn, tableData } from './Atom';
import { TAccountPayablesBetweenPeriodTable, TAccountPayablesSearchCriteria, TAccountPayablesTable } from './types';
import { useAtom, useAtomValue } from 'jotai';
import {
  useGetAccountPayablesBetweenPeriodTable,
  useGetAccountPayablesTable,
  useGetSupplierCustomer,
} from '../queries';
import { AntColumnType } from '@tradePro/globalTypes';
import { columns, columns2 } from './columns';

const { useForm, useWatch } = Form;

interface SearchCriteriaFormProps {
  onRadioChange: (value: number) => void;
}
type TableColumnType = AntColumnType<TAccountPayablesTable>[] | AntColumnType<TAccountPayablesBetweenPeriodTable>[];

function SearchCriteriaForm({ onRadioChange }: SearchCriteriaFormProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<TAccountPayablesSearchCriteria>();
  const formValues = useWatch<TAccountPayablesSearchCriteria>([], form);
  const [showSecondTable, setShowSecondTable] = useState(false);
  const [isDueDateFromVisible, setIsDueDateFromVisible] = useState(false);
  const [selectedItem, setSelectedItems] = useAtom(selectedItems);
  const [selectedRadios, setSelectedRadios] = useAtom(selectedRadio);
  const [tableColumns, setTableColumns] = useAtom(tableColumn);
  const [tableDataforPayables, setTableDataforPayables] = useAtom(tableData);

  const handleRadioChange = (e: any) => {
    const value = e.target.value;
    setSelectedRadios(value);
    form.setFieldValue('ActionId', value);
    // setIsDueDateFromVisible(value === 2); // Set visibility based on the selected radio button value

    // setShowSecondTable(value === 2);
    // onRadioChange(value);
  };

  const {
    data: PayablesforBydueDate,
    refetch,
    isFetching,
    isError: isAccountPayableError,
    isSuccess,
    isLoading: isAccountPayableLoading,
  } = useGetAccountPayablesTable(false, form.getFieldsValue());

  const {
    data: PayablesforBetweenPeriods,
    refetch: refetchBetweenTables,
    isFetching: isFetchingTables,
    isError: isErrorBetweenTables,
    isLoading: isLoadingBetweenTables,
    isSuccess: isSuccessBetweenPeriods,
  } = useGetAccountPayablesBetweenPeriodTable(false, form.getFieldsValue());

  console.log('table data for tables', tableDataforPayables);
  console.log(PayablesforBydueDate);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (values: TAccountPayablesSearchCriteria) => {
    values.Ids = Array.isArray(values.Ids) ? values.Ids.join(',') : values.Ids;
    console.log(values);

    // if (values?.ActionId === 1) {
    //   setTableColumns(columns(t));
    //   refetch().then(() => handleClose());
    // } else if (values?.ActionId === 2) {
    //   setTableColumns(columns2(t));
    //   refetchBetweenTables().then(() => handleClose());
    // }

    setSelectedItems(values);

    // setSelectedRadios(values?.ActionId);
    if (values?.ActionId === 1) {
      setTableColumns(columns(t));
      refetch().then(() => handleClose());
    } else if (values?.ActionId === 2) {
      setTableColumns(columns2(t));
      refetchBetweenTables().then(() => handleClose());
    }
    setSelectedItems(values);
    console.log(selectedItem);
    // refetch().then(() => handleClose());
  };
  console.log(selectedRadios);

  useEffect(() => {
    const januaryFirst = dayjs().startOf('year').set('month', 0).set('date', 1);
    form.setFields([{ name: 'DueDateFrom', value: januaryFirst }]);
    form.setFields([{ name: 'DueDateTo', value: dayjs(new Date()) }]);
    form.setFieldsValue({ ActionId: 1 });

    setTableColumns(columns(t));
  }, []);

  useEffect(() => {
    if (isSuccess && !isAccountPayableLoading && PayablesforBydueDate) {
      setTableDataforPayables(PayablesforBydueDate?.data?.Data?.Result);
    }
  }, [isSuccess, PayablesforBydueDate, !isAccountPayableLoading]);

  useEffect(() => {
    if (isSuccessBetweenPeriods && !isLoadingBetweenTables && PayablesforBetweenPeriods) {
      setTableDataforPayables(PayablesforBetweenPeriods?.data?.Data?.Result);
    }
  }, [isSuccessBetweenPeriods, PayablesforBetweenPeriods, !isLoadingBetweenTables]);
  console.log('table Columns', tableColumns);
  console.log('table Data', tableDataforPayables);
  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={{ formValues, ActionId: 1 }}>
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xs={24} sm={24} md={24} className="formfield minWidth">
            <p>
              <AntSelectDynamic
                required
                mode="multiple"
                name="SelectedIds"
                label={t('supplier_customer_group')}
                fieldValue="Id"
                fieldLabel="Description"
                bordered={false}
                query={useGetSupplierCustomer}
              />
            </p>
          </Col>
          {isDueDateFromVisible && (
            <Col xs={24} sm={24} md={14} className="formfield">
              <AntDatePicker name="DueDateFrom" label={t('due_date_from')} required bordered={false} />
            </Col>
          )}

          <Col xs={24} sm={24} md={14} className="formfield">
            <AntDatePicker name="DueDateTo" label={t('due_date_to')} required bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={14} className="formfield">
            <AntInputNumber name="FromDocNo" label={t('balance_from')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={14} className="formfield">
            <AntInputNumber name="ToDocNo" label={t('balance_to')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11}>
            <Radio.Group onChange={handleRadioChange} defaultValue={1}>
              <Radio value={1}> {t('payables_by_due_date_to')}</Radio>
              <Radio value={2}> {t('payables_by_due_date_between_period')}</Radio>
            </Radio.Group>

            <AntInput label="" name="ActionId" type="hidden" />
          </Col>

          <Col xs={24} sm={24} md={6}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 4 }}
              isError={isAccountPayableError}
              isLoading={isAccountPayableLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteriaForm;
