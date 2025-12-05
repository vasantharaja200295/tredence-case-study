import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { useNodeId, Position } from "@xyflow/react";
import Handle from "@/components/Handle";

type NodeProps = {
  children: React.ReactNode;
  isStart?: boolean;
  isEnd?: boolean;
  isConditional?: boolean;
  isGeneral?: boolean;
};

const BaseNode = ({
  children,
  isStart,
  isEnd,
  isConditional,
  isGeneral,
}: NodeProps) => {
  const nodeId = useNodeId();

  return (
    <>
      <Card className="w-[250px]">
        <CardHeader>Node</CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>Card footer</CardFooter>
      </Card>
      {isGeneral && (
        <>
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </>
      )}
      {isConditional && (
        <>
          <Handle type="target" position={Position.Left} id="input" />

          {/* Output Handle for True */}
          <div className="absolute right-0 top-[30%] translate-x-1/2 -translate-y-1/2">
            <Handle
              type="source"
              position={Position.Right}
              id={`${nodeId}+true-output`}
              className="bg-green-500! border-green-700!"
            />
            <span className="absolute -top-2 -left-16 text-xs font-semibold text-green-600 whitespace-nowrap">
              Approved
            </span>
          </div>

          {/* Output Handle for False */}
          <div className="absolute right-0 top-[70%] translate-x-1/2 -translate-y-1/2">
            <Handle
              type="source"
              position={Position.Right}
              id={`${nodeId}+false-output`}
              className="bg-red-500! border-red-700!"
            />
            <span className="absolute -bottom-2 -left-15 text-xs font-semibold text-red-600 whitespace-nowrap">
              Rejected
            </span>
          </div>
        </>
      )}
      {isStart && <Handle type="source" position={Position.Right} />}
      {isEnd && <Handle type="target" position={Position.Left} />}
    </>
  );
};

export default BaseNode;
