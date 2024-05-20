import React from "react";
import './style.scss'
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import OutstandingPreBooking from "./outstandingPreBooking/outstandingPreBooking";
import { AntButton } from "@tradePro/components";
import { EyeFilled, SyncOutlined } from '@ant-design/icons';

function OrderDashboard(){
    const {t} = useTranslation()
    return(
        <div style={{background:'#fff'}}>
 
           <Row className="firstTitle">
          <Col span={24}>
            <h2>{t('orders_dashboard')}</h2>
          </Col>
          <Col span={23} style={{marginLeft:49,}}>
            <div style={{ float: 'right' }} >
              <AntButton className="btn" icon={<SyncOutlined />} />
            </div>
          </Col>
        </Row>
        <OutstandingPreBooking/>
        </div>
    )
}


export default OrderDashboard