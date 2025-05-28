import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Home from './Home.jsx';
import Authorization from './Auth.jsx';
import Authentication from './Authe.jsx';
import Aboutus from './About.jsx';
import Contacting from './Contact.jsx';
import BookRide from './BookTicket.jsx';
import DriverPortal from './DriverPortal.jsx';
import RideTracking from './RideTracking.jsx';
import OrganizationPortal from './OrganizationPortal.jsx';




const Index = () => {
  return (
  <>
 
    
        <Routes>
            <Route  path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/auth' element= {<Authorization />}/>
            <Route path= '/authe' element= {<Authentication/>}/>
            <Route path='/about' element= {<Aboutus/>}/>
            <Route path='/contact' element= {<Contacting/>}/>
            <Route path='/book' element= {<BookRide/>}/>
            <Route path='/driver' element= {<DriverPortal/>}/>
            <Route path='/rider' element= {<RideTracking/>}/>
            <Route path='/organize' element= {<OrganizationPortal/>}/>
            
           
           
        </Routes>
    
   
    </>
  
  );
};

export default Index;