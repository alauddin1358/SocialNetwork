import React, { useState, useEffect, useRef } from 'react'
import { css, jsx } from '@emotion/react'
import SliderContent from './SliderContent'
import Slide from './Slide'
// import Arrow from './Arrow'
// import Dots from './Dots'

const getWidth = () => window.innerWidth

/**
 * @function Slider
 */
const Slider = props => {
  //console.log(props.slides);
  //console.log(getWidth());
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45
  })
  const { translate, transition, activeIndex } = state
  const autoPlayRef = useRef()

  useEffect(() => {
    autoPlayRef.current = nextSlide
  })

  useEffect(() => {
    const play = () => {
      autoPlayRef.current()
    }

    if (props.autoPlay !== null) {
      const interval = setInterval(play, props.autoPlay * 1000)
      return () => clearInterval(interval)
    }
  }, [props.autoPlay])

  const nextSlide = () => {
    if (activeIndex === props.slides.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * 200
    })
  }

  // const prevSlide = () => {
  //   if (activeIndex === 0) {
  //     return setState({
  //       ...state,
  //       translate: (props.slides.length - 1) * getWidth(),
  //       activeIndex: props.slides.length - 1
  //     })
  //   }

  //   setState({
  //     ...state,
  //     activeIndex: activeIndex - 1,
  //     translate: (activeIndex - 1) * getWidth()
  //   })
  // }

  return (
    <div css={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={200 * props.slides.length}
      >
        {props.slides.map((slide, i) => (
          <img src={process.env.PUBLIC_URL + '/img/'+slide} key={slide + i} alt="Agriculturist Logo"/>
          /* <Slide key={slide + i} content={slide} />  */
        ))}
      </SliderContent>

      {/* {!props.autoPlay && (
        <>
          <Arrow direction="left" handleClick={prevSlide} />
          <Arrow direction="right" handleClick={nextSlide} />
        </>
      )}

      <Dots slides={props.slides} activeIndex={activeIndex} /> */}
    </div>
  )
}

Slider.defaultProps = {
  slides: [],
  autoPlay: null
}

const SliderCSS = css`
  position: relative;
  height: 50vh;
  width: 50vw;
  margin: 0 auto;
  overflow: hidden;
`

export default Slider