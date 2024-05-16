import { AntButton, AntInput, AntSelectDynamic } from '@scs/ui';
import { Col, Form, Row } from 'antd';
import React, { useTransition } from 'react';
import './style.scss';
function GrnForms() {
  return (
    <div className="district-main" style={{}}>
      <Row
        style={{
          marginTop: '5%',
          //   border: '1px solid red',
          width: '100%',
        }}
        align="middle"
        className="row-border"
      >
        <Col
          // style={{ border: '1px solid blue' }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
        >
          <h2 className="heading">GRN</h2>
        </Col>
      </Row>
    </div>
  );
}

export default GrnForms;

{
  /* <div className="main">
<Form
  style={{
    maxWidth: '100vw',
    border: '1px solid red',
    marginLeft: '25%',
    marginTop: '-6%',
  }}
  //   onFinish={onFinish}
  labelCol={{ span: 0 }}
  wrapperCol={{ span: 15 }}
  initialValues={{ remember: true }}
  autoComplete="off"
  //   form={form}
>
  <Row align="middle">
    <Col
      xs={{ span: 15, offset: 5 }}
      sm={{ span: 20, offset: 3 }}
      md={{ span: 20, offset: 3 }}
      lg={{ span: 20, offset: 3 }}
      xl={{ span: 15, offset: 4 }}
    >
      <AntSelectDynamic
        required
        fieldValue="DivisionId"
        label=""
        name="DivisionId"
        fieldLabel="DivisionName"
        style={{ width: '100%', marginLeft: '1%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
        // query={useGetDistrictState}
      />
      {/* <Select style={{ width: '100%', marginLeft: 10, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} options={[]} /> */
}
//     </Col>
//   </Row>
//   <Row align="middle">
//     <Col
//       xs={{ span: 15, offset: 5 }}
//       sm={{ span: 20, offset: 3 }}
//       md={{ span: 20, offset: 3 }}
//       lg={{ span: 20, offset: 3 }}
//       xl={{ span: 15, offset: 4 }}
//     >
//       <AntInput
//         className="districtCode-input"
//         required
//         label=""
//         name="DistrictCode"
//         style={{
//           textAlign: 'center',
//           marginLeft: '4.5%',
//           width: '100%',
//           boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
//         }}
//       />
//     </Col>
//   </Row>
//   <Row align="middle">
//     <Col
//       xs={{ span: 15, offset: 5 }}
//       sm={{ span: 20, offset: 3 }}
//       md={{ span: 20, offset: 3 }}
//       lg={{ span: 20, offset: 3 }}
//       xl={{ span: 15, offset: 4 }}
//     >
//       <AntInput
//         className="districtName-input"
//         required
//         label=""
//         name="DistrictName"
//         style={{
//           textAlign: 'center',
//           marginLeft: 8,
//           width: '100%',
//           boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
//         }}
//       />
//     </Col>
//   </Row>
//   <Row style={{ width: '60%', marginLeft: '36.5%', marginTop: '3%' }}>
//     <Col
//       xs={{ span: 2, offset: 2 }}
//       sm={{ span: 2, offset: 0 }}
//       md={{ span: 2, offset: 0 }}
//       lg={{ span: 2, offset: 0 }}
//       xl={{ span: 1, offset: 0 }}
//     >
//       <AntButton
//         htmlType="submit"
//         //   label={isNumber(selectedRecordId) ? <>{t('update')}</> : <>{t('add')}</>}
//         className="save-btn"
//       ></AntButton>
//     </Col>
//     <Col
//       xs={{ span: 2, offset: 15 }}
//       sm={{ span: 2, offset: 12 }}
//       md={{ span: 2, offset: 12 }}
//       lg={{ span: 1, offset: 11 }}
//       xl={{ span: 1, offset: 9 }}
//     >
//       <AntButton
//         //   icon={<RedoOutlined />}
//         style={{ width: '500%' }}
//         //   onClick={handleReset}
//         className="reset-btn"
//       />
//     </Col>
//   </Row>
// </Form>
// </div>
