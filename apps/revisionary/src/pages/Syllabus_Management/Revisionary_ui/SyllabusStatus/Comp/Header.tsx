import React, { useState } from "react";
import { Anchor, Drawer, Button } from "antd";
import './Header.css';
const { Link } = Anchor;


const AppHeader:React.FC = () => {

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const targetOffset: number = 65;

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo">
          <i className="fas fa-bolt"></i>
          <a href="http://google.com">Tech</a>
        </div>
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
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset={targetOffset}>
              <Link href="#hero" title="Home" />
              <Link href="#about" title="About" />
              <Link href="#feature" title="Features" />
              <Link href="#works" title="How it works" />
              <Link href="#faq" title="FAQ" />
              <Link href="#pricing" title="Pricing" />
              <Link href="#contact" title="Contact" />
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
export default AppHeader;