import React, { Fragment } from 'react'
import RectangleSlider from '../advertisement/ImageSlider';
import SquareSlider from '../advertisement/SquareSlider';
const Advertisement = () => {
    return (
        <Fragment>
            <div className="col-sm-12 col-md-6 col-lg-3">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        
                    </div>
                    <div id="advertisements" className="card-body">
                        <div className="video-advert">
                            <i className="fas fa-video" style={{ fontSize:"180px"}}></i>
                        </div>
                        <div className="advertisement">
                            <RectangleSlider />
                        </div>
                        <div className="small-advert">
                            <SquareSlider />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Advertisement
