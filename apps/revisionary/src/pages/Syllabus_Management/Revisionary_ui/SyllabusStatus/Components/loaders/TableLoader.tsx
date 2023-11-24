import { Row, Skeleton } from "antd";

function TableLoader({ numberOfSkeletons = 3 }: TTableLoader) {
  return (
    <Row gutter={[0, 15]}>
      {[...Array(numberOfSkeletons)].map((item, index) => (
        <Skeleton.Button active block key={index} />
      ))}
    </Row>
  );
}

type TTableLoader = { numberOfSkeletons?: number };

export default TableLoader;
