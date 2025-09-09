import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export default function SectionCard({ title, children, status }: { title: string; children: React.ReactNode; status?: 'complete'|'incomplete'|'invalid' }) {
  return (
    <Card className={status==='complete' ? 'border-green-500' : status==='invalid' ? 'border-red-500' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          {status==='complete' && <span className="text-xs text-green-600">Complete</span>}
          {status==='invalid' && <span className="text-xs text-red-600">Fix errors</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}