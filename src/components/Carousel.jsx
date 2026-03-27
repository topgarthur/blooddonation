import React from 'react'

const Carousel = () => {
  return (
           <section class="row">
            <div class="col-md-12">
                {/* <!-- a division of maintaining carousel content  --> */}
                 <div class="carousel slide" id="mycarousel" data-bs-ride="carousel">
                    {/* <!-- division containing images  --> */}
                     <div class="carousel-inner">
                        {/* <!-- div with image 1  --> */}
                          <div className="carousel-item active">
                            <img
                              src="images/4.jpeg"
                              className="d-block w-100"
                              alt="streetwear drip" style={{height:'500px', width:"100%"}}
                            />

                            
                          </div>
                         {/* <!-- div with image 2  --> */}
                          <div className="carousel-item">
                            <div className="text-slide d-flex align-items-center justify-content-center">
                                  
                               <div className="text-center">
                                  <img src="images/1.png" alt="" style={{height:'500px', width:"100%"}} />
                                  <button className="btn btn-primary mt-3 px-4">Shop Now</button>
                                  </div>

                                </div>
                              </div>
                          {/* <!-- div with image 3  --> */}
                           <div className="carousel-item">
                            <img src="images/2.png" alt="" style={{height:'500px', width:"100%"}} />

                          </div>
                          
                           </div>
                           <div className="carousel-item">
                            <img src="images/3.png" alt="" style={{height:'500px', width:"100%"}} />

                          </div>
                          
                           
                     {/* <!-- previous control  --> */}
                      <a href="#mycarousel" class="carousel-control-prev"data-bs-slide="prev">
                        <span class="carousel-control-prev-icon bg-danger"></span>
                      </a>
                      {/* <!-- next control  --> */}
                       <a href="#mycarousel" class="carousel-control-next"data-bs-slide="next">
                        <span class="carousel-control-next-icon bg-danger"></span>
                       </a>
                 </div>
            </div>
          </section>
  )
}

export default Carousel