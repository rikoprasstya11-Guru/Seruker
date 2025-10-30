import React, { useState, useEffect } from 'react';
import { MemberData, ArtInterest } from './types';
import { ART_INTERESTS, GENDER_OPTIONS } from './constants';
import FormField from './components/FormField';
import CheckboxGroup from './components/CheckboxGroup';
import RadioGroup from './components/RadioGroup';
import SuccessModal from './components/SuccessModal';
import ConfirmationModal from './components/ConfirmationModal';
import LoadingSpinner from './components/LoadingSpinner';
import Notification from './components/Notification';
import SplashScreen from './components/SplashScreen';
import { generateArtQuote } from './services/geminiService';

const initialFormData: MemberData = {
  fullName: '',
  class: '',
  studentId: '',
  gender: '',
  phoneNumber: '',
  reason: '',
  interests: [],
  portfolio: null,
};

// URL Google Apps Script Anda
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyWTIK_5PmLQBIVt5VdjiIT8OGlCQ3gW4WXe4MtDcDd1UNRteWV2YbZ_aiH3d53C16MCA/exec";

const App: React.FC = () => {
  const [formData, setFormData] = useState<MemberData>(initialFormData);
  const [otherGender, setOtherGender] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [motivationalQuote, setMotivationalQuote] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (interest: ArtInterest) => {
    setFormData(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, portfolio: e.target.files![0] }));
    } else {
      setFormData(prev => ({ ...prev, portfolio: null }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.interests.length === 0) {
      setNotification({ message: 'Silakan pilih minimal satu minat seni.', type: 'error' });
      return;
    }
    if (formData.gender === 'Lainnya' && !otherGender.trim()) {
        setNotification({ message: 'Silakan sebutkan gender Anda.', type: 'error' });
        return;
    }
    setShowConfirmation(true);
  };
  
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    
    const finalGender = formData.gender === 'Lainnya' ? otherGender.trim() : formData.gender;

    // Google Apps Script tidak bisa menerima file, jadi kita pisahkan.
    const { portfolio, ...restOfData } = formData;
    const dataToSend = { ...restOfData, gender: finalGender };


    try {
      // Mengirim data ke Google Apps Script
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: { 'Content-Type': 'application/json' },
      });

      // Apps Script yang kita buat akan merespons dengan JSON
      const result = await res.json();

      if (result.result !== 'success') {
        // Jika script mengembalikan error
        throw new Error(result.error || 'Terjadi kesalahan di server spreadsheet.');
      }

      setNotification({ message: 'Pendaftaran berhasil dikirim ke spreadsheet!', type: 'success' });

      // Generate motivational quote using Gemini
      const quote = await generateArtQuote(formData.reason);
      setMotivationalQuote(quote);
      setIsSubmitted(true);

    } catch (error) {
      console.error('Submission failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Pendaftaran gagal. Periksa koneksi internet Anda.';
      setNotification({ message: errorMessage, type: 'error' });
    } finally {
      setIsSubmitting(false);
      setShowConfirmation(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setOtherGender('');
    setIsSubmitted(false);
    setMotivationalQuote('');
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isSubmitted) {
    return <SuccessModal name={formData.fullName} quote={motivationalQuote} onReset={handleReset} />;
  }
  
  const getConfirmationData = (): MemberData => ({
    ...formData,
    gender: formData.gender === 'Lainnya' ? otherGender.trim() : formData.gender,
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <img src="https://lh3.googleusercontent.com/d/12_jXaAMbBZhPoHal2CGs68XfGRu_kNyu" alt="Logo Eskul Seni Rupa" className="mx-auto h-24 w-24 mb-4"/>
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">Formulir Pendaftaran</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Ekstrakurikuler Seni Rupa</p>
        </header>

        <main className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField id="fullName" name="fullName" label="Nama Lengkap" value={formData.fullName} onChange={handleChange} placeholder="Contoh: Budi Sanjaya" required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField id="class" name="class" label="Kelas" value={formData.class} onChange={handleChange} placeholder="Contoh: XI MIPA 2" required />
                <FormField id="studentId" name="studentId" label="NIS (Nomor Induk Siswa)" value={formData.studentId} onChange={handleChange} type="number" placeholder="Contoh: 12345" required />
            </div>
            <div>
              <RadioGroup legend="Jenis Kelamin" name="gender" options={GENDER_OPTIONS} selectedValue={formData.gender} onChange={handleChange} required />
              {formData.gender === 'Lainnya' && (
                <div className="mt-2 pl-10">
                  <FormField 
                    id="otherGender"
                    name="otherGender"
                    label="Mohon sebutkan"
                    value={otherGender}
                    onChange={(e) => setOtherGender(e.target.value)}
                    placeholder="Masukkan gender Anda"
                    required
                  />
                </div>
              )}
            </div>
            <FormField id="phoneNumber" name="phoneNumber" label="Nomor Telepon (WhatsApp)" value={formData.phoneNumber} onChange={handleChange} type="tel" placeholder="Contoh: 081234567890" required />
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Alasan Bergabung
              </label>
              <textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} rows={4} className="w-full px-3 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ceritakan mengapa Anda tertarik dengan seni rupa..." required></textarea>
            </div>
            <CheckboxGroup legend="Minat di Seni Rupa (Pilih minimal satu)" options={ART_INTERESTS} selectedOptions={formData.interests} onChange={handleInterestChange} />
            <div>
                <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Unggah Portofolio (Opsional)
                </label>
                <input type="file" id="portfolio" name="portfolio" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/50 dark:file:text-blue-300 dark:hover:file:bg-blue-900" accept="image/*,.pdf" />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Format yang didukung: JPG, PNG, PDF (Maks. 5MB).</p>
            </div>

            <div className="pt-4">
                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg hover:shadow-xl text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out">
                    {isSubmitting ? <><LoadingSpinner /> Mendaftar...</> : 'Daftar Sekarang'}
                </button>
            </div>
          </form>
        </main>
        
        {showConfirmation && (
          <ConfirmationModal
            memberData={getConfirmationData()}
            onConfirm={handleConfirmSubmit}
            onCancel={() => setShowConfirmation(false)}
            isSubmitting={isSubmitting}
          />
        )}

        {notification && (
            <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
        )}
      </div>
    </div>
  );
};

export default App;