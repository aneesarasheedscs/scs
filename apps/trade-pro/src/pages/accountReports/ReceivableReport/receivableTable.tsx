import React, { useState } from 'react';

import { ReceivablColumn } from './columns/colomns';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import ReceivableFormCriteria from './searchCriteria';
import { Col, Modal, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { ReceivableReportQueryHistory } from './queries';
import GeneralLedgerReport from '../GeneralLedger';
import { ReceivableReportTypeCriteria } from './type';
import { Form } from 'antd';

const { useForm, useWatch } = Form;
const ReceivableReportTable: React.FC = () => {
  const [form] = useForm<ReceivableReportTypeCriteria>();
  const formValues = useWatch<ReceivableReportTypeCriteria>([], form);
  const { setFieldValue, setFields } = form;

  const [SelectedAccount, setSelectedAccount] = useState<number | undefined>(undefined);
  const { data, refetch, isError, isLoading, isFetching } = ReceivableReportQueryHistory();

  const handleAccountCodeClick = (AccountId: number) => {
    setSelectedAccount(AccountId);
    console.log(AccountId);
  };

  const { t } = useTranslation();
  return (
    <div>
      <Row>
        <Col xxl={24}>
          <AntTable
            refetch={refetch}
            isError={isError}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            columns={ReceivablColumn(t, handleAccountCodeClick)}
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<ReceivableFormCriteria />}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
            // rowKey={(row: ReceivableReportTypeHistory) => row.Id}
            rowKey="Id"
          />
        </Col>

        <Row>
          <Col>
            <Modal
              // style={{500}}
              width={1300}
              key={SelectedAccount}
              open={SelectedAccount !== undefined}
              onCancel={() => setSelectedAccount(undefined)}
              destroyOnClose={true}
              footer={null}
              bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
            >
              <div style={{ maxHeight: '100%', overflowX: 'hidden' }}>
                <GeneralLedgerReport
                  FromDateProp={form.getFieldValue('FromDate')}
                  ToDateProp={form.getFieldValue('ToDate')}
                  AccountIdProp={SelectedAccount}
                />
              </div>
            </Modal>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default ReceivableReportTable;
