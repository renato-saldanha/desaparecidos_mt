import { PessoaDTO } from '../interfaces';

type RegistroMock = {
    nome: string;
    idade: number;
    sexo: 'MASCULINO' | 'FEMININO';
    diasDesaparecido: number;
    diasAteLocalizacao?: number;
    local: string;
};

const REGISTROS: RegistroMock[] = [
    { nome: 'Ana Exemplo Ribeiro', idade: 34, sexo: 'FEMININO', diasDesaparecido: 12, local: 'Bairro Modelo, Cuiabá - MT' },
    { nome: 'Bruno Teste Almeida', idade: 17, sexo: 'MASCULINO', diasDesaparecido: 45, local: 'Centro Fictício, Várzea Grande - MT' },
    { nome: 'Carla Demo Figueiredo', idade: 52, sexo: 'FEMININO', diasDesaparecido: 130, diasAteLocalizacao: 9, local: 'Vila Amostra, Rondonópolis - MT' },
    { nome: 'Davi Exemplo Cardoso', idade: 8, sexo: 'MASCULINO', diasDesaparecido: 3, local: 'Jardim Inventado, Sinop - MT' },
    { nome: 'Elisa Teste Monteiro', idade: 23, sexo: 'FEMININO', diasDesaparecido: 76, local: 'Bairro Modelo, Tangará da Serra - MT' },
    { nome: 'Fábio Demo Nogueira', idade: 41, sexo: 'MASCULINO', diasDesaparecido: 210, local: 'Centro Fictício, Cáceres - MT' },
    { nome: 'Graça Exemplo Tavares', idade: 67, sexo: 'FEMININO', diasDesaparecido: 20, diasAteLocalizacao: 2, local: 'Vila Amostra, Cuiabá - MT' },
    { nome: 'Heitor Teste Barros', idade: 14, sexo: 'MASCULINO', diasDesaparecido: 58, local: 'Jardim Inventado, Lucas do Rio Verde - MT' },
    { nome: 'Isadora Demo Pacheco', idade: 29, sexo: 'FEMININO', diasDesaparecido: 91, local: 'Bairro Modelo, Primavera do Leste - MT' },
    { nome: 'Jonas Exemplo Queiroz', idade: 38, sexo: 'MASCULINO', diasDesaparecido: 150, diasAteLocalizacao: 30, local: 'Centro Fictício, Barra do Garças - MT' },
    { nome: 'Kelly Teste Moura', idade: 19, sexo: 'FEMININO', diasDesaparecido: 7, local: 'Vila Amostra, Várzea Grande - MT' },
    { nome: 'Leandro Demo Siqueira', idade: 73, sexo: 'MASCULINO', diasDesaparecido: 33, local: 'Jardim Inventado, Cuiabá - MT' },
    { nome: 'Marina Exemplo Duarte', idade: 11, sexo: 'FEMININO', diasDesaparecido: 5, local: 'Bairro Modelo, Sorriso - MT' },
    { nome: 'Nelson Teste Vasconcelos', idade: 46, sexo: 'MASCULINO', diasDesaparecido: 320, local: 'Centro Fictício, Rondonópolis - MT' },
    { nome: 'Olívia Demo Campos', idade: 31, sexo: 'FEMININO', diasDesaparecido: 64, diasAteLocalizacao: 15, local: 'Vila Amostra, Sinop - MT' },
    { nome: 'Paulo Exemplo Sampaio', idade: 25, sexo: 'MASCULINO', diasDesaparecido: 18, local: 'Jardim Inventado, Tangará da Serra - MT' },
    { nome: 'Quitéria Teste Lacerda', idade: 59, sexo: 'FEMININO', diasDesaparecido: 102, local: 'Bairro Modelo, Cáceres - MT' },
    { nome: 'Rafael Demo Guimarães', idade: 16, sexo: 'MASCULINO', diasDesaparecido: 27, local: 'Centro Fictício, Cuiabá - MT' },
    { nome: 'Sabrina Exemplo Peixoto', idade: 44, sexo: 'FEMININO', diasDesaparecido: 240, local: 'Vila Amostra, Lucas do Rio Verde - MT' },
    { nome: 'Tomás Teste Rangel', idade: 6, sexo: 'MASCULINO', diasDesaparecido: 2, diasAteLocalizacao: 1, local: 'Jardim Inventado, Várzea Grande - MT' },
    { nome: 'Úrsula Demo Fontes', idade: 36, sexo: 'FEMININO', diasDesaparecido: 85, local: 'Bairro Modelo, Barra do Garças - MT' },
    { nome: 'Valter Exemplo Cunha', idade: 62, sexo: 'MASCULINO', diasDesaparecido: 180, local: 'Centro Fictício, Primavera do Leste - MT' },
    { nome: 'Wanda Teste Brandão', idade: 21, sexo: 'FEMININO', diasDesaparecido: 40, local: 'Vila Amostra, Sorriso - MT' },
    { nome: 'Xavier Demo Leal', idade: 13, sexo: 'MASCULINO', diasDesaparecido: 9, local: 'Jardim Inventado, Cuiabá - MT' },
    { nome: 'Yara Exemplo Medeiros', idade: 48, sexo: 'FEMININO', diasDesaparecido: 270, diasAteLocalizacao: 60, local: 'Bairro Modelo, Rondonópolis - MT' },
    { nome: 'Zeca Teste Valadares', idade: 27, sexo: 'MASCULINO', diasDesaparecido: 55, local: 'Centro Fictício, Sinop - MT' },
    { nome: 'Alice Demo Prado', idade: 9, sexo: 'FEMININO', diasDesaparecido: 14, local: 'Vila Amostra, Tangará da Serra - MT' },
    { nome: 'Caio Exemplo Furtado', idade: 33, sexo: 'MASCULINO', diasDesaparecido: 120, local: 'Jardim Inventado, Cáceres - MT' },
    { nome: 'Débora Teste Nascimento', idade: 55, sexo: 'FEMININO', diasDesaparecido: 36, diasAteLocalizacao: 5, local: 'Bairro Modelo, Cuiabá - MT' },
    { nome: 'Egídio Demo Bastos', idade: 80, sexo: 'MASCULINO', diasDesaparecido: 11, local: 'Centro Fictício, Lucas do Rio Verde - MT' }
];

