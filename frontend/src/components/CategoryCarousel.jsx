import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Fronted Developer",
  "Backend Developer",
  " Graphic Developer",
  "Full stack developer",
  "content writer"
];

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler =  (query)=>{
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }
  return (
    <div>
      <Carousel className="mx-auto w-full max-w-xl my-20">
        <CarouselContent >
          {category.map((item, index) => (
            <CarouselItem className="md:basis-1/2 lg-basis-1/3"  key={index}>
              <Button  onClick={searchJobHandler} variant="outline" className="bg-black text-white"  >{item}</Button>
            </CarouselItem>
          ))}

          
        </CarouselContent>
       <CarouselPrevious/>
       <CarouselNext/>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;

