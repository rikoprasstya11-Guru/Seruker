import React from 'react';
import { MemberData } from '../types';
import { ART_INTERESTS } from '../constants';
import LoadingSpinner from './LoadingSpinner';

interface ConfirmationModalProps {
  memberData: MemberData;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ memberData, onConfirm, onCancel, isSubmitting }) => {
  const getInterestLabel = (id: string) => {
    return ART_INTERESTS.find(interest => interest.id === id)?.label || id;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Konfirmasi Pendaftaran</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Harap periksa kembali data Anda sebelum mengirim.
          </p>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Nama Lengkap</dt>
                <dd className="mt-1 text-gray-900 dark:text-gray-100">{memberData.fullName || '-'}</dd>
            </div>
            <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Kelas</dt>
                <dd className="mt-1 text-gray-900 dark:text-gray-100">{memberData.class || '-'}</dd>
            </div>
            <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">NIS</dt>
                <dd className="mt-1 text-gray-900 dark:text-gray-100">{memberData.studentId || '-'}</dd>
            </div>
            <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Jenis Kelamin</dt>
                <dd className="mt-1 text-gray-900 dark:text-gray-100">{memberData.gender || '-'}</dd>
            </div>
             <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Nomor Telepon</dt>
                <dd className="mt-1 text-gray-900 dark:text-gray-100">{memberData.phoneNumber || '-'}</dd>
            </div>
            <div className="sm:col-span-2">
                <dt className="font-medium text-gray-500 dark:text-gray-400">Minat Seni</dt>
                <dd className="mt-1 text-gray-900 dark:text-gray-100">
                    {memberData.interests.length > 0 ? memberData.interests.map(getInterestLabel).join(', ') : '-'}
                </dd>
            </div>
            <div className="sm:col-span-2">
                <dt className="font-medium text-gray-500 dark:text-gray-400">Alasan Bergabung</dt>
                <dd className="mt-1 text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{memberData.reason || '-'}</dd>
            </div>
             <div className="sm:col-span-2">
                <dt className="font-medium text-gray-500 dark:text-gray-400">Portofolio</dt>
                <dd className="mt-1 text-gray-900 dark:text-gray-100">{memberData.portfolio?.name || 'Tidak ada file'}</dd>
            </div>
          </dl>
        </div>

        <div className="flex items-center justify-end p-6 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl space-x-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 dark:disabled:bg-blue-800"
          >
            {isSubmitting ? <><LoadingSpinner/> Mengirim...</> : 'Kirim Pendaftaran'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;