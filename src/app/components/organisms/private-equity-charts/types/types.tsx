export interface Datum {
  label: string;
  amount: number;
  categories: string[];
}

export type ChartData = [string, number, string[]][];
