import { FormEvent, useEffect, useRef, useState } from 'react';
import { getFilteredAndLimitedData } from '../../shared/consult';
import { productsProps } from '../../types';
import { doc, getDoc, increment, setDoc } from 'firebase/firestore';
import { db } from '../../services';
import { IoMdCloseCircle } from "react-icons/io";
import styles from '../../styles/mediaPrint.module.css';
import { useDispatch, useSelector } from "react-redux";
import { clearTotalItens, clearTotalPisos, isTotalItens, isTotalPisos, useTotalPisos } from '../../shared/redux/totalSlice';
import { BiSolidCheckSquare } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";

const TableRow1 = (i: any) => {
  const dispatch = useDispatch();
  const id = useRef<string>('')
  const name = useRef<string>('')
  const price = useRef<number>()
  const [alturaP, setAlturaP] = useState<number>();
  const [larguraP, setLarguraP] = useState<number>();
  const [classeP, setClasseP] = useState<string>();
  const typeProduct = useRef<string>()
  const [totItems, setTotItems] = useState<number>();
  const [totRes, setTotRes] = useState<number>();
  const { pisos } = useSelector(useTotalPisos)
  const quantidadeProduct = useRef<number>()
  const qntMetrosQuadradosProduct = useRef<number>()
  const [qntMetros, setQntMetros] = useState<string>('');
  const [qnt, setQnt] = useState<string>('');
  const [show, setShow] = useState<boolean>(!true);
  const [productName, setProductName] = useState<string>('');
  const [confirmTable, setConfirmTable] = useState<boolean>(false);
  const [productsFromSearch, setProductsFromSearch] = useState<productsProps[]>();
  const [removeFromTotal, setRemoveFromTotal] = useState<boolean>(false);

  const fetchFilteredData = async (e: FormEvent) => {
    e.preventDefault()
    console.count('fetchFilteredData')
    try {
      let result = []
      result = await getFilteredAndLimitedData(productName);
      setProductsFromSearch(result)
      setShow(true)
      return
    } catch (error) {
      console.log('error :>> ', error);
    }

  };//fetchFilteredData

  const handleGetData = async (
    docId: string,
    nome: string,
    preco: number,
    type: string,
    quantidade: number,
    qntMetrosQuadrados: number,
    classe: string,
    altura: number,
    largura: number
  ) => {
    console.log('setou os dados')
    id.current = docId
    name.current = nome
    price.current = preco
    setClasseP(classe)
    setAlturaP(altura)
    setLarguraP(largura)
    typeProduct.current = type
    quantidadeProduct.current = quantidade
    qntMetrosQuadradosProduct.current = qntMetrosQuadrados
    setProductName(nome)
    setShow(false)
  }

  const updateProduct = async () => {
    const docRef = doc(db, "products", id.current);

    try {
      const snap = await getDoc(docRef)
      if (snap.exists()) {
        const d = snap.data();

        if (d.type === 'item') {
          if (d.quantidade < qnt) {

            window.api.showAlert(
              `Não é possível emitir este pedido. Você possui somente ${d.quantidade} unidade(s) de ${name.current}.`
            );
            return;
          } else {
            setConfirmTable(false)

            const productRef = doc(db, 'products', id.current);
            await setDoc(productRef, {
              quantidade: increment(Number(-qnt))
            }, { merge: true });

          }
        } else if (d.type === 'revestimento') {
          if (d.qntMetrosQuadrados < qntMetros) {

            window.api.showAlert(
              `Não é possível emitir este pedido. Você possui somente ${d.qntMetrosQuadrados} metros² de ${name.current}.`
            );
            return;
          } else {
            setConfirmTable(false)
            const productRef = doc(db, 'products', id.current);
            await setDoc(productRef, {
              qntMetrosQuadrados: increment(-Number((qntMetros).replace(/\D/g, '')))
            }, { merge: true });

          }//else
        }//else if
      }//if

    } catch (error) {
      console.log('error :>> ', error);
    }

  }
  // consegui setar a formatação dos numeros
  const handleNumber = (s: string) => {
    const value = s.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
    const val = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(value) / 100);

    setQntMetros((val).toString())
  }

  //*useeffect somente de qntMetros
  useEffect(() => {

    // pra revestimento
    if (qntMetros && productName && price.current) {
      // aqui exibe o confirme table
      setConfirmTable(true)
    }
    if (typeProduct.current == 'revestimento') {
      if (qntMetros && price.current) {

        setTotRes(curr => ((parseFloat((qntMetros).replace(/\D/g, '')) / 100) * price.current!))

      }
    }

    // pra items
    if (qnt && productName && price.current) {
      // aqui exibe o confirme table
      setConfirmTable(true)
    }
    if (typeProduct.current == 'item') {
      if (qnt && price.current) {

        setTotItems(curr => (parseFloat(qnt.replace(/\D/g, '')) / 100) * price.current!)


      }
    }
    
  }, [qntMetros, qnt, totItems]);


  return (
    <>
      <td className='border-x-2  border-vm h-4 '>

        {//abaixo seta qnt apenas se for revestimento
          typeProduct.current == 'revestimento' &&
          <input className={`print:bg-transparent bg-white/[0.1] w-full h-3  text-sm  outline-none text-center p-1 text-vm font-title font-semibold overflow-hidden`} aria-label='Quantidade' placeholder='reves.'
            onChange={(e) => handleNumber(e.target.value)}

            value={
              !productName ? ' ' : qntMetros

            } />
        }

        {//abaixo seta qnt apenas se for items
          typeProduct.current == 'item' &&
          <input className={`print:bg-transparent bg-white/[0.1] w-full h-5  text-sm  outline-none text-center p-1 text-vm font-title font-semibold overflow-hidden`} aria-label='Quantidade' placeholder='item'
            onChange={(e) => setQnt(e.target.value)}

            value={!productName ? ' ' : qnt} />
        }
      </td>

      <td className='border-x-2 border-vm relative h-4'>

        {show &&
          <div className="absolute bg-white/[0.9] h-[216px] w-[400px] -top-[155px] -right-[0%] left-0 m-auto rounded-lg border-white border-2 overflow-x-scroll scrollbar-hide z-10">
            <div className="sticky top-0  bg-vm/100 z-10 flex items-center gap-1 p-1">
              <h1 className=" text-center font-title text-[14px] font-extrabold text-white  p-1"> Selecione o Item no qual será feito o pedido</h1>
              <IoMdCloseCircle size={40} className='text-white mr-1' onClick={() => {
                setShow(!show)
              }} />
            </div>
            <ul className="flex flex-col content-between  gap-1 relative">
              {productsFromSearch && productsFromSearch!.map((p) => {
                return (
                  <li className="flex justify-center  my-1 cursor-pointer" onClick={(e) => {
                    handleGetData(
                      p.docId, p.nome, p.preco, p.type, p.quantidade!, p.qntMetrosQuadrados!, p.classe!, p.altura!, p.largura!
                    )

                  }} key={p.id}>

                    <div className=" flex border-b-2 w-2/4 h-28 border-vm justify-start items-center  ">
                      <h3 className="text-vm font-title text-lg ml-2">{p.nome}</h3>
                    </div>
                    <div className="flex border-b-2 w-2/4 justify-center border-vm items-center ">
                      <h3 className="text-vm font-title text-lg ml-2">{p.type === 'revestimento' ? `${(p.qntMetrosQuadrados! / 100)} m² ` : `${p.quantidade} uni.(s)`}</h3>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        }





        {
          confirmTable &&
          <div className={`${styles.hide_print} bg-white/[.1] absolute w-full h-full  inset-0 m-auto`}>
            <div className="flex justify-around items-center  bg-white/[.1] my-auto">
              <button type='button' aria-label='confirma pedido' className={`${styles.hide_print}`} onClick={() => {
                updateProduct()
                totRes! > 0 ? dispatch(isTotalPisos(
                  { val: totRes!, id: i }
                )) : null
                setRemoveFromTotal(true)
                totItems! > 0 ? dispatch(isTotalItens({ val: totItems!, id: i })) : null

              }}>
                <BiSolidCheckSquare size={25} className='text-green-400 hover:text-green-600' />
              </button>
              <button type='button' aria-label='remove pedido' className={`${styles.hide_print}`} onClick={() => {
                setConfirmTable(false)
                setProductName('')
                  setQnt('')
                  setAlturaP(0)
                  setLarguraP(0)
                  setClasseP('')

              }}><RiDeleteBin2Fill size={25} className='text-red-400 hover:text-red-600' />
              </button>
            </div>
          </div>
        }

        {/* a1 */}
        <form onSubmit={fetchFilteredData} className="">
          <div className="flex w-full justify-around items-center">
            <input className={`print:bg-transparent bg-white/[0.1] w-2/3 h-6 text-[13px] outline-none text-center p-1 text-vm font-title font-semibold overflow-hidden ${!classeP && 'w-full'}  `} aria-label='desc e ref' placeholder=''
              onChange={(e) => {
                setProductName(e.target.value)
              }} value={productName} />
            {classeP && alturaP && larguraP &&
              <>
              <p className={`text-sm  text-vm font-title font-semibold text-center mx-auto w-10 ${classeP ? 'border-l-2 border-r-2 border-vm' : null}`}>{classeP}</p>
              <div className="flex w-28 justify-center gap-1">
                  <p className="text-sm  text-vm font-title font-semibold">{larguraP}</p>
                  {larguraP && alturaP && <p className="text-sm  text-vm font-title font-semibold">X</p>}
                  <p className="text-sm  text-vm font-title font-semibold">{alturaP}</p>
                </div>
              </>
            }
          </div>
          {/* aqui remove do estado total */}
          {removeFromTotal &&
            <button type='button' aria-label='apaga do total' className={`${styles.hide_print} absolute top-0 right-1`} onClick={() => {
              setRemoveFromTotal(false)
              setProductName('')
              setAlturaP(0)
              setLarguraP(0)
              setClasseP('')

              totRes && dispatch(clearTotalPisos({ val: totRes!, id: i }))
              totItems && dispatch(clearTotalItens({ val: totItems!, id: i }))
              setQntMetros('')
            }}>
              <RiDeleteBin2Fill size={25} className={`${styles.bg_printTrans} text-red-400 hover:text-red-600`} />
            </button>
          }
        </form>





      </td>
      <td className='border-x-2 border-vm h-4'>
        <input className={`print:bg-transparent bg-white/[0.1] w-full h-6 text-sm  outline-none text-center  p-1   text-vm font-title font-semibold overflow-hidden`} aria-label='Preço Unitário' placeholder=' ' readOnly value={!productName ? '' : price.current ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
        }).format(price.current / 100) : ''} />
      </td>
      <td className='border-x-2 border-vm max-h-4'>
        <input className={`print:bg-transparent bg-white/[0.1] w-full h-6 text-sm  outline-none text-center  p-1   text-vm font-title font-semibold overflow-hidden`} aria-label='Total' placeholder=' ' readOnly value={
          qntMetros && price.current && productName ? new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
          }).format(Number(totRes) / 100) : qnt && price.current && productName ? new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
          }).format(Number(totItems)) : ''

        } />
      </td>

    </>
  );
}

export default TableRow1;

/*
é o totRes /100 gera o valor 
- passar o resultado da compra pro 1° total (✓)
- passar o resultado do total pra um array, em todas as linhas da tabela ()




show é setado quando clica no input des. e ref. abre a janelinha pra escolher o produto,
escolhendo o produto ele fecha sozinho e tbm é possivel fechar "manualmente"

setConfirmTable serve pra exibir os botões de confirmar ou não o pedido


const array = ['maçã', 'banana', 'cereja'];
const indexToRemove = 1; // índice do item que você quer remover

const newArray = array.filter((_, index) => index !== indexToRemove);

console.log(newArray); 

53,90 polido

*/