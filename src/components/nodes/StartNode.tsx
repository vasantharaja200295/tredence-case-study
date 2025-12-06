import { Play } from "lucide-react";
import BaseNode from "./BaseNode";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import type { StartNodeData } from "@/types/nodes";

type Props = {
  data: StartNodeData;
  selected: boolean;
};

const StartNode = ({ data, selected }: Props) => {
  return (
    <BaseNode isStart selected={selected}>
      <div className="flex items-center gap-2 pr-2 mb-2">
        <Play size={18} />
        <Badge className="text-xs font-light rounded-sm bg-blue-500">
          START
        </Badge>
      </div>
      <Separator />
      <div className="mt-1 pb-1">
        <p className=" font-medium text-wrap max-w-[250px] w-[200px] ">
          {data.title}
        </p>
      </div>
    </BaseNode>
  );
};

export default StartNode;
