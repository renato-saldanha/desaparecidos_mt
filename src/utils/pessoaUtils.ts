import { PessoaDTO } from '../interfaces';

export const isDesaparecida = (pessoa: PessoaDTO): boolean => {
    return !pessoa.vivo;
};

export const isEncontrada = (pessoa: PessoaDTO): boolean => {
    return pessoa.vivo;
};

export const formatarData = (data: string): string => {
    if (!data) return 'Data não informada';
    
    try {
        const dataObj = new Date(data);
        return dataObj.toLocaleDateString('pt-BR');
    } catch {
        return 'Data inválida';
    }
};

export const formatarIdade = (idade: number): string => {
    if (idade === 0) return 'Idade não informada';
    return `${idade} ${idade === 1 ? 'ano' : 'anos'}`;
};

export const pessoaLocalizada = (pessoa: PessoaDTO): boolean => {
    return pessoa.vivo;    
};

export const obterCorStatus = (pessoa: PessoaDTO): string => {
    return pessoa.vivo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
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