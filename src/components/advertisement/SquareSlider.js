import React from 'react'
const Slide = (props) => {
    //console.log(props);
    // const btnContainer = {
    //   display: "inline-block",
    //   float: "right"
    // };
    // const btn = {
    //   border: "none",
    //   background: "blue",
    //   color: "white",
    //   fontSize: "22px",
    //   padding: "5px 10px",
    //   borderRadius: "10px",
    //   margin: "0 10px"
    // };
    const imageStyle = {
        height: "200px",
        width: "200px",
        padding: "0px",
        margin: "0px",
        fontSize: "100px"
    }
    return (
      <React.Fragment>
        <img src={process.env.PUBLIC_URL+'/img/'+props.image} style={imageStyle} alt="Sliderr_image" />
        {/* <h1>
          {props.image.title}
          <span style={btnContainer}>
            <button style={btn} onClick={props.slidePrev}>
              {"<"} Prevs
            </button>
            |
            <button style={btn} onClick={props.slideNext}>
              {">"} Next
            </button>
          </span>
        </h1> */}
      </React.Fragment>
    );
  };
const SquareSlider = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const slides = [
        "mujibborsho.jpg",
        "quarterfinal.jpg",
        "green-bg-1.jpg"
    ];
    // const slideNext = (e) => {
    //   setCurrentSlide((prev) => {
    //     return prev + 1 === slides.length ? 0 : currentSlide + 1;
    //   });
    // };
    // const slidePrev = (e) => {
    //   setCurrentSlide((prev) => {
    //     return prev === 0 ? slides.length - 1 : currentSlide - 1;
    //   });
    // };
    React.useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentSlide((prev) => {
          return prev + 1 === slides.length ? 0 : prev + 1;
        });
      }, 5000);
      return () => {
        clearInterval(intervalId);
      };
    }, [slides.length]);
    return (
      <React.Fragment>
        {/* <h1>
          React Slider{" "}
          <small>
            <em>(we have {slides.length} slides)</em>
          </small>
        </h1> */}
        <Slide
          image={slides[currentSlide]}
        //   slideNext={slideNext}
        //   slidePrev={slidePrev}
        />
      </React.Fragment>
    );
  };
export default SquareSlider
  