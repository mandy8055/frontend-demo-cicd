import { type InputHTMLAttributes } from 'react';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export type { CustomInputProps };
