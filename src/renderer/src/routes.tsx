
/**segunda tentativa acumulou as rotas mudei todo o projeto pra v2 do electron-router 
1 solução passar mais de um router

*/

import { Router } from '../../lib/electron-router-dom'
import { Route } from 'react-router-dom'
import { Consult } from './screens/consult'
import { Create } from './screens/create'
import { Details } from './screens/details'
import { Help } from './screens/help'
import { Login } from './screens/login'
import { Orcamento } from './screens/orcamento'
import { Pedido } from './screens/pedido'
import Layout from './components/layout'
import Example from './screens/example'

const AppRoutes = () => {
  return (
    <>
      <Router main={
        <>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="create" element={<Create />} />
            <Route path="help" element={<Help />} />
            <Route path="consult" element={<Consult />} />
            <Route path="details/:id" element={<Details />} />
            <Route path="orcamento" element={<Orcamento />} />
            <Route path="pedido" element={<Pedido />} />
          </Route>

        </>
    } />
      
    </>
  )
}
export { AppRoutes }


//==========================================================
//**primeira tentativa acumulou as rotas /umaTela/outraTela */
/*
import { Router } from '../../lib/electron-router-dom'

import { Route } from 'react-router-dom'

import { Consult } from './screens/consult'
import { Create } from './screens/create'
import { Details } from './screens/details'
import { Help } from './screens/help'
import { Login } from './screens/login'
import { Orcamento } from './screens/orcamento'
import { Pedido } from './screens/pedido'
import Layout from './components/layout'

const Routes = () => {
  return (
    <Router
      main={
        <>
          <Route path='/' element={< Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/details' element={<Details />} />
          <Route path='/help' element={<Help />} />
          <Route path='/consult' element={<Consult />} />
          <Route path='/orcamento' element={<Orcamento />} />
          <Route path='/pedido' element={<Pedido />} />
        </>
           
      }
    />
  )
}

export default Routes
*/

