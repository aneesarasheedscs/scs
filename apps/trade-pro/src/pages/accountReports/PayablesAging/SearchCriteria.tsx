import {
    AntButton,
    AntDatePicker,
    AntInputNumber,
    AntSelectDynamic,
    SearchCriteriaWrapper,
  } from '@tradePro/components';
  import { useState } from 'react';
  import { Col, Form, Row } from 'antd';
  import { useGetPayableAgingRegister,  } from './queries';
  import { PayablesAgingSearchCriteria } from './type';
 
  
  const { useForm, useWatch } = Form;
  
  function SearchCriteria() {
    const [open, setOpen] = useState(false);
    const [form] = useForm<PayablesAgingSearchCriteria>();
    const formValues = useWatch<PayablesAgingSearchCriteria>([], form);
  
    const {
      refetch,
      isFetching,
      isError: isError,
      isLoading: isLoading,
    } = useGetPayableAgingRegister();
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const onFinish = (_: PayablesAgingSearchCriteria) => {
      refetch().then(() => handleClose());
    };
  
    return (
      <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
        <Form form={form} onFinish={onFinish} layout="vertical" >
          <Row gutter={[10, 10]}>

            <Col xs={24} sm={24} md={12}>
              <AntDatePicker name="EndDate" label="End Date" />
            </Col>

            <Col xs={24} sm={24} md={12}>
              <AntInputNumber name="AgingDays" label="Aging Days" />
            </Col>
  
            <Col xs={24} sm={24} md={12}>
              <AntInputNumber name="NoOfInterval" label="No Of Interval" />
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
  