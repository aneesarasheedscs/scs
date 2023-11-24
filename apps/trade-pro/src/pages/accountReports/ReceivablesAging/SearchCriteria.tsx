import {
    AntButton,
    AntDatePicker,
    AntInputNumber,
    AntSelectDynamic,
    SearchCriteriaWrapper,
  } from '@tradePro/components';
  import { useState } from 'react';
  import { Col, Form, Row } from 'antd';
  import { useGetReceivablesAgingRegister, useGetCustomer  } from './queries';
  import { ReceivablesAgingSearchCriteria } from './type';
 
  
  const { useForm, useWatch } = Form;
  
  function SearchCriteria() {
    const [open, setOpen] = useState(false);
    const [form] = useForm<ReceivablesAgingSearchCriteria>();
    const formValues = useWatch<ReceivablesAgingSearchCriteria>([], form);
  
    const {
      refetch,
      isFetching,
      isError: isError,
      isLoading: isLoading,
    } = useGetReceivablesAgingRegister();
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const onFinish = (_: ReceivablesAgingSearchCriteria) => {
      refetch().then(() => handleClose());
    };
  
    return (
      <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
        <Form form={form} onFinish={onFinish} layout="vertical" >
          <Row gutter={[10, 10]}>

          <Col xs={24} sm={24} md={12}>
              <AntSelectDynamic
                name="CompanyId"
                label="CompanyName"
                fieldValue="Id"
                fieldLabel="CompName"
                query={useGetCustomer}
              />
            </Col>

            <Col xs={24} sm={24} md={12}>
              <AntDatePicker name="EndDate" label="End Date" />
            </Col>

  
            <Col xs={24} sm={24} md={12}>
              <AntInputNumber name="IntervalDays" label="Interval Days" />
            </Col>
            
            </Row>
        
            <Col xs={24} sm={24} md={8}>
              <AntButton
                label="Show"
                htmlType="submit"
                style={{ marginTop: 2 }}
                isError={isError}
                isLoading={isLoading || isFetching}
              />
            </Col>
        </Form>
      </SearchCriteriaWrapper>
    );
  }
  
  export default SearchCriteria;
  