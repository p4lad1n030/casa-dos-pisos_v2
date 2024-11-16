email casa.atacadao.dospisos@gmail.com
123456abc@ : s

classes utilitárias responsivas:

Prefixo do ponto de interrupção	Largura mínima	CSS
sm	640px	@media (min-width: 640px) { ... }
md	768px	@media (min-width: 768px) { ... }
lg	1024px	@media (min-width: 1024px) { ... }
xl	1280px	@media (min-width: 1280px) { ... }
2xl	1536px	@media (min-width: 1536px) { ... }

pra ver erros na hora de rodar o projeto:
npm run dev --trace-warnings .
 
componentes tailwind pra usar no projeto:
 - tabs pra separar os tipos de produtos:
 - Tabs section [1°]
 - Tab navigation buttons[2°]
 - Tab navigation with alpine JS 
 
 - Escrever letras sozinho:
  - Typewriter effect

next {
  realizar a consulta na pagina de consulta 
  melhorar a exibição das imagens(padronizar os tamanhos )
}

  //renderiza a lista inicial
  const loadInitialPage = () => {
    const productsRef = collection(db, 'products')
    // const q = query(productsRef, orderBy("name", "desc"),  limit(7))
    const q = query(productsRef,limit(pageSize))
    getDocs(q)
      .then((querySnapshot) => {
        let listProducts = [] as productsProps[]
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            listProducts.push({
              id: doc.data().id,
              nome: doc.data().nome,
              nameLowerCase: doc.data().nameLowerCase,
              classe: doc.data().classe,
              preco: doc.data().preco,
              altura: doc.data().altura,
              largura: doc.data().largura,
              quantidade: doc.data().quantidade,
              qntMetrosQuadrados: doc.data().qntMetrosQuadrados,
              imagem: doc.data().imagem,
              created: doc.data().created
            })//push ends
          }//if 
        })//forEach
        setProducts(listProducts);

        console.log('querySnapshot.docs.length :>> ', querySnapshot.size);

        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        console.log('lastVisible :>> ', lastVisible);
        

        //aqui encontra se o numero de paginas a ser exibido
        setTotalPages(Math.ceil(querySnapshot.size / pageSize));
        // console.log('totalPages :>> ', totalPages);


        setCursors([querySnapshot.docs[querySnapshot.docs.length - 1]]);
        // console.log('cursors :>> ', cursors);
      });
  };

  <ResponsivePaginationComponent
              current={currentPage}
              total={totalPages}
              onPageChange={loadPage}
            />


abstração das funções pra compreensão{
if(search ){
      fetchFilteredData()
      console.log('procurou', Date.now());
    } else {
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
            id: doc.data().id,
            nome: doc.data().nome,
            nameLowerCase: doc.data().nameLowerCase,
            classe: doc.data().classe,
            preco: doc.data().preco,
            altura: doc.data().altura,
            largura: doc.data().largura,
            quantidade: doc.data().quantidade,
            qntMetrosQuadrados: doc.data().qntMetrosQuadrados,
            imagem: doc.data().imagem,
            created: doc.data().created
          });
        }
      });
      //aqui exibe os produtos se não tiver busca
      setProducts(listProducts);

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      // console.log('lastVisible/loadPage :>> ', lastVisible);
      console.log('querySnapshot.docs[querySnapshot.docs.length - 1] :>> ', querySnapshot.docs[querySnapshot.docs.length - 1]);

      const newCursors = [...cursors];
      // console.log('newCursors/loadPage :>> ', newCursors);

      newCursors[page - 1] = querySnapshot.docs[querySnapshot.docs.length - 1];

      // console.log('newCursors/depois de atribuido/loadPage :>> ', newCursors);

      setCursors(newCursors);
      // console.log('cursors/loadPage :>> ', cursors);

      setCurrentPage(page);
    }

A abordagem que eu vou usar para No No na tela de pedido Consegui deduzir do banco de dados as informações do pedido é implementar um campo de busca implementar um campo de busca no No descrição e referência buscar o item que que desejado e então fazer um update com um merch merg Atualizando o produto

const res = (Number(alt!) * Number(larg)! * Number(qnt!)) / 10000;
    //   setQntMetros(parseFloat(res.toFixed(2)));
    <HiMiniSquare3Stack3D />
    <TbSquareRotatedFilled />
    <BsUnion />
- criar a função que pega as referencias para os dados dos produtos no banco de dados
- tentar separar esta função para fazer a chamada dela onde precisar semm ter que ficar reescrevendo a mesma função
 - passar por argumento os estados para função alterar os estados e modificar no banco de dados


orçamento
colocar uma busca pra escolher o produto e referenciar ele no banco de dados{
  setar o nome do disgraçado automaticamente no campo de referência 
  setar a quantidade pra descontar do estoque
  partir para o proximo
  
}

transições suaves{
  <div className={` w-full h-full transition-opacity transition-visibility duration-500 ease-in-out ${confirmTable ? 'opacity-100 visible' :'max-h-0 opacity-0 invisible'}`}>
            <div className="flex justify-around items-center my-2">
              <button type='button' aria-label='button' className="bg-red p-2 rounded-lg text-white font-title font-extralight" onClick={updateProduct}> Confirmar Pedido</button>
              <button type='button' aria-label='button' className="bg-red p-2 rounded-lg text-white font-title font-extralight " onClick={() => {
                setConfirmTable(false)
              }}>Revisar Pedido</button>
            </div>
          </div>
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
    setQnt(valor ? formatarMoeda(parseFloat(valor) / 100) : ""); // Divide por 100 para considerar os centavos
  };
  //create.tsx linha 353
  {/* <td className='text-red font-title text-center'>{
                      p.qntMetrosQuadrados! ? (p.qntMetrosQuadrados! / 100).toString().replace('.', ',') + 'm²' : 'N.A'}</td> */}


                      recarregar a aplicação: ctrl + r
                      developer tools: ctrl + shift + i