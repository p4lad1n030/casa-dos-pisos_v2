import { Link } from "react-router-dom";
import  styles  from '../../styles/mediaPrint.module.css';
import { useDispatch } from "react-redux";
import { eraseTotalItensOrc, eraseTotalPisosOrc } from "../../shared/redux/orcamentoSlice";
import { eraseTotalItens, eraseTotalPisos } from "../../shared/redux/totalSlice";


const Index = () => {
  const dispatch = useDispatch()
  return (
    <>
      <footer className={`bg-vm h-12 rounded  ${styles.hide_print} `}>
        <nav className=" p-2   flex justify-between w-full text-white ">

          <Link className="my-1 font-title font-bold hover:text-[#FFD9D9]" to="/create" onClick={() => {
            dispatch(eraseTotalItensOrc())
            dispatch(eraseTotalPisosOrc())
            dispatch(eraseTotalItens())
            dispatch(eraseTotalPisos())
          }}>Cadastro</Link>
          <Link className="my-1 font-title font-bold hover:text-[#FFD9D9]" to="/consult" onClick={() => {
            dispatch(eraseTotalItensOrc())
            dispatch(eraseTotalPisosOrc())
            dispatch(eraseTotalItens())
            dispatch(eraseTotalPisos())
          }}>Consulta</Link>
          <Link className="my-1 font-title font-bold hover:text-[#FFD9D9]" to="/help" onClick={() => {
            dispatch(eraseTotalItensOrc())
            dispatch(eraseTotalPisosOrc())
            dispatch(eraseTotalItens())
            dispatch(eraseTotalPisos())
          }}>Ajuda</Link>
          <Link className="my-1 font-title font-bold hover:text-[#FFD9D9]" to="/orcamento" onClick={() => {
            dispatch(eraseTotalItensOrc())
            dispatch(eraseTotalPisosOrc())
            dispatch(eraseTotalItens())
            dispatch(eraseTotalPisos())
          }}>Orçamento</Link>
          <Link className="my-1 font-title font-bold hover:text-[#FFD9D9]" to="/pedido" onClick={() => {
            dispatch(eraseTotalItensOrc())
            dispatch(eraseTotalPisosOrc())
            dispatch(eraseTotalItens())
            dispatch(eraseTotalPisos())
          }}>Pedido</Link>

        </nav>
      </footer>
    </>
  );
}

export default Index;
