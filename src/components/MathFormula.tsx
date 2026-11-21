import katex from 'katex';

interface MathFormulaProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export function MathFormula({
  latex,
  displayMode = false,
  className = '',
}: MathFormulaProps) {
  const html = katex.renderToString(latex, {
    displayMode,
    throwOnError: false,
    strict: false,
  });

  if (displayMode) {
    return (
      <div
        className={`my-3 rounded-xl border border-[#E9D8DC] bg-[#FDF9FA] px-4 py-3 text-slate-900 overflow-x-auto ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`inline-block align-middle ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
