import React, { useState } from 'react';
import { Col, Form, Radio, Row } from 'antd';
import dayjs from 'dayjs';
import { AntButton, AntDatePicker, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import { storedFinancialYear } from '@tradePro/utils/storageService';
import { TrialBalanceSearchCriteria } from './type';
import { useGetAccountTitle, useGetDateTypes, useGetTrialAllLevelReport } from './queries';
import '../style.scss';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { selectedColumnAtom } from './atom';
import { map } from 'lodash';

const financialYear = storedFinancialYear();
const { useForm, useWatch } = Form;

function CriteriaTrialBalanceSelected() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TrialBalanceSearchCriteria>();
  const formValues = useWatch<TrialBalanceSearchCriteria>([], form);
  const [selectedColumnss, setSelectedColumnss] = useAtom(selectedColumnAtom);
  const { setFieldValue, getFieldValue } = form;

  const {
    refetch,
    isFetching,
    isError: isReportError,
    isLoading: isReportLoading,
  } = useGetTrialAllLevelReport(form.getFieldsValue());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TrialBalanceSearchCriteria) => {
    refetch().then(() => handleClose());
  };

  const FromDate = dayjs(financialYear?.Start_Period);
  const ToDate = dayjs(financialYear?.End_Period);

  const handleDateChange = (Id: number) => {
    let fromDate, toDate;
    if (Id == 1) {
      fromDate = dayjs(new Date()); // Current date
      toDate = dayjs(new Date()); // Current date
    } else if (Id == 2) {
      //Week
      const sevenDaysAgo = dayjs(new Date()).subtract(7, 'day').toDate();
      fromDate = sevenDaysAgo;
      toDate = dayjs(new Date()); // Current date
    } else if (Id == 3) {
      //Month
      fromDate = dayjs(new Date()).startOf('month').toDate();
      toDate = dayjs(new Date()).endOf('month').toDate();
    } else if (Id == 4) {
      //Year
      fromDate = dayjs().year(new Date().getFullYear()).startOf('year').toDate();
      toDate = dayjs().year(new Date().getFullYear()).endOf('year').toDate();
    } else if (Id == 5) {
      // Financial Year
      fromDate = FromDate;
      toDate = ToDate;
    }
    setFieldValue('FromDate', dayjs(fromDate));
    setFieldValue('ToDate', dayjs(toDate));
  };
  const { t } = useTranslation();
  const handleColumnChange = (e: any) => {
    setSelectedColumnss(e.target.value);
  };

  interface TviewOptions {
    Id: number;
    Name: string;
  }

  const viewOpetions: TviewOptions[] = [
    {
      Id: 1,
      Name: 'Upto 1st Level',
    },
    {
      Id: 2,
      Name: 'Upto 2nd Level',
    },
    {
      Id: 3,
      Name: 'Upto 3rd Level',
    },
    {
      Id: 4,
      Name: 'Upto 4th Level',
    },
    {
      Id: 5,
      Name: 'Upto All(5) Levels',
    },
  ];

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={formValues}>
        <Row gutter={[10, 10]} justify={'space-between'}>
          <Col xs={24} sm={12} md={24} xxl={8} className="form_field">
            <AntSelectDynamic
              bordered={false}
              fieldValue="Id"
              fieldLabel="DateType"
              defaultValue={'5'}
              label={t('date_type')}
              query={useGetDateTypes}
              onChange={(value) => handleDateChange(value)}
              name="DateType"
            />
          </Col>

          <Col xs={24} sm={12} md={12} xxl={8} className="form_field">
            <Form.Item name="FromDate" initialValue={FromDate}>
              <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={11} xxl={7} className="form_field">
            <Form.Item name="ToDate" initialValue={ToDate}>
              <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={24} xxl={8} className="form_field">
            <AntSelectDynamic
              bordered={false}
              label={t('view_options')}
              name=""
              fieldLabel="AccounTitle"
              fieldValue="AccountTitle"
              options={map(viewOpetions, (item: TviewOptions) => ({
                value: item.Id,
                label: item.Name,
                // disabled: item.Id !== 1,
              }))}
              query={useGetAccountTitle}
            />
          </Col>
          <Col xxl={10}>
            <Radio.Group value={selectedColumnss} onChange={handleColumnChange}>
              <Radio value="four"> {t('four_columns')}</Radio>
              <Radio value="six">{t('six_columns')}</Radio>
            </Radio.Group>
          </Col>

          <Col xs={24} sm={24} md={8} xxl={4}>
            <AntButton
              label={t('show')}
              htmlType="submit"
              style={{ marginTop: 2 }}
              isError={isReportError}
              isLoading={isReportLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default CriteriaTrialBalanceSelected;
