import { PessoaDTO } from '../interfaces';


export const formatarIdade = (idade: number): string => {
    if (idade === 0) return 'Idade não informada';
    return `${idade} ${idade === 1 ? 'ano' : 'anos'}`;
};


export const pessoaLocalizada = (pessoa: PessoaDTO): boolean => {
    if (!pessoa) return false;
    return pessoa.ultimaOcorrencia.encontradoVivo;    
};

export const obterCorStatus = (pessoa: PessoaDTO): string => {
    return pessoa.ultimaOcorrencia.encontradoVivo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
};

export const obterInformacoesContato = (pessoa: PessoaDTO) => {
    const entrevista = pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO;
    
    return {
        responsavel: entrevista.contatoResponsavel || 'Não informado',
        telefone: entrevista.telefoneContato || 'Não informado',
        endereco: entrevista.enderecoContato || 'Não informado'
    };
};

export const obterObservacoes = (pessoa: PessoaDTO): string => {
    const entrevista = pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO;
    return entrevista.observacoes || entrevista.relatoDesaparecimento || 'Nenhuma observação disponível';
};

export const obterImagensCartaz = (pessoa: PessoaDTO): string[] => {
    return pessoa.ultimaOcorrencia.listaCartaz
        .filter(cartaz => cartaz.urlImagem)
        .map(cartaz => cartaz.urlImagem!);
};

export const truncarNome = (nome: string, maxCaracteres: number = 20) => {
    if (nome.length <= maxCaracteres) return nome;
    return nome.substring(0, maxCaracteres) + '...';
};

export const obterDiasDesdeDesaparecimento = (pessoa: PessoaDTO): string => {
    const data = pessoa.ultimaOcorrencia?.dtDesaparecimento;
    const dataDesaparecimento = new Date(data);
    const dataAtual = new Date();
    const diferencaEmMilissegundos = (dataDesaparecimento.getTime() - dataAtual.getTime()) * -1;
    const milissegundosPorDia = 1000 * 60 * 60 * 24;
    const diasRestantes = Math.floor(diferencaEmMilissegundos / milissegundosPorDia);
    
    let texto = '';
    if (pessoa.sexo === 'MASCULINO') {
        texto = 'Desaparecido';
    } else {
        texto = 'Desaparecida';
    }

    return `${texto} há ${diasRestantes.toString()} dias`;
};

export const validarData = (data: string): string | null => {
    const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = data.match(dataRegex);
    
    if (data.length === 10 && match) {
        const [, dia, mes, ano] = match;
        const diaNum = parseInt(dia, 10);
        const mesNum = parseInt(mes, 10);
        const anoNum = parseInt(ano, 10);
        
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        
        if (mesNum < 1 || mesNum > 12) {
            return 'Mês inválido. Use um valor entre 01 e 12.';
        }
        
        if (diaNum < 1 || diaNum > 31) {
            return 'Dia inválido. Use um valor entre 01 e 31.';
        }
        
        if (anoNum < 1900 || anoNum > anoAtual) {
            return `Ano inválido. Use um valor entre 1900 e ${anoAtual}.`;
        }
        
        const dataTeste = new Date(anoNum, mesNum - 1, diaNum);
        if (dataTeste.getDate() !== diaNum || dataTeste.getMonth() !== mesNum - 1 || dataTeste.getFullYear() !== anoNum) {
            return 'Data inválida. Verifique se o dia existe no mês informado.';
        }
        
        if (dataTeste > dataAtual) {
            return 'A data não pode ser futura.';
        }
    }
    
    return null;
};