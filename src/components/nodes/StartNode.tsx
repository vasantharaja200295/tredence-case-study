import { Home } from "lucide-react";
import BaseNode from "./BaseNode";

const StartNode = ({ data, selected }: any) => {
  return (
    <BaseNode isStart selected={selected}>
      <div className="flex items-center gap-2">
        <Home size={16} />
        Start Workflow
      </div>
      <p>{data.title}</p>
    </BaseNode>
  );
};

export default StartNode;
