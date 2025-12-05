import { UserRoundCheck } from "lucide-react";
import { Badge } from "../ui/badge";
import BaseNode from "./BaseNode";
import { Separator } from "../ui/separator";
import User from "@/components/User";
import { formatDate } from "@/lib/utils";

const TaskNode = ({ data, selected }: any) => {
  return (
    <BaseNode isGeneral selected={selected}>
      <div className="flex items-center gap-2 pr-2 mb-2">
        <UserRoundCheck size={18} />
        <Badge className="text-xs font-light rounded-sm bg-violet-500">
          TASK
        </Badge>
      </div>
      <Separator />
      <div className=" mt-1 flex flex-col gap-2">
        <p className=" font-regular">{data.title}</p>
        <div className="font-semibold text-sm">
          Assignee
          <User image={data.assignee.image} name={data.assignee.name} />
        </div>
        <p className="font-semibold text-sm">
          Due date:{" "}
          <span className=" font-light">{formatDate(data.dueDate)}</span>
        </p>
      </div>
    </BaseNode>
  );
};

export default TaskNode;
