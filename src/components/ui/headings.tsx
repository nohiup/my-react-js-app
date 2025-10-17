export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl font-bold text-title font-sans">
      {children}
    </h1>
  );
}