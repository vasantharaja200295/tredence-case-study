import { CheckCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import BaseNode from "./BaseNode";
import { Separator } from "../ui/separator";
import User from "@/components/User";

const ApprovalNode = ({ data, selected }: any) => {
  return (
    <BaseNode isConditional selected={selected}>
      <div className="flex items-center gap-2 pr-2 mb-2">
        <CheckCircle size={18} />
        <Badge className="text-xs font-light rounded-sm bg-yellow-500">
          Approval
        </Badge>
      </div>
      <Separator />
      <div className=" mt-1 flex flex-col gap-2">
        <p className=" font-regular">{data.title}</p>
        <div className="font-semibold text-sm">
          Approver:
          <User image={data.approver.image} name={data.approver.name} />
        </div>
        <p className=" font-regular text-sm">
          <span className=" font-semibold">Role:</span>{" "}
          <span className=" font-medium text-xs">{data.approverRole}</span>
        </p>
        <p className=" font-regular text-sm">
          <span className=" font-semibold">Auto-approve:</span>{" "}
          <span className=" font-medium text-xs">
            {data.autoApprove.isActive ? "Enabled" : "Disabled"}
          </span>
        </p>
      </div>
    </BaseNode>
  );
};

export default ApprovalNode;
