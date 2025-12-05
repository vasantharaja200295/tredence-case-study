import React from "react";
import BaseNode from "./BaseNode";

const StartNode = ({ data }: any) => {
  return (
    <BaseNode isStart>
      <div>Start Node</div>
    </BaseNode>
  );
};

export default StartNode;
