import React from "react";
import BaseNode from "./BaseNode";

const EndNode = ({ data, selected }: any) => {
  return (
    <BaseNode isEnd selected={selected}>
      <div>End Node</div>
    </BaseNode>
  );
};

export default EndNode;
