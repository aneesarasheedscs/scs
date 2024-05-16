import { useState, useEffect } from 'react';
import { Col, Row, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteriaForm from './SearchCriteriaForm';
import { columns, columns2 } from './columns'; // Renamed imported functions for clarity
import { AntColumnType } from '@tradePro/globalTypes';
import { TAccountPayablesBetweenPeriodTable, TAccountPayablesTable } from './types';
import { useGetAccountPayablesBetweenPeriodTable, useGetAccountPayablesTable } from '../queries';
import { useAtom } from 'jotai';
import { selectedRadio, tableColumn, tableData } from './Atom';

type TableColumnType = AntColumnType<TAccountPayablesTable>[] | AntColumnType<TAccountPayablesBetweenPeriodTable>[];

function AccountPayablesTable() {
  const { t } = useTranslation();
  // const [selectedRadio, setSelectedRadio] = useState<number>(1);
  // const [tableColumns, setTableColumns] = useState<TableColumnType>(columns(t));
  // const [selectedRadios, setSelectedRadios] = useAtom(selectedRadio);
  const [selectedRadios, setSelectedRadios] = useAtom(selectedRadio);
  const [tableColumns, setTableColumns] = useAtom(tableColumn);
  const [tableDataforPayables, setTableDataforPayables] = useAtom(tableData);

  const handleRadioChange = (value: number) => {
    // setSelectedRadio(value);
  };

  // useEffect(() => {
  //   // Update columns when selectedRadio or language (t) changes
  //   // if (isSuccess && !isLoading && selectedRadios === 1) {
  //   //   setTableColumns(columns(t));
  //   // } else if (selectedRadios === 2) {
  //   //   setTableColumns(columns2(t));
  //   // }
  //   // if (selectedRadio === 1) {
  //   //   console.log('Setting columns to 1');
  //   //   setTableColumns(columns(t));
  //   // } else if (selectedRadio === 2) {
  //   //   console.log('Setting columns to 2');
  //   //   setTableColumns(columns2(t));
  //   // }
  // }, [isSuccess, !isLoading, selectedRadios]);
  console.log('tableColumns', tableColumns);

  // console.log('Selected Radio:', selectedRadio);
  // console.log('Data:', data?.data?.Data?.Result);
  // console.log('Is Error:', isError);
  // console.log('Is Loading:', isLoading);

  const { data: Payables } = useGetAccountPayablesBetweenPeriodTable();
  console.log('Payables between', Payables?.data?.Data?.Result);
  const { data: PayablesByDueDate } = useGetAccountPayablesTable();
  console.log('Payables by due date', PayablesByDueDate?.data?.Data?.Result);

  const formHeading = {
    fontFamily: 'Times New Roman',
    // borderRadius: '5px',
    padding: '5px',
    // boxShadow: '2px 4px 12px 1px lightgray',
    marginBottom: '7px',
    fontSize: '1.8rem',
  };
  console.log(tableColumns);
  console.log('for payables', tableDataforPayables);
  return (
    <>
      <h2 style={formHeading}>{t('account_payables_by_due_date')}</h2>
      <Row justify={'center'}>
        <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 23 }} lg={{ span: 23 }} xl={{ span: 23, offset: 0 }}>
          <AntTable
            rowKey="Id"
            // isError={isError}
            // refetch={refetch}
            numberOfSkeletons={8}
            // isLoading={isLoading}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
            data={tableDataforPayables || []}
            // searchCriteriaForm={<SearchCriteriaForm onRadioChange={handleRadioChange} />}
            
            // columns={selectedRadios == 1 ? columns(t) : columns2(t)}
            columns={tableColumns}
          />
        </Col>
      </Row>
    </>
  );
}

export default AccountPayablesTable;
