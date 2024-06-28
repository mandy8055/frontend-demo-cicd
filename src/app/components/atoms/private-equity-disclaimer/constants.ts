import { generateUUID } from 'src/app/common/utils';

export const PRIVATE_EQUITY_DISCLAIMER_LIST = [
  {
    id: generateUUID(),
    content:
      '"Valuation Date" is the most recent date that your investment has reported fair value. For fund investments, reports of fair value typically occur quarterly, with such fair value reported during the ensuing quarter. Since our reports are as of quarter end, they often appear to report fair value one quarter in arrears. However, in order to provide updated information, we adjust performance metrics for post-valuation capital activity through the report date.',
  },
  {
    id: generateUUID(),
    content:
      '"Paid-In Capital" is the amount that you have invested. Please note that "Paid-In Capital" may appear greater than "Commitment" due to additional amounts drawn for recallable investments, fees, taxes, expenses or other purposes by the Fund and Brown Advisory.',
  },
  {
    id: generateUUID(),
    content:
      '"Remaining Value" is the remaining fair value of your investment, calculated on the basis of your pro rata share of the fair value of all portfolio companies and other assets held by the investment vehicle as of the "Valuation Date" and adjusting that amount for any post-valuation capital activity. Fair value is reported on a quarterly basis when updated values are received.',
  },
  {
    id: generateUUID(),
    content:
      '"Total Investment Value" is equal to your "Cumulative Distributions" plus your "Remaining Value" for any investment.',
  },
  {
    id: generateUUID(),
    content:
      '"Gain/Loss on Investment" is the net gain or loss on the investment as of the report date. This amount is calculated by subtracting your "Paid-In Capital" from your "Total Investment Value." Please note that this amount includes unrealized investment values as a component of the calculation and can fluctuate from period to period.',
  },
  {
    id: generateUUID(),
    content:
      '"Multiple" is a standard private equity performance measurement that represents the value of an investment in relation to capital invested. "Multiple" is calculated by dividing "Total Investment Value" by "Paid-In Capital."',
  },
  {
    id: generateUUID(),
    content:
      '"IRR" means an aggregate, compound, annual internal rate of return on investments. "IRR" is calculated based on the timing of investment inflows and outflows as of the report date, along with the estimated remaining value of unrealized investments, with returns annualized. "IRR" takes into account all management fees, other fees, expenses and carried interest owed on an investment, as well as all applicable Brown Advisory expenses and administration fees applicable to the vehicle. "IRR" does not take into account taxes borne, to be borne or deemed borne at the investor level.',
  },
  {
    id: generateUUID(),
    content:
      'Brown Advisory generally does not make available the Net IRR for a private equity fund until it has been deploying capital for at least twelve months because Brown Advisory believes such performance would not yet be meaningful. "NM" stands for not meaningful.',
  },
];
