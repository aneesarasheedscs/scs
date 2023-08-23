import './style.scss';
import { Layout } from 'antd';
import { ReactNode } from 'react';
import SideMenu from './SideMenu';
import { AppHeader, Sidebar, LanguageSwitcher } from '@scs/ui';

const { Content } = Layout;

function AppLayout({ children }: TAppLayout) {
  return (
    <Layout>
      <AppHeader
        sideMenu={<SideMenu />}
        appLogo={<h1>TradePro</h1>}
        languageSwitcher={<LanguageSwitcher />}
      />
      <Layout style={{ marginTop: 65 }}>
        <Sidebar>
          <SideMenu />
        </Sidebar>
        <Content className="content-container">{children}</Content>
      </Layout>
    </Layout>
  );
}

type TAppLayout = { children: ReactNode };

export default AppLayout;
