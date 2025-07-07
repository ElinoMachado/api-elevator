export class CreateFeeDto {
  aporte: number;
  juros: number; // anual em %
  periodicidade: 'mensal' | 'semestral' | 'anual' | 'unico';
  inicio: string; // data em ISO
  fim: string;
}
