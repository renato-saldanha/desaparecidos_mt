import type { NextApiRequest, NextApiResponse } from 'next';
import { PESSOAS_MOCK, buscarPessoaMock, gerarFotoSvg } from '@/mock/pessoas';
import { BuscaPessoasResponse, EstatisticasDTO, OcorrenciaInformacaoDTO } from '@/interfaces';

export const config = {
    api: {
        bodyParser: false
    }
};

const TAMANHO_PAGINA_PADRAO = 10;

const normalizar = (texto: string) =>
    texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const lerParametro = (valor: string | string[] | undefined): string => {
    if (Array.isArray(valor)) return valor[0] ?? '';
    return valor ?? '';
};

const lerNumero = (valor: string | string[] | undefined, padrao: number): number => {
    const numero = parseInt(lerParametro(valor), 10);
    return Number.isNaN(numero) ? padrao : numero;
};

const descartarCorpo = async (req: NextApiRequest) => {
    if (req.readableEnded) return;
    req.resume();
    await new Promise<void>((resolve) => {
        req.on('end', resolve);
        req.on('error', resolve);
        req.on('close', resolve);
    });
};

const estatisticas = (): EstatisticasDTO => {
    const encontradas = PESSOAS_MOCK.filter((p) => p.ultimaOcorrencia.encontradoVivo).length;
    return {
        quantPessoasDesaparecidas: PESSOAS_MOCK.length - encontradas,
        quantPessoasEncontradas: encontradas
    };
};

const filtrar = (req: NextApiRequest): BuscaPessoasResponse => {
    const nome = normalizar(lerParametro(req.query.nome).trim());
    const idadeInicial = lerNumero(req.query.faixaIdadeInicial, 0);
    const idadeFinal = lerNumero(req.query.faixaIdadeFinal, 0);
    const sexo = lerParametro(req.query.sexo).toUpperCase();
    const status = lerParametro(req.query.status).toUpperCase();
    const pagina = Math.max(lerNumero(req.query.pagina, 0), 0);
    const porPagina = Math.max(lerNumero(req.query.porPagina, TAMANHO_PAGINA_PADRAO), 1);

    const filtradas = PESSOAS_MOCK.filter((pessoa) => {
        if (nome && !normalizar(pessoa.nome).includes(nome)) return false;
        if (idadeInicial > 0 && pessoa.idade < idadeInicial) return false;
        if (idadeFinal > 0 && pessoa.idade > idadeFinal) return false;
        if (sexo && pessoa.sexo !== sexo) return false;
        if (status === 'ENCONTRADO' && !pessoa.ultimaOcorrencia.encontradoVivo) return false;
        if (status === 'DESAPARECIDO' && pessoa.ultimaOcorrencia.encontradoVivo) return false;
        return true;
    });

    const totalPaginas = Math.ceil(filtradas.length / porPagina);

    return {
        content: filtradas.slice(pagina * porPagina, (pagina + 1) * porPagina),
        totalElements: filtradas.length,
        totalPages: totalPaginas,
        size: porPagina,
        number: pagina,
        first: pagina === 0,
        last: pagina >= totalPaginas - 1
    };
};

const informacoesOcorrencia = (req: NextApiRequest): OcorrenciaInformacaoDTO[] => {
    const ocoId = lerNumero(req.query.ocorrenciaId, 0);
    const pessoa = PESSOAS_MOCK.find((p) => p.ultimaOcorrencia.ocoId === ocoId);
    if (!pessoa) return [];

    return [{
        ocoId,
        informacao: `Boletim fictício de demonstração (${pessoa.ultimaOcorrencia.localDesaparecimentoConcat})`,
        data: pessoa.ultimaOcorrencia.dtDesaparecimento,
        i: 0,
        anexos: ['']
    }];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const caminho = ([] as string[]).concat(req.query.path ?? []);
    const rota = caminho.join('/');

    if (rota === 'ocorrencias/informacoes-desaparecido' && req.method === 'POST') {
        await descartarCorpo(req);
        return res.status(201).json({ mensagem: 'Informações recebidas em modo demonstração, nada foi gravado' });
    }

    if (req.method !== 'GET') {
        await descartarCorpo(req);
        return res.status(405).json({ erro: 'Método não permitido' });
    }

    if (rota === 'pessoas/aberto/estatistico') {
        return res.status(200).json(estatisticas());
    }

    if (rota === 'pessoas/aberto/filtro') {
        return res.status(200).json(filtrar(req));
    }

    if (rota === 'ocorrencias/informacoes-desaparecido') {
        return res.status(200).json(informacoesOcorrencia(req));
    }

    if (caminho.length === 2 && caminho[0] === 'pessoas' && /^\d+$/.test(caminho[1])) {
        const pessoa = buscarPessoaMock(Number(caminho[1]));
        if (pessoa) return res.status(200).json(pessoa);
    }

    if (caminho.length === 2 && caminho[0] === 'foto' && /^\d+\.svg$/.test(caminho[1])) {
        const pessoa = buscarPessoaMock(parseInt(caminho[1], 10));
        if (pessoa) {
            res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
            res.setHeader('Cache-Control', 'public, max-age=86400');
            return res.status(200).send(gerarFotoSvg(pessoa));
        }
    }

    return res.status(404).json({ erro: 'Recurso não encontrado' });
}
