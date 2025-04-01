import { RECEIPT_RETURN_STATUS } from "Common/constants/receipt-constant";
import { FC } from "react";

type Props = {
  status: string;
}

export const ReceiptStatus: FC<Props> = ({ status }) => {
  switch (status) {
    case RECEIPT_RETURN_STATUS.DRAFT:
      return (
        <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-500/20 dark:border-slate-500/20">
          Phiếu nháp
        </span>
      );
    case RECEIPT_RETURN_STATUS.PROCESSING:
      return (
        <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-purple-100 border-purple-200 text-purple-500 dark:bg-purple-500/20 dark:border-purple-500/20">
          Đang xử lý
        </span>
      );
    case RECEIPT_RETURN_STATUS.COMPLETED:
      return (
        <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-green-100 border-green-200 text-green-500 dark:bg-green-500/20 dark:border-green-500/20">
          Đã hoàn thành
        </span>
      );
    case RECEIPT_RETURN_STATUS.CANCELLED:
      return (
        <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-red-100 border-red-200 text-red-500 dark:bg-red-500/20 dark:border-red-500/20">
          Đã hủy
        </span>
      );
    default:
      return (
        <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-green-100 border-green-200 text-green-500 dark:bg-green-500/20 dark:border-green-500/20">
          {status}
        </span>
      );
  }
};
