import { Button } from '@/components/ui/button';

export default function StepNav({
  canPrev,
  canNext,
  onPrev,
  onNext,
  onSubmitClick, // renamed: explicit click handler
  isLast,
}: {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmitClick: () => void;
  isLast: boolean;
}) {
  return (
    <div className="flex justify-between mt-6">
      <Button type="button" variant="secondary" onClick={onPrev} disabled={!canPrev}>
        Back
      </Button>

      {isLast ? (
        // type="button" so nothing happens until we explicitly run our submit logic
        <Button type="button" onClick={onSubmitClick} disabled={!canNext}>
          Submit
        </Button>
      ) : (
        <Button type="button" onClick={onNext} disabled={!canNext}>
          Next
        </Button>
      )}
    </div>
  );
}
