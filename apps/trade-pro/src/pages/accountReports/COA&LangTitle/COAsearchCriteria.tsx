import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import { Input, Checkbox } from 'antd';
import {
  AntButton,
  AntDatePicker,
  AntInput,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { useGetCompanyName, useGetCOAReport, useGetLangauge } from './queries';
import { useChartOfReporttableQuery } from './tableQueries';
import { TChartOfAccountCriteria } from './type';

const { useForm, useWatch } = Form;

function ChartOfAccountReport() {
  const [open, setOpen] = useState(false);
  // select first value when checkbox true
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [removeFirstValue, setRemoveFirstValue] = useState(true);

  const handleCheckboxChange = (e: any) => {
    if (e.target.checked) {
      // When the checkbox is checked, deselect the first selected value
      setSelectedValue(null);
      setRemoveFirstValue(true);
    } else {
      setRemoveFirstValue(false);
    }
  };

  const [form] = useForm<TChartOfAccountCriteria>();
  const formValues = useWatch<TChartOfAccountCriteria>([], form);
  const { setFieldValue } = form;

  const {
    refetch,
    isFetching,
    isError: isReportError,
    isLoading: isReportLoading,
  } = useChartOfReporttableQuery(false, form.getFieldsValue());

  const onFinish = (_: TChartOfAccountCriteria) => {
    refetch().then(() => handleClose());
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (removeFirstValue) {
      // setSelectedValue('select me as default');
      setFieldValue('ChartOfAccountId', 'INAM ** RICE TRADERS AKBARI MANDI');
    } else {
      setSelectedValue(null);
      setFieldValue('ChartOfAccountId', null);
    }
  }, [removeFirstValue, setFieldValue]);

  return (
    <div>
      <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={24} md={17}>
              <AntSelectDynamic
                name="ChartOfAccountId"
                label="Company"
                fieldValue="Id"
                fieldLabel="CompName"
                query={useGetCompanyName}
                value={selectedValue}
                onChange={setSelectedValue}
              />
            </Col>
            <Col xs={24} sm={24} md={6}>
              <br />
              <Checkbox defaultChecked={true} onChange={handleCheckboxChange}>
                IsActive
              </Checkbox>
            </Col>
            <Col xs={24} sm={24} md={9}>
              <AntSelectDynamic
                name="AccountTitle"
                label="COA Title"
                fieldValue="Id"
                fieldLabel=""
                query={useGetCOAReport}
              />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <AntSelectDynamic
                name="MultiLanguagesId"
                label="Language"
                fieldValue="Id"
                fieldLabel=""
                query={useGetLangauge}
              />
            </Col>

            <Col xs={24} sm={24} md={5}>
              <br />
              <AntButton
                label="Show"
                htmlType="submit"
                style={{ marginTop: 2 }}
                isError={isReportError}
                isLoading={isReportLoading || isFetching}
              />
            </Col>
          </Row>
        </Form>
      </SearchCriteriaWrapper>
    </div>
  );
}

export default ChartOfAccountReport;
