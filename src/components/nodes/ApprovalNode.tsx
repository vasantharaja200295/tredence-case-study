import BaseNode from "./BaseNode";

const ApprovalNode = ({ selected }: any) => {
  return (
    <BaseNode isConditional selected={selected}>
      <div>ApprovalNode</div>
    </BaseNode>
  );
};

export default ApprovalNode;
