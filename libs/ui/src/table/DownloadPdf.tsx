import { Col, Tooltip } from 'antd';
import { AntButton } from '../button/AntButton';
import { FilePdfOutlined } from '@ant-design/icons';

function DownloadPdf({ disabled, isDownloadPdfEnabled }: TDownloadPdf) {
  if (!isDownloadPdfEnabled) return null;

  return (
    <Col>
      <Tooltip arrow title="Download pdf file">
        <AntButton disabled={disabled} type="default" icon={<FilePdfOutlined />} />
      </Tooltip>
    </Col>
  );
}

type TDownloadPdf = { disabled?: boolean; isDownloadPdfEnabled: boolean };

export default DownloadPdf;
