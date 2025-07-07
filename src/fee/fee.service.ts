import { Injectable } from '@nestjs/common';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';

@Injectable()
export class FeeService {
  create(createFeeDto: CreateFeeDto) {
    return 'This action adds a new fee';
  }

  generateTable(dto: CreateFeeDto) {
    const { aporte, juros, periodicidade, inicio, fim } = dto;
    const inicioDate = new Date(inicio);
    const fimDate = new Date(fim);
    const taxaDecimal = juros / 100;

    let saldoJuros = 0;
    let saldoPuro = 0;
    let data = new Date(inicioDate);
    let i = 0;

    const dadosTabela: {
      mes: string;
      saldoPuro: string;
      juros: string;
      saldoJuros: string;
      rendimentoMes: string;
    }[] = [];

    while (data <= fimDate) {
      const aplicaAporte =
        periodicidade[0] === 'mensal' ||
        (periodicidade[0] === 'semestral' && i % 6 === 0) ||
        (periodicidade[0] === 'anual' && i % 12 === 0) ||
        (periodicidade[0] === 'unico' && i === 0);

      if (aplicaAporte) {
        saldoJuros += +aporte;
        saldoPuro += +aporte;
      }
      const antesJuros = saldoJuros;
      saldoJuros *= 1 + taxaDecimal;
      const rendimentoMes = saldoJuros - antesJuros;
      dadosTabela.push({
        mes: data.toLocaleDateString('pt-BR', {
          month: 'long',
          year: 'numeric',
        }),
        saldoPuro: saldoPuro.toFixed(2),
        juros: (saldoJuros - saldoPuro).toFixed(2),
        saldoJuros: saldoJuros.toFixed(2),
        rendimentoMes: rendimentoMes.toFixed(2),
      });

      data.setMonth(data.getMonth() + 1);
      i++;
    }

    return dadosTabela;
  }

  findAll() {
    return `This action returns all fee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fee`;
  }

  update(id: number, updateFeeDto: UpdateFeeDto) {
    return `This action updates a #${id} fee`;
  }

  remove(id: number) {
    return `This action removes a #${id} fee`;
  }
}
