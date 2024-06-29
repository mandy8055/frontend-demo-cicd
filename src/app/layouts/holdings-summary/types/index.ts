import { LucideIcon } from 'lucide-react';

interface ButtonRenderType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  Icon: LucideIcon;
}

interface HoldingsSummaryType {
  isMultiCurrency?: boolean;
}

export type { ButtonRenderType, HoldingsSummaryType };
