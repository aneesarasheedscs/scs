import './style.scss';
import { Col, Layout, Menu, Row } from 'antd';
import ToggleButton from './ToggleButton';
import { ReactNode, useState } from 'react';
import { AntButton } from '../button/AntButton';
import SideDrawer from '../sideDrawer/SideDrawer';
import { Anchor } from "antd";
import { Link, useLocation } from 'react-router-dom';
import './Style.css'
import { headerList } from './constant';
const { Header } = Layout;
// const { Link } = Anchor;
export function AppHeader({ appLogo, sideMenu }: TAppHeader) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { pathname } = useLocation();
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = window.location.origin + '/';
  };
  const targetOffset:number=100
  return (
    <>
      <Header className="app-header">
        <Row justify="space-between">
          <Col>
            <Row align="middle">
              <div style={{ marginRight: 10, marginLeft: -30 }}>
                <ToggleButton handleOpen={handleOpen} />
              </div>
              {appLogo ? appLogo : <h1>Logo</h1>}
              <div className="container-fluid" >
      <div className="header">
      
        
        </div>
        </div>
            </Row>
            
          </Col>

          <Col xl={12} style={{ display: "flex", justifyContent: "space-between"}} >
            <Row gutter={[10, 10]} style={{width: "100%"}}  >
              <Col xl={18}>
          <Menu mode="horizontal" style={{ paddingTop: 0,marginTop: 0, width: "100%" , height: "90%"}}>
      {headerList.map(({ path, label  }, index) => (
        <Menu.Item style={{border: "none"}}
          key={index}
          
          className={path === pathname ? 'ant-menu-item-active ant-menu-item-selected' : ''}
        >
          <Link to={path}>{label}</Link>
        </Menu.Item>
      ))}
    </Menu></Col>
    <Col>
            <AntButton size="large" label="Logout" onClick={handleLogout} /></Col>
            </Row>
          </Col>
        </Row>
        
      </Header>

      <SideDrawer open={open} handleClose={handleClose}>
    
      </SideDrawer>
    </>
  );
}

type TAppHeader = { appLogo?: ReactNode; sideMenu?: ReactNode };
