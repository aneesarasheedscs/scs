import { Col, Form, FormInstance, Row, Tabs, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import '../style.scss';
import DynamicForm from './DetailEntry';
import ExpenseGridEntry from './ExpenseGridEntry';
// import { expenseAmount } from './Atom';
const { useForm } = Form;
const TabsPortion = ({ form }: TDynamicForm) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');
  const {
    token: { colorPrimary },
  } = theme.useToken();
  // const [amounts, setAmounts] = useState(expenseAmount);

  return (
    <>
      <Row style={{ marginTop: '0.5%' }}>
        <Col>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('detail')}>
              <DynamicForm
                form={form}
                //  Amount={amounts}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('expense')}>
              <ExpenseGridEntry form={form} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

type TDynamicForm = { form: FormInstance };
export default TabsPortion;
