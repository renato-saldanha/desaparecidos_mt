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