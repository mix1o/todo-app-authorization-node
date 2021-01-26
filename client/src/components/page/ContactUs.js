import React,{useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import Popup from '../loginComponents/Popup'
import {useHistory,Link} from 'react-router-dom';

const ContactUs = () => {

  const [message,setMessage] = useState("");
  const [userData, setUserData] = useState({
    Subject: '',
    Email: '',
    Message: '',
  });

  const handlerInput = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setUserData({ ...userData, [name]: value });
  };

  const history = useHistory();

  const sendMessage = () => {
    fetch("/api/message", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(json => {
      setMessage(json);
      if(json.correct){
       
        setUserData({
          Subject: '',
          Email: '',
          Message: '',
        })
      }
    })
  }

  if(message.correct){
    setTimeout(() => {
      history.push("/user-panel");
    },3000)
  }

  return (
    <>
      <Header />
      <div style={{position: 'relative'}}>
      <main style={{ filter: message.correct ? 'blur(3px)' : 'blur(0)' ,zIndex: '-1'}} className="contactUs">
        <h1 style={{color: "#2d3748"}} className="section__title">Get in touch</h1>
        <section className="contact__section">
       
            <label className="form__label">
              <p className="label__paragraph">Subject:</p>
              <input
                className="label__input"
                type="text"
                placeholder="Your name or alias"
                required
                name="Subject"
                value={userData.Subject}
                onChange={(e) => handlerInput(e)}
              />
            </label>
            <label className="form__label">
              <p className="label__paragraph">Email:</p>
              <input
                className="label__input"
                type="email"
                placeholder="Your email address"
                required
                name="Email"
                value={userData.Email}
                onChange={(e) => handlerInput(e)}
              />
            </label>
            <label className="form__label">
              <p className="label__paragraph">Message:</p>
              <textarea
                className="label__textarea"
                placeholder="Remember, be nice!"
                cols="30"
                rows="10"
                name="Message"
                value={userData.Message}
                onChange={(e) => handlerInput(e)}
              ></textarea>
            </label>
            <button onClick={sendMessage} className="btn__main--full contact__btnSend">
              Send Message
            </button>
         
            {!message.correct && <p className="er">{message.message}</p>}
        </section>
      </main>
      {message.correct && <Popup title="Your email has been send" message="You will be redirect in few seconds" size="2rem" iconLink={<Link to="/user-panel">
          <div className="container__popup__svg"
          >
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
          </div>
        </Link>}/>}
        </div>
      <Footer />
    </>
  );
};

export default ContactUs;
