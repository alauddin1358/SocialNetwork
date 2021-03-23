import React, { Fragment } from 'react'
import Slider from '../advertisement/ImageSlider';
const Advertisement = () => {
    return (
        <Fragment>
            <div className="col-sm-12 col-md-6 col-lg-3">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        
                    </div>
                    <div id="advertisements" className="card-body">
                        <div className="advertisement">
                            <Slider />
                        </div>
                        <div className="advertisement">
                            <Slider />
                        </div>
                        <div className="advertisement">
                            <Slider />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Advertisement
