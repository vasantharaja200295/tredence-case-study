import ApprovalNode from "./ApprovalNode";
import AutomationNode from "./AutomationNode";
import EndNode from "./EndNode";
import StartNode from "./StartNode";
import TaskNode from "./TaskNode";

export const NODES = {
  start: StartNode,
  end: EndNode,
  automation: AutomationNode,
  approval: ApprovalNode,
  task: TaskNode,
};
