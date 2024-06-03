import { AntTablecopy } from '@scs/ui';
import { AntColumnType } from '@tradePro/globalTypes';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Card, Col, Row, Table, theme } from 'antd';
import { TFunction } from 'i18next';
import { map } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';

function PresentReport({ PresentData }: Props) {
  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const data = [
    {
      employeeName: 'M. Iqbal',
      value1: 20,
      value2: 30,
    },
  ];
  const dataSource = [
    {
      key: '1',
      col1: 'Data 1',
      col2: 'Data 2',
      col3: 'Data 3',
    },
    {
      key: '2',
      col1: 'Data 4',
      col2: 'Data 5',
      col3: 'Data 6',
    },
  ];

  const columnss = [
    {
      title: <div style={{ backgroundColor: '#ff9999' }}>Header 1</div>,
      dataIndex: 'col1',
      key: 'col1',
    },
    {
      title: <div style={{ backgroundColor: '#99ff99' }}>Header 2</div>,
      dataIndex: 'col2',
      key: 'col2',
    },
    {
      title: <div style={{ backgroundColor: '#9999ff' }}>Header 3</div>,
      dataIndex: 'col3',
      key: 'col3',
    },
  ];
  return (
    <>
      {/* <Table columns={columnss} /> */}
      <Row style={{ marginTop: '-0.5%', border: '' }}>
        <Col span={24}>
          <Row justify={'end'} style={{ marginBottom: 5 }}>
            <Col span={7}>
              <Card
                id="Present"
                bordered={false}
                // onClick={(e) => handleReport(e)}
                style={{
                  height: '6vh',
                  borderRadius: 0,
                  background: colorPrimary,
                }}
                cover={
                  <>
                    <h4 style={{ padding: 10, paddingTop: 15 }}> Employee Name </h4>
                  </>
                }
              ></Card>
            </Col>
            <Col span={5}>
              <Card
                id="Absent"
                bordered={false}
                // onClick={(e) => handleReport(e)}
                style={{ height: '6vh', borderRadius: 0, cursor: 'pointer', background: 'lightgrey' }}
                cover={
                  <>
                    <h5 style={{ marginTop: 0, textAlign: 'center', textDecoration: 'underline' }}> This Month </h5>
                    <h5 style={{ marginTop: 0, textAlign: 'center' }}> Previous </h5>
                    <h5 style={{ marginTop: -5, textAlign: 'center', marginLeft: -5 }}> Month </h5>
                  </>
                }
              ></Card>
            </Col>
            <Col span={6}>
              <Card
                id="Late"
                bordered={false}
                // onClick={(e) => handleReport(e)}
                style={{ height: '6vh', borderRadius: 0, cursor: 'pointer', background: '#eeee' }}
                cover={
                  <>
                    <h5 style={{ marginTop: 0, textAlign: 'center', textDecoration: 'underline' }}> This Month </h5>
                    <h5 style={{ marginTop: 0, textAlign: 'center' }}> Previous </h5>
                    <h5 style={{ marginTop: -5, textAlign: 'center', marginLeft: -5 }}> Month </h5>
                  </>
                }
              ></Card>
            </Col>
            <Col span={6}>
              <Card
                bordered={false}
                // onClick={(e) => handleReport(e)}
                style={{
                  height: '6vh',
                  borderRadius: 0,

                  cursor: 'pointer',
                  background: 'orange',
                }}
                cover={
                  <>
                    <h5 style={{ marginTop: 0, textAlign: 'center', textDecoration: 'underline' }}> This Month </h5>
                    <h5 style={{ marginTop: 0, textAlign: 'center' }}> Previous </h5>
                    <h5 style={{ marginTop: -5, textAlign: 'center', marginLeft: -5 }}> Month </h5>
                  </>
                }
              ></Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ height: '35vh', overflowY: 'scroll' }}>
        <Col span={24}>
          {map(PresentData, (item, index: number) => (
            <Row gutter={0} style={{ borderTop: '1px solid grey' }}>
              <Col
                span={24}
                style={{ borderBottom: '1px solid grey', backgroundColor: index % 2 === 0 ? '#EBF5FB' : '' }}
              >
                <Row gutter={0} justify={'end'} style={{ paddingLeft: 2 }}>
                  <Col span={7}>
                    <h5 style={{ textDecoration: 'underline' }}> {item.EmployeeName} </h5>
                  </Col>
                  <Col span={5} style={{ backgroundColor: 'lightgrey' }}>
                    <h5 style={{ textAlign: 'center' }}>{item.Present} </h5>
                    <h5 style={{ textAlign: 'center' }}>{item.Last30DaysPresent} </h5>
                  </Col>
                  <Col span={6}>
                    <h5 style={{ textAlign: 'center' }}>{item.Absent} </h5>
                    <h5 style={{ textAlign: 'center' }}>{item.Last30DaysAbsent} </h5>
                  </Col>
                  <Col span={6} style={{ backgroundColor: 'orange' }}>
                    <h5 style={{ textAlign: 'center' }}> {item.ThisMonthLate} </h5>
                    <h5 style={{ textAlign: 'center' }}> {item.Last30DaysLate} </h5>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>

      {/* <Row gutter={0} style={{ borderTop: '1px solid grey' }}>
        <Col span={24} style={{ borderBottom: '1px solid grey', backgroundColor: '#EBF5FB' }}>
          <Row gutter={0} justify={'end'} style={{ paddingLeft: 2 }}>
            <Col span={7}>
              <h5 style={{ textDecoration: 'underline' }}> M. Iqbal </h5>
            </Col>
            <Col span={5} style={{ backgroundColor: 'lightgrey' }}>
              <h5 style={{ textAlign: 'center' }}>0</h5>
              <h5 style={{ textAlign: 'center' }}>0</h5>
            </Col>
            <Col span={6}>
              <h5 style={{ textAlign: 'center' }}>25</h5>
              <h5 style={{ textAlign: 'center' }}>0</h5>
            </Col>
            <Col span={6} style={{ backgroundColor: 'orange' }}>
              <h5 style={{ textAlign: 'center' }}>0</h5>
              <h5 style={{ textAlign: 'center' }}>0</h5>
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ borderBottom: '1px solid grey', backgroundColor: '#EBF5FB' }}>
          <Row gutter={0} justify={'end'} style={{ paddingLeft: 2 }}>
            <Col span={7}>
              <h5 style={{ textDecoration: 'underline' }}> M. Iqbal </h5>
            </Col>
            <Col span={5} style={{ backgroundColor: 'lightgrey' }}>
              <h5 style={{ textAlign: 'center' }}>0</h5>
              <h5 style={{ textAlign: 'center' }}>0</h5>
            </Col>
            <Col span={6}>
              <h5 style={{ textAlign: 'center' }}>25</h5>
              <h5 style={{ textAlign: 'center' }}>0</h5>
            </Col>
            <Col span={6} style={{ backgroundColor: 'orange' }}>
              <h5 style={{ textAlign: 'center' }}>0</h5>
              <h5 style={{ textAlign: 'center' }}>0</h5>
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ borderBottom: '1px solid grey', backgroundColor: '#EBF5FB' }}>
          <Row gutter={0} justify={'end'} style={{ paddingLeft: 2 }}>
            <Col span={7}>
              <h5 style={{ textDecoration: 'underline' }}> M. Iqbal </h5>
            </Col>
            <Col span={5} style={{ backgroundColor: 'lightgrey' }}>
              <h5 style={{ textAlign: 'center' }}>0</h5>
              <h5 style={{ textAlign: 'center' }}>0</h5>
            </Col>
            <Col span={6}>
              <h5 style={{ textAlign: 'center' }}>25</h5>
              <h5 style={{ textAlign: 'center' }}>0</h5>
            </Col>
            <Col span={6} style={{ backgroundColor: 'orange' }}>
              <h5 style={{ textAlign: 'center' }}>0</h5>
              <h5 style={{ textAlign: 'center' }}>0</h5>
            </Col>
          </Row>
        </Col>
      </Row> */}
      {/* <AntTablecopy data={data} showDefaultTableGrid={true} columns={columns(t)} /> */}
    </>
  );
}

export default PresentReport;

const columns = (t: TFunction): AntColumnType<any>[] => [
  {
    // title: 'Employee Name',
    dataIndex: 'employeeName',
  },
  {
    // title: (
    //   <>
    //     <p>This Month</p> <p>PreviousMonth</p>
    //   </>
    // ),
    dataIndex: 'value1',
    render: (_, { value1, value2 }) => (
      <>
        <p>{value1}</p>
        <p>{value2}</p>
      </>
    ),
  },
  {
    // title: (
    //   <>
    //     <p>This Month</p> <p>PreviousMonth</p>
    //   </>
    // ),
    dataIndex: 'value1',
    render: (_, { value1, value2 }) => (
      <>
        <p>{value1}</p>
        <p>{value2}</p>
      </>
    ),
  },
  {
    // title: (
    //   <>
    //     <p>This Month</p> <p>PreviousMonth</p>
    //   </>
    // ),
    dataIndex: 'value1',
    render: (_, { value1, value2 }) => (
      <>
        <p>{value1}</p>
        <p>{value2}</p>
      </>
    ),
  },
];
interface Props {
  PresentData: any;
}
