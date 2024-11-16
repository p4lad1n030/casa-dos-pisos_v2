/*
 - 1°parte
const pageSize = 16; // Número de itens por página
let lastVisible = null;
db.collection("estoque")
  .orderBy("nome")
  .limit(pageSize)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
    // Armazena o último documento visível
    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  });

 - 2° parte
db.collection("estoque")
  .orderBy("nome")
  .startAfter(lastVisible)
  .limit(pageSize)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
    // Atualiza o último documento visível
    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  });

  3° parte
  let cursors = [];
let currentPage = 0;

function loadNextPage() {
  let query = db.collection("estoque").orderBy("nome").limit(pageSize);
  if (currentPage > 0) {
    query = query.startAfter(cursors[currentPage - 1]);
  }
  query.get().then((querySnapshot) => {
    cursors[currentPage] = querySnapshot.docs[querySnapshot.docs.length - 1];
    currentPage++;
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  });
}

function loadPreviousPage() {
  if (currentPage > 1) {
    currentPage -= 2;
    let query = db.collection("estoque").orderBy("nome").limit(pageSize);
    if (currentPage > 0) {
      query = query.startAt(cursors[currentPage - 1]);
    }
    query.get().then((querySnapshot) => {
      cursors[currentPage] = querySnapshot.docs[querySnapshot.docs.length - 1];
      currentPage++;
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    });
  }
}


*/

criar 147 paginas pra todos os produtos da casa dos pisos


função pra dinheiro:
  {
    const formatarMoeda = (valor: any) => {
      if (!valor) return "";
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }).format(valor);
    };
    const handleChange = (e: string, callBack: Dispatch<SetStateAction<string>>) => {
      const valor = e.replace(/\D/g, ""); // Remove tudo que não é dígito
      callBack(valor ? formatarMoeda(parseFloat(valor) / 100) : ""); // Divide por 100 para considerar os centavos
    };
  }