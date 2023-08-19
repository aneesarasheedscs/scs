import { Col, Tooltip } from 'antd';
import { AntButton } from '../button/AntButton';
import { FilePdfOutlined } from '@ant-design/icons';

function DownloadPdf({ isDownloadPdfEnabled }: TDownloadPdf) {
  if (!isDownloadPdfEnabled) return null;

  return (
    <Col>
      <Tooltip arrow title="Download pdf file">
        <AntButton type="default" icon={<FilePdfOutlined />} />
      </Tooltip>
    </Col>
  );
}

type TDownloadPdf = { isDownloadPdfEnabled: boolean };

export default DownloadPdf;
