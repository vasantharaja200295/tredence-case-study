import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MOCK_USERS } from "@/constants/mockData";

interface AssigneeSelectProps {
  value?: {
    image: string;
    name: string;
  } | null;
  onValueChange: (userId: string) => void;
  placeholder?: string;
}

const AssigneeSelect = ({
  value,
  onValueChange,
  placeholder = "Select team member",
}: AssigneeSelectProps) => {
  return (
    <Select value={value?.name || ""} onValueChange={onValueChange}>
      <SelectTrigger id="assignee" className="w-full">
        <SelectValue placeholder={placeholder}>
          {value?.name && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={value.image} alt={value.name} />
                <AvatarFallback className="text-xs">
                  {value.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span>{value.name}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {MOCK_USERS.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="text-xs">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user.role}
                </span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AssigneeSelect;
