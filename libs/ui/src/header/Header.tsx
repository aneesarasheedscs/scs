import './style.scss';
import ToggleButton from './ToggleButton';
import { ReactNode, useState } from 'react';
import { Col, Grid, Layout, Row } from 'antd';
import { AntButton } from '../button/AntButton';
import SideDrawer from '../sideDrawer/SideDrawer';

const { Header } = Layout;

export function AppHeader({ appLogo, sideMenu }: TAppHeader) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = window.location.origin + '/';
  };

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
            </Row>
          </Col>
          <Col>
            <AntButton size="large" label="Logout" onClick={handleLogout} />
          </Col>
        </Row>
      </Header>

      <SideDrawer open={open} handleClose={handleClose}>
        {sideMenu}
      </SideDrawer>
    </>
  );
}

type TAppHeader = { appLogo?: ReactNode; sideMenu?: ReactNode };
