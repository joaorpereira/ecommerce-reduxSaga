import React from 'react'
import Carousel from 'react-material-ui-carousel'
import * as S from "./styled";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

function CarouselSlide({products}) {

  return (
    <Carousel
      NextIcon={<ArrowForwardIosIcon />}
      PrevIcon={<ArrowBackIosIcon />}
      interval={7000}
      animation={'slide'}
      navButtonsAlwaysInvisible={true}
    >
      {products.map((item, i) => (
        <div key={i} item={item}>
          <S.StyledPaper elevation={0}>
            <S.Image src={item.image}/>
            <p>{item.name}</p>
          </S.StyledPaper>
        </div>
      ))}
    </Carousel>
  )
}

export default CarouselSlide
