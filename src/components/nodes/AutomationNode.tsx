import { ClipboardClock } from "lucide-react";
import { Badge } from "../ui/badge";
import BaseNode from "./BaseNode";
import { Separator } from "../ui/separator";
import type { AutomationNodeData } from "@/types/nodes";

type Props = {
  data: AutomationNodeData;
  selected: boolean;
};

const AutomationNode = ({ data, selected }: Props) => {
  return (
    <BaseNode isGeneral selected={selected}>
      <div className="flex items-center gap-2 pr-2 mb-2">
        <ClipboardClock size={18} />
        <Badge className="text-xs font-light rounded-sm bg-violet-500">
          Automation
        </Badge>
      </div>
      <Separator />
      <div className=" mt-1 flex flex-col gap-2">
        <p className=" font-regular text-md">
          <span className=" font-semibold">Action:</span>{" "}
          <span className=" font-medium text-sm">{data.action.name}</span>
        </p>
      </div>
    </BaseNode>
  );
};

export default AutomationNode;
