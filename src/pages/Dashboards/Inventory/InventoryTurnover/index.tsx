import React, { FC } from 'react';
import { Package, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface InventoryTurnoverProps {
  beginningInventory: number;
  endingInventory: number;
  totalPurchases: number;
  period: string;
}

export const InventoryTurnover: FC<InventoryTurnoverProps> = ({
  beginningInventory,
  endingInventory,
  totalPurchases,
  period
}) => {
  // Calculate average inventory
  const averageInventory = (beginningInventory + endingInventory) / 2;
  
  // Calculate inventory turnover ratio
  const inventoryTurnover = totalPurchases / averageInventory;
  
  // Determine if turnover has increased or decreased (example threshold: 6)
  const isGoodTurnover = inventoryTurnover >= 6;

  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center justify-between mb-6">
          <h6 className="text-15">Vòng quay tồn kho</h6>
          <div className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md dark:bg-custom-500/10">
            <Package className="size-4" />
            <span>Kỳ: {period}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Average Inventory Card */}
          <div className="p-4 border rounded-lg border-slate-200 dark:border-zink-500">
            <h6 className="mb-3 text-slate-500 dark:text-zink-200">Tồn kho trung bình</h6>
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-semibold">{averageInventory.toLocaleString()}</h4>
              <span className="text-sm text-slate-500 dark:text-zink-200">đơn vị</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-zink-200">
              (Tồn đầu kỳ + Tồn cuối kỳ) / 2
            </div>
          </div>

          {/* Total Purchases Card */}
          <div className="p-4 border rounded-lg border-slate-200 dark:border-zink-500">
            <h6 className="mb-3 text-slate-500 dark:text-zink-200">Tổng nhập kho</h6>
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-semibold">{totalPurchases.toLocaleString()}</h4>
              <span className="text-sm text-slate-500 dark:text-zink-200">đơn vị</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-zink-200">
              Trong kỳ {period}
            </div>
          </div>

          {/* Inventory Turnover Card */}
          <div className="p-4 border rounded-lg border-slate-200 dark:border-zink-500">
            <h6 className="mb-3 text-slate-500 dark:text-zink-200">Vòng quay tồn kho</h6>
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-semibold">{inventoryTurnover.toFixed(2)}</h4>
              <span className="text-sm text-slate-500 dark:text-zink-200">lần</span>
              {isGoodTurnover ? (
                <ArrowUpRight className="size-4 text-green-500" />
              ) : (
                <ArrowDownRight className="size-4 text-red-500" />
              )}
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-zink-200">
              Tổng nhập kho / Tồn kho trung bình
            </div>
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="p-4 mt-6 border rounded-lg border-slate-200 dark:border-zink-500">
          <h6 className="mb-3 text-slate-500 dark:text-zink-200">Công thức tính</h6>
          <div className="space-y-2 text-sm text-slate-500 dark:text-zink-200">
            <p>1. Tồn kho trung bình = (Tồn kho đầu kỳ + Tồn kho cuối kỳ) / 2</p>
            <p>2. Vòng quay hàng tồn = Tổng hàng nhập trong kỳ / Tồn kho trung bình</p>
          </div>
        </div>
      </div>
    </div>
  );
};