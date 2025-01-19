import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-10">
      <div className="bg-black rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;