import { Col, Row, Form, DatePicker, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { VouchersModernHistory } from '../../type';
import { List, map } from 'lodash';

export type VoucherHistoryFilterCriteriasModel = {
  FromDate: Date;
  ToDate: Date;
  FromVoucherNo: number;
  ToVoucherNo: number;
  AccountTitle: string;
  VoucherNotes: string;
};

const FormFilter: React.FC<{ data: any; handleFilterCriteria(): any }> = ({ data, handleFilterCriteria }) => {
  const [AccountTitles, setAccountTitles] = useState<List<{ Id: ''; AccountTitle: '' }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const uniqueTitles = new Set();
        // data.forEach((item: any) => {
        //   const title = item.VoucherHistoryHeader.HeaderAccountTitle;
        //   uniqueTitles.add(title);
        // });
        // const distinctTitles: any = Array.from(uniqueTitles);
        const uniqueTitles = new Set<string>();
        const distinctTitles: any = [];

        data.forEach((item: any) => {
          const title = item.VoucherHistoryHeader.HeaderAccountTitle;
          if (!uniqueTitles.has(title)) {
            uniqueTitles.add(title);
            distinctTitles.push({ Id: title, AccountTitle: title });
          }
        });

        setAccountTitles(distinctTitles);
        console.log(AccountTitles);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Call the function to fetch data
  }, [data]);

  const inputStyle = {
    border: 'none',
    borderBottom: '1px solid white',
    width: '85%',
  };
  return (
    <div>
      <Form layout="horizontal" className="form">
        <Row gutter={10}>
          <Col xs={10} md={12}>
            <Form.Item label="From Date" style={inputStyle}>
              <DatePicker style={inputStyle} bordered={false} />
            </Form.Item>
          </Col>
          <Col xs={10} md={12}>
            <Form.Item label="To Date" style={inputStyle}>
              <DatePicker bordered={false} />
            </Form.Item>
          </Col>
          <Col xs={10} md={12}>
            <Form.Item label="From Voucher" style={inputStyle}>
              <Input bordered={false} />
            </Form.Item>
          </Col>
          <Col xs={10} md={12}>
            <Form.Item label="To Voucher" style={inputStyle}>
              <Input bordered={false} />
            </Form.Item>
          </Col>
          <Col xs={10} md={12}>
            <Form.Item label="Account Title" style={inputStyle}>
              <Select
                bordered={false}
                options={map(AccountTitles, (Item: any) => ({
                  value: Item?.Id,
                  label: Item?.AccountTitle,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={10} md={12}>
            <Form.Item label="Voucher Notes" style={inputStyle}>
              <Select bordered={false} />
            </Form.Item>
          </Col>
        </Row>
        <Row></Row>
      </Form>
    </div>
  );
};

export default FormFilter;
