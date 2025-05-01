import './contact.css';
import Navbar from './Navbar';
import { Mail, Phone, MapPin } from 'lucide-react';
// import { HelpCircle } from 'lucide-react';
import { LineChart } from 'lucide-react';
import { MessageCircle } from 'lucide-react';





function Contacting(){

    return(
        <>
       
        <div className='bby'>

            <div className='white'> <Navbar/></div>
            <p className='cont'> Have questions or need assistance? We're here to help!</p>
            <div className='con'> <p className='conif'> Contact information </p> <div className='circle-10'> <Mail className='shield'/> </div> <div className='circle-11'> <Phone className='shield'/> </div> <div className='circle-12'><MapPin className='shield'/> </div></div>
            <div className='small-con'> <p className='conif'> Help Resources</p>   <div className='con-in'> <div className='circle-15'> ?</div> <p className='faq'>FAQ & Help center</p> </div><div className='con-ins'> <MessageCircle className='circle-17'/>  </div>
            <div className='big-con'> <p className='conifs'> Send us a message</p> </div> </div>
            
        </div>
        
        </>
    );
}

export default Contacting;