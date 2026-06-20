import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type SelectInputProps = {
    label: string;
    valor?: string;
    items: { label: string; value: string }[];
    onChange?: () => void;
};

export default function SelectInput({ label, items, valor, onChange }: SelectInputProps) {
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={valor}
                onChange={onChange}
                displayEmpty        
                renderValue={(selected) => {
                    if (!selected) {
                        return (
                            <span style={{ color: "#B50303" }}>
                                {label}
                            </span>
                        );
                    }

                    return items.find(item => item.value === selected)?.label;
                }}
            >
                <MenuItem value="">
                    <em>(Nenhum)</em>
                </MenuItem>
                {items.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}