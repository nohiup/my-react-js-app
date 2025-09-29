const Tag: React.FC<{ text: string }> = ({ text }) => {
  const colorInfo:
    Record<string,
      { bg: string; text: string; dot: string }> = {
    bug: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
    payment: { bg: "bg-indigo-100", text: "text-indigo-700", dot: "bg-indigo-500" },
    urgent: { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500" },
  };
  const tagColors = colorInfo[text] ||
    { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-400" };
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${tagColors.bg} ${tagColors.text}`}>
      <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${tagColors.dot}`} /> {text} </span>
  );
}

export default Tag;