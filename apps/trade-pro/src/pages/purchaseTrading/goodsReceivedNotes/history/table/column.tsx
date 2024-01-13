import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Tooltip } from 'antd';
import { AntButton } from '@tradePro/components';
import { EditFilled, PrinterOutlined } from '@ant-design/icons';
import { TGRNDetailTable } from '../../types';

export const columns = (t: any): AntColumnType<TGRNDetailTable>[] => [
  { title: t('document_date'), dataIndex: 'DocNo', width: 150 },
  {
    width: 150,
    title: t('document_no'),
    searchableDate: true,
    dataIndex: 'DocDate',
    render: (_, { DocDate }) => formateDate(DocDate),
  },

  {
    title: t('supplier_name'),
    dataIndex: 'SupplierName',
    width: 250,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  },
  {
    title: t('delivery_term'),
    dataIndex: 'DeliveryTerm',
    width: 300,
  },
  {
    title: t('gp_no'),
    dataIndex: 'GpSrNo',
    width: 200,
    render: (_, { GpSrNo }) => numberFormatter(GpSrNo),
  },
  {
    title: t('vehicle_no'),
    dataIndex: 'VehicleNo',
    width: 150,
  },
  {
    title: t('bilty_no'),
    dataIndex: 'BiltyNo',
    width: 150,
  },
  {
    width: 150,
    title: t('factory_weight'),
    dataIndex: 'FactoryWeight',
    render: (_, { FactoryWeight }) => numberFormatter(FactoryWeight),
  },

  {
    width: 160,
    title: t('party_weight'),
    dataIndex: 'PartyWeight',
    render: (_, { PartyWeight }) => numberFormatter(PartyWeight),
  },
  {
    width: 140,
    title: t('diff_weight'),
    dataIndex: 'DiffWeight',
    render: (_, { DiffWeight }) => numberFormatter(DiffWeight),
  },

  {
    width: 140,
    title: t('vehicle_no'),
    dataIndex: 'VehicleNo',
  },
  {
    width: 140,
    title: t('transporter'),
    dataIndex: 'TransporterName',
  },

  {
    width: 130,
    title: t('freight_amount'),
    dataIndex: 'FreightAmount',
    render: (_, { FreightAmount }) => numberFormatter(FreightAmount),
  },
  {
    width: 130,
    title: t('remarks_header'),
    dataIndex: 'RemarksHeader',
  },
  {
    width: 120,
    title: t('action'),
    dataIndex: '',
    render: (_, record) => (
      <>
        <Tooltip title={t('edit')}>
          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'black' }} />}
            // onClick={() => setSelectedRecordId(record?.Id)}
          />
        </Tooltip>
        <Tooltip title={t('print')}>
          <AntButton type="text" icon={<PrinterOutlined style={{ color: 'blue' }} />} />
        </Tooltip>
      </>
    ),
  },
];
