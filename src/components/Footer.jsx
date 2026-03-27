import React from 'react'

const Footer = () => {
  return (
    <div>
                <section class="row bg-warning p-19"> 
            {/* <!-- child 1  --> */}
             <div class="col-md-4">
                <h2 class="text-center text-white">About us</h2>
                <p class="text-white">Our shop has every electronic appliances that one desires. We are always opened from 7:00 am-6:00pm on weekdays. Come one come all.!!!</p>
             </div>
             {/* <!-- child 2  --> */}
              <div class="col-md-4">
                <h2 class="text-center text-white">Contact us</h2>
                <form action="">
                    <input type="email" placeholder="enter your email" class="form-control"/><br/>
                        <textarea name="" id="" cols="30" rows="10" class="form-control" placeholder="Leave a comment"></textarea><br/>
                    <input type="submit" value="Send message" class="btn btn-outline-danger"/>
                </form>
              </div>
              {/* <!-- child 3  --> */}
               <div class="col-md-4">

                   <h2 class="text-center text-white">Stay connected</h2>
                   <a href="https://Facebook.com">
                    <img src="images/fb.png" alt="Facebook"/>
                   </a>
                   <a href="https://Instagram.com">
                    <img src="images/in.png" alt="Instagram"/>
                   </a>
                   <a href="https://twitter.com">
                    <img src="images/x.png" alt="x"/>
                   </a>
                   <p class="text-white">You can find us on any of the platforms @Tumaini collections ke</p>
               </div>
        </section>
    </div>
  )
}

export default Footer