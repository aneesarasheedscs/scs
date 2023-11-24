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
import { selectedItems } from './Atom';
import { TAccountPayablesSearchCriteria } from './types';
import { useGetAccountPayablesTable, useGetSupplierCustomer } from '../queries/queries';
import { useAtom } from 'jotai';

const { useForm, useWatch } = Form;

interface SearchCriteriaFormProps {
  onRadioChange: (value: number) => void;
}

function SearchCriteriaForm({ onRadioChange }: SearchCriteriaFormProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<TAccountPayablesSearchCriteria>();
  const formValues = useWatch<TAccountPayablesSearchCriteria>([], form);
  const [showSecondTable, setShowSecondTable] = useState(false);
  const [isDueDateFromVisible, setIsDueDateFromVisible] = useState(false);
  const [selectedItem, setSelectedItems] = useAtom(selectedItems);

  const handleRadioChange = (e: any) => {
    const value = e.target.value;
    setIsDueDateFromVisible(value === 2); // Set visibility based on the selected radio button value
    setShowSecondTable(value === 2);
    onRadioChange(value);
  };

  const {
    refetch,
    isFetching,
    isError: isAccountPayableError,
    isLoading: isAccountPayableLoading,
  } = useGetAccountPayablesTable(true, form.getFieldsValue());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (values: TAccountPayablesSearchCriteria) => {
    values.Ids = Array.isArray(values.Ids) ? values.Ids.join(',') : values.Ids;
    console.log(values);
    setSelectedItems(values);
    console.log(selectedItem);
    refetch().then(() => handleClose());
  };

  useEffect(() => {
    const januaryFirst = dayjs().startOf('year').set('month', 0).set('date', 1);
    form.setFields([{ name: 'DueDateFrom', value: januaryFirst }]);
    form.setFields([{ name: 'DueDateTo', value: dayjs(new Date()) }]);
    form.setFieldsValue({ ActionId: 1 });
  }, []);

  const formfield = {
    borderBottom: '1px solid gray',
    padding: '0px',
    height: '40px',
  };

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={{ formValues, ActionId: 1 }}>
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xs={24} sm={24} md={24} style={formfield}>
            <AntSelectDynamic
              required
              mode="multiple"
              name="Ids"
              label={t('supplier_customer_group')}
              fieldValue="Id"
              fieldLabel="Description"
              bordered={false}
              query={useGetSupplierCustomer}
            />
          </Col>
          {isDueDateFromVisible && (
            <Col xs={24} sm={24} md={11} style={formfield}>
              <AntDatePicker name="DueDateFrom" label={t('due_date_from')} required bordered={false} />
            </Col>
          )}

          <Col xs={24} sm={24} md={11} style={formfield}>
            <AntDatePicker name="DueDateTo" label={t('due_date_to')} required bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} style={formfield}>
            <AntInputNumber name="FromDocNo" label={t('balance_from')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} style={formfield}>
            <AntInputNumber name="ToDocNo" label={t('balance_to')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={10}>
            <Radio.Group onChange={handleRadioChange} defaultValue={1}>
              <Radio value={1}> {t('payables_by_due_date_to')}</Radio>
              <Radio value={2}> {t('payables_by_due_date_between_period')}</Radio>
            </Radio.Group>
            <AntInput label="" name="ActionId" type="hidden" />
          </Col>

          <Col xs={24} sm={24} md={8}>
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
