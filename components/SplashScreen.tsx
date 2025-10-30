import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-blue-900 z-50 animate-fadeIn">
      <div className="text-center">
        <img 
          src="https://lh3.googleusercontent.com/d/12_jXaAMbBZhPoHal2CGs68XfGRu_kNyu" 
          alt="Logo Eskul Seni Rupa" 
          className="mx-auto h-28 w-28 mb-4 animate-pulse" 
        />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Ekstrakurikuler Seni Rupa</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Memuat formulir pendaftaran...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
