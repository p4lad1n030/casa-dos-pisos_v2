import { StorageReference } from 'firebase/storage'

// src/components/header
export interface headerProps {
  consult?: boolean
  create?: boolean
  details?: boolean
  help?: boolean
  login?: boolean
  orcamento?: boolean
  pedido?: boolean
  end?: string;
  fone?: string
}
// src/shared/create.ts
export interface productsProps {
  docId: string
  id: string
  nome: string
  nameLowerCase: string
  classe?: string
  preco: number
  altura?: number
  largura?: number
  qntMetrosQuadrados?: number
  quantidade?: number
  created: Date
  type: string
}
// ./src/shared/redux/imgSlice.ts
export interface refProps {
  refStorage: string
}
// src/shared/redux/loginSlice.ts
export interface loginProps {
  userLogged: string
}
export interface userProps {
  userEmail: string
}
export interface pisosProps {
  val: number;
  id:string
}
export interface itensProps {
  val: number
  id: string
}
