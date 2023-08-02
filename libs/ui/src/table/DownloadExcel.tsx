import { Col, Tooltip } from 'antd';
import { AntButton } from '../button/AntButton';
import { FileExcelOutlined } from '@ant-design/icons';

function DownloadExcel({ isDownloadExcelEnabled }: TDownloadExcel) {
  if (!isDownloadExcelEnabled) return null;

  return (
    <Col>
      <Tooltip arrow title="Download excel file">
        <AntButton type="default" icon={<FileExcelOutlined />} />
      </Tooltip>
    </Col>
  );
}

type TDownloadExcel = { isDownloadExcelEnabled: boolean };

export default DownloadExcel;
