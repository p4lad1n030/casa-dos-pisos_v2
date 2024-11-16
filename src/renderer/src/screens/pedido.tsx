import { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/mediaPrint.module.css';
import backgroundCasa from '../assets/casa.png';
import backgroundAtacadao from '../assets/atacadao.png';
import TableRow from '../components/tabelaPedido/TableRow';
import { useSelector } from "react-redux";
import { useloginSlice } from '../shared/redux/loginSlice';
import { useTotalItens, useTotalPisos } from '../shared/redux/totalSlice';
import { CLIENTE_CASA_DOS_PISOS } from '../shared';

const Pedido = () => {
  const length = 12;
  const array = Array.from({ length }, (_, index) => <TableRow key={index} i={index} />);
  const { userLogged } = useSelector(useloginSlice)
  const { pisos } = useSelector(useTotalPisos)
  const { itens } = useSelector(useTotalItens)
  const [desc, setDesc] = useState<string>();
  const [somaPisos, setSomaPisos] = useState<string>();
  const [somaItens, setSomaItens] = useState<string>();

  const handlePrint = () => {
    window.print()
  }

  useEffect(() => {
    setSomaPisos((pisos.map(u => u.val).reduce((acc, el) => acc + el, 0) / 100).toString())
    setSomaItens(itens.map(u => u.val).reduce((acc, el) => acc + el, 0).toString())
  }, [pisos, itens]);

  const handleNumber = (s: string) => {
    const value = s.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
    const val = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(value) / 100);
    setDesc((val).toString())
  }
  
  return (
    <section className='h-dvh flex flex-col justify-between '>
      <div className="flex flex-col gap-2 ">
        <Header pedido end={`${userLogged == CLIENTE_CASA_DOS_PISOS ? ' R. Manoel Laurentino Gonçalves, N°336 Passo De Torres-SC' : 'Rod. Pref. Jõao Luiz Da Silva N°823'}`}
          fone={`${userLogged == CLIENTE_CASA_DOS_PISOS ? ' (51)99302-8303' : '(48)99182-6925'}`} />
        <section className="flex justify-around -mt-2">
          <aside className="flex flex-col w-2/4 p-1 gap-1">
            <input type="text" className="h-5 rounded-lg outline-none border-vm border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold print:no-placeholder " aria-label='Nome' placeholder='Nome' />

            <input type="text" className="h-5 rounded-lg outline-none border-vm border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold print:no-placeholder" aria-label='Endereço' placeholder='Endereço' />

            <input type="text" className="h-5 rounded-lg outline-none border-vm border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold print:no-placeholder" aria-label='Condição de Pagamento' placeholder='Condição de Pagamento' />
          </aside>

          <article className="flex flex-col w-2/4 p-1 gap-1">
            <input type="text" className="h-5 rounded-lg outline-none border-vm border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold print:no-placeholder" aria-label='Nome' placeholder='Telefone' />
            <input type="text" className="h-5 rounded-lg outline-none border-vm border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold print:no-placeholder" aria-label='CNPJ/CPF' placeholder='CNPJ/CPF' />
            <input type="text" className="h-5 rounded-lg outline-none border-vm border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold print:no-placeholder" aria-label='Inscrição Estadual' placeholder='Inscrição Estadual' />
          </article>
        </section>


        <article className="">

          <table className={`table-auto min-w-full  relative ${styles.position_PrintRel} print:mtop`}>
            <thead className={`${styles.bg_print} border-vm `}>
              <tr className=' text-center bg-vm'>
                <th className='text-white font-title text-xl border-r-[2px]  border-white w-[15%]'>Quantidade
                  <img src={userLogged == 'casa@pisos.com' ? backgroundCasa : backgroundAtacadao} alt="" className={`${styles.position_PrintAbs} w-[786px] h-[245px] -z-10 absolute inset-0 m-auto  opacity-15`} />
                </th>
                <th className='text-white font-title text-xl border-r-[2px]  border-white'>Desc. e Ref.</th>
                <th className='text-white font-title text-xl border-r-[2px]  border-white w-[15%] text-nowrap'>Preço</th>
                <th className='text-white font-title text-xl border-r-[2px]   border-vm w-[15%]'>Total</th>
              </tr>
            </thead>
            <tbody className=' w-full '>
              {array.map((row, index) => {
                return (
                  <tr className='border border-vm ' key={index}>{row}</tr>
                )
              })}
              <tr className=' border border-vm'>
                <td className='border-x-2  border-vm'>
                  <h2 className="text-center font-title font-semibold text-vm">Desconto</h2>
                </td>

                <td className='  border-vm'>
                  <input type="text" aria-label='desconto' className='w-full outline-none text-vm font-title font-bold text-center text-1xl' onChange={(e) => {
                    handleNumber(e.target.value)
                  }}
                    value={!itens && !pisos ? '' : desc} />
                </td>
                <td>
                </td>
                <td className='print:bg_print bg-vm '>
                  <input type="text" className='bg-white/0 placeholder:text-white placeholder:text-center outline-none font-title' readOnly
                    placeholder={
                      
                      desc ? 
                        new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 2,
                        }).format((parseFloat(somaItens!) + parseFloat(somaPisos!) - (Number((desc).replace(/\D/g, ''))/100)) ).toString()
                     :
                        new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 2,
                        }).format(parseFloat(somaItens!) + parseFloat(somaPisos!)).toString()
                      } />
                </td>
              </tr>
            </tbody>
          </table>
        </article>

        <button type='button' className={`text-white bg-vm w-28 rounded-lg font-title  self-center mb-1 h-8 ${styles.hide_print}`} aria-label='button' onClick={(e) => { handlePrint() }}>
          Imprimir
        </button>

      </div>
      <Footer />
    </section>
  );
}

export { Pedido };
