import LoginTema from "../LoginTema";
import WppBotao from "../WppBotao";

function Login() {
  return (
    <div className="PageLogin mb-12">
      <div className="tema">
        <LoginTema />
        <WppBotao />
      </div>
    </div>
  );
}

export default Login;
