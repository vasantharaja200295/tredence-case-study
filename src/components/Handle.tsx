import { DEFAULT_HANDLE_STYLES } from "@/constants";
import { Handle, type HandleProps } from "@xyflow/react";

const CustomHandle = (props: HandleProps) => {
  return <Handle {...props} style={DEFAULT_HANDLE_STYLES} />;
};

export default CustomHandle;
