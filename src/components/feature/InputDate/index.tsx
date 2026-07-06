import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "@mui/x-date-pickers/locales";

dayjs.locale("pt-br");

interface InputDateProps {
    value: Dayjs | null;
    onChange: (value: Dayjs | null) => void;
}

export const InputDate = ({
    value,
    onChange,
}: InputDateProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br"
            localeText={
                ptBR.components.MuiLocalizationProvider.defaultProps.localeText
            }
        >
            <DatePicker
                value={value}
                onChange={onChange}
                slots={{
                    openPickerIcon: CalendarTodayOutlinedIcon,
                }}
                maxDate={dayjs()}
                format="DD [de] MMMM"
                slotProps={{
                    textField: {
                        sx: {
                            "& .MuiPickersOutlinedInput-root": {
                                paddingLeft: "20px",
                                borderRadius: "20px",
                                backgroundColor: "#FFF",
                                weight: 600,
                                "& fieldset": {
                                    borderColor: "#E0E4EB",
                                },
                            },

                            "& input": {
                                paddingLeft: "8px",
                                fontWeight: 500,
                                color: "#2B3347",
                            },
                        },
                    },

                    day: {
                        sx: {
                            "&.Mui-disabled": {
                                color: "#BDBDBD",
                                opacity: 1,
                            },
                        },
                    },

                    toolbar: {
                        hidden: true,
                    },
                }}
            />
        </LocalizationProvider>
    );
};