import {
  AntButton,
  AntDatePicker,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { TAccountReceivablesSearchCriteria } from './types';

import { selectedItems } from './Atom';
import { map } from 'lodash';
import { useAtom } from 'jotai';
import {
  useGetAccountReceivablesAccountTitle,
  useGetAccountReceivablesPartyGroup,
  useGetAccountReceivablesTable,
} from '../queries';

const { useForm, useWatch } = Form;

function SearchCriteriaForm() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<TAccountReceivablesSearchCriteria>();
  const formValues = useWatch<TAccountReceivablesSearchCriteria>([], form);
  const [selectedItem, setSelectedItems] = useAtom(selectedItems);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: AccountReceivable } = useGetAccountReceivablesAccountTitle();

  const {
    refetch,
    isFetching,
    isError: isAccountReceivableError,
    isLoading: isAccountReceivableLoading,
  } = useGetAccountReceivablesTable(false, form.getFieldsValue());

  const onFinish = (values: TAccountReceivablesSearchCriteria) => {
    console.log(values);
    setSelectedItems(values);
    console.log(selectedItem);
    refetch().then(() => handleClose());
  };

  useEffect(() => {
    form.setFields([{ name: 'DueDateTo', value: dayjs(new Date()) }]);
  }, []);

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={{ ActionId: 1, formValues }}>
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xs={24} sm={24} md={24} className="formfield">
            <AntSelectDynamic
              required
              mode="multiple"
              name="SelectedIds"
              label={t('party_group')}
              fieldValue="Id"
              fieldLabel="Description"
              bordered={false}
              query={useGetAccountReceivablesPartyGroup}
            />
          </Col>

          <Col xs={24} sm={24} md={24} className="formfield">
            <AntSelectDynamic
              mode="multiple"
              name="SelectedAccountIds"
              label={t('account_title')}
              fieldValue="Id"
              fieldLabel="AccountTitle"
              bordered={false}
              options={map(AccountReceivable, (item: any) => ({
                value: item.Id,
                label: item.AccountTitle,
              }))}
            />
          </Col>

          <Col xs={24} sm={12} md={14} className="formfield">
            <p className="minWidth">
              <AntDatePicker name="DueDateTo" label={t('due_date_to')} required bordered={false} />
            </p>
          </Col>

          <Col xs={24} sm={12} md={14} className="formfield">
            <AntInputNumber name="FromDocNo" label={t('balance_from')} bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={14} className="formfield">
            <AntInputNumber name="ToDocNo" label={t('balance_to')} bordered={false} />
          </Col>

          <Col xs={24} sm={12} md={6}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 4 }}
              isError={isAccountReceivableError}
              isLoading={isAccountReceivableLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteriaForm;
