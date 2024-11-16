// import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import { refProps } from '../../types'
// import { RootState } from './store'
// import { StorageReference } from 'firebase/storage'


// const initialState: refProps = {
//   refStorage: null
    
  
// }

// export const refSlice = createSlice({
//   name: 'refStorage',
//   initialState,
//   reducers: {
//     addRefStorage(state, { payload }: PayloadAction<StorageReference>) {
//       state.refStorage = payload
//     },
//     clearRef(state) {
//       state.refStorage = null
//     }
//   }
// })

// // Action creators are generated for each case reducer function
// export const refFromStorage  = refSlice.reducer
// export const { addRefStorage, clearRef } = refSlice.actions

// export const refStorage = (state: RootState) => state.refStorage

// // como usar os dados e gravar

// // como gravar os dados no estado
// /*
// *
// import { useDispatch } from "react-redux";

// *
// const dispatch = useDispatch();

// *dispatch(nome-do-slice.actions(nome-do-objeto-modificado));
// */ 

// // como ler os dados do estado
// /*
// *import { useSelector } from "react-redux";

// *const islogged = useSelector(nome-do-slice.state)

// *console.log(islogged)

//  */