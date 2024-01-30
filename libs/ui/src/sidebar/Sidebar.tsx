import { Layout } from 'antd';
import { ReactNode } from 'react';

const { Sider } = Layout;

export function Sidebar({ collapsed, children }: TSidebar) {
  return (
    <Sider
      // width={250}
      width={collapsed ? 260 : 98}
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        left: 0,
        top: 65,
        bottom: 0,
        position: 'fixed',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: '#fff',
      }}
    >
      {children}
    </Sider>
  );
}

type TSidebar = { collapsed: any; children?: ReactNode };
