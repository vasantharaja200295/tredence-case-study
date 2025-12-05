import { v4 as uuidv4 } from "uuid";
import type { XYPosition } from "@xyflow/react";
import {
  APPROVAL_NODE_FIELDS,
  AUTOMATION_NODE_FIELDS,
  END_NODE_FIELDS,
  NODE_TYPES,
  TASK_NODE_FIELDS,
} from "@/constants";

export function createNode(position: XYPosition, type: string) {
  const getDataFields = () => {
    switch (type) {
      case NODE_TYPES.TASK:
        return TASK_NODE_FIELDS;
      case NODE_TYPES.APPROVAL:
        return APPROVAL_NODE_FIELDS;
      case NODE_TYPES.AUTOMATION:
        return AUTOMATION_NODE_FIELDS;
      case NODE_TYPES.END:
        return END_NODE_FIELDS;
      default:
        return {};
    }
  };

  const BaseNode = {
    position: position,
    id: uuidv4(),
    type: type,
    data: getDataFields(),
  };

  return BaseNode;
}
