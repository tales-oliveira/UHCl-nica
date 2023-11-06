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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Vestibulum vel auctor nisi. Phasellus tempor maximus eleifend.
        Aliquam erat volutpat. Donec ullamcorper tempus dolor et
        tincidunt. Cras ac justo dignissim, rutrum sapien in,
        efficitur nulla. Fusce leo risus, consequat et dictum ac,
        faucibus non nisl. Nam erat lacus, viverra ut semper nec,
        accumsan quis nisl. Phasellus sit amet bibendum enim. Aliquam
        tristique enim elit, vel viverra lectus hendrerit eu. Quisque
        ex mi, maximus sed nisl sit amet, luctus pellentesque tellus.
        Sed vehicula velit id cursus viverra. Quisque sagittis eget
        arcu id porttitor. Fusce sed nulla ligula. Nunc quis accumsan
        ante.
      </p>
      <p className="min-[200px]:w-[350px] lg:w-[1000px]">
        Vivamus lacinia aliquam tempor. Pellentesque viverra, sem quis
        laoreet vehicula, nibh sem iaculis lectus, efficitur venenatis
        felis sapien nec ante. Etiam sem nibh, consectetur sit amet
        lacinia eget, malesuada bibendum elit. Donec dapibus suscipit
        ipsum, scelerisque convallis elit hendrerit nec. Maecenas
        dignissim, tellus a semper sodales, eros arcu facilisis leo,
        eu venenatis ex metus quis turpis. Nam volutpat diam et nibh
        suscipit placerat. Fusce rutrum quis dolor tincidunt posuere.
        Praesent a vestibulum velit. Etiam sem ligula, laoreet sed
        ullamcorper vel, eleifend accumsan erat. Integer tempus
        consectetur pellentesque. Nunc efficitur felis vel pharetra
        sollicitudin. Nam vehicula orci arcu, vitae porttitor augue
        tempus sodales. Morbi bibendum nunc at euismod placerat.
      </p>
      <button onClick={handleClick} className="bg-greeny w-[250px] h-[40px] rounded-full mt-4 hover:bg-black text-white text-2xl">
        Ver Mais
      </button>
    </section>
  );
}

export default SobreNosSection;
