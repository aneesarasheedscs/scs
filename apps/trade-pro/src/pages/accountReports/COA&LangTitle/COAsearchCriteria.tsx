import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { Checkbox } from 'antd';
import { AntButton, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import { useGetCompanyName, useGetCOAReport, useGetLangauge, useChartOfReporttableQuery } from './queries';
import { TChartOfAccountCriteria } from './type';
import { useTranslation } from 'react-i18next';
import { CriteriaRowGutter } from '@tradePro/globalAtoms';

const { useForm, useWatch } = Form;

function ChartOfAccountReport() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [removeFirstValue, setRemoveFirstValue] = useState(true);

  const handleCheckboxChange = (e: any) => {
    if (e.target.checked) {
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
  const { t } = useTranslation();

  return (
    <div>
      <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
        <Form layout="inline" form={form} onFinish={onFinish}>
        <Col xxl={24}>
        <Row gutter={CriteriaRowGutter} justify={'space-between'}>
            <Col xs={24} sm={24} md={17} xl={17} xxl={11} className="formsfield" >
              <AntSelectDynamic
                bordered={false}
                name="CompanyId"
                label={t('company')}
                fieldValue="Id"
                fieldLabel="CompName"
                query={useGetCompanyName}
                value={selectedValue}
                onChange={setSelectedValue}
              />
            </Col>

            <Col xs={24} sm={24} md={6} xl={6} xxl={6} style={{marginTop:10}}>
              {/* <br /> */}
              <Checkbox defaultChecked={true} onChange={handleCheckboxChange}>
                {t('is_active')}
              </Checkbox>
            </Col>
            <Col xs={24} sm={24} md={5} xl={5} xxl={3}>
              {/* <br /> */}
              <AntButton
                label={t('show')}
                htmlType="submit"
                style={{ marginTop: 2 }}
                isError={isReportError}
                isLoading={isReportLoading || isFetching}
              />
            </Col>
            <Col xs={24} sm={24} md={9} xl={9} xxl={11} className="formsfield">
              <AntSelectDynamic
                bordered={false}
                name="Id"
                label={t('coa_title')}
                fieldValue="Id"
                fieldLabel="AccountTitle"
                query={useGetCOAReport}
              />
            </Col>
            <Col xs={24} sm={24} md={8} xl={8} xxl={12} className="formsfield">
              <AntSelectDynamic
                bordered={false}
                name="LanguagesId"
                label={t('language')}
                fieldValue="Id"
                fieldLabel=""
                query={useGetLangauge}
              />
            </Col>
          </Row>
        </Col>
        </Form>
      </SearchCriteriaWrapper>
    </div>
  );
}

export default ChartOfAccountReport;
