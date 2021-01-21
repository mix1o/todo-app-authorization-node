import React,{useState} from 'react';
import Header from './Header';
import Footer from './Footer';

import {useHistory} from 'react-router-dom';

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
      <main style={{ filter: message.correct ? 'blur(3px)' : 'blur(0)' ,zIndex: '45'}} className="contactUs">
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
                name="message"
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
            {message.correct && <div style={{zIndex: '50'}} className="correct-message-div">
              <p className="correct-message-p">{message.message}</p>
              <p className="correct-message-p2">You will be redirect in a second</p>  
              <div style={{marginTop: '4rem'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/></svg>
              </div>
            </div>}
        </div>
      <Footer />
    </>
  );
};

export default ContactUs;
