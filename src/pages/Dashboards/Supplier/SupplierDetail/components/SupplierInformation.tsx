import React from "react";
import { SUPPLIER_STATUS } from "Common/constants/supplier-constant";
import { SupplierStatusBadge } from "../../components/SupplierStatus";

export interface Supplier {
  id: string;
  code: string;
  name: string;
  company: string;
  taxCode: string;
  address: string;
  phone: string;
  email: string;
  note: string;
  status: SUPPLIER_STATUS;
  totalDebt: number;
}

interface SupplierInformationProps {
  supplier: Supplier | null;
}

export const SupplierInformation: React.FC<SupplierInformationProps> = ({
  supplier,
}) => {
  const renderField = (label: string, value: string | undefined) => (
    <div>
      <label className="inline-block mb-2 text-base font-medium">{label}</label>
      <p
        className={`text-base ${
          !value ? "text-slate-400 dark:text-zink-300 italic" : ""
        }`}
      >
        {value || `${label} đang trống`}
      </p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <div className="space-y-4">
        {renderField("Tên NCC", supplier?.name)}
        {renderField("Mã NCC", supplier?.code)}
        <div>
          <label className="inline-block mb-2 text-base font-medium">
            Công ty - MST
          </label>
          <p className="text-base">
            <span
              className={
                !supplier?.company
                  ? "text-slate-400 dark:text-zink-300 italic"
                  : ""
              }
            >
              {supplier?.company || "Công ty đang trống"}
            </span>
            {" - "}
            <span
              className={
                !supplier?.taxCode
                  ? "text-slate-400 dark:text-zink-300 italic"
                  : ""
              }
            >
              {supplier?.taxCode || "MST đang trống"}
            </span>
          </p>
        </div>
        {renderField("Địa chỉ", supplier?.address)}
      </div>
      <div className="space-y-4">
        {renderField("Số điện thoại", supplier?.phone)}
        {renderField("Email", supplier?.email)}
        {renderField("Ghi chú", supplier?.note)}
        <div>
          <label className="inline-block mb-2 text-base font-medium">
            Tình trạng hợp tác
          </label>
          <div>
            {supplier?.status ? (
              <SupplierStatusBadge status={supplier.status} />
            ) : (
              <p className="text-base text-slate-400 dark:text-zink-300 italic">
                Chưa có trạng thái
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
