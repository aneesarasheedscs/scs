import {
    AntButton,
    AntDatePicker,
    AntInputNumber,
    AntSelectDynamic,
    SearchCriteriaWrapper,
  } from '@tradePro/components';
  import { useState } from 'react';
  import { Col, Form, Row } from 'antd';
  import { useGetCustomer, useGetGdnRegister } from './queries';
  import { gdnRegisterCriteria } from './type';
 
  
  const { useForm, useWatch } = Form;
  
  function SearchCriteria() {
    const [open, setOpen] = useState(false);
    const [form] = useForm<gdnRegisterCriteria>();
    const formValues = useWatch<gdnRegisterCriteria>([], form);
  
    const {
      refetch,
      isFetching,
      isError: isError,
      isLoading: isLoading,
    } = useGetGdnRegister(false, form.getFieldsValue());
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const onFinish = (_: gdnRegisterCriteria) => {
      refetch().then(() => handleClose());
    };
  
    return (
      <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
        <Form form={form} onFinish={onFinish} layout="vertical" >
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={24} md={12}>
              <AntDatePicker name="FromDate" label="From Date" />
            </Col>
  
            <Col xs={24} sm={24} md={12}>
              <AntDatePicker name="ToDate" label="To Date" />
            </Col>
  
            <Col xs={24} sm={24} md={12}>
              <AntInputNumber name="GdnNoFrom" label="Gdn From" />
            </Col>
  
            <Col xs={24} sm={24} md={12}>
              <AntInputNumber name="GdnNoTo" label="Gdn To" />
            </Col>
  
            <Col xs={24} sm={24} md={12}>
              <AntSelectDynamic
                name="SupplierCustomerId"
                label="CustomerName"
                fieldValue="Id"
                fieldLabel="CompanyName"
                query={useGetCustomer}
              />
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
  