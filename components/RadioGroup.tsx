
import React from 'react';

interface RadioGroupProps {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ legend, name, options, selectedValue, onChange, required=false }) => {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">{legend}</legend>
      <div className="flex items-center space-x-6">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
              required={required}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label htmlFor={`${name}-${option.value}`} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioGroup;
