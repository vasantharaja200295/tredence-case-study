import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { useNodeId, Position } from "@xyflow/react";
import Handle from "@/components/Handle";

type NodeProps = {
  children: React.ReactNode;
  isStart?: boolean;
  isEnd?: boolean;
  isConditional?: boolean;
  isGeneral?: boolean;
  selected: boolean;
};

const BaseNode = ({
  children,
  isStart,
  isEnd,
  isConditional,
  isGeneral,
  selected,
}: NodeProps) => {
  const nodeId = useNodeId();

  const getRingColor = () => {
    if (isStart) return "ring-blue-500 shadow-blue-500/50";
    if (isEnd) return "ring-red-500 shadow-red-500/50";
    if (isConditional) return "ring-yellow-500 shadow-yellow-500/50";
    if (isGeneral) return "ring-violet-500 shadow-violet-500/50";
    return "ring-gray-500 shadow-gray-500/50";
  };

  return (
    <>
      <Card
        className={cn(
          "p-2 transition-all duration-200 rounded-md min-w-[200px] min-h-[110px] max-h-[250px] max-w-[300px]",
          selected && "ring-3  shadow-lg " + getRingColor(),
          !selected && "hover:border-gray-500"
        )}
      >
        <CardContent className="px-2">{children}</CardContent>
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
          </div>

          {/* Output Handle for False */}
          <div className="absolute right-0 top-[70%] translate-x-1/2 -translate-y-1/2">
            <Handle
              type="source"
              position={Position.Right}
              id={`${nodeId}+false-output`}
              className="bg-red-500! border-red-700!"
            />
          </div>
        </>
      )}
      {isStart && <Handle type="source" position={Position.Right} />}
      {isEnd && <Handle type="target" position={Position.Left} />}
    </>
  );
};

export default BaseNode;
