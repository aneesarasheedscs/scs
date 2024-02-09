import { Col, Form, Row } from 'antd';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteria from './SearchCriteria';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { FourTrialBalanceAllLevelHistoryColumns, SixTrialBalanceAllLevelHistoryColumns } from './columns';
import { selectedColumnAtom } from './atom';
import { useGetTrialAllLevelReport } from './queries';
import { useEffect, useState } from 'react';
import { TrialBalanceAllLevelSearchCriteria, TtrialBalanceAllLevel } from './type';

const { useForm, useWatch } = Form;
function TrialBalanceAllLevelReport() {
  const { t } = useTranslation();
  const [selectedColumnss, setSelectedColumnss] = useAtom(selectedColumnAtom);
  const [tableData, setTableData] = useState<any>();
  // const { data, refetch, isError, isLoading, isFetching } = useGetTrialAllLevelReport();
  // const fillteredAccountLevel2 = data?.filter((item,i)=>)

  const [form] = useForm<TrialBalanceAllLevelSearchCriteria>();
  const formValues = useWatch<TrialBalanceAllLevelSearchCriteria>([], form);
  const { data, isSuccess, refetch, isFetching, isError, isLoading } = useGetTrialAllLevelReport(
    true,
    form.getFieldsValue()
  );
  const AccountLevel = form.getFieldValue('AccountLevel');
  console.log(AccountLevel);
  const AllLevelData = data?.data?.Data?.Result;
  useEffect(() => {
    if (isSuccess && !isLoading) {
      setTableData(AllLevelData);
    }
    if (isSuccess && !isLoading) {
      const fillteredTableData = AllLevelData?.filter((item: any) => item.AcLevel !== AccountLevel);
      setTableData(fillteredTableData);
      if (AccountLevel === 1) {
        const fillteredTableData = AllLevelData?.filter((item: any) => item.AcLevel === AccountLevel);
        setTableData(fillteredTableData);
      }
      if (AccountLevel === 5) {
        const fillteredTableData = AllLevelData?.filter(
          (item: any) => item.IsGroupDetail === 'Group' && item.AcLevel === 1
        );
        setTableData(fillteredTableData);
      }
    }
  }, [data, isSuccess, !isLoading]);
  console.log(tableData);
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([]);

  // useEffect(() => {
  //   setExpandedRowKeys(AllLevelData?.AccountId);
  // }, [AllLevelData]);

  // const handleRowExpand = (expanded: any, record: TtrialBalanceAllLevel) => {
  //   console.log('Expanded Row:', record); // Check what record is being clicked
  //   console.log('Expanded Row Keys:', expandedRowKeys); // Check the current expandedRowKeys
  //   const isRowExpanded = expandedRowKeys.includes(record.AccountId);
  //   console.log('Is Row Expanded:', isRowExpanded); // Check if the row is already expanded
  //   const newExpandedRowKeys = isRowExpanded
  //     ? expandedRowKeys.filter((key: any) => key !== record.AccountId)
  //     : [...expandedRowKeys, record.AccountId];
  //   console.log('New Expanded Row Keys:', newExpandedRowKeys); // Check the new expandedRowKeys
  //   setExpandedRowKeys(newExpandedRowKeys);
  // };
  const handleRowExpand = (expanded: boolean, record: TtrialBalanceAllLevel) => {
    // Check if the row is already expanded
    const isRowExpanded = expandedRowKeys.includes(record.AccountId);
    console.log('Is Row Expanded:', isRowExpanded);
    console.log(expandedRowKeys);

    // If the row is being expanded and it's not already expanded, add its key to expandedRowKeys
    if (expanded && !isRowExpanded) {
      setExpandedRowKeys([...expandedRowKeys, record.AccountId]);
    }
    // If the row is being collapsed and it's already expanded, remove its key from expandedRowKeys
    else if (!expanded && isRowExpanded) {
      setExpandedRowKeys(expandedRowKeys.filter((key: any) => key !== record.AccountId));
    }
  };

  return (
    <>
      <Row justify={'space-around'}>
        <Col xxl={23} xl={23} lg={23}>
          <AntTable
            rowKey={'Id'}
            refetch={refetch}
            isError={isError}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            columns={
              selectedColumnss === 'four'
                ? FourTrialBalanceAllLevelHistoryColumns(t)
                : SixTrialBalanceAllLevelHistoryColumns(t)
            }
            data={tableData || []}
            searchCriteriaForm={
              <SearchCriteria
                form={form}
                refetch={refetch}
                isError={isError}
                isLoading={isLoading}
                isFetching={isFetching}
              />
            }
            // scroll={{ x: '', y: convertVhToPixels('60vh') }}
            expandable={{
              expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.AccountId}</p>,
              rowExpandable: (record) => record.AccountId !== 'Not Expandable',
              expandedRowKeys,
              // onExpand: handleRowExpand,
              onExpand: (expanded, record) => handleRowExpand(expanded, record), // Pass record object here
            }}
          />
        </Col>
      </Row>
    </>
  );
}

export default TrialBalanceAllLevelReport;
