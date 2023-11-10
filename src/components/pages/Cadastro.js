import CadastroTema from "../CadastroTema";
import WppBotao from "../WppBotao";

function Cadastro() {
  return (
    <div className="PageCadastro mb-12">
      <div className="tema">
        <h1 className="text-greeny justify-center text-7xl mb-0 mt-56">
          Cadastro
        </h1>
        <CadastroTema />
        <WppBotao />
      </div>
    </div>
  );
}

export default Cadastro;
