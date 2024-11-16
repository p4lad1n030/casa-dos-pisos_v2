import { FormEvent, useEffect, useState, ChangeEvent, useRef } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { generatedUid, getFilteredAndLimitedData, handleAddFloor, handleAddItem, numberFormat } from '../shared/create';
import { alertFunction } from '../shared';
import { productsProps } from '../types';
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteObject, getDownloadURL, ref, StorageReference, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../services';
import undefinedFloor from '../assets/undefinedIMG.jpg';
import undefinedItem from '../assets/unknowItem.png';
import { Link } from 'react-router-dom';
import { HiMiniSquare3Stack3D } from "react-icons/hi2";
import { BiListPlus } from "react-icons/bi";

// import { useDispatch } from "react-redux";



const Create = () => {
  const [name, setName] = useState<string>('');
  const [classe, setClasse] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [alt, setAlt] = useState<string>('');
  const [larg, setLarg] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [prevew, setPrevew] = useState<string>();
  const [products, setProducts] = useState<productsProps[]>([]);
  const [qnt, setQnt] = useState<string>();
  const [qntMetros, setQntMetros] = useState<string>('');
  const nameImgRef = useRef<string>('');
  const refStorageRef = useRef<StorageReference>();
  const refNameStorage = useRef<string>('')
  const [revestimento, setRevestimento] = useState<boolean>(false);
  const [items, setItems] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(!true);
  const [reload, setReload] = useState<boolean>(false);
  // const dispatch = useDispatch();


  const handleSubmitFloor = (e: FormEvent) => {
    e.preventDefault()
    {
      if (!name) {
        alertFunction('Preencha o campo NOME! Por Favor.')
        return
      }
      if (!classe) {
        alertFunction('Preencha o campo CLASSE! Por Favor.')
        return
      }
      if (!price) {
        alertFunction('Preencha o campo PREÇO! Por Favor.')
        return
      }
      if (!alt) {
        alertFunction('Preencha o campo ALTURA! Por Favor.')
        return
      }
      if (!larg) {
        alertFunction('Preencha o campo LARGURA! Por Favor.')
        return
      }

    }
    handleAddFloor({
      docId: '',
      id: generatedUid(),
      nome: name,
      nameLowerCase: name.toLowerCase(),
      altura: Number(alt),
      classe: classe,
      largura: Number(larg),
      preco: Number((price).replace(/\D/g, "")),
      qntMetrosQuadrados: parseFloat(
        (qntMetros!)
          .replace(/\D/g, "")
      ),
      created: new Date(),
      type: 'revestimento'
    })
    setPrevew('')
    setName(''), setClasse(''), setPrice(''), setAlt(''), setLarg(''), setQntMetros(''),

      setTimeout(() => {
        setLoadingPage(!true)

      }, 2000);
  }
  const handleSubmitItem = (e: FormEvent) => {
    e.preventDefault()

    if (!name) {
      alertFunction('Preencha o campo NOME! Por Favor.')
      return
    }

    if (!price) {
      alertFunction('Preencha o campo PREÇO! Por Favor.')
      return
    }
    if (!price) {
      alertFunction('Preencha o campo QUANTIDADE! Por Favor.')
      return
    }


    handleAddItem({
      docId: '',
      id: generatedUid(),
      nome: name,
      nameLowerCase: name.toLowerCase(),
      preco: Number((price).replace(/\D/g, "")),
      created: new Date(),
      type: 'item',
      quantidade: Number(qnt)
    })
    setPrevew('')
    setName(''), setPrice(''), setQnt('')
    setTimeout(() => {
      setLoadingPage(!true)

    }, 2000);

  }



  const formatarMoeda = (valor: any) => {
    if (!valor) return "";
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(valor);
  };

  const handleChange = (e: string) => {
    const valor = e.replace(/\D/g, ""); // Remove tudo que não é dígito
    setPrice(valor ? formatarMoeda(parseFloat(valor) / 100) : ""); // Divide por 100 para considerar os centavos
  };

  const fetchData = async () => {
    try {
      let result = []
      result = await getFilteredAndLimitedData();
      setProducts(result)

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.time('useEffect called')
    console.count('useEffect called');
    fetchData()

    console.timeEnd('useEffect called')

    return () => {
      fetchData()
    };
  }, [loadingPage, reload]);


  /**
   * (Number(qnt) / 
   */
  return (
    <>
      <section className='h-dvh flex flex-col justify-between '>
        <Header create />

        <div className="flex h-[60%]  w-full " >

          <article className="bg-vm m-1 justify-center flex w-2/3 rounded-lg  mx-auto shadow-s">
            <div className="w-full">
              <div className="flex w-3/4  mx-auto  justify-around p-2 rounded-lg mt-4">
                <button type='button' className="bg-white border-red border-[1px] rounded-md p-1 flex items-center justify-around  text-vm font-title gap-2 hover:bg-[#FFD9D9] font-medium" aria-label='tabs' onClick={() => {
                  setRevestimento(true)
                  setItems(false)
                }} >Revestimentos  <HiMiniSquare3Stack3D size={'35'} /></button>

                <button type='button' className="bg-white w-[150px] border-red border-[1px] rounded-md p-1 flex items-center justify-around text-vm font-title gap-2 hover:bg-[#FFD9D9] font-medium" aria-label='tabs' onClick={() => {
                  setItems(true)
                  setRevestimento(false)
                }} >itens <BiListPlus size={'35'} /></button>
              </div>
              {
                revestimento &&
                <form onSubmit={handleSubmitFloor} className="flex flex-col w-full items-center  gap-2 p-2">
                  <input type="text" className="  w-full rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='nome' placeholder="Nome" autoComplete='on' onChange={(e) => setName(e.target.value)} value={name!} />

                  <input type="text" className="  w-full rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='classe' placeholder="Classe" autoComplete='on' onChange={(e) => setClasse((e.target.value).toUpperCase())} value={classe} />

                  <input type="text" className="  w-full rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='preco' placeholder="Preço" autoComplete='on' onChange={(e) => { handleChange(e.target.value) }} value={price} />


                  <div className="w-full flex justify-between">
                    <input type="number" className="  w-2/4 rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='tamanho' placeholder="Altura" autoComplete='on' onChange={(e) => setAlt(e.target.value)} value={alt!} />

                    <input type="number" className="  w-2/4 rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='tamanho' placeholder="Largura" autoComplete='on' onChange={(e) => setLarg(e.target.value)} value={larg!} />

                  </div>

                  <input type="text" className="  w-full rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='quantidade metro' placeholder='Metros²' onChange={(e) => {
                    numberFormat(e.target.value, setQntMetros)
                  }} value={qntMetros.slice(2).replace(',', '.')} />

                  <button type='submit' className=" mb-3  font-title font-bold border-white border-[1px] bg-white rounded-lg w-[170px] text-vm hover:bg-[#FFD9D9] mx-auto" aria-label='Cadastrar' onClick={() => { setReload(!reload) }}>Cadastrar</button>

                </form>
              }
              {items &&
                <form onSubmit={handleSubmitItem} className="flex flex-col w-full items-center  gap-2 p-2">
                  <input type="text" className="  w-full rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='nome' placeholder="Nome" autoComplete='on' onChange={(e) => setName(e.target.value)} value={name!} />

                  <input type="text" className="  w-full rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='preco' placeholder="Preço" autoComplete='on' onChange={(e) => { handleChange(e.target.value) }} value={price} />

                  <input type="text" className="  w-full rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='quantidade' placeholder='Quantidade' onChange={(e) => setQnt(e.target.value)} value={qnt} />

                  <button type='submit' className=" mb-3  font-title font-bold border-white border-[1px] bg-white rounded-lg w-[170px] text-vm hover:bg-[#FFD9D9] mx-auto" aria-label='Cadastrar' onClick={() => { setReload(!reload) }}>Cadastrar</button>
                </form>
              }
            </div>
          </article>

        </div>

        <div className="shadow-s m-1  overflow-x-scroll scrollbar-hide">
          <table className="table-auto w-full  ">
            <thead className='border-2 border-red  '>
              <tr className='rounded-full text-center'>
                <th className='text-vm font-title text-xl  '>Código</th>
                <th className='text-vm font-title text-xl  '>Nome</th>
                <th className='text-vm font-title text-xl  '>Classe</th>
                <th className='text-vm font-title text-xl  '>Preço</th>
                <th className='text-vm font-title text-xl  '>Tamanho</th>
                <th className='text-vm font-title text-xl  '>Quantidade</th>
                <th className='text-vm font-title text-xl  '>Metros²</th>
              </tr>
            </thead>
            <tbody >
              {products.map(p => {
                return (
                  <tr className='border' key={p.id}>
                    <td className='text-vm font-title text-center overflow-x-auto'>{p.id}</td>
                    <td className='text-vm font-title text-center '><Link to={`/details/${p.docId}`} className='cursor-pointer hover:font-bold ' >{p.nome}</Link></td>
                    <td className='text-vm font-title text-center  '>{
                      p.classe ? p.classe : 'N.A'
                    }</td>
                    <td className='text-vm font-title text-center'>{new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2,
                    }).format(p.preco / 100)}</td>
                    <td className='text-vm font-title text-center '>
                      {p.altura && p.largura ?
                        `${p.altura}x${p.largura}` : 'N.A'
                      }</td>
                    <td className='text-vm font-title text-center '>{`${p.quantidade ? p.quantidade : 'N.A'}`}</td>

                    <td className='text-vm font-title text-center'>{
                      p.qntMetrosQuadrados! ? (p.qntMetrosQuadrados! / 100).toString().replace('.', ',') + 'm²' : 'N.A'}</td>

                    {/* <td className='text-vm font-title text-center'>{
                      p.qntMetrosQuadrados! ? (p.qntMetrosQuadrados!).toString().replace('.', ',') + 'm²' : 'N.A'}</td> */}

                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <Footer />
      </section>
    </>
  );
}

export { Create };
