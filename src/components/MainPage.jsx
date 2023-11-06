import React from "react";

function MainPage() {
  return (
    <section className="bg-imagemHome flex flex-col w-screen h-screen justify-center items-center md:justify-center md:items-center lg:flex-row lg:justify-center lg:items-center">
      <div className="flex flex-col justify-center mt-0 md:items-center lg:mt-0 lg:ml-32 md:mt-0 ">
        <h1 className="text-white font-bold text-3xl text-center lg:text-7xl md:text-4xl md:text-center lg:w-[550px] lg:text-left lg:mb-12 lg:mt-0">
          TRANSFORME SUA SAÚDE!
        </h1>
        <a href="https://api.whatsapp.com/send?phone=5535991961612">
          <button className="bg-greeny w-[300px] h-[70px] rounded-full mt-4 hover:bg-black text-white text-2xl ml-10 lg:ml-0 lg:mt-0">
            AGENDE AGORA
          </button>
        </a>
      </div>
      <div>
        <h2 className="text-white w-[300px] md:text-center text-2xl mt-10 text-left md:ml-0 lg:mt-0 lg:text-4xl lg:w-[450px] lg:ml-36">
          Com nossa equipe especializada e técnicas comprovadas,
          ajudamos você a superar todos os seus problemas!
        </h2>
      </div>
    </section>
  );
}

export default MainPage;

