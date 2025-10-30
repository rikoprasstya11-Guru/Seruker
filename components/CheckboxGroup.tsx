
import React from 'react';
import { ArtInterest } from '../types';

interface CheckboxGroupProps {
  legend: string;
  options: { id: ArtInterest; label: string }[];
  selectedOptions: ArtInterest[];
  onChange: (value: ArtInterest) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ legend, options, selectedOptions, onChange }) => {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">{legend}</legend>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {options.map((option) => (
          <div key={option.id} className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id={option.id}
                name={option.id}
                type="checkbox"
                checked={selectedOptions.includes(option.id)}
                onChange={() => onChange(option.id)}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={option.id} className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                {option.label}
              </label>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default CheckboxGroup;
