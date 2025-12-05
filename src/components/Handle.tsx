import { DEFAULT_HANDLE_STYLES } from "@/constants";
import { Handle } from "@xyflow/react";

const CustomHandle = (props: any) => {
  return <Handle {...props} style={DEFAULT_HANDLE_STYLES} />;
};

export default CustomHandle;
