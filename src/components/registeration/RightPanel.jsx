const Card = ({ title, items }) => (
  <div className="rounded-lg bg-blue-50 p-4">
    <h3 className="text-sm font-semibold text-neutral-900 mb-2">{title}</h3>
    <ul className="space-y-2 text-sm text-neutral-700">
      {items.map((it, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  </div>
);

const RightPanel = () => {
  return (
    <aside className="space-y-4">
      <Card
        title="Required Documents"
        items={["PAN Card", "Registration Certificate", "Address Proof", "GSTIN Details"]}
      />
      <Card
        title="Need Help"
        items={["View User Manual", "Watch Tutorial Video", "Contact Support"]}
      />
    </aside>
  );
};

export default RightPanel;
