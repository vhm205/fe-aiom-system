import React from "react";
import { Minus, Plus } from "lucide-react";

interface CounterProps {
  initialValue?: number;
  name: string;
  onCountChange?: (count: number) => void;
}

export const Counter: React.FC<CounterProps> = ({
  initialValue = 1,
  name,
  onCountChange,
}) => {
  const [count, setCount] = React.useState(initialValue);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange?.(newCount);
    }
  };

  return (
    <React.Fragment>
      <div className={"inline-flex text-center input-step"}>
        <button
          type="button"
          className={
            "border size-9 leading-[15px] minusBtn bg-white dark:bg-zink-700 dark:border-zink-500 ltr:rounded-l rtl:rounded-r transition-all duration-200 ease-linear border-slate-200 text-slate-500 dark:text-zink-200 hover:bg-custom-500 dark:hover:bg-custom-500 hover:text-custom-50 dark:hover:text-custom-50 hover:border-custom-500 dark:hover:border-custom-500 focus:bg-custom-500 dark:focus:bg-custom-500 focus:border-custom-500 dark:focus:border-custom-500 focus:text-custom-50 dark:focus:text-custom-50"
          }
          onClick={handleDecrement}
        >
          <Minus className="inline-block size-4"></Minus>
        </button>
        <input
          type="number"
          name={name}
          className={
            "w-12 text-center ltr:pl-2 rtl:pr-2 h-9 border-y product-quantity dark:bg-zink-700 focus:shadow-none dark:border-zink-500"
          }
          value={count}
          min="1"
          max="100"
          readOnly
        />
        <button
          type="button"
          className={
            "transition-all duration-200 ease-linear bg-white border dark:bg-zink-700 dark:border-zink-500 ltr:rounded-r rtl:rounded-l size-9 border-slate-200 plusBtn text-slate-500 dark:text-zink-200 hover:bg-custom-500 dark:hover:bg-custom-500 hover:text-custom-50 dark:hover:text-custom-50 hover:border-custom-500 dark:hover:border-custom-500 focus:bg-custom-500 dark:focus:bg-custom-500 focus:border-custom-500 dark:focus:border-custom-500 focus:text-custom-50 dark:focus:text-custom-50"
          }
          onClick={handleIncrement}
        >
          <Plus className="inline-block size-4"></Plus>
        </button>
      </div>
    </React.Fragment>
  );
};
