import BaseNode from "./BaseNode";

const AutomationNode = ({ selected }: any) => {
  return (
    <BaseNode isGeneral selected={selected}>
      <div>AutomationNode</div>
    </BaseNode>
  );
};

export default AutomationNode;
