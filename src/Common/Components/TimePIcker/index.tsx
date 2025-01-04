import { BaseOptions } from "flatpickr/dist/types/options";
import { getDate } from "helpers/date";
import { FC } from "react";
import Flatpickr from "react-flatpickr";

type Props = {
  props?: any;
  options?: Partial<BaseOptions>;
  value?: string | Date;
  onChange: (value: Date[]) => void;
};

export const TimePicker: FC<Props> = ({ value, onChange, options, props }) => {
  return (
    <Flatpickr
      className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
      options={{
        dateFormat: "DD/MM/YYYY HH:mm",
        // minDate: "today",
        enableTime: true,
        time_24hr: true,
        formatDate: (date, format, _locale) => {
          // locale can also be used
          return getDate(date).format(format);
        },
        ...options,
      }}
      value={value}
      placeholder="Chọn ngày tháng năm"
      onChange={onChange}
      {...props}
    />
  );
};
