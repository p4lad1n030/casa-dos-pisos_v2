import { addDoc, doc } from "firebase/firestore"
import { db } from "../services"

export const getData = async (
  docId: string,
  nome: string,
  preco: number,
  type: string,
  quantidade: number,
  qntMetrosQuadrados: number
) => {
  console.log(
    docId,
    nome,
    preco,
    type,
    quantidade ? quantidade : 'NA',
    qntMetrosQuadrados ? qntMetrosQuadrados : 'NA'
  )
  return {
    docId,
    nome,
    preco,
    type,
    quantidade ,
    qntMetrosQuadrados 
  }
  // const productRef = doc(db, 'products', docId as string)
  // console.log('productRef :>> ', productRef)
  // const docRef = await addDoc(_, _)
}
