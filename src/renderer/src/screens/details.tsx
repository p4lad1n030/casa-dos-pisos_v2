import Header from '../components/header';
import Footer from '../components/footer';
import { useParams } from 'react-router-dom'
import { deleteDoc, doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../services';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { productsProps } from '../types';
import { deleteObject, getDownloadURL, ref, StorageReference, uploadBytesResumable } from 'firebase/storage';
import { alertFunction } from '../shared';
import { generatedUid, numberFormat } from '../shared/create';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

const Details = () => {
  const [product, setProduct] = useState<productsProps>();
  const { id } = useParams()
  const [name, setName] = useState<string>('');
  const [classe, setClasse] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [alt, setAlt] = useState<string>('');
  const [larg, setLarg] = useState<string>('');
  const [img, setImg] = useState<string>();
  const [prevew, setPrevew] = useState<string | null>(null);
  const [qnt, setQnt] = useState<string>('');
  const [qntMetros, setQntMetros] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadDeleteImg, setLoadDeleteImg] = useState<boolean>(false);
  const navigate = useNavigate()
  const nameImgRef = useRef<string>('');
  const refStorageRef = useRef<StorageReference>();
  const refNameStorage = useRef<string>('')

  const getDetailsProduct = (): void => {
    const productDetailRef = doc(db, "products", id!);
    getDoc(productDetailRef).then((snap) => {
      if (snap.exists()) {
        const d = snap.data()
        setProduct({
          docId: d.docId,
          nome: d.nome,
          altura: d.altura,
          classe: d.classe,
          largura: d.largura,
          preco: d.preco,
          qntMetrosQuadrados: d.qntMetrosQuadrados,
          quantidade: d.quantidade,
          created: d.created,
          id: d.id,
          nameLowerCase: d.nameLowerCase,
          type: d.type
        })
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      // console.log('productsRef :>> ', productsRef);
    }).catch((err) => {
      console.log('err :>> ', err);
    });
  }

  const handleUpdateFloor = async (e: FormEvent) => {
    e.preventDefault()
    const productRef = doc(db, 'products', id! )
    setLoading(true)
    try {

      await setDoc(productRef, {
        nome: name ? name : product?.nome,
        nameLowerCase: name ? name.toLowerCase() : product?.nameLowerCase,
        classe: classe ? classe : product?.classe,
        preco: Number((price).replace(/\D/g, "")) ? Number((price).replace(/\D/g, "")) : product?.preco,
        altura: Number(alt) ? Number(alt) : product?.altura,
        largura: Number(larg) ? Number(larg) : product?.largura,
        qntMetrosQuadrados: Number(qntMetros) < 0 ? increment(Number(-qntMetros.replace(/\D/g, ""))) : increment(Number(qntMetros.replace(/\D/g, ""))),
      }, { merge: true });
      navigate('/consult', { replace: true })
    } catch (error) {
      console.log('error :>> ', error);
    }

  }
  const handleUpdateItem = async (e: FormEvent) => {
    e.preventDefault()
    const productRef = doc(db, 'products', id!)
    setLoading(true)
    try {

      await setDoc(productRef, {
        nome: name ? name : product?.nome,
        nameLowerCase: name ? name.toLowerCase() : product?.nameLowerCase,
        preco: Number((price).replace(/\D/g, "")) ? Number((price).replace(/\D/g, "")) : product?.preco,
        quantidade: Number(qnt) ? increment(Number(qnt)) : product?.quantidade,
      }, { merge: true });
      navigate('/consult', { replace: true })
    } catch (error) {
      console.log('error :>> ', error);
    }

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

  const handleDelete = async () => {
    console.log('clicou deletar');
    try {

      await deleteDoc(doc(db, "products", id as string));
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/consult', { replace: true })
      setPrevew(null)
      setName(''), setClasse(''), setPrice(''), setAlt(''), setLarg(''), setQnt(''), setQntMetros('')
    }
  }

  useEffect(() => {
    console.time('useEffect called')
    console.count('useEffect called');
    console.log('qnt :>> ', parseFloat(qntMetros));
    getDetailsProduct()
  
    console.timeEnd('useEffect called')
    return () => {
      getDetailsProduct()
    };
  }, [alt, larg, qnt, prevew, loadDeleteImg, img, qntMetros]);
  return (
    <section className='h-dvh flex flex-col justify-between'>
      <Header details />
      {/* pisos e ajulejos */}
      {product?.type === 'revestimento' &&
        <div className="flex h-[60%]  w-full justify-center ">
          
          <article className="bg-vm m-1 justify-center flex w-2/3 rounded-lg  shadow-s">


            <form onSubmit={handleUpdateFloor} className="flex flex-col w-full items-center  gap-2 p-2">
              <input type="text" className="h-11  w-full rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='nome' placeholder={`${product?.nome}`} autoComplete='on' onChange={(e) => setName(e.target.value)} value={name} />

              <input type="text" className="h-11  w-full rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='classe' placeholder={product?.classe} autoComplete='on' onChange={(e) => setClasse((e.target.value).toUpperCase())} value={classe} />

              <input type="text" className="h-11  w-full rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='preco' placeholder={`${new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
              }).format(product?.preco! / 100)}`} autoComplete='on' onChange={(e) => { handleChange(e.target.value) }} value={price} />

              <div className="w-full flex justify-between">
                <input type="number" className="h-11  w-2/4 rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='tamanho' placeholder={`${product?.altura}`} autoComplete='on' onChange={(e) => setAlt(e.target.value)} value={alt} />
                <input type="number" className="h-11  w-2/4 rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='tamanho' placeholder={`${product?.largura}`} autoComplete='on' onChange={(e) => setLarg(e.target.value)} value={larg} />
              </div>

              <input type="text" className="  w-full rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='quantidade metro' placeholder={`${product.qntMetrosQuadrados!/100}m²`} onChange={(e) => {
                setQntMetros((e.target.value))
              }}
              />
              


              <div className="flex w-full justify-evenly">
                <button type='submit' className="h-11 mb-3  font-title font-bold border-white border-[1px] bg-white rounded-lg w-[170px] text-vm hover:bg-[#FFD9D9] mx-auto" aria-label='Cadastrar'>alterar Item</button>

                <button type='button' className="h-11 mb-3  font-title font-bold border-white border-[1px] bg-white rounded-lg w-[170px] text-vm hover:bg-[#FFD9D9] mx-auto" aria-label='Cadastrar' onClick={handleDelete}>Excluir Item</button>
              </div>

            </form>
          </article>
        </div>
      }

      {/* itens e outros */}
      {product?.type === 'item' &&
        <div className="flex h-[60%]  w-full justify-center ">
          
          <article className="bg-vm m-1 justify-center flex w-2/3 rounded-lg  shadow-s">

            <form onSubmit={handleUpdateItem} className="flex flex-col w-full items-center  gap-2 p-2">
              <input type="text" className="h-11  w-full rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='nome' placeholder={`${product?.nome}`} autoComplete='on' onChange={(e) => setName(e.target.value)} value={name} />

              <input type="text" className="h-11  w-full rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='preco' placeholder={`${new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
              }).format(product?.preco! / 100)}`} autoComplete='on' onChange={(e) => { handleChange(e.target.value) }} value={price} />

              <input type="number" className="h-11 w-full rounded-lg outline-none border-red border-[1px] placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" aria-label='quantidade unidade' placeholder={`${product?.quantidade}`} autoComplete='on' onChange={(e) => setQnt(e.target.value)} value={qnt} />

              <div className="flex w-full justify-evenly">
                <button type='submit' className="h-11 mb-3  font-title font-bold border-white border-[1px] bg-white rounded-lg w-[170px] text-vm hover:bg-[#FFD9D9] mx-auto" aria-label='Cadastrar'>alterar Item</button>

                <button type='button' className="h-11 mb-3  font-title font-bold border-white border-[1px] bg-white rounded-lg w-[170px] text-vm hover:bg-[#FFD9D9] mx-auto" aria-label='Cadastrar' onClick={handleDelete}>Excluir Item</button>
              </div>
            </form>
          </article>

        </div>}

      <Footer />
    </section >
  );
}

export { Details };
