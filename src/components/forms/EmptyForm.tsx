import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Box } from "lucide-react";

function EmptyForm() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Box />
        </EmptyMedia>
        <EmptyTitle>No nodes selected</EmptyTitle>
        <EmptyDescription>Click on Nodes to Edit</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export default EmptyForm;
