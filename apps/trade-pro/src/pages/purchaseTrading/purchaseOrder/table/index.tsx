import { columns } from './columns';
import { AntTable } from '@tradePro/components';
import { useGetPurchaseOrder } from '../queries';
import { TableProps } from 'antd';

function PurchaseOrderTable(  ) {
  const { data, isError, isLoading } = useGetPurchaseOrder();
 console.log(useGetPurchaseOrder())
 
  return ( 
    <AntTable
      // data={[data? (
      //   data.data.map((item, key)=>{
      //        {item.Id}
      //   })
      // ): '']}
      data={[data]}
      isError={isError}
      scroll={{ x: '' }}
      columns={columns()}
       
      isLoading={isLoading}
      numberOfSkeletons={8}
      tableTitle="Purchase Order"
    />
  );
}

  

export default PurchaseOrderTable;
