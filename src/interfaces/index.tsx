export interface EstatisticaPessoaDTO {
    quantPessoasDesaparecidas: number;
    quantPessoasEncontradas: number;
}

export interface PessoaDTO {
    id: number;
    nome: string;
    idade: number;
    sexo: 'MASCULINO' | 'FEMININO';
    vivo: boolean;
    urlFoto: string;
    ultimaOcorrencia: OcorrenciaDTO;
}

export interface PessoaDetalhes {
    id: number;
    nome: string;
    dataNascimento: string;
    dataDesaparecimento: string;
    localDesaparecimento: string;
    descricao: string;
    status: string;
    foto: string;
    observacoes: string;
}

export interface OcorrenciaDTO {
    dtDesaparecimento: string; 
    dataLocalizacao: string; 
    encontradoVivo: boolean;
    localDesaparecimentoConcat: string;
    ocorrenciaEntrevDesapDTO: OcorrenciaEntrevDesapDTO;
    listaCartaz: OcorrenciaCartazDTO[];
    ocoId: number;
}

export interface OcorrenciaInformacaoDTO{
    ocoId: number;
    informacao:	string;
    data: string;
    i: number;
    anexos:	[string];
    }
export interface OcorrenciaEntrevDesapDTO {
    id?: number;
    observacoes?: string;
    contatoResponsavel?: string;
    telefoneContato?: string;
    enderecoContato?: string;
    relatoDesaparecimento?: string;
}

export interface OcorrenciaCartazDTO {
    id?: number;
    urlImagem?: string;
    ativo?: boolean;
    dataCriacao?: string;
    observacoes?: string;
}


export interface EstatisticasDTO {
    quantPessoasDesaparecidas: number;
    quantPessoasEncontradas: number;
}


export interface BuscaPessoasResponse {
    content: PessoaDTO[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

export interface FiltrosDTO {
    nome: string;
    idadeInicial: number;
    idadeFinal: number;
    sexo: string;
    status: string;
}   