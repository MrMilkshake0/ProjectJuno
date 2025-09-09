import { Button } from '@/components/ui/button';
import { saveDraft, clearDraft } from '@/lib/persistence';

export default function SaveBar({ data }: { data: unknown }) {
  return (
    <div className="sticky bottom-2 flex gap-2">
      <Button type="button" variant="outline" onClick={()=>saveDraft(data)}>Save draft</Button>
      <Button type="button" variant="ghost" onClick={()=>clearDraft()}>Clear draft</Button>
    </div>
  );
}