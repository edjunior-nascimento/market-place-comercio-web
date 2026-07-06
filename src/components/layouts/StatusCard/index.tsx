
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface StatusCardProps {
    title: string;
    value: number;
    icon: ReactNode;
    iconColor: string;
    iconBg: string;
}

export const StatusCard = ({
    title,
    value,
    icon,
    iconColor,
    iconBg,
}: StatusCardProps) => {
    return (
        <Box
            flex={1}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1,
                border: "1px solid #E8EAF2",
                borderRadius: "20px",
                backgroundColor: "#FFF",
                minHeight: 70,
                minWidth: 200,
            }}
        >
            <Box
                sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "16px",
                    backgroundColor: iconBg+"22",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: iconColor,

                    "& svg": {
                        fontSize: 24,
                    },
                }}
            >
                {icon}
            </Box>

            <Box>
                <Typography
                    sx={{
                        fontSize: 24,
                        fontWeight: 600,
                        lineHeight: 1,
                        color: "#111827",
                    }}
                >
                    {value}
                </Typography>

                <Typography
                    sx={{
                        fontSize: 18,
                        color: "#667085",
                    }}
                >
                    {title}
                </Typography>
            </Box>
        </Box>
    );
};