import NumberInput from './NumberInput';

export default function RangeMinMax({ base, labelMin='Min', labelMax='Max' }: { base: string; labelMin?: string; labelMax?: string; }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <NumberInput name={`${base}.min`} label={labelMin} />
      <NumberInput name={`${base}.max`} label={labelMax} />
    </div>
  );
}