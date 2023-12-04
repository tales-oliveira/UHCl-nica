import React from "react";
import { useNavigate } from 'react-router-dom';


function SobreNosSection() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/sobrenos');
  };
  
  return (
    <section className="flex flex-col text-justify justify-center items-center w-screen mt-12 mb-12">
      <h1 className="text-greeny text-7xl mb-12">Sobre Nós</h1>
      <p className="mb-8 first-letter:text-5xl first-letter:text-greeny w-[350px] lg:w-[1000px]">
        {" "}
        A UH Clínica é uma instituição comprometida com a excelência em cuidados médicos e bem-estar. 
        Nossa equipe é formada por profissionais altamente qualificados, dedicados a proporcionar atendimento compassivo e 
        personalizado a todos os nossos pacientes. Com uma abordagem centrada no paciente, buscamos oferecer serviços de saúde de 
        alta qualidade, utilizando as mais recentes inovações e práticas baseadas em evidências. Nosso objetivo é promover a saúde 
        e o conforto, garantindo um ambiente acolhedor e seguro para todos que confiam em nossos cuidados.
      </p>
      <button onClick={handleClick} className="bg-greeny w-[250px] h-[40px] rounded-full mt-4 hover:bg-black text-white text-2xl">
        Ver Mais
      </button>
    </section>
  );
}

export default SobreNosSection;
