const InsightData = [
  {
    title: 'Market Value',
    subtitle: '$40,689,897',
  },
  {
    title: 'Accounts Total',
    subtitle: '$40,697,765',
  },
];

function InsightContent() {
  return (
    <div className="space-y-1">
      {InsightData.map((data) => (
        <div key={data.title}>
          <p className="text-[#535353] text-sm">{data.title}</p>
          <p className="text-[#163964] text-[32px] font-bold">
            {data.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function InsightCard() {
  return (
    <div className="min-w-[320px] h-[240px] p-6 rounded-2xl bg-[#e6f1f9] bg-opacity-40 space-y-6 mt-5">
      <p className="text-[#0d233d] text-base font-bold">Insights</p>
      {InsightContent()}
    </div>
  );
}
