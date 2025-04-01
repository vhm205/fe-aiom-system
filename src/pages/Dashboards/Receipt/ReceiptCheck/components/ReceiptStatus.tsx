import { RECEIPT_CHECK_STATUS } from "Common/constants/receipt-constant";
import { FC } from "react";

type Props = {
  status: string
}

export const ReceiptStatus: FC<Props> = ({ status }: Props) => {
  switch (status) {
    case RECEIPT_CHECK_STATUS.PENDING:
      return (
        <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-yellow-100 border-yellow-200 text-yellow-500 dark:bg-yellow-500/20 dark:border-yellow-500/20">
          Cần xử lý
        </span>
      );
    case RECEIPT_CHECK_STATUS.PROCESSING:
      return (
        <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-orange-100 border-orange-200 text-orange-500 dark:bg-orange-500/20 dark:border-orange-500/20">
          Đang xử lý
        </span>
      );
    case RECEIPT_CHECK_STATUS.BALANCELLED:
      return (
        <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-green-100 border-green-200 text-green-500 dark:bg-green-500/20 dark:border-green-500/20">
          Đã cân bằng
        </span>
      );
    case RECEIPT_CHECK_STATUS.BALANCING_REQUIRED:
      return (
        <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-red-100 border-red-200 text-red-500 dark:bg-red-500/20 dark:border-red-500/20">
          Cần cân đối
        </span>
      );
    default:
      return (
        <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-gray-100 border-gray-200 text-gray-500 dark:bg-gray-500/20 dark:border-gray-500/20">
          {status}
        </span>
      );
  }
};
