import { addDoc, collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../services'
import { productsProps } from '../types'

export const generatedUid = () => {
  return Math.random().toString(36).substr(2, 5)
}

const formatarMoeda = (valor: any) => {
  if (!valor) return ''
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(valor)
}
export const numberFormat = (e: string, usestate: React.Dispatch<React.SetStateAction<string>>) => {
  const valor = e.replace(/\D/g, '') // Remove tudo que não é dígito
  usestate(valor ? formatarMoeda(parseFloat(valor) / 100) : '') // Divide por 100 para considerar os centavos
}

// adiciona os produtos ao banco de dados (pisos e azulejos).
export const handleAddFloor = async ({
  docId,
  id,
  nome,
  classe,
  preco,
  altura,
  largura,
  qntMetrosQuadrados,
  created,
  nameLowerCase,
  type
}: productsProps): Promise<void> => {
  if (!id || !nome || !classe || !preco || !altura || !largura || !qntMetrosQuadrados) {
    window.api.showAlert(
      'Produto não foi salvo! revise todos os campos, incluindo a imagem e tente novamente'
    )
    return
  } else {
    const docRef = await addDoc(collection(db, 'products'), {
      docId,
      id,
      nome,
      classe,
      preco,
      altura: Number(altura),
      largura: Number(largura),
      qntMetrosQuadrados: Number(qntMetrosQuadrados),
      created,
      nameLowerCase,
      type
    })
    //Add a new document with a generated id.
    console.log('Document written with ID: ', docRef.id)
  }
}
export const handleAddItem = async ({
  docId,
  id,
  nome,
  preco,
  created,
  nameLowerCase,
  type,
  quantidade
}: productsProps): Promise<void> => {
  if (!id || !nome || !preco ) {
    window.api.showAlert(
      'Produto não foi salvo! revise todos os campos, incluindo a imagem e tente novamente'
    )
    return
  } else {
    const docRef = await addDoc(collection(db, 'products'), {
      docId,
      id,
      nome,
      preco,
      created,
      type,
      nameLowerCase,
      quantidade
    })
    //Add a new document with a generated id.
    console.log('Document written with ID: ', docRef.id)
  }
}

// realiza leitura simples, trazendo todos os dados
export const getData = (): Promise<productsProps[]> => {
  return new Promise((resolve, reject) => {
    getDocs(collection(db, 'products'))
      .then((querySnapshot) => {
        let listProducts = [] as productsProps[]
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
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
            })
            resolve(listProducts)
          } else {
            reject({ error: 'não deu certo meu chapa!!' })
          }
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// realiza a consulta e filtra limitando a 2 itens trazendo sempre o mais atual, meramente feedback ao usuário
export const getFilteredAndLimitedData = (): Promise<productsProps[]> => {
  return new Promise((resolve, reject) => {
    const productsRef = collection(db, 'products')
    const q = query(productsRef, orderBy('created', 'desc'), limit(2))
    getDocs(q)
      .then((querySnapshot) => {
        let listProducts = [] as productsProps[]
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
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
            })
            resolve(listProducts)
          } else {
            reject({ error: 'não deu certo meu chapa!!' })
          }
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}
