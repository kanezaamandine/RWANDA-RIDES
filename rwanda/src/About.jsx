import './about.css';
import { Shield } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Users } from 'lucide-react';
import { Car } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Calendar } from 'lucide-react';
import Logbar from './Logbar';





function Aboutus(){

    return(
       <div className='about'>
        <div className="white"> 
        <Logbar/>
            </div>
            <p className='aboutrr'> About Rwanda Rides</p>
            <p className='land'>Rwanda Rides is the first ride-sharing platfrom designed specifically for</p>
            <p className='landscape'>  Rwanda's unique trenasport landscape</p>
            <div className='local'> <div className='circle-1'> <Shield className='shield'/> </div>   <p className='ls'>Local safety</p><p className='lss'>Committed to providing safe <br /> and reliable transportation <br /> across Rwanda with verified <br /> drivers</p></div>
            <div className='focused'> <div className='circle-1'> <MapPin className='shield'/></div> <p className='rf'>Rwanda-Focused</p><p className='rff'>Committed to providing safe <br /> and reliable transportation <br /> across Rwanda with verified <br /> drivers</p></div>
            <div className='driven'><div className='circle-1'> <Users className='shield'/> </div> <p className='cd'>Community-Driven</p><p className='cdd'>Committed to providing safe <br /> and reliable transportation <br /> across Rwanda with verified <br /> drivers</p></div>
            <p className='aboutr'> How Rwanda Rides work</p>
            <div className='request'><div className='circle-2'>1</div><p className='s1'>Request</p><p className='req1'>Enter your pickup <br /> location and destin. </p></div>
            <div className='match'><div className='circle-2'>2</div><p className='s2'>Match</p> <p className='req2'>Get matched with a <br /> nearby verified driver  </p></div>
            <div className='ride'><div className='circle-2'>3</div><p className='s3'>Ride</p> <p className='req3'>Track your driver in real- <br /> time as they arrive  </p></div>
            <div className='pay'><div className='circle-2'>4</div><p className='s4'>Pay & Rate</p> <p className='req4'>Pay cash or card and rate <br /> your experience  </p></div>
            <p className='aboutrrr'> Why choose Rwanda Rides</p>
            <div className='circle-3'> <Car className='shield'/> </div><div className='let'><p className='letp'>Quality vehicles</p><p className='p1'> All our vehicles go under regular mantainance and <br /> safety checks to ensure a comfortable ride</p></div> 
            <div className='circle-4'> <Shield className='shield'/> </div><div className='let1'><p className='letpp'>Safety First</p><p className='p2'> Background-checked drivers, trip tracking, and 24/7 <br /> peace of mind </p></div> 
            <div className='circle-5'> <Clock className='shield'/> </div><div className='let2'><p className='letppp'>Fast Pickup Times</p><p className='p3'> Our extensive network of drivers ensures minimal <br /> waiting time across Rwanda</p></div> 
            <div className='circle-6'> <Calendar className='shield'/> </div><div className='let3'><p className='letpppp'>Flexible Payments</p><p className='p3'> Pay with cash or card - whatever is most <br /> convenient for you in Rwanda</p></div> 
            

       </div>
    );
}
export default Aboutus;