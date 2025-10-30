import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Auto-close after 4 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses = "fixed top-5 right-5 z-50 flex items-center p-4 rounded-lg shadow-lg text-white";
  const typeClasses = type === 'success' 
    ? 'bg-green-500 dark:bg-green-600' 
    : 'bg-red-500 dark:bg-red-600';
  const icon = type === 'success' ? 'fa-check-circle' : 'fa-times-circle';

  return (
    <div className={`${baseClasses} ${typeClasses} animate-fadeIn`} role="alert">
      <i className={`fas ${icon} mr-3 text-xl`}></i>
      <p>{message}</p>
      <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Close">
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default Notification;
