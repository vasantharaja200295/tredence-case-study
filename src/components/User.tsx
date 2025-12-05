import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

type Props = {
  image: string;
  name: string;
};

const CustomAvatar = ({ image, name }: Props) => {
  return (
    <div className=" flex items-center gap-2 mt-1">
      <Avatar className="h-6 w-6">
        <AvatarImage src={image || ""} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <p className="font-light text-xs">{name}</p>
    </div>
  );
};

export default CustomAvatar;
