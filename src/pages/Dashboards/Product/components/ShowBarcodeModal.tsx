import React, { useState } from "react";
import Modal from "Common/Components/Modal";
import { Loader2 } from "lucide-react";
import Barcode from "react-barcode";

interface props {
  show: boolean;
  barcode: string;
  onClose?: () => void;
}

const ShowBarcodeModal: React.FC<props> = ({ show, barcode, onClose }) => {
  const [isButtonLoading, setButtonLoading] = useState(false);

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onClose}
        id="extraSmallModal"
        modal-center="true"
        className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
        dialogClassName="w-screen md:w-[20rem] bg-white shadow rounded-md dark:bg-zink-600 flex flex-col h-full"
      >
        <Modal.Header
          className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
          closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500 dark:text-zink-200 dark:hover:text-red-500"
        >
          <Modal.Title className="text-16">Tem mã hàng hóa</Modal.Title>
        </Modal.Header>
        <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
          <div className="flex flex-col items-center justify-center">
            <Barcode
              value={barcode} // Giá trị cần mã hóa
              format="CODE128" // Định dạng barcode, ví dụ: "CODE128", "UPC", "EAN"
              width={2} // Độ rộng của các vạch
              height={100} // Chiều cao của barcode
              displayValue={true} // Hiển thị giá trị mã hóa dưới barcode
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-end p-4 mt-auto border-t border-slate-200 dark:border-zink-500">
          <button
            type="button"
            className="mr-2 flex items-center text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
          >
            {isButtonLoading ? (
              <Loader2 className="size-4 ltr:mr-2 rtl:ml-2 animate-spin" />
            ) : (
              `In mã tem`
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ShowBarcodeModal;
