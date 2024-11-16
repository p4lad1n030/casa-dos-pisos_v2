import { collection, endAt, getDocs, limit, orderBy, query, startAt, where } from "firebase/firestore"
import { productsProps } from "../types"
import { db } from "../services"

export const getFilteredAndLimitedData = (search: string): Promise<productsProps[]> => {
  return new Promise((resolve, reject) => {
    const productsRef = collection(db, 'products')
    const q = query(
      productsRef,
      orderBy('nameLowerCase'),
      startAt(search),
      endAt(search + '\uf8ff')
    )
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
              quantidade: doc.data().quantidade,
              qntMetrosQuadrados: doc.data().qntMetrosQuadrados,
              created: doc.data().created,
              type:doc.data().type
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
