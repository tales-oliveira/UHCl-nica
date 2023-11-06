import React, { useState } from "react";
import {BiRightArrow, BiLeftArrow} from "react-icons/bi";
import Card from "./Card";

const Carousel = ({ cards }) => {
  const [currentCard, setCurrentCard] = useState(0);

  const handleNext = () => {
    setCurrentCard((currentCard + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentCard((currentCard - 1 + cards.length) % cards.length);
  };

  return (
    <div className="bg-greeny">
      <div>
        <h1 className="mt-8 flex justify-center items-center text-white text-7xl pt-10 min-[200px]:text-4xl">NOSSOS MÉDICOS</h1>
      </div>
      <div className="flex flex-row justify-center items-center bg-greeny w-screen h-[500px]">
        <button
          className="prev-button text-white text-7xl mr-10"
          onClick={handlePrev}
        >
          <BiLeftArrow/>
        </button>
        <div className="flex space-x-4">
          {cards
            .slice(currentCard, currentCard + 3)
            .map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                imagePath={card.imagePath}
              />
            ))}
        </div>
        <button
          className="prev-button text-white text-7xl ml-10"
          onClick={handleNext}
        >
          <BiRightArrow/>
        </button>
      </div>
    </div>
  );
};

export default Carousel;