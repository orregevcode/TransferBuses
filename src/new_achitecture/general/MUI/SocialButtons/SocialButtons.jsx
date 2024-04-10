import React from 'react'
import './SocialButtons.css'
import { FaWhatsapp, FaPhoneAlt, FaTelegramPlane, FaViber} from 'react-icons/fa'
// import FacebookMessenger from './facebookmessenger.svg'


export default function SocialButtons() {
    return (
        <div className='social-wrapper'>

            <a href='https://wa.me/972545779239' className={"social-button whats-but"} rel="noreferrer" target='_blank'><FaWhatsapp className='whatsapp' /></a>
            

            <a href="https://telegram.me/rmant7" className={"social-button teleg-but"} rel="noreferrer" target='_blank'><FaTelegramPlane className='telegram' /></a>

            <a href='tel:+972545779239' className={"social-button phone-but"}><FaPhoneAlt className='phone' /></a>


            {/* <a href="https://www.messenger.com/t/rmant7" rel="noreferrer" target='_blank'><img src={FacebookMessenger} className='facebook' alt='facebook messenger icon' /></a> */}
{/* 
            <a href="viber://chat?number=+972545779239" rel="noreferrer" target='_blank'><FaViber className='viber' /></a> */}

            <a href="viber://chat?number=%2B972545779239" className={"social-button viber-but"} rel="noreferrer" ><FaViber className='viber'/></a>

            
        </div>
    )
}
