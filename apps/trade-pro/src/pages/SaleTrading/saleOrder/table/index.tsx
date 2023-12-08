import { AntTable } from '@scs/ui';
import { useGetSaleOrder } from '../queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { SaleOrdercolumns, saleOrderFormcolumns2 } from './columns';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';

const SaleOrderTable = ({ setSelectedRecordId, setActiveTab }: TFrom) => {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetSaleOrder();
  console.log('sale order', data?.data?.Data?.Result);
  return (
    <>
        <Row gutter={[16,16]}  justify={'space-between'} >      {/* <Row> */}
<Col>
      <AntTable
        refetch={refetch}
        isError={isError}
        columns={SaleOrdercolumns(t)}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('26vh') }}
      />
      <br></br>
      <Row gutter={[16,16]}  justify={'space-between'} >      {/* <Row> */}

      <Col>
      <AntTable
        refetch={refetch}
        isError={isError}
        columns={saleOrderFormcolumns2()}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('18vh') }}
      />
      </Col>
      </Row>
      </Col>
      </Row>

    </>
  );
};
type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
};

export default SaleOrderTable;
