import BaseNode from "./BaseNode";

const StartNode = ({ data, selected }: any) => {
  return (
    <BaseNode isStart selected={selected}>
      <div>Start Node</div>
    </BaseNode>
  );
};

export default StartNode;
