import { Col, Tooltip } from 'antd';
import { AntButton } from '../button/AntButton';
import { FileExcelOutlined } from '@ant-design/icons';

function DownloadExcel({ disabled, isDownloadExcelEnabled }: TDownloadExcel) {
  if (!isDownloadExcelEnabled) return null;

  return (
    <Col>
      <Tooltip arrow title="Download excel file">
        <AntButton disabled={disabled} type="default" icon={<FileExcelOutlined />} />
      </Tooltip>
    </Col>
  );
}

type TDownloadExcel = { disabled?: boolean; isDownloadExcelEnabled: boolean };

export default DownloadExcel;
