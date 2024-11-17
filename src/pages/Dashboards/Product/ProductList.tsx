import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PaginationState } from "@tanstack/react-table";
import debounce from "lodash.debounce";

// react-redux
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

// Icon
import {
  MoreHorizontal,
  Eye,
  FileEdit,
  Trash2,
  Search,
  Plus,
  Download,
} from "lucide-react";

import { Dropdown } from "Common/Components/Dropdown";
import TableCustom from "Common/TableCustom";
import DeleteModal from "Common/DeleteModal";
import BreadCrumb from "Common/BreadCrumb";

import {
  getProductList as onGetProductList,
  deleteProductList as onDeleteProductList,
} from "slices/thunk";

import ImportProductModal from "./components/ImportProductModal";
import CreateProductModal from "./components/CreateProductModal";
import ShowBarcodeModal from "./components/ShowBarcodeModal";
import { formatMoney } from "helpers/utils";

const PRODUCT_STATUS = {
  draft: "draft",
  active: "active",
  inactive: "inactive",
};

const ProductList = () => {
  const dispatch = useDispatch<any>();

  const selectDataList = createSelector(
    (state: any) => state.Products,
    (state) => ({
      productList: state.productList || [],
      pagination: state.pagination || {},
    }),
  );

  const { productList, pagination } = useSelector(selectDataList);

  const [eventData, setEventData] = useState<any>({});
  const importInputFile = useRef(null);

  // Modals
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [importModal, setImportModal] = useState<boolean>(false);
  const [createProductModal, setCreateProductModal] = useState<boolean>(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState<boolean>(false);

  const [fileImport, setFileImport] = useState(null);

  const [paginationData, setPaginationData] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: pagination.limit || 10,
  });

  const fetchProducts = useCallback(() => {
    dispatch(
      onGetProductList({
        page: paginationData.pageIndex + 1,
        limit: paginationData.pageSize,
      }),
    );
  }, [dispatch, paginationData]);

  // Get Data
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteToggle = () => setDeleteModal(!deleteModal);
  const importModalToggle = () => setImportModal(!importModal);
  const showBarcodeModalToggle = () => setShowBarcodeModal(!showBarcodeModal);
  const createProductModalToggle = () => {
    setCreateProductModal(!createProductModal);
    setEventData({});
  };

  const onClickCreateProduct = (cell: any) => {
    setCreateProductModal(true);

    if (cell.id) {
      setEventData(cell);
    }
  };

  const onClickShowBarcode = (cell: any) => {
    setShowBarcodeModal(true);

    if (cell.productCode) {
      setEventData(cell);
    }
  };

  const onClickDelete = (cell: any) => {
    setDeleteModal(true);

    if (cell.id) {
      setEventData(cell);
    }
  };

  const handleDelete = () => {
    if (eventData) {
      dispatch(onDeleteProductList(eventData.id));
      setDeleteModal(false);
    }
  };

  // Search Data
  const filterSearchData = (e: any) => {
    // const search = e.target.value;
    // const keysToSearch = ["productCode", "productName", "category", "status"];
    // filterDataBySearch(productList, search, keysToSearch, setData);
  };

  const onClickImportFile = () => {
    const button: any = importInputFile.current;
    if (importInputFile && button) {
      button.click();
    }
  };

  const handleImportFileUpload = (e: any) => {
    const { files } = e.target;

    if (files && files.length) {
      const filename = files[0].name;
      const file = files[0];

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

      setFileImport(file);
      setImportModal(true);

      const button: any = importInputFile.current;
      if (importInputFile && button) {
        button.value = "";
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Mã hàng hóa",
        accessorKey: "productCode",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <Link
            to="#"
            className="transition-all duration-150 ease-linear product_code text-custom-500 hover:text-custom-600"
          >
            {cell.getValue()}
          </Link>
        ),
      },
      {
        header: "Tên sản phẩm",
        accessorKey: "productName",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
          <h6 className="product_name">{cell.getValue()}</h6>
          // <Link
          //   to="/apps-ecommerce-product-overview"
          //   className="flex items-center gap-2"
          // >
          //   <img
          //     src={cell.row.original.img}
          //     alt="Product images"
          //     className="h-6"
          //   />
          // </Link>
        ),
      },
      {
        header: "Nhóm hàng hóa",
        accessorKey: "category",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <span className="category px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-500/20 dark:border-slate-500/20 dark:text-zink-200">
            {cell.getValue()}
          </span>
        ),
      },
      {
        header: "Giá bán",
        accessorKey: "sellingPrice",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => {
          return formatMoney(cell.getValue());
        },
      },
      {
        header: "Giá vốn",
        accessorKey: "costPrice",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => {
          return formatMoney(cell.getValue());
        },
      },
      {
        header: "ĐVT",
        accessorKey: "unit",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Tồn kho",
        accessorKey: "inventory",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Nhà cung cấp",
        accessorKey: "supplier",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Mô tả",
        accessorKey: "additionalDescription",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Cửa hàng",
        accessorKey: "warehouseLocation",
        enableColumnFilter: false,
        enableSorting: true,
      },
      // {
      //   header: "Hình ảnh",
      //   accessorKey: "imageUrls",
      //   enableColumnFilter: false,
      //   enableSorting: true,
      // },
      {
        header: "Trạng thái",
        accessorKey: "status",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => <Status item={cell.getValue()} />,
      },
      {
        header: "Action",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
          <Dropdown className="relative dropdown">
            <Dropdown.Trigger
              className="flex items-center justify-center size-[30px] dropdown-toggle p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20"
              id="productAction1"
              data-bs-toggle="dropdown"
            >
              <MoreHorizontal className="size-3" />
            </Dropdown.Trigger>
            <Dropdown.Content
              placement={cell.row.index ? "top-end" : "right-end"}
              className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md dropdown-menu min-w-[10rem] dark:bg-zink-600"
              aria-labelledby="productAction1"
            >
              <li>
                <a
                  href="#!"
                  className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                  onClick={() => {
                    const data = cell.row.original;
                    onClickShowBarcode(data);
                  }}
                >
                  <Eye className="inline-block size-3 ltr:mr-1 rtl:ml-1" />{" "}
                  <span className="align-middle">In tem mã</span>
                </a>
              </li>
              <li>
                <Link
                  className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                  to="/apps-ecommerce-product-overview"
                >
                  <Eye className="inline-block size-3 ltr:mr-1 rtl:ml-1" />{" "}
                  <span className="align-middle">Chi tiết</span>
                </Link>
              </li>
              <li>
                <a
                  href="#!"
                  className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                  onClick={() => {
                    const data = cell.row.original;
                    console.log({ data });
                    onClickCreateProduct(cell.row.original);
                  }}
                >
                  <FileEdit className="inline-block size-3 ltr:mr-1 rtl:ml-1" />{" "}
                  <span className="align-middle">Cập nhật</span>
                </a>
              </li>
              <li>
                <Link
                  className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                  to="#!"
                  onClick={() => {
                    const data = cell.row.original;
                    onClickDelete(data);
                  }}
                >
                  <Trash2 className="inline-block size-3 ltr:mr-1 rtl:ml-1" />{" "}
                  <span className="align-middle">Xóa</span>
                </Link>
              </li>
            </Dropdown.Content>
          </Dropdown>
        ),
      },
    ],
    [],
  );

  return (
    <React.Fragment>
      <BreadCrumb title="Quản lý hàng hóa" pageTitle="Products" />
      <DeleteModal
        show={deleteModal}
        onHide={deleteToggle}
        onDelete={handleDelete}
      />
      <ImportProductModal
        show={importModal}
        file={fileImport}
        onCancel={importModalToggle}
        onDone={fetchProducts}
      />
      <CreateProductModal
        show={createProductModal}
        onCancel={createProductModalToggle}
        defaultData={eventData}
      />
      {eventData?.productCode && (
        <ShowBarcodeModal
          barcode={eventData.productCode}
          show={showBarcodeModal}
          onClose={showBarcodeModalToggle}
        />
      )}
      <ToastContainer closeButton={false} limit={1} />
      <div className="card" id="productListTable">
        <div className="card-body">
          <div className="flex items-center">
            <h6 className="text-15 grow">Danh sách hàng hóa</h6>
            <div className="shrink-0">
              <button
                type="button"
                className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                onClick={onClickCreateProduct}
              >
                <Plus className="inline-block size-4" />{" "}
                <span className="align-middle">Tạo mới</span>
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-12">
            <div className="xl:col-span-3">
              <div className="relative">
                <input
                  type="text"
                  className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Tìm mã, tên hàng,..."
                  autoComplete="off"
                  onChange={debounce(filterSearchData, 700)}
                />
                <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600" />
              </div>
            </div>
            <div className="xl:col-span-3">
              <div>
                <Flatpickr
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  options={{
                    dateFormat: "d M, Y",
                    mode: "range",
                  }}
                  placeholder="Chọn ngày"
                  readOnly={true}
                />
              </div>
            </div>
            <div className="lg:col-span-3 ltr:lg:text-right rtl:lg:text-left xl:col-span-3 xl:col-start-10">
              <div className="flex gap-2 xl:justify-end">
                <input
                  style={{ display: "none" }}
                  accept=".xlsx,.xls,.csv"
                  ref={importInputFile}
                  onChange={handleImportFileUpload}
                  type="file"
                />
                <button
                  type="button"
                  className="bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zink-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"
                  onClick={onClickImportFile}
                >
                  <Download className="inline-block size-4" />{" "}
                  <span className="align-middle">Nhập Excel</span>
                </button>
                <button
                  type="button"
                  className="bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zink-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"
                >
                  <Download className="inline-block size-4" />{" "}
                  <span className="align-middle">Xuất Excel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* List Product */}
        <div className="!pt-1 card-body">
          {productList && productList.length > 0 ? (
            <TableCustom
              isPagination={true}
              columns={columns || []}
              data={productList}
              totalData={pagination.totalItems}
              pageCount={pagination.totalPages}
              pagination={paginationData}
              setPaginationData={setPaginationData}
              customPageSize={10}
              divclassName="overflow-x-auto"
              tableclassName="w-full whitespace-nowrap"
              theadclassName="ltr:text-left rtl:text-right bg-slate-100 dark:bg-zink-600"
              thclassName="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500"
              tdclassName="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500"
              PaginationClassName="flex flex-col items-center gap-4 px-4 mt-4 md:flex-row"
            />
          ) : (
            <div className="noresult">
              <div className="py-6 text-center">
                <Search className="size-6 mx-auto mb-3 text-sky-500 fill-sky-100 dark:fill-sky-500/20" />
                <h5 className="mt-2 mb-1">Sorry! No Result Found</h5>
                <p className="mb-0 text-slate-500 dark:text-zink-200">
                  We've searched more than 199+ product We did not find any
                  product for you search.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;

const Status = ({ item }: any) => {
  switch (item) {
    case PRODUCT_STATUS.draft:
      return (
        <span className="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-orange-100 border-transparent text-orange-500 dark:bg-orange-500/20 dark:border-transparent">
          Nháp
        </span>
      );
    case PRODUCT_STATUS.active:
      return (
        <span className="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">
          Hoạt động
        </span>
      );
    case PRODUCT_STATUS.inactive:
      return (
        <span className="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent">
          Không hoạt động
        </span>
      );
    default:
      return (
        <span className="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">
          {item}
        </span>
      );
  }
};
