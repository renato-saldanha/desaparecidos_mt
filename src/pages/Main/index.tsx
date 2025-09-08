import React from 'react';
import Image from "next/image";

import DropDown from '../../Components/DropDown';
import { TypeDropDownMenuItem } from '../../types';
import CustomInput from '@/Components/CustomInput';
import CustomButton from '@/Components/CustomButton';
import CardTotal from '@/Components/CardTotal';

import { buscarEstatisticas } from '@/services/apiService';
import { EstatisticasDTO, FiltrosDTO } from '@/interfaces';
import ListaCardPessoa from '../ListaCardPessoa';

 
interface MainState {
    menuSexo: TypeDropDownMenuItem[];
    menuStatus: TypeDropDownMenuItem[];
    estatisticas: EstatisticasDTO;
    filtros: FiltrosDTO;
    filtrosTemporarios: FiltrosDTO;
}
 
class Main extends React.Component<object, MainState> {
    constructor(props: object) {
        super(props);
        this.state = { 
            menuSexo : [
                { descricao: 'MASCULINO' },
                { descricao: 'FEMININO' } 
            ],
            menuStatus : [
                { descricao: 'DESAPARECIDO'},
                { descricao: 'ENCONTRADO' }
            ],   
            estatisticas: {
                quantPessoasDesaparecidas: 0,
                quantPessoasEncontradas: 0
            },
            filtros: {
                nome: '',
                idadeInicial: 0,
                idadeFinal: 0,
                sexo: '',
                status: ''
            },
            filtrosTemporarios: {
                nome: '',
                idadeInicial: 0,
                idadeFinal: 0,
                sexo: '',
                status: ''
            }
         };
    };

    componentDidMount(): void {
        this.handleGetEstatistica();
    };

    handleGetEstatistica = async () => {
        const estatisticas = await buscarEstatisticas();
        this.setState({
            estatisticas: estatisticas,
        });
    };

    handleLimparFiltros = () => {
        const filtrosVazios = {
            nome: '',
            idadeInicial: 0,
            idadeFinal: 0,
            sexo: '',
            status: '',
        };
        
        this.setState({
            filtros: filtrosVazios,
            filtrosTemporarios: filtrosVazios,
        });
    };

    handleFiltrosChange = (campo: string, valor: string | number) => {
        this.setState(prevState => ({
            filtrosTemporarios: {
                ...prevState.filtrosTemporarios,
                [campo]: valor,
            },
        }));
    };

    handleBuscar = () => {
        this.setState({
            filtros: this.state.filtrosTemporarios
        });
    };

    
    render() { 
        return (  
            <main className='flex flex-col'>
                <div className='text-center h-50 relative
                                sm:h-70
                                md:h-80
                                lg:h-85
                                x1:h-90
                                2x1:h-100'>
                    <Image
                        className='w-full h-full object-cover -z-10'
                        src="/desaparecido_background.png"   
                        alt="main_image"
                        style={{objectPosition: "center 10%"}}
                        width={700}
                        height={500}
                        priority={true}
                        unoptimized={true}/>  
                   <div className='absolute inset-0 inset-y-15 flex items-center pl-2 opacity-94
                                    sm:inset-y-20 sm:pl-10 sm:pr-20
                                    md:inset-y-25 md:pl-20 md:pr-10
                                    xl:inset-y-30 xl:pl-32 xl:pr-0'>
                     <div className='container w-full flex justify-evenly '>
                        <div className="flex flex-col bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-xl w-60 
                                        sm:w-80 sm:p-2          
                                        md:w-100 md:p-3 md:mr-20
                                        lg:w-155 lg:p-3 lg:mr-30">
                            <CustomInput 
                                type="text" 
                                placeholder="Digite o nome"
                                value={this.state.filtrosTemporarios.nome}
                                onChange={e => this.handleFiltrosChange('nome', e.target.value)}
                            />
                            <div className='flex justify-evenly space-x-2'>
                                <CustomInput 
                                    type="number" 
                                    placeholder="Idade inicial"
                                    value={this.state.filtrosTemporarios.idadeInicial}
                                    onChange={e => this.handleFiltrosChange('idadeInicial', parseInt(e.target.value) || 0)}
                                />
                                <CustomInput 
                                    type="number" 
                                    placeholder="Idade final"
                                    value={this.state.filtrosTemporarios.idadeFinal}
                                    onChange={e => this.handleFiltrosChange('idadeFinal', parseInt(e.target.value) || 0)}
                                />
                            </div>
                            <div className='flex justify-evenly space-x-2'>
                                <DropDown 
                                    titulo='Sexo' 
                                    menus={this.state.menuSexo} 
                                    onSelect={item => this.handleFiltrosChange('sexo', item.descricao)} /> 
                                <DropDown 
                                    titulo='Status' 
                                    menus={this.state.menuStatus} 
                                    onSelect={item => this.handleFiltrosChange('status', item.descricao)} /> 
                            </div>
                            <div className='flex justify-evenly space-x-2'>
                                <CustomButton 
                                    cor='bg-vermelho'
                                    texto='Limpar'
                                    onClick={this.handleLimparFiltros}/>
                                <CustomButton 
                                    cor='bg-amarelo'
                                    texto='Buscar'
                                    onClick={this.handleBuscar}/>
                            </div>                                    
                        </div>
                        
                    </div>  
                    <div className='flex flex-col mr-15 text-md
                                    sm:mr-22 sm:text-xl
                                    md:mr-38 mdtext-lg
                                    lg:flex lg:mr-30 
                                    xl:mr-50 xl:text-3xl'>
                            <CardTotal
                                texto='LOCALIZADOS'
                                valor={this.state.estatisticas.quantPessoasEncontradas}/>
                            <CardTotal
                                texto='DESAPARECIDOS'
                                valor={this.state.estatisticas.quantPessoasDesaparecidas}/>
                        </div>                       
                   </div>
                </div>
                <div className='flex-1 bg-gray-400 px-9 py-4'>
                    <ListaCardPessoa 
                        filtros={this.state.filtros}
                    />
                </div>
            </main>

        );
    }
}
 
export default Main;