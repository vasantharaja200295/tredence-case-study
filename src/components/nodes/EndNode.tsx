import React from "react";
import BaseNode from "./BaseNode";

const EndNode = ({ data }: any) => {
  return (
    <BaseNode isEnd>
      <div>End Node</div>
    </BaseNode>
  );
};

export default EndNode;
