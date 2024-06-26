import './style.scss';
import { Layout } from 'antd';
import { ReactNode, useState } from 'react';
import SideMenu from './SideMenu';
import { AppHeader, LanguageSwitcher, Sidebar } from '@scs/ui';

const { Content } = Layout;

function AppLayout({ children }: TAppLayout) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout>
      <AppHeader appLogo={<h1>Revisionary</h1>} languageSwitcher={<LanguageSwitcher />} />
      <Layout style={{ marginTop: 65 }}>
        <Sidebar collapsed={collapsed}>
          <SideMenu />
        </Sidebar>
        <Content className="content-container">{children}</Content>
      </Layout>
    </Layout>
  );
}

type TAppLayout = { children: ReactNode };

export default AppLayout;
