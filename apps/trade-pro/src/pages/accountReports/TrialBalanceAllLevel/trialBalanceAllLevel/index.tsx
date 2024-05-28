import { Col, Form, Row } from 'antd';
import { AntTable } from '@tradePro/components';
import SearchCriteria from './SearchCriteria';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import {
  FourTrialBalanceAllLevelHistoryColumns,
  SixTrialBalanceAllLevelHistoryColumns,
  TrialBalanceAllLevelChildColumns,
  TrialBalanceAllLevelChildColumnsSix,
} from './columns';
import { selectedColumnAtom } from './atom';
import { useGetTrialAllLevelReport } from './queries';
import { useEffect, useState } from 'react';
import { TrialBalanceAllLevelSearchCriteria, TtrialBalanceAllLevel } from './type';
import _ from 'lodash';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

const { useForm, useWatch } = Form;
function TrialBalanceAllLevelReport() {
  const { t } = useTranslation();
  const [scrollHeight, setScrollHeight] = useState<number | string>('60vh'); // Initial scroll height

  const [selectedColumnss, setSelectedColumnss] = useAtom(selectedColumnAtom);
  const [tableData, setTableData] = useState<any>();
  const [form] = useForm<TrialBalanceAllLevelSearchCriteria>();
  const formValues = useWatch<TrialBalanceAllLevelSearchCriteria>([], form);
  const { data, isSuccess, refetch, isFetching, isError, isLoading } = useGetTrialAllLevelReport(
    true,
    form.getFieldsValue()
  );

  console.log(data?.data?.Data?.Result);
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([]);
  console.log(expandedRowKeys?.[0]);

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

  const handleRowExpand = (expanded: boolean, record: TtrialBalanceAllLevel) => {
    // Check if the row is already expanded
    // setSelectedRow(record);
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

  // const Opening = tableData?.map((item: any) => item.Opening) ?? []; // Extracting all Opening values into an array
  // console.log(Opening);
  // const sum = _.sum(Opening); // Using _.sum to calculate the sum of all Opening values
  // console.log(sum);


  const CriteriaString = ()=>{
    return(
      <Row style={{border:'',padding:7,borderRadius:5}}>
        <h5>{tableData?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    )

  }

  return (
    <>
      <Row justify={'space-around'}>
        <Col xxl={23} xl={23} lg={23}>
          <AntTable
            rowKey={'AccountId'}
            refetch={refetch}
            isError={isError}
            // summary={() => []}
            searchCriteriaReport={tableData?.data?.Data?.Result?.[0]?.ReportCriteria? <CriteriaString/>:''}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            scroll={{ x: '', y: convertVhToPixels('65vh') }}
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
                expandedRowKeys={expandedRowKeys}
                setExpandedRowKeys={setExpandedRowKeys}
                tableData={tableData}
              />
            }
            // scroll={{ x: '', y: convertVhToPixels('60vh') }}
            // scroll={{ x: 'max-content' }}
            expandable={
              tableData?.[0]?.AcLevel === 1 && AccountLevel === 1
                ? {}
                : {
                    expandedRowRender: (record) => {
                      const childAccounts = data?.data?.Data?.Result?.filter(
                        (item: any) => item.ParentId === record.RowId
                      );
                      return (
                        <>
                          <Row justify={'end'}>
                            <Col span={23}>
                              <AntTable
                                summary={() => []}
                                printData={{ enabled: false, show: false }}
                                downloadPdf={{ enabled: false, show: false }}
                                columnChooser={{ enabled: false, show: false }}
                                downloadExcel={{ enabled: false, show: false }}
                                groupByColumns={{ enabled: false, show: false }}
                                refreshData={{ enabled: false, show: false }}
                                
                                rowKey={'AccountId'}
                                columns={
                                  selectedColumnss === 'four'
                                    ? TrialBalanceAllLevelChildColumns(t)
                                    : TrialBalanceAllLevelChildColumnsSix(t)
                                }
                                data={childAccounts || []}
                                expandable={
                                  (tableData?.[0]?.AcLevel === 1 && AccountLevel === 2) ||
                                  (tableData?.[0]?.AcLevel === 2 && AccountLevel === 3) ||
                                  (tableData?.[0]?.AcLevel === 3 && AccountLevel === 4)
                                    ? {}
                                    : {
                                        expandedRowRender: (record) => {
                                          const childAccounts = data?.data?.Data?.Result?.filter(
                                            (item: any) => item.ParentId === record.RowId
                                          );
                                          return (
                                            <>
                                              <Row justify={'end'}>
                                                <Col span={23}>
                                                  <AntTable
                                                    summary={() => []}
                                                    printData={{ enabled: false, show: false }}
                                                    downloadPdf={{ enabled: false, show: false }}
                                                    columnChooser={{ enabled: false, show: false }}
                                                    downloadExcel={{ enabled: false, show: false }}
                                                    groupByColumns={{ enabled: false, show: false }}
                                                    refreshData={{ enabled: false, show: false }}
                                                
                                                    rowKey={'AccountId'}
                                                    columns={
                                                      selectedColumnss === 'four'
                                                        ? TrialBalanceAllLevelChildColumns(t)
                                                        : TrialBalanceAllLevelChildColumnsSix(t)
                                                    }
                                                    data={childAccounts || []}
                                                    expandable={
                                                      tableData?.[0]?.AcLevel === 1 && AccountLevel === 1
                                                        ? {}
                                                        : {
                                                            expandedRowRender: (record) => {
                                                              const childAccounts = data?.data?.Data?.Result?.filter(
                                                                (item: any) => item.ParentId === record.RowId
                                                              );
                                                              return (
                                                                <>
                                                                  <Row justify={'end'}>
                                                                    <Col span={23}>
                                                                      <AntTable
                                                                        summary={() => []}
                                                                        printData={{ enabled: false, show: false }}
                                                                        downloadPdf={{ enabled: false, show: false }}
                                                                        columnChooser={{ enabled: false, show: false }}
                                                                        downloadExcel={{ enabled: false, show: false }}
                                                                        groupByColumns={{ enabled: false, show: false }}
                                                                        refreshData={{ enabled: false, show: false }}
                                                                        rowKey={'AccountId'}
                                                                        columns={
                                                                          selectedColumnss === 'four'
                                                                            ? TrialBalanceAllLevelChildColumns(t)
                                                                            : TrialBalanceAllLevelChildColumnsSix(t)
                                                                        }
                                                                        data={childAccounts || []}
                                                                      />
                                                                    </Col>
                                                                  </Row>
                                                                </>
                                                              );
                                                            },
                                                            rowExpandable: (record) =>
                                                              record.AccountId !== 'Not Expandable',
                                                            expandedRowKeys,
                                                            onExpand: (expanded, record) =>
                                                              handleRowExpand(expanded, record),
                                                          }
                                                    }
                                                  />
                                                </Col>
                                              </Row>
                                            </>
                                          );
                                        },
                                        rowExpandable: (record) => record.AccountId !== 'Not Expandable',
                                        expandedRowKeys,
                                        onExpand: (expanded, record) => handleRowExpand(expanded, record),
                                      }
                                }
                              />
                            </Col>
                          </Row>
                        </>
                      );
                    },
                    rowExpandable: (record) => record.AccountId !== 'Not Expandable',
                    expandedRowKeys,
                    onExpand: (expanded, record) => handleRowExpand(expanded, record),
                  }
            }
          />
        </Col>
      </Row>
    </>
  );
}

export default TrialBalanceAllLevelReport;
