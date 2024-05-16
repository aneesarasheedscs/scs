import { Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import LoadOrderDetailForm from './form/LoadOrderForm';
import { useState } from 'react';
import TabPane from 'antd/es/tabs/TabPane';
import GRNHistoryTable from './table';
import { BackButton } from '@scs/ui';
import './style.scss'

function GRNRetailRegister() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('1');

  return (
    <div style={{background:'#fff'}}>
   

      
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={15} sm={10} md={12} lg={12} xl={20} xxl={16} className="">
          <h1 className="report_heading"> GRN History</h1>
        </Col>
        <Col xs={3} sm={2} xxl={1} md={2} lg={2} xl={2} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={false} />
        </Col>
      </Row>

      <GRNHistoryTable />
    </div>
  );
}

export default GRNRetailRegister;
