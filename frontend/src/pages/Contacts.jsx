import React from 'react';
import emailLogo from "../images/gmail.png";
import instagramLogo from "../images/Instagram.png";
import phoneLogo from "../images/Phone.png";
import telegramLogo from "../images/telegram.png";
import "../styles/contacts.css"
const Contacts = () => {
  return (
    <div className='contacts-container'>
        <div className='bold contact-text-header'>
        Контакти
        </div>
        <div className='contact-text'>
            Зв'яжіться з нами та приходьте до нас<br/>
            Ми завжди відкриті до співпраці та готові відповісти на будь-які ваші запитання. 
            Якщо у вас є ідеї, пропозиції або запити про наші послуги, будь ласка, зв'яжіться з нами за допомогою наведених нижче контактних даних.
            Наша команда з радістю допоможе вам у вирішенні будь-яких питань.
            Ви можете завітати до нас за цією адресою. Ми працюємо з 9:00 до 17:00 в усі дні крім неділі.
        </div>
        <div className='contacts-main-container'>
        <div>
            <div>
                <div className='teamText1'>
                    <div  className="man teamText1">
                        <img className="a2"  src={emailLogo} alt=""/>
                    </div>
                    Електронка: <a href="mailto:pavelchukmaks2204@gmail.com">pavelchukmaks2204@gmail.com</a>
                </div>
                <div className='teamText1'>
                    <div  className="man teamText1">
                        <img className="a2"  src={phoneLogo} alt=""/>
                    </div>
                    Телефон:+0966913432
                </div>
                <div className='teamText1'>
                    <div  className="man teamText1">
                        <img className="a2" src={telegramLogo} alt=""/>
                    </div>
                    Телеграм: <a href="https://t.me/Kleshnenosec">@Kleshnenosec</a>
                </div>
                <div className='teamText1'>
                    <div  className="man teamText1">
                        <img className="a2"  src={instagramLogo} alt=""/>
                    </div>
                    Інстаграм: <a href="https://www.instagram.com/m_pavelchuk/">@m_pavelchuk</a>
                </div>
            </div>
            <div className='contact-text2'>
            Не соромтеся звертатися до нас! Ми завжди раді спілкуванню з вами.
            </div>
        </div>
        <div>
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d682.0908718504327!2d32.010993!3d46.8562188!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c5cd4d56048a5f%3A0xd099f41e8056ad35!2z0JHRltCx0LvRltC-0YLQtdC60LAg4oSWMTg!5e0!3m2!1suk!2sua!4v1713276269997!5m2!1suk!2sua"
            width="600" 
            height="450" 
            style={{border:0, marginLeft:"30px"}}
            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        </div>

    </div>
  );
};

export default Contacts;
