
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-[2000] p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 md:p-10 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-black text-[#1565C0] mb-6 flex items-center gap-2">
          <span className="text-3xl">🤖</span> {title}
        </h2>
        
        <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed space-y-4">
          {children}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
          >
            Cerrar Informe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
