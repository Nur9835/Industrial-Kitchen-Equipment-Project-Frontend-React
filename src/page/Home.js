import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
       <Header />
       <div className="container mx-auto p-4 mt-4">
        <div className="flex flex-row  items-center">
          <div className="w-full md:w-1/2">
            <img src="cafe1.jpg" alt="Description" className=" ml-2 w-1/2 rounded-lg" />
            <br/>
          </div>
          <div className="w-full md:w-3/4">
          <img src="cafe3.jpg" alt="Description" className=" ml-2 w-3/4 rounded-lg" />
       
          </div>
        </div>
      </div>
   <Footer/>
  
    </div>

  )
}

export default Home
