import { Suspense } from "react";
import ResultContent from "./ResultContent";

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-slate-600">Đang tải...</p>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
