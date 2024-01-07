import { Box } from "@mui/material";
import { ReactElement } from "react";

const FullSizeBox = ({ children }: { children: ReactElement }) => {
  return (
    <Box
      position={"absolute"}
      top={0}
      bottom={0}
      left={0}
      right={0}
      component="div"
    >
      {children}
    </Box>
  );
};

export default FullSizeBox;
