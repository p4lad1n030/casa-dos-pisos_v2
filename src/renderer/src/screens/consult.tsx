import Header from '../components/header';
import Footer from '../components/footer';
import { productsProps } from '../types';
import { useEffect, useState } from 'react';
import { getFilteredAndLimitedData } from '../shared/consult';
import ResponsivePaginationComponent from 'react-responsive-pagination';
import { db } from '../services';
import { collection, DocumentData, getDocs, limit, query, startAfter } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Consult = () => {
  const [productsFromSearch, setProductsFromSearch] = useState<productsProps[]>();
  const [search, setSearch] = useState<string>('');
  const [products, setProducts] = useState<productsProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(140);
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);
  const [cursors, setCursors] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 15;





  const fetchFilteredData = async () => {
    setLoading(true)
    try {
      setProducts([])
      let result = []
      result = await getFilteredAndLimitedData(search);
      setProductsFromSearch(result)
      if (!search || !result || search === ' ') {
        setLoading(false)

      }
      setLoading(false)

    } catch (error) {
      console.log('error :>> ', error);
      setLoading(false)


    } finally {
      setLoading(false)
      if (!search || search === ' ') {
        setLoading(false)
        return
      }

    }
    if (!search) {
      setLoading(false)
      return
    }
    setLoading(false)

  };

  const loadPage = async (page: number) => {
    const productsRef = collection(db, 'products');
    // let q = query(productsRef, orderBy("name", "desc"), limit(pageSize));
    let q = query(productsRef, limit(pageSize));

    if (page > 1 && lastVisible) {
      q = query(
        productsRef,
        startAfter(cursors[page - 2]),
        limit(pageSize)
      );
    }
    const querySnapshot = await getDocs(q);
    let listProducts: productsProps[] = [];

    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        listProducts.push({
          docId: doc.id,
          id: doc.data().id,
          nome: doc.data().nome,
          nameLowerCase: doc.data().nameLowerCase,
          classe: doc.data().classe,
          preco: doc.data().preco,
          altura: doc.data().altura,
          largura: doc.data().largura,
          qntMetrosQuadrados: doc.data().qntMetrosQuadrados,
          created: doc.data().created,
          type: doc.data().type,
          quantidade: doc.data().quantidade
        });
      }
    });
    //aqui exibe os produtos se clicar na paginação
    setProducts(listProducts);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    const newCursors = [...cursors];
    newCursors[page - 1] = querySnapshot.docs[querySnapshot.docs.length - 1];
    setCursors(newCursors);
    setCurrentPage(page);
  };

  useEffect(() => {
    console.time('useEffect called')
    console.count('useEffect called');
    fetchFilteredData()
    loadPage(1)
    console.timeEnd('useEffect called')
    return () => {
    };
  }, [search,]);
  return (
    <>
      <section className='h-dvh flex flex-col justify-between'>
        <Header consult />
        <section className="w-full  flex  justify-between p-1 items-center ">
          <aside className="  w-4/5  py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-red">
            <input type="text" placeholder="Digite o nome do Produto Desejado" className="bg-transparent w-full focus:outline-none pr-4 border-0 focus:ring-0 px-0 py-0 placeholder:italic p-1 placeholder:text-vm placeholder:font-semibold text-vm font-title font-semibold" name="topic" onChange={(e) => {
              setSearch(e.target.value)

            }} />
          </aside>

          <article className="w-full">
            <article aria-label="Loading..." role="status">
              {loading ?
                <div className="flex justify-center items-center gap-4  w-full">
                  <svg className="h-12 w-12 animate-spin stroke-red " viewBox="0 0 256 256">
                    <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth="24"></line>
                    <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                    </line>
                    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth="24"></line>
                    <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                    </line>
                    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth="24"></line>
                    <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                    </line>
                  </svg>
                  <span className="text-vm font-title text-3xl  font-black">Procurando</span>
                </div> : <div className=" justify-center items-center gap-4  w-full hidden">
                  <svg className="h-12 w-12 animate-spin stroke-red " viewBox="0 0 256 256">
                    <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth="24"></line>
                    <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                    </line>
                    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth="24"></line>
                    <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                    </line>
                    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth="24"></line>
                    <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                    </line>
                  </svg>
                  <span className="text-vm font-title text-3xl  font-black">Procurando</span>
                </div>
              }
            </article>
          </article>

        </section>
        <section className="w-full  ">
          <div className="shadow-s m-1 ">
            <table className="table-auto min-w-full  ">
              <thead className='border-2 border-red  '>
                <tr className='rounded-full text-center'>
                  <th className='text-vm font-title text-xl border-r-[2px]  border-e-4 border-red'>Código</th>
                  <th className='text-vm font-title text-xl border-r-[2px]  border-e-4 border-red'>Nome</th>
                  <th className='text-vm font-title text-xl border-r-[2px]  border-e-4 border-red'>Classe</th>
                  <th className='text-vm font-title text-xl border-r-[2px]  border-e-4 border-red'>Preço</th>
                  <th className='text-vm font-title text-xl border-r-[2px]  border-e-4 border-red'>Tamanho</th>
                  <th className='text-vm font-title text-xl border-r-[2px]  border-e-4 border-red'>Quantidade</th>
                  <th className='text-vm font-title text-xl border-r-[2px]  border-e-4 border-red'>Metros²</th>
                </tr>
              </thead>
              <tbody className='overflow-x-scroll scrollbar-hide w-full'>

                {!search && products ? products.map(p => {
                  return (
                    <tr className='border ' key={p.id}>
                      <td className='text-vm font-title text-center  '>
                        <Link to={`/details/${p.docId}`} className='cursor-pointer hover:font-bold ' >{p.id}
                        </Link>
                      </td>
                      <td className='text-vm font-title text-center  '>
                        <Link to={`/details/${p.docId}`} className='cursor-pointer hover:font-bold ' >{p.nome}</Link>
                      </td>

                      <td className='text-vm font-title text-center  '>{
                        p.classe ? p.classe : 'N.A'
                      }</td>
                      <td className='text-vm font-title text-center '>{new Intl.NumberFormat('pt-BR', {
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
                    </tr>
                  )
                }) : null}

                {
                  search && productsFromSearch ? productsFromSearch.map(p => {
                    return (
                      <tr className='border ' key={p.id}>
                        <td className='text-vm font-title text-center overflow-x-auto '>
                          <Link to={`/details/${p.docId}`} className='cursor-pointer hover:font-bold ' >{p.id}</Link>
                        </td>
                        <td className='text-vm font-title text-center  '>
                          <Link to={`/details/${p.docId}`} className='cursor-pointer hover:font-bold ' >{p.nome}</Link>
                        </td>
                        <td className='text-vm font-title text-center  '>{
                          p.classe ? p.classe : 'N.A'
                        }</td>
                        <td className='text-vm font-title text-center '>{new Intl.NumberFormat('pt-BR', {
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
                      </tr>
                    )
                  }) : null
                }
              </tbody>

            </table>
          </div>
        </section>
        {
          search ? '' : <article className='bg-vm shadow-s w-full p-[2px] rounded-md mb-1 flex justify-center items-center'>
            <div className="flex justify-center items-center">
              <ResponsivePaginationComponent
                current={currentPage}
                total={totalPages}
                onPageChange={loadPage}
              />
            </div>
          </article>
        }
        <Footer />
      </section >
    </>
  );
}

export { Consult }