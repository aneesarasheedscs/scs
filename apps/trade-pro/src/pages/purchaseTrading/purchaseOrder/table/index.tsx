import { columns } from './columns';
import { AntTable } from '@tradePro/components';
import { useGetPurchaseOrder } from '../queries';
import { TableProps } from 'antd';
import { useState, useEffect } from 'react';
import { groupBy, map, size } from 'lodash';

function PurchaseOrderTable(  ) {
  const { data, isError, isLoading, isSuccess } = useGetPurchaseOrder();
 const [tabledata, setTabledata] = useState<any[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setTabledata(menuList(data?.data?.Data?.Result));
    }
  }, [data, isSuccess]);


  const menuList = (data : TApidata) => {
    if (size(data) > 0) {
      return map(data, (item) => {
        return {
          children: data,
          ...data,
        };
      });
    }

    return [];
  };
  return ( 
    <AntTable
      data={data?.data?.Data?.Result}
      isError={isError}
      scroll={{ x: '' }}
      columns={columns()} 
      isLoading={isLoading}
      numberOfSkeletons={8}
      tableTitle="Purchase Order"
    />

    
     
  );
}

export type TApidata = {
  Id: number;
  App: string;
  AppId: number;
  Value: boolean;
  UserId: number;
  IconUrl: string;
  RightsID: number;
  ScreenID: number;
  ModuleID: number;
  CompanyId: number;
  RightName: string;
  TargetUrl: string;
  ScreenName: string;
  ScreenAlias: string;
  IsFavorite: boolean;
  ModuleTypeId: number;
  TblUserRightslst: any;
  ModuleDescription: string;
  ModelMenuControllName: string;
  MenuControllName: null | string;
};


export default PurchaseOrderTable;
