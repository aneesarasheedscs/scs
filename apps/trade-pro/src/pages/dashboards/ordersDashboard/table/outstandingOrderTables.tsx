import { AntButton, AntTable } from "@tradePro/components";
import React from "react";
import { Customercolumns, ItemAndPackcolumns, Itemcolumns, PackAndItemcolumns } from "./columns";
import { useTranslation } from "react-i18next";
import { convertVhToPixels } from "@tradePro/utils/converVhToPixels";
import { useGetPreBookingTablesData } from "../quries";
import { Col, Row } from "antd";
import _ from "lodash";


export const ItemTable =({data}:any)=>{
    

    const    {t} =useTranslation()
    return(
        <>
  <Row>
    <Col xxl={15}>
    <AntTable 
        columns={Itemcolumns(t)}
        scroll={{ x: '', y: convertVhToPixels('22vh') }}
        data={data?.data?.Data?.Result?.Table}

        />
    </Col>
  </Row>
        </>
    )
}
export  const CustomerTable =({data}:any)=>{
    const    {t} =useTranslation()
    return(
        <>
        <AntTable 
        columns={Customercolumns(t)}
        scroll={{ x: '', y: convertVhToPixels('22vh') }}
        data={data?.data?.Data?.Result?.Table1}

        />
        </>
    )
}


export const ItemAndPackTable =({data}:any)=>{
    const    {t} =useTranslation()
    return(
        <>
        <AntTable 
        columns={ItemAndPackcolumns(t)}
        scroll={{ x: '', y: convertVhToPixels('22vh') }}
        // data={data?.data?.Data?.Result?.Table2}

        
        />
        </>
    )
}

export const PackAndItemTable =({data}:any)=>{
    const    {t} =useTranslation()
    return(
        <>
        <AntTable 
        columns={PackAndItemcolumns(t)}
        scroll={{ x: '', y: convertVhToPixels('22vh') }}
        data={data?.data?.Data?.Result?.Table2}

        />
        </>
    )
}

