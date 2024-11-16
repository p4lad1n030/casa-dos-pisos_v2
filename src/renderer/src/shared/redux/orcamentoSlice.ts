
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { itensProps, pisosProps } from '../../types'

const pisos: pisosProps[] = []

export const totalSlicePisosOrc = createSlice({
  name: 'totalPedidoPisosOrc',
  initialState: {
    pisos
  },
  reducers: {
    isTotalPisosOrc(state, { payload }: PayloadAction<pisosProps>) {
      state.pisos.push(payload)
    },
    clearTotalPisosOrc(state, { payload }: PayloadAction<pisosProps>) {
      const index = state.pisos.findIndex((a) => a.val === payload.val)
      if (index !== -1) {
        state.pisos.splice(index, 1)
      }
      /*
      * solução parcial ele remove se tem itens com o valor 
      state.items = state.items.filter((a) =>  {return a.val != payload.val} )
      */
    },
    eraseTotalPisosOrc(state) {
      state.pisos = []
    }
  }
})

export const stateTotalPisosOrc = totalSlicePisosOrc.reducer
export const { isTotalPisosOrc, clearTotalPisosOrc, eraseTotalPisosOrc } = totalSlicePisosOrc.actions
export const useTotalPisosOrc = (state: RootState) => state.useTotalPisosOrc

const itens: pisosProps[] = []

export const totalSliceItensOrc = createSlice({
  name: 'totalPedidosItensOrc',
  initialState: {
    itens
  },
  reducers: {
    isTotalItensOrc(state, { payload }: PayloadAction<itensProps>) {
      state.itens.push(payload)
    },
    clearTotalItensOrc(state, { payload }: PayloadAction<itensProps>) {
      const index = state.itens.findIndex((a) => a.val === payload.val)
      if (index !== -1) {
        state.itens.splice(index, 1)
      }

      //* solução parcial ele remove se tem itens com o valor
      //*state.items = state.items.filter((a) =>  {return a.val != payload.val} )
    },
    eraseTotalItensOrc(state) {
      state.itens = []
    }
  }
})

export const stateTotalItensOrc = totalSliceItensOrc.reducer
export const { isTotalItensOrc, clearTotalItensOrc, eraseTotalItensOrc } = totalSliceItensOrc.actions
export const useTotalItensOrc = (state: RootState) => state.useTotalItensOrc

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
