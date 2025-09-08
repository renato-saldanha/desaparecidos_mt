import axios, { AxiosResponse } from 'axios';
import { PessoaDTO, EstatisticasDTO, BuscaPessoasResponse, OcorrenciaInformacaoDTO } from '../interfaces';

const API_BASE_URL = 'https://abitus-api.geia.vip/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Erro na API:', error);
        return Promise.reject(error);
    }
);

export const buscarEstatisticas = async (): Promise<EstatisticasDTO> => {
    try {
        const response = await api.get('/pessoas/aberto/estatistico');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        throw new Error('Erro ao buscar estatísticas');
    }
};

export const buscarPessoas = async (
    pagina: number = 0,
    porPagina: number = 10,
    filtros?: {
        nome?: string;
        idadeInicial?: number;
        idadeFinal?: number;
        sexo?: string;
        status?: string;
    }
): Promise<BuscaPessoasResponse> => {
    try {
        const params = new URLSearchParams();

        if (filtros?.nome) params.append('nome', filtros.nome);
        if (filtros?.idadeInicial && filtros.idadeInicial > 0) params.append('faixaIdadeInicial', filtros.idadeInicial.toString());
        if (filtros?.idadeFinal && filtros.idadeFinal > 0) params.append('faixaIdadeFinal', filtros.idadeFinal.toString());
        if (filtros?.sexo) params.append('sexo', filtros.sexo);
        if (filtros?.status) params.append('status', filtros.status);
        if (pagina && pagina > 0) params.append('pagina', pagina.toString());
        if (porPagina && pagina > 0) params.append('porPagina', porPagina.toString());

        let response: AxiosResponse<BuscaPessoasResponse>;
        if (params.toString() !== '') {
            response = await api.get(`/pessoas/aberto/filtro${'?'+params.toString()}`);
        } else {
            response = await api.get(`/pessoas/aberto/filtro`);
        }
        
        if (response) {
            return response.data;
        } else {
            return {
                content: [],
                totalElements: 0,
                totalPages: 0,
                size: 0,
                number: 0,
                first: true,
                last: true
            };
        }        
    } catch (error) {
        console.error('Erro ao buscar pessoas:', error);
        throw new Error('Erro ao buscar pessoas');
    }
};

export const buscarDetalhesPessoa = async (id: number): Promise<PessoaDTO> => {
    try {
        const response = await api.get(`/pessoas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar detalhes da pessoa:', error);
        throw new Error('Erro ao buscar detalhes da pessoa');
    }
};

export const buscarPessoaDTO = async (id: number): Promise<PessoaDTO> => {
    try {
        const response = await api.get(`/pessoas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar detalhes da pessoa:', error);
        throw new Error('Erro ao buscar detalhes da pessoa');
    }
};

export const enviarInformacoesAPI = async (
    ocoId: number,
    informacoes: {
        informacao: string; 
        descricao: string;  
        data: string;
        localizacao?: string;
        telefone?: string;
        files?: File[];     
    }
): Promise<void> => {
    try {
        const params = new URLSearchParams();
        params.append('informacao', informacoes.informacao);
        params.append('descricao', informacoes.descricao);
        params.append('data', informacoes.data);
        params.append('ocoId', ocoId.toString());
        
        if (informacoes.localizacao) {
            params.append('localizacao', informacoes.localizacao);
        }
        if (informacoes.telefone) {
            params.append('telefone', informacoes.telefone);
        }

        let formData: FormData | null = null;
        
        if (informacoes.files && informacoes.files.length > 0) {
            formData = new FormData();

            params.forEach((value, key) => {
                formData!.append(key, value);
            });
            informacoes.files.forEach((file) => {
                formData!.append('anexos', file);
            });
        }

        if (formData) {
            await api.post(`/ocorrencias/informacoes-desaparecido?${params.toString()}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } else {
            await api.post(`/ocorrencias/informacoes-desaparecido?${params.toString()}`);
        }
    } catch (error) {
        console.error('Erro ao enviar informações:', error);
        throw new Error('Erro ao enviar informações');
    }
};

export const buscarPessoasPorFiltros = async (filtros: {
    nome?: string;
    idadeMin?: number;
    idadeMax?: number;
    sexo?: 'Masculino' | 'Feminino';
    status?: 'DESAPARECIDO' | 'LOCALIZADO';
    localDesaparecimento?: string;
}): Promise<PessoaDTO[]> => {
    try {
        const params = new URLSearchParams();
        
        Object.entries(filtros).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, value.toString());
            }
        });

        const response = await api.get(`/pessoas/aberto/buscar?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pessoas por filtros:', error);
        throw new Error('Erro ao buscar pessoas por filtros');
    }
};

export const buscarOcorrencias = async (pessoa: PessoaDTO): Promise<OcorrenciaInformacaoDTO[]> => {
    try {
        const response = await api.get(`/ocorrencias/informacoes-desaparecido?ocorrenciaId=${pessoa.ultimaOcorrencia.ocoId}`);
        if (response) {
            return response.data;
        } else {
            return [{
                ocoId: 0,
                informacao: '',
                data: '',
                i: 0,
                anexos: [''],
            }];
        } 
    } catch (error) {
        console.error('Erro ao buscar ocorrências:', error);
        throw new Error('Erro ao buscar ocorrências');
    }
};
export default api;
