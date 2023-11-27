import LoginAdmin from "../LoginAdmin";
import WppBotao from "../WppBotao";


function Admin() {
    return (
        <div className="PageLogin mb-12">
          <div className="tema">
            <LoginAdmin />
            <WppBotao />
          </div>
        </div>
    );
}

export default Admin;
