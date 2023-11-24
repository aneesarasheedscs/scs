import { useState, useEffect } from 'react';
import { Col, Row, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteriaForm from './SearchCriteriaForm';
import { useGetAccountPayablesBetweenPeriodTable, useGetAccountPayablesTable } from '../queries/queries';
import { columns, columns2 } from './columns'; // Renamed imported functions for clarity
import { AntColumnType } from '@tradePro/globalTypes';
import { TAccountPayablesBetweenPeriodTable, TAccountPayablesTable } from './types';

type TableColumnType = AntColumnType<TAccountPayablesTable>[] | AntColumnType<TAccountPayablesBetweenPeriodTable>[];

function AccountPayablesTable() {
  const { t } = useTranslation();
  const [selectedRadio, setSelectedRadio] = useState<number>(1);
  const [tableColumns, setTableColumns] = useState<TableColumnType>(columns(t)); // Use default columns initially

  const handleRadioChange = (value: number) => {
    setSelectedRadio(value);
  };

  useEffect(() => {
    // Update columns when selectedRadio or language (t) changes
    if (selectedRadio === 1) {
      setTableColumns(columns(t));
    } else if (selectedRadio === 2) {
      setTableColumns(columns2(t));
    }
  }, [selectedRadio, t]);

  const { data, isError, isLoading } =
    selectedRadio === 1 ? useGetAccountPayablesTable() : useGetAccountPayablesBetweenPeriodTable();

  const formHeading = {
    fontFamily: 'Times New Roman',
    borderRadius: '5px',
    padding: '5px',
    boxShadow: '2px 4px 12px 1px lightgray',
    marginBottom: '7px',
    fontSize: '1.8rem',
  };

  return (
    <>
      <h2 style={formHeading}>{t('account_payables_by_due_day')}</h2>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24, offset: 0 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
            <AntTable
              rowKey="Id"
              isError={isError}
              numberOfSkeletons={8}
              isLoading={isLoading}
              scroll={{ x: '', y: convertVhToPixels('60vh') }}
              data={data?.data?.Data?.Result || []}
              searchCriteriaForm={<SearchCriteriaForm onRadioChange={handleRadioChange} />}
              columns={tableColumns} // Use dynamically determined columns
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AccountPayablesTable;
