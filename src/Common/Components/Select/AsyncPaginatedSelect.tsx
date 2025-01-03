import React, { useState, useCallback, useMemo } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import {
  ActionMeta,
  GroupBase,
  OnChangeValue,
  OptionsOrGroups,
} from "react-select";

interface Option {
  value: string | number;
  label: string;
}

interface Response {
  results: Option[];
  hasMore: boolean;
  page: number;
}

interface AsyncPaginatedSelectProps {
  loadOptions: (search: string, page: number) => Promise<Response>;
  createOption: (inputValue: string) => Promise<Option>; // New prop for creating options
  defaultOptions?: OptionsOrGroups<Option, GroupBase<Option>>;
  placeholder?: string;
  isClearable?: boolean;
  value?: Option | null;
  onChange?: (
    newValue: OnChangeValue<Option, false>,
    actionMeta: ActionMeta<Option>
  ) => void;
  debounceTimeout?: number;
  noOptionsMessage?: (obj: { inputValue: string }) => string | null;
}

const AsyncPaginatedSelect: React.FC<AsyncPaginatedSelectProps> = ({
  loadOptions,
  createOption, // New prop for creating options
  defaultOptions = [],
  placeholder = "Select...",
  isClearable = true,
  value,
  onChange,
  debounceTimeout = 300,
  noOptionsMessage = () => "No options",
}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] =
    useState<OptionsOrGroups<Option, GroupBase<Option>>>(defaultOptions);
  const [hasMore, setHasMore] = useState(true);

  const loadData = useCallback(
    async (inputValue: string, page: number) => {
      console.log({ inputValue, page });

      setIsLoading(true);
      try {
        const response = await loadOptions(inputValue, page);
        setOptions((prevOptions) =>
          page === 1 ? response.results : [...prevOptions, ...response.results]
        );
        setHasMore(response.hasMore);
        return response.results;
      } catch (error) {
        console.error("Error loading options:", error);
        setOptions([]);
        setHasMore(false);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [loadOptions, setOptions, setHasMore, setIsLoading]
  );

  const handleInputChange = (newValue: string) => {
    setSearch(newValue);
    setPage(1);
    setOptions([]); // Clear options when starting a new search
    setHasMore(true); // Reset hasMore when starting a new search
    return newValue;
  };

  const handleMenuScrollToBottom = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const debouncedLoadOptions = useMemo(() => {
    let timeoutId: NodeJS.Timeout;

    return (inputValue: string, callback: (options: Option[]) => void): any => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        loadData(inputValue, page).then(callback);
      }, debounceTimeout);

      return () => clearTimeout(timeoutId);
    };
  }, [loadData, page, debounceTimeout]);

  const handleCreateOption = useCallback(
    async (inputValue: string) => {
      setIsLoading(true);

      try {
        const newOption = await createOption(inputValue);

        setOptions((prevOptions) => [...prevOptions, newOption]);
        onChange &&
          onChange(newOption, { action: "create-option", option: newOption });
      } catch (error) {
        console.error("Error creating option:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [createOption, onChange]
  );

  return (
    <AsyncCreatableSelect<Option, false>
      cacheOptions
      loadOptions={debouncedLoadOptions}
      defaultOptions={options}
      onInputChange={handleInputChange}
      onChange={onChange}
      placeholder={placeholder}
      isClearable={isClearable}
      isLoading={isLoading}
      onMenuScrollToBottom={handleMenuScrollToBottom}
      value={value}
      noOptionsMessage={noOptionsMessage}
      onCreateOption={handleCreateOption} // New prop for creating options
    />
  );
};

export default AsyncPaginatedSelect;

// import { FC } from "react";

// import AsyncSelect from "react-select/async";

// type Props = {
//   onChange: (newValue: any) => void;
//   loadOptions: (inputValue: string) => Promise<any>;
// };

// export const SelectAsync: FC<Props> = ({ loadOptions, onChange }) => {
//   return (
//     <>
//       <AsyncSelect
//         className="border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
//         placeholder="Chọn"
//         // id="supplierSelect"
//         // name="supplier"
//         // isClearable={false}
//         // data-choices-text-unique-true
//         // data-choices
//         cacheOptions
//         defaultOptions
//         loadOptions={loadOptions}
//         onChange={onChange}
//       />
//     </>
//   );
// };
