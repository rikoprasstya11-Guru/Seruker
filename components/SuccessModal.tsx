
import React from 'react';

interface SuccessModalProps {
  name: string;
  quote: string;
  onReset: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ name, quote, onReset }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 text-center transform transition-all duration-500 scale-100">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-5">
            <i className="fas fa-check text-4xl text-green-600 dark:text-green-400"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pendaftaran Berhasil!</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Terima kasih, <span className="font-semibold">{name}</span>! Data pendaftaranmu telah kami terima. Kami akan segera menghubungimu untuk informasi selanjutnya.
        </p>
        {quote && (
          <blockquote className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-md italic text-gray-500 dark:text-gray-400">"{quote}"</p>
          </blockquote>
        )}
        <div className="mt-8">
          <button
            onClick={onReset}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          >
            Daftarkan Anggota Lain
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
