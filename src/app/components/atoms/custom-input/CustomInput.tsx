import { forwardRef } from 'react';
import { CustomInputProps } from './types';

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <div className="relative mb-4">
        <label
          htmlFor={id}
          className="absolute text-sm text-gray-600 bg-white px-1 left-2 -top-2.5"
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className="form-input px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          {...props}
        />
      </div>
    );
  },
);

export default CustomInput;
