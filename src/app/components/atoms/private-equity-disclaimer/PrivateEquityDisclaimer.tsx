import { DISCLAIMER_PROPRIETARY } from 'src/app/common/constants';
import { PRIVATE_EQUITY_DISCLAIMER_LIST } from './constants';

export const PrivateEquityDisclaimer = () => (
  <>
    <p className="text-xs mb-4">{DISCLAIMER_PROPRIETARY}</p>
    <ol className="list-decimal list-inside text-xs">
      {PRIVATE_EQUITY_DISCLAIMER_LIST.map((item) => (
        <li key={item.id}>{item.content}</li>
      ))}
    </ol>
  </>
);
