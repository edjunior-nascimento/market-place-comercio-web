import { Box, Button } from "@mui/material";

interface LabelProps {
  label: string;
  color: string;
  icon?: React.ReactNode;
}

export function Label({ label, color, icon }: LabelProps) {  
  return (
    <Box sx={{ display:"flex", backgroundColor: color + "11", borderRadius: 1, px: 1, py: 0.5, alignItems: "center", width: "fit-content" }}>
      {icon && (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mr: 1, color: color }}>
          {icon}
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: color }}>
        {label}
      </Box>
    </Box>
  );
}