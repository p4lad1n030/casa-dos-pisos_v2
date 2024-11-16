import { headerProps } from "../../types";
import programar from "../../assets/logoBranco.png";
import casa from "../../assets/casa_sm.png";
import atacadao from "../../assets/atacadaosm.png";
import styles from '../../styles/mediaPrint.module.css';
import { useSelector } from "react-redux";
import { useloginSlice } from "../../shared/redux/loginSlice";
import { CLIENTE_ATACADAO_DOS_PISOS, CLIENTE_CASA_DOS_PISOS } from "../../shared";
import { FaWhatsapp } from "react-icons/fa6";


const Index = ({ consult, create, details, help, login, orcamento, pedido, end, fone }: headerProps) => {
  const { userLogged } = useSelector(useloginSlice)


  return (

    <header className={`w-screen mx-auto -ml-4 bg-red  bg-vm flex justify-between px-1 items-center overflow-hidden shadow-s z-10 h-[50px] ${styles.bg_print}`}>
      {/* tela de login */}
      {login &&
        <img src={programar} alt="" className=" w-[98px]  " />
      }
      {login &&
        <h1 className="font-title text-2xl  font-extrabold mr-1 text-white">Acesso</h1>
      }

      {/* tela de cadastro */}
      {create && userLogged == CLIENTE_CASA_DOS_PISOS &&
        <img src={casa} alt="" className="   " />
      }
      {create && userLogged == CLIENTE_ATACADAO_DOS_PISOS &&
        <img src={atacadao} alt="" className=" " />
      }
      {create &&
        <h1 className="font-title text-2xl  font-extrabold mr-1 text-white">Cadastro de Produtos</h1>
      }
      {/* tela de pesquisa */}
      {consult && userLogged == CLIENTE_CASA_DOS_PISOS &&
        <img src={casa} alt="" className="  w-[198px]" />
      }
      {consult && userLogged == CLIENTE_ATACADAO_DOS_PISOS &&
        <img src={atacadao} alt="" className=" w-[198px]  " />
      }
      {consult && <h1 className="font-title text-2xl  font-extrabold mr-1 text-white">Consultar Estoque</h1>
      }
      {/* tela de detalhes */}
      {details && userLogged == CLIENTE_CASA_DOS_PISOS &&
        <img src={casa} alt="" className=" w-[198px]  " />
      }
      {details && userLogged == CLIENTE_ATACADAO_DOS_PISOS &&
        <img src={atacadao} alt="" className=" w-[198px]  " />
      }
      {details && <h1 className="font-title text-2xl  font-extrabold mr-1 text-white">Detalhes do Produto</h1>
      }
      {/* tela de ajuda */}
      {help &&
        <img src={programar} alt="" className=" w-[98px]  " />
      }
      {help &&
        <h1 className="font-title text-2xl  font-extrabold mr-1 text-white">Ajuda</h1>
      }

      {/* tela de orçamento */}
      {orcamento && userLogged == CLIENTE_CASA_DOS_PISOS &&
        <img src={casa} alt="" className=" w-[198px]  " />
      }
      {orcamento && userLogged == CLIENTE_ATACADAO_DOS_PISOS &&
        <img src={atacadao} alt="" className=" w-[198px]  " />
      }
      {
        orcamento && <div className="flex flex-col w-full justify-evenly items-center ">
          <h3 className="text-white font-title text-sm print:text-sml ">{end}</h3>
          <div className="flex justify-center items-center gap-2">
            <h3 className="text-white font-title text-sm ">{fone}</h3>
            <FaWhatsapp className="text-white"/>
          </div>

        </div>

      }
      {orcamento && <h1 className="font-title text-2xl  font-extrabold mr-1 text-white">Orçamento</h1>
      }

      {/* tela de pedido */}
      {pedido && userLogged == CLIENTE_CASA_DOS_PISOS &&
        <img src={casa} alt="" className=" w-[198px]  " />
      }
      {pedido && userLogged == CLIENTE_ATACADAO_DOS_PISOS &&
        <img src={atacadao} alt="" className=" w-[198px]  " />
      }

      {
        pedido && <div className="flex flex-col w-full justify-evenly items-center ">
          <h3 className="text-white font-title text-sm print:text-sml ">{end}</h3>
          <div className="flex justify-center items-center gap-2">
            <h3 className="text-white font-title text-sm ">{fone}</h3>
            <FaWhatsapp className="text-white" />
          </div>
        </div>
      }

      {
        pedido && <h1 className="font-title text-2xl  font-extrabold mr-1 text-white">Pedido</h1>
      }
      
    </header>

  );
}

export default Index;

