import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Card, Col, FormInstance, Row, theme } from 'antd';
import { useGetSalesDataBranchWise } from './quries';
import _, { map } from 'lodash';

function BranchWiseInformationCards({ form }: TBranchWiseInformation) {
  const { data, isError, isLoading, isFetching, refetch } = useGetSalesDataBranchWise(true, form.getFieldsValue());

  const results = data?.data?.Data?.Result;

  const branchesData = results?.map((result: any) => ({
    branchCaption: [
      result.Parms_01,
      result.Parms_02,
      result.Parms_03,
      result.Parms_04,
      result.Parms_05,
      result.Parms_06,
      result.Parms_07,
      result.Parms_08,
      result.Parms_09,
      result.Parms_10,
    ].filter((caption) => caption !== null),
    totalSaleValues: [
      _.sumBy(results, 'Value_01'),
      _.sumBy(results, 'Value_02'),
      _.sumBy(results, 'Value_03'),
      _.sumBy(results, 'Value_04'),
      _.sumBy(results, 'Value_05'),
      _.sumBy(results, 'Value_06'),
      _.sumBy(results, 'Value_07'),
      _.sumBy(results, 'Value_08'),
      _.sumBy(results, 'Value_09'),
      _.sumBy(results, 'Value_10'),
    ].filter((value) => value !== 0),
    totalWeightValues: [
      _.sumBy(results, 'ValueWT_01'),
      _.sumBy(results, 'ValueWT_02'),
      _.sumBy(results, 'ValueWT_03'),
      _.sumBy(results, 'ValueWT_04'),
      _.sumBy(results, 'ValueWT_05'),
      _.sumBy(results, 'ValueWT_06'),
      _.sumBy(results, 'ValueWT_07'),
      _.sumBy(results, 'ValueWT_08'),
      _.sumBy(results, 'ValueWT_09'),
      _.sumBy(results, 'ValueWT_10'),
    ].filter((value) => value !== 0),
  }));

  // console.log(branchesData?.[0]?.branchCaption);
  // console.log(branchesData?.[0]?.totalSaleValues);
  // console.log(branchesData?.[0]?.totalWeightValues);
  // const totlaSalesValue = _.sumBy(branchesData, 'totalSaleValues');

  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <>
      <Row gutter={[8, 6]} style={{ marginTop: 10, marginBottom: 10 }}>
        {map(branchesData?.[0]?.branchCaption, (item, index) => (
          <Col xxl={4} xl={5} lg={8} md={8} sm={12} xs={12}>
            <Card
              bordered={false}
              style={{ height: '11vh' }}
              cover={
                <>
                  <div className="branches_cards">
                    <h3
                      style={{
                        borderTopLeftRadius: 3,
                        borderTopRightRadius: 3,
                        backgroundColor: colorPrimary,
                        textAlign: 'center',
                        padding: 5,
                        marginBottom: 10,
                      }}
                    >
                      {item}
                    </h3>
                    <Row
                      gutter={[6, 0]}
                      justify={'space-between'}
                      style={{ paddingLeft: 5, paddingRight: 5, marginTop: 5 }}
                    >
                      <Col span={12} style={{}}>
                        <h5>Total Sale Value</h5>
                      </Col>
                      <Col span={12}>
                        <p
                          style={{
                            fontSize: 15,
                            textAlign: 'right',
                          }}
                        >
                          {numberFormatter(branchesData?.[0]?.totalSaleValues[index])}
                        </p>
                      </Col>
                    </Row>
                    <Row
                      gutter={[6, 0]}
                      justify={'space-between'}
                      style={{ paddingLeft: 5, paddingRight: 5, marginTop: 0 }}
                    >
                      <Col span={12} style={{}}>
                        <h5>Total Weight </h5>
                      </Col>
                      <Col span={12}>
                        <p
                          style={{
                            fontSize: 15,
                            textAlign: 'right',
                          }}
                        >
                          {numberFormatter(branchesData?.[0]?.totalWeightValues[index])}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </>
              }
            ></Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default BranchWiseInformationCards;
interface TBranchWiseInformation {
  form: FormInstance;
}
