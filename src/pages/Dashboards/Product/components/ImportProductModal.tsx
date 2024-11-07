import React, { useEffect, useState } from "react";
import Modal from "Common/Components/Modal";
import { Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { ColumnDef } from "@tanstack/react-table";
import TableContainer from "Common/TableContainer";
import { request } from "helpers/axios";

interface props {
  show: boolean;
  file: any;
  onCancel: () => void;
  onDone?: () => void;
}

interface ExcelData {
  [key: string]: string | number;
}

const ImportProductModal: React.FC<props> = ({ show, file, onCancel, onDone }) => {
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isButtonLoading, setButtonLoading] = useState(false);

  const columns = React.useMemo<ColumnDef<ExcelData>[]>(() => {
    if (excelData.length === 0) return [];

    return Object.keys(excelData[0]).map((key) => ({
      accessorKey: key,
      header: key,
      enableColumnFilter: false,
      enableSorting: false,
    }));
  }, [excelData]);

  // const table = useReactTable({
  //   data: excelData,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  // })

  const handleImportProduct = async () => {
    setButtonLoading(true);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await request.post("/products/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Nhập file excel sản phẩm thành công!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setButtonLoading(false);
      setLoading(false);
      handleClose();
      onDone?.();
    }
  };

  const handleClose = () => {
    setExcelData([]);
    onCancel();
  };

  useEffect(() => {
    const loadExcelData = async () => {
      try {
        setLoading(true);
        const reader = new FileReader();

        reader.onload = (event: any) => {
          const workbook = XLSX.read(event.target.result, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const sheetData: ExcelData[] = XLSX.utils.sheet_to_json(sheet);

          setLoading(false);
          setExcelData(sheetData);
        };

        reader.readAsArrayBuffer(file);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    file && loadExcelData();
  }, [file]);

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        id="importProductModal"
        modal-center="true"
        className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
        dialogClassName="w-screen lg:w-[55rem] bg-white shadow rounded-md dark:bg-zink-600 flex flex-col h-full"
      >
        <Modal.Header
          className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
          closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500 dark:text-zink-200 dark:hover:text-red-500"
        >
          <h5 className="text-16">Preview</h5>
        </Modal.Header>
        <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] min-h-[calc(theme('height.screen')_-_500px)] p-4 overflow-y-auto">
          {isLoading && (
            <div className="min-h-[calc(theme('height.screen')_-_500px)] inset-0 flex items-center justify-center bg-opacity-50">
              <div className="inline-block size-10 border-2 rounded-full animate-spin border-l-transparent border-custom-500"></div>
            </div>
          )}

          {!!excelData.length && (
            <TableContainer
              isPagination={true}
              isSelect={false}
              columns={columns || []}
              data={excelData || []}
              customPageSize={20}
              divclassName="overflow-x-auto"
              tableclassName="w-full whitespace-nowrap"
              theadclassName="ltr:text-left rtl:text-right bg-slate-100 dark:bg-zink-600"
              thclassName="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500"
              tdclassName="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500"
              PaginationClassName="flex flex-col items-center gap-4 px-4 mt-4 md:flex-row"
            />
          )}

          {/* {excelData.length > 0 && (
                <div className="overflow-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header: any) => (
                            <th key={header.id} className="px-4 py-2 border-b font-medium text-gray-700 bg-gray-100">
                              {header.isPlaceholder ? null : (
                                flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )
                              )}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b">
                          {row.getVisibleCells().map((cell: any) => (
                            <td key={cell.id} className="px-4 py-2 text-gray-600">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )} */}
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-end p-4 mt-auto border-t border-slate-200 dark:border-zink-500">
          <div className="flex justify-between">
            <button
              type="reset"
              className="bg-white text-slate-500 btn hover:text-slate-500 hover:bg-slate-100 focus:text-slate-500 focus:bg-slate-100 active:text-slate-500 active:bg-slate-100 dark:bg-zink-600 dark:hover:bg-slate-500/10 dark:focus:bg-slate-500/10 dark:active:bg-slate-500/10 mr-2"
              onClick={onCancel}
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              className="flex items-center text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
              onClick={handleImportProduct}
            >
              {isButtonLoading ? (
                <>
                  <Loader2 className="size-4 ltr:mr-2 rtl:ml-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Xác nhận`
              )}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ImportProductModal;

