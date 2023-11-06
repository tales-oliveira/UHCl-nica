import React, { useState } from "react";
import CardSobreNos from "./Card_SobreNos";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

const CarouselSobreNos = ({ cards }) => {
  const [currentCard, setCurrentCard] = useState(0);

  const handleNext = () => {
    setCurrentCard((currentCard + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentCard((currentCard - 1 + cards.length) % cards.length);
  };

  return (
    <div>
      <div className="flex flex-row justify-center items-center  w-screen">
        <button
          className="prev-button text-black text-7xl"
          onClick={handlePrev}
        >
          <BiLeftArrow />
        </button>
        <div>
          {cards
            .slice(currentCard, currentCard + 1)
            .map((card, index) => (
              <CardSobreNos
                key={index}
                imagePath={card.imagePath}
              />
            ))}
        </div>
        <button
          className="prev-button text-black text-7xl"
          onClick={handleNext}
        >
          <BiRightArrow />
        </button>
      </div>
    </div>
  );
};

export default CarouselSobreNos;
