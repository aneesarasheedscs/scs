import './style.scss';
import ToggleButton from './ToggleButton';
import { ReactNode, useState } from 'react';
import { Col, Grid, Layout, Row } from 'antd';
import { AntButton } from '../button/AntButton';
import SideDrawer from '../sideDrawer/SideDrawer';
import { Anchor } from "antd";

import './Style.css'
const { Header } = Layout;
const { Link } = Anchor;
export function AppHeader({ appLogo, sideMenu }: TAppHeader) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = window.location.origin + '/';
  };
  const targetOffset:number=65
  return (
    <>
      <Header className="app-header">
        <Row justify="space-between">
          <Col>
            <Row align="middle">
              <div style={{ marginRight: 10, marginLeft: -30 }}>
                <ToggleButton handleOpen={handleOpen} />
              </div>
              {/* {appLogo ? appLogo : <h1>Logo</h1>} */}
              <div className="container-fluid" >
      <div className="header">
        {/* <div className="logo">
          <i className="fas fa-bolt"></i>
          <a href="http://google.com">Tech</a>
        </div> */}
        <div className="mobileHidden">
          <Anchor targetOffset={targetOffset}>
            <Link className="links" href="#hero" title="Home" />
            <Link className="links" href="#about" title="About" />
            <Link className="links" href="#feature" title="Features" />
            <Link className="links" href="#works" title="Works" />
            <Link className="links" href="#faq" title="FAQ" />
            <Link className="links" href="#pricing" title="Pricing" />
            <Link className="links" href="#contact" title="Contact" />
          </Anchor>
        </div></div></div>
            </Row>
          </Col>
          <Col>
            <AntButton size="large" label="Logout" onClick={handleLogout} />
          </Col>
        </Row>
      </Header>

      <SideDrawer open={open} handleClose={handleClose}>
      <Anchor targetOffset={targetOffset}>
            <Link className="links" href="#hero" title="Home" />
            <Link className="links" href="#about" title="About" />
            <Link className="links" href="#feature" title="Features" />
            <Link className="links" href="#works" title="Works" />
            <Link className="links" href="#faq" title="FAQ" />
            <Link className="links" href="#pricing" title="Pricing" />
            <Link className="links" href="#contact" title="Contact" />
          </Anchor>
      </SideDrawer>
    </>
  );
}

type TAppHeader = { appLogo?: ReactNode; sideMenu?: ReactNode };
