import { FC, useCallback, useMemo, useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import { request } from "helpers/axios";
import { toast } from "react-toastify";
import { IHttpResponse } from "types";
import { createSupplier } from "apis/supplier";

interface Option {
  value: string;
  label: string;
}

interface SupplierSelectProps {
  value?: Option | Option[] | null;
  onChange: (option: Option | Option[] | null) => void;
  isMulti?: boolean;
  isClearable?: boolean;
  className?: string;
  placeholder?: string;
  name?: string;
  id?: string;
}

export const SupplierSelect: FC<SupplierSelectProps> = ({
  value,
  onChange,
  isMulti = false,
  isClearable = true,
  className = "",
  placeholder = "Chọn nhà cung cấp",
  name = "supplier",
  id,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(
    async (inputValue: string) => {
      setIsLoading(true);
      try {
        const response: IHttpResponse = await request.get(
          `/suppliers?keyword=${inputValue}&limit=20`
        );

        if (!response.success) {
          throw new Error(response.message);
        }

        const newOptions =
          response.data?.map((item: any) => ({
            value: item.id,
            label: item.name,
          })) || [];

        setOptions(newOptions);

        return newOptions;
      } catch (error) {
        toast.error((error as Error).message);
        return {
          options: [],
          hasMore: false,
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const debouncedLoadOptions = useMemo(() => {
    let timeoutId: NodeJS.Timeout;

    return (inputValue: string, callback: (options: Option[]) => void): any => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        loadData(inputValue).then(callback);
      }, 400);

      return () => clearTimeout(timeoutId);
    };
  }, [loadData]);

  const handleCreateOption = async (inputValue: string) => {
    try {
      setIsLoading(true);
      const result = await createSupplier({ name: inputValue });

      const newOption = {
        value: result.id,
        label: inputValue,
      };

      setOptions((prevOptions) => [...prevOptions, newOption]);

      return newOption;
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AsyncCreatableSelect
      id={id}
      name={name}
      cacheOptions={false}
      defaultOptions
      value={value}
      onChange={(newValue) => {
        onChange(
          Array.isArray(newValue)
            ? ([...newValue] as Option[])
            : (newValue as Option)
        );
      }}
      loadOptions={debouncedLoadOptions}
      isMulti={isMulti}
      isClearable={isClearable}
      isLoading={isLoading}
      options={options}
      className={`border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 ${className}`}
      classNamePrefix="react-select"
      placeholder={placeholder}
      noOptionsMessage={() => "Không tìm thấy kết quả"}
      loadingMessage={() => "Đang tải..."}
      formatCreateLabel={(inputValue: string) => `Tạo mới "${inputValue}"`}
      onCreateOption={handleCreateOption}
    />
  );
};