const DIA_EM_MS = 24 * 60 * 60 * 1000;

const montarPessoa = (registro: RegistroMock, indice: number): PessoaDTO => {
    const id = indice + 1;
    const desaparecimento = new Date(Date.now() - registro.diasDesaparecido * DIA_EM_MS);
    const localizacao = registro.diasAteLocalizacao !== undefined
        ? new Date(desaparecimento.getTime() + registro.diasAteLocalizacao * DIA_EM_MS)
        : null;

    return {
        id,
        nome: registro.nome,
        idade: registro.idade,
        sexo: registro.sexo,
        vivo: true,
        urlFoto: `/api/mock/foto/${id}.svg`,
        ultimaOcorrencia: {
            dtDesaparecimento: desaparecimento.toISOString(),
            dataLocalizacao: localizacao ? localizacao.toISOString() : '',
            encontradoVivo: localizacao !== null,
            localDesaparecimentoConcat: registro.local,
            ocoId: 9000 + id,
            ocorrenciaEntrevDesapDTO: {
                id: 8000 + id,
                observacoes: 'Registro fictício criado apenas para demonstração.',
                contatoResponsavel: 'Contato Fictício',
                telefoneContato: '(65) 90000-0000',
                enderecoContato: registro.local,
                relatoDesaparecimento: 'Relato inventado para demonstração. Esta pessoa não existe.'
            },
            listaCartaz: []
        }
    };
};

export const PESSOAS_MOCK: PessoaDTO[] = REGISTROS.map(montarPessoa);

export const buscarPessoaMock = (id: number): PessoaDTO | undefined =>
    PESSOAS_MOCK.find((pessoa) => pessoa.id === id);

const CORES_FOTO = ['#7aa5d2', '#d29a7a', '#8fc49a', '#c49ac4', '#d2c27a', '#7ac4c4', '#c47a7a', '#a0a0d8'];

export const gerarFotoSvg = (pessoa: PessoaDTO): string => {
    const cor = CORES_FOTO[pessoa.id % CORES_FOTO.length];
    const iniciais = pessoa.nome
        .split(' ')
        .filter((parte) => parte.length > 2)
        .slice(0, 2)
        .map((parte) => parte[0])
        .join('');

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
<rect width="200" height="200" fill="${cor}"/>
<circle cx="100" cy="78" r="38" fill="#ffffff" fill-opacity="0.85"/>
<path d="M30 200 C30 140 70 122 100 122 C130 122 170 140 170 200 Z" fill="#ffffff" fill-opacity="0.85"/>
<text x="100" y="92" font-family="Arial, sans-serif" font-size="30" font-weight="bold" text-anchor="middle" fill="#333333">${iniciais}</text>
<text x="100" y="190" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#333333">IMAGEM FICTÍCIA</text>
</svg>`;
};
