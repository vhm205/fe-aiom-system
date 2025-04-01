import { SUPPLIER_STATUS } from "Common/constants/supplier-constant";
import { FC } from "react";

type Props = {
  status: SUPPLIER_STATUS;
}

export const SupplierStatusBadge: FC<Props> = ({ status }) => {
  switch (status) {
    case SUPPLIER_STATUS.COLLABORATING:
      return (
        <span className="px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent inline-flex items-center status">
          Đang hợp tác
        </span>
      );
    case SUPPLIER_STATUS.PAUSED:
      return (
        <span className="px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded border bg-slate-100 border-transparent text-slate-500 dark:bg-slate-500/20 dark:text-zink-200 dark:border-transparent status">
          Tạm dừng
        </span>
      );
    case SUPPLIER_STATUS.STOPPED_COLLABORATING:
      return (
        <span className="px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded border bg-gray-100 border-transparent text-gray-500 dark:bg-gray-500/20 dark:text-zink-200 dark:border-transparent status">
          Dừng hợp tác
        </span>
      );
    default:
      return (
        <span className="px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent status">
          {status}
        </span>
      );
  }
};