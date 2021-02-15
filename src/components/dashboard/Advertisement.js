import React, { Fragment } from 'react'
const Advertisement = () => {
    return (
        <Fragment>
            <div className="col-sm-12 col-md-6 col-lg-3">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        
                    </div>
                    <div id="advertisements" className="card-body">
                        <div className="advertisement">
                            <img src='../../img/mujibborsho.jpg' alt="Agriculture"/>
                        </div>
                        <div className="advertisement">
                            <img src='../../img/quarterfinal.jpg' alt="Agriculture"/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Advertisement
