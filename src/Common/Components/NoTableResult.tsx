import { Search } from "lucide-react";

export const NoTableResult = () => {
  return (
    <div className="noresult">
      <div className="py-6 text-center">
        <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
        <h5 className="mt-2 mb-1">Không tìm thấy kết quả</h5>
        <p className="mb-0 text-slate-500 dark:text-zink-200">
          Dữ liệu không tìm thấy. Bạn có thể thử lại.
        </p>
      </div>
    </div>
  );
};
