import React, { useState, useCallback, useMemo, useEffect } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import AsyncSelect from "react-select/async";
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
  createOption?: (inputValue: string) => Promise<Option>; // New prop for creating options
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
  const [options, setOptions] = useState<
    OptionsOrGroups<Option, GroupBase<Option>>
  >([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (defaultOptions.length > 0 && !options.length) {
      setOptions(defaultOptions);
    }
  }, [defaultOptions, options]);

  const loadData = useCallback(
    async (inputValue: string, page: number) => {
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
      const nextPage = page + 1;
      setPage(nextPage);
      loadData(search, nextPage);
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
      if (!createOption) return;

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

  if (!createOption) {
    return (
      <AsyncSelect<Option, false>
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
      />
    );
  }

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
