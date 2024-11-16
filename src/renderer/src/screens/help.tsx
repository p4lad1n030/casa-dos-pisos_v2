import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import programar from '../assets/logoBranco.png';
import { Link } from 'react-router-dom';
const Help = () => {
  const [cadastro, setCadastro] = useState<Boolean>(true);
  const [inserindo, setInserindo] = useState<boolean>(false);
  const [editando, setEditando] = useState<boolean>(false);
  const [deletando, setDeletando] = useState<boolean>(false);
  const [pedidos, setPedidos] = useState<boolean>(false);
  const [orcamento, setOrcamento] = useState<boolean>(false);

  return (
    <section className='h-dvh flex flex-col justify-between '>
      <Header help />
      <div className="flex flex-row  bg-slate-200 flex-1">
        <aside className=" bg-vm  w-1/4 h-vh p-1 flex justify-between flex-col ">
          <h1 className="font-title text-center text-white font-light ">Selecione o tutorial desejado</h1>
          <ul className="flex flex-col items-center gap-3 ">
            <li className='cursor-pointer font-title text-center text-white font-light hover:font-normal' onClick={() => {
              setCadastro(true)
              setInserindo(false)
              setEditando(false)
              setDeletando(false)
              setPedidos(false)
              setOrcamento(false)
            }}>Cadastrando Produtos</li>
            <li className='cursor-pointer font-title text-center text-white font-light hover:font-normal' onClick={() => {
              setInserindo(true)
              setCadastro(false)
              setEditando(false)
              setDeletando(false)
              setPedidos(false)
              setOrcamento(false)
            }}>Consultando Produtos</li>
            <li className='cursor-pointer font-title text-center text-white font-light hover:font-normal' onClick={() => {
              setEditando(true)
              setInserindo(false)
              setCadastro(false)
              setDeletando(false)
              setPedidos(false)
              setOrcamento(false)
            }}>Alterando Produtos</li>
            <li className='cursor-pointer font-title text-center text-white font-light hover:font-normal' onClick={() => {
              setDeletando(true)
              setEditando(false)
              setInserindo(false)
              setCadastro(false)
              setPedidos(false)
              setOrcamento(false)
            }}>Apagando Produtos</li>
              <li className='cursor-pointer font-title text-center text-white font-light hover:font-normal' onClick={() => {
                setOrcamento(true)
                setEditando(false)
                setInserindo(false)
                setCadastro(false)
                setDeletando(false)
                setPedidos(false)
              }}>Fazendo Orçamento</li>
            <li className='cursor-pointer font-title text-center text-white font-light hover:font-normal' onClick={() => {
              setPedidos(true)
              setEditando(false)
              setInserindo(false)
              setCadastro(false)
              setDeletando(false)
              setOrcamento(false)
            }}>Fazendo Pedidos</li>
            
          </ul>
          <Link to='https://api.whatsapp.com/send?phone=5551989736328' target="_blank">
            <img src={programar} alt="" className="w-full" />
            <p className="text-white font-title text-center text-xs -mt-6 underline hover:no-underline">clique aqui para contato</p>
          </Link>
        </aside>
        <article className=" h-full flex w-full justify-center items-center">
          {cadastro &&
            <>
            <div className="flex flex-col gap-4 ">
              <h1 className="text-vm text-center font-title font-extrabold text-4xl"> Cadastrando Produtos</h1>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/TzrOO74Y_lk?si=zHaCrdKpmh1WkipA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
            </>
          }

          {inserindo &&
            <>
            <div className="flex flex-col gap-4">
              <h1 className="text-vm text-center font-title font-extrabold text-4xl"> Consultando Produtos</h1>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/hcl7JwXhQxk?si=6aU52nJAEEKnsgSV" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
            </>
          }
          {editando &&
            <>
            <div className="flex flex-col gap-4">
              <h1 className="text-vm text-center font-title font-extrabold text-4xl"> Alterando Produtos</h1>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/1feyNdR2TKw?si=KkLehqhZBdEVDRso" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
            </>
          }
          {deletando &&
            <>
            <div className="flex flex-col gap-4">
              <h1 className="text-vm text-center font-title font-extrabold text-4xl"> Apagando Produtos</h1>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/TWsj6Gu24-E?si=gKG802k8f6p7q_ui" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
            </>
          }
          {pedidos &&
            <>
            <div className="flex flex-col gap-4">
              <h1 className="text-vm text-center font-title font-extrabold text-4xl"> Fazendo Pedidos</h1>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/erEKJK32Q80?si=WxqbFWyfCeO3T9hH" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
            </>
          }
          {orcamento &&
            <>
            <div className="flex flex-col gap-4">
              <h1 className="text-vm text-center font-title font-extrabold text-4xl"> Fazendo Orçamento</h1>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/z78sJ5YYW0Y?si=qD0HqPBoCGbQFWn9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
            </>
          }
        </article>
      </div>
      <Footer />
    </section >
  );
}

export { Help };
