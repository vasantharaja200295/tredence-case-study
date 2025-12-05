import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarHeader, SidebarMenuItem } from "./ui/sidebar";
import ThemeToggle from "./theme/Toggle";
import { Separator } from "./ui/separator";
import {
  GitBranch,
  Play,
  UserRoundCheck,
  ClipboardClock,
  CheckCheck,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { NODE_TYPES } from "@/constants";

const SidebarItems = [
  {
    title: "Start",
    description: "Start node",
    icon: <Play size={14} />,
    type: NODE_TYPES.START,
  },
  {
    title: "Manual Task",
    description: "Manual Task node",
    icon: <UserRoundCheck size={14} />,
    type: NODE_TYPES.TASK,
  },
  {
    title: "Approval",
    description: "Manager Approval or Reject Action Node",
    icon: <GitBranch size={14} />,
    type: NODE_TYPES.APPROVAL,
  },
  {
    title: "Automated Task",
    description: "Automated Task Node",
    icon: <ClipboardClock size={14} />,
    type: NODE_TYPES.AUTOMATION,
  },
  {
    title: "End",
    description: "End node",
    icon: <CheckCheck size={14} />,
    type: NODE_TYPES.END,
  },
];

const NodesSidebar = () => {
  const [isDragging, setIsDragging] = useState(false);
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    setIsDragging(true);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row justify-between w-full mt-2 px-2">
        <h3>Workflows</h3>
        <ThemeToggle />
      </SidebarHeader>
      <Separator />
      <div className=" p-3 flex flex-col gap-2">
        {SidebarItems.map((item) => (
          <Card
            className={cn(
              "p-2 rounded-md cursor-grab active:cursor-grabbing transition-opacity",
              isDragging && "opacity-50"
            )}
            draggable
            onDragStart={(e) => onDragStart(e, item.type)}
            onDragEnd={onDragEnd}
          >
            <CardContent className="px-0">
              <div className=" flex gap-3 items-center">
                <div className="border h-fit w-fit p-2 rounded-md">
                  {item.icon}
                </div>
                <p className=" font-medium text-sm">{item.title}</p>
              </div>
              <p className=" font-regular text-neutral-600 dark:text-neutral-300 text-xs mt-1">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Sidebar>
  );
};

export default NodesSidebar;
