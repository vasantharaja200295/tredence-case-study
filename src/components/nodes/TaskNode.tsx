import React from "react";
import BaseNode from "./BaseNode";

const TaskNode = ({ data, selected }: any) => {
  return (
    <BaseNode isGeneral selected={selected}>
      <div>TaskNode</div>
    </BaseNode>
  );
};

export default TaskNode;
