import MainPageSobreNos from "../MainPage_SobreNos";
import TextSobreNos from "../TextSobreNos_SobreNos";
import CarouselSobreNos from "../Carousel_SobreNos";
import imageCarouselSobreNos from '../img/carrouselSobreNos.png'
import imageConsultorio1 from '../img/imgConsultorio1.png'
import imageConsultorio2 from '../img/imgConsultorio2.png'
import imageConsultorio3 from '../img/imgConsultorio3.png'
import WppBotao from '../WppBotao';


const cards = [
  {
    imagePath: imageCarouselSobreNos,
  },
  {
    imagePath: imageConsultorio1,
  },
  {
    imagePath: imageConsultorio2,
  },
  {
    imagePath: imageConsultorio3,
  },
  
  // Outros cards...
];

function SobreNos (){
    return (
        <div className="PageSobreNos">
          <MainPageSobreNos />
          <TextSobreNos />
          <CarouselSobreNos cards={cards}/>
          <WppBotao />
        </div>
      );
    }

export default SobreNos