import { Col, Row, Tabs } from 'antd';
import CardTable from './Card-Table';
import { useTranslation } from 'react-i18next';



const Tab: React.FC = () => {

  const { t } = useTranslation()
  return(
  <div className="full-page-tabs-container">
    <Row gutter={12}>
      <Col span={12}>
        <Tabs
          style={{ width: '100rem', marginLeft: '5%' }}
          defaultActiveKey="tab1"
        >
          <Tabs.TabPane tab={t ('subject_topics')} key="tab10">
            <CardTable />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  </div>
  )
};

export default Tab;
