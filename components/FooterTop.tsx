import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react'
interface ContactItemData {
    title:string;
    subtitle:string;
    icon:React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Visit Us",
    subtitle: "Dhaka, Bangladesh",
    icon: (
      <MapPin className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Call Us",
    subtitle: "+1735696417",
    icon: (
      <Phone className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: (
      <Clock className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "arnob4allt@gmail.com",
    icon: (
      <Mail className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 border-b gap-8'>
        {data.map((item,index)=>(
          <div className='flex items-center gap-3 group hover:bg-gray-100 transition-colors py-3 px-2' key={index}>{item?.icon}
            <div>
              <h3 className='font-semibold text-gray-900 group-hover:text-black transition-color font-poppins hoverEffect'>{item?.title}</h3>
              <p className='font-semibold text-gray-600 mt-1 group-hover:text-gray-900 transition-color font-poppins hoverEffect'>{item?.subtitle}</p>
            </div>
          </div>
          
        ))}
    </div>
  )
}



export default FooterTop