import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, InputBase, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type CounterProps = {
  min?: number;
  max?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
};

export function InputCounter(
  {
    min = 0,
    max = 9999,
    initialValue = min,
    onChange,
  }: CounterProps
) {


  const [value, setValue] = useState<number>(initialValue);

  const handleIncrement = () => {
    if (value < max) {
      const newValue = value + 1;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      const newValue = value - 1;
      setValue(newValue);
      onChange?.(newValue);
      if (newValue === 0) {
        setValue(1);
        onChange?.(1);
      }
    }
  };

  // useEffect(() => {
  //  setValue(value > 10000? 9999: value)
  // }, [value]);


  return (

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <IconButton color="primary" disabled={value <= min} onClick={handleDecrement} sx={{ background: '#E2EAFA', '&:hover': { background: '#E2EAFA' } }}>
        <Remove fontSize="small" />
      </IconButton>

      <Box
        sx={{
          width: 70,
          border: '1px solid',
          borderRadius: 2,
          borderColor: 'grey.300',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextField
          sx={{
            '& .MuiInputBase-input': {
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '600',
              padding: 1,
              color: "#B50303"
            },
          }}
          variant="outlined"
          value={value}
          onChange={(e) => {
            const value = e.target.value;

            if (isNaN(Number(value))) return;

            if (value.length > 4) return;
            setValue(Number(value));
          }}
        />



      </Box>

      <IconButton color="primary" disabled={value >= max} onClick={handleIncrement} sx={{ background: '#E2EAFA', '&:hover': { background: '#E2EAFA' } }}>
        <Add fontSize="small" />
      </IconButton>
    </Box>

  );
}