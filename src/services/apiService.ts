import axios from 'axios';
import { PessoaDTO, EstatisticasDTO, BuscaPessoasResponse, PessoaDetalhes } from '../interfaces';

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
    tamanho: number = 10,
    filtros?: {
        nome?: string;
        idadeMin?: number;
        idadeMax?: number;
        sexo?: string;
        status?: string;
    }
): Promise<BuscaPessoasResponse> => {
    try {
        const params = new URLSearchParams({
            page: pagina.toString(),
            size: tamanho.toString()
        });

        if (filtros?.nome) params.append('nome', filtros.nome);
        if (filtros?.idadeMin) params.append('idadeMin', filtros.idadeMin.toString());
        if (filtros?.idadeMax) params.append('idadeMax', filtros.idadeMax.toString());
        if (filtros?.sexo) params.append('sexo', filtros.sexo);
        if (filtros?.status) params.append('status', filtros.status);

        const response = await api.get(`/pessoas/aberto?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pessoas:', error);
        throw new Error('Erro ao buscar pessoas');
    }
};

export const buscarDetalhesPessoa = async (id: number): Promise<PessoaDetalhes> => {
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

export const enviarInformacoes = async (
    pessoaId: number,
    informacoes: {
        observacoes: string;
        localizacao?: string;
        dataAvistamento?: string;
        contato?: string;
        fotos?: File[];
    }
): Promise<void> => {
    try {
        const formData = new FormData();
        
        formData.append('pessoaId', pessoaId.toString());
        formData.append('observacoes', informacoes.observacoes);
        
        if (informacoes.localizacao) {
            formData.append('localizacao', informacoes.localizacao);
        }
        
        if (informacoes.dataAvistamento) {
            formData.append('dataAvistamento', informacoes.dataAvistamento);
        }
        
        if (informacoes.contato) {
            formData.append('contato', informacoes.contato);
        }
        
        if (informacoes.fotos && informacoes.fotos.length > 0) {
            informacoes.fotos.forEach((foto, index) => {
                formData.append(`fotos[${index}]`, foto);
            });
        }

        await api.post('/pessoas/informacoes', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
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

export default api;
