// import { useTotalPedidosPisos } from './totalSlice';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { itensProps, pisosProps } from '../../types'

const pisos: pisosProps[] = []

export const totalSlicePisos = createSlice({
  name: 'totalPedidoPisos',
  initialState: {
    pisos
  },
  reducers: {
    isTotalPisos(state, { payload }: PayloadAction<pisosProps>) {
      state.pisos.push(payload)
    },
    clearTotalPisos(state, { payload }: PayloadAction<pisosProps>) {
      const index = state.pisos.findIndex((a) => a.val === payload.val)
      if (index !== -1) {
        state.pisos.splice(index, 1)
      }
      /*
      * solução parcial ele remove se tem itens com o valor 
      state.items = state.items.filter((a) =>  {return a.val != payload.val} )
      */
    },
    eraseTotalPisos(state) {
      state.pisos = []
    }
  }
})

export const stateTotalPisos = totalSlicePisos.reducer
export const { isTotalPisos, clearTotalPisos, eraseTotalPisos } = totalSlicePisos.actions
export const useTotalPisos = (state: RootState) => state.useTotalPisos


const itens: pisosProps[] = []

export const totalSliceItens = createSlice({
  name: 'totalPedidosItens',
  initialState: {
    itens
  },
  reducers: {
    isTotalItens(state, { payload }: PayloadAction<itensProps>) {
      state.itens.push(payload)
    },
    clearTotalItens(state, { payload }: PayloadAction<itensProps>) {
      const index = state.itens.findIndex((a) => a.val === payload.val)
      if (index !== -1) {
        state.itens.splice(index, 1)
      }

      //* solução parcial ele remove se tem itens com o valor
      //*state.items = state.items.filter((a) =>  {return a.val != payload.val} )
    },
    eraseTotalItens(state) {
      state.itens = []
    }
  }
})

export const stateTotalItens = totalSliceItens.reducer
export const { isTotalItens, clearTotalItens, eraseTotalItens } = totalSliceItens.actions
export const useTotalItens = (state: RootState) => state.useTotalItens

// como usar os dados e gravar

// como gravar os dados no estado
/*

const arr = Array.from(state.items)
       console.log(
         state.total.filter((_, index) => {
           index !== state.i
         })
       ) 
       console.log('state.filter :>> ', state.filter);
       state.total.splice(state.filter, 1)
      

       console.log('Índice a ser removido:', state.filter)
       Remova o item específico
       state.total.splice(state.filter, 1)
       console.log('Novo estado do total:', state.total)

         state.filter = payload

       console.log('Índice a ser removido:', state.filter)
        Remova o item específico
       state.total.splice(state.filter, 1)
       console.log('Novo estado do total:', state.total)
 console.log('index :>> ', index);
      
       state.total.splice(index, 1)
       console.log('dentro de clearTotal =>  index :>> ', index)
       console.log('index do clearTotal :>> ', index);
       console.log('state.total :>> ', state.total);
       state.total = state.total.filter((a, b, c) => { 
       b !== index
         console.log('a :>> ', a);
         console.log('b :>> ', b);
         console.log('c :>> ', c);
       })




*
import { useDispatch } from "react-redux";

*
const dispatch = useDispatch();

*dispatch(nome-do-slice.actions-exportado(nome-do-objeto-modificado));
*/

// como ler os dados do estado
/*
*import { useSelector } from "react-redux";

*const islogged = useSelector(nome-do-slice.state exportado)

*console.log(islogged)

 */
