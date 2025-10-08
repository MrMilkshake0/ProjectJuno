// src/components/StepNav.tsx
import { Button } from '@/components/ui/button';

export default function StepNav({
  canPrev,
  canNext,
  onPrev,
  onNext,
  onSubmitClick,
  isLast,
  submitting = false,
}: {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmitClick: () => void;
  isLast: boolean;
  submitting?: boolean;
}) {
  return (
    <div className="flex justify-between mt-6">
      <Button type="button" variant="secondary" onClick={onPrev} disabled={!canPrev || submitting}>
        Back
      </Button>

      {isLast ? (
        <Button type="button" onClick={onSubmitClick} disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit'}
        </Button>
      ) : (
        <Button type="button" onClick={onNext} disabled={!canNext || submitting}>
          Next
        </Button>
      )}
    </div>
  );
}
