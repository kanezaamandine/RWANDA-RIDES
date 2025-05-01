import React from 'react';
import Navbar from './Navbar';
import { Route, Routes} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Home from './Home.jsx';
import { LogIn } from 'lucide-react';
import Login from './Login.jsx';
import Authorization from './Auth.jsx';
import Authentication from './Authe.jsx';
import Aboutus from './About.jsx';
import Contacting from './Contact.jsx';



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
           
        </Routes>
    
   
    </>
  
  );
};

export default Index;