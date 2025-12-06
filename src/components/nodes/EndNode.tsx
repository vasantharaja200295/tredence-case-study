import { ClipboardClock } from "lucide-react";
import { Badge } from "../ui/badge";
import BaseNode from "./BaseNode";
import { Separator } from "../ui/separator";
import type { EndNodeData } from "@/types/nodes";

type Props = {
  data: EndNodeData;
  selected: boolean;
};

const EndNode = ({ data, selected }: Props) => {
  return (
    <BaseNode isEnd selected={selected}>
      <div className="flex items-center gap-2 pr-2 mb-2">
        <ClipboardClock size={18} />
        <Badge className="text-xs font-light rounded-sm bg-red-400">End</Badge>
      </div>
      <Separator />
      <div className=" mt-1 flex flex-col items-center">
        <p className=" font-regular text-sm">
          <span className=" font-semibold">Message:</span>{" "}
          <span className=" font-medium text-xs">{data.message}</span>
        </p>
      </div>
    </BaseNode>
  );
};

export default EndNode;
