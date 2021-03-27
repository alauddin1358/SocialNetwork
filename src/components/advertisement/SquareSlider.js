import React from 'react'
const Slide = ({image}) => {
    const imageStyle = {
        height: "200px",
        width: "200px",
        padding: "0px",
        margin: "0px",
        fontSize: "100px"
    }
    //console.log('Image in Squareslider', image);
    return (
      <React.Fragment>
      {
        image === null ? null : <img src={image.filedata} style={imageStyle} alt="Sliderr_image" />
      }
      </React.Fragment>
    );
  };
const SquareSlider = ({advertise}) => {
  //console.log('Adv = ', advertise);
    const [currentSlide, setCurrentSlide] = React.useState(0);
    React.useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentSlide((prev) => {
          return prev + 1 === advertise.length ? 0 : prev + 1;
        });
      }, 5000);
      return () => {
        clearInterval(intervalId);
      };
    }, [advertise.length]);
    return (
      <React.Fragment>
      {
        advertise.length > 0 ? <Slide image={advertise[currentSlide]} /> : null
      }
      </React.Fragment>
    );
  };
export default SquareSlider
  