import LoginTema from "../LoginTema";
import WppBotao from "../WppBotao";

function Login() {
  return (
    <div className="PageLogin mb-12">
      <div className="tema">
        <h1 className="text-greeny justify-center text-7xl mb-12 mt-56">
          Log in
        </h1>
        <LoginTema />
        <WppBotao />
      </div>
    </div>
  );
}

export default Login;
