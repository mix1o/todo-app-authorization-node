import React, { useEffect,useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import { CounterSubscriber, useCounter } from '../../store/sub';
import darkmode from '../../img/darkmode.jpg';
import lightmode from '../../img/lightmode.jpg';

const Settings = () => {

    const [state,actions] = useCounter();
    const [cor,setCor] = useState(false);

    useEffect(() => {
    fetch('/api/userpanel')
      .then((res) => res.json())
      .then((json) => {
        if (json.correct) {
          actions.user(json);
          setCor(true);
        }
      });
    })

    let months;
    let day;
    let fullYear;
    if(cor){
        let date = new Date(state.userData.user[0].createdDate);
        fullYear = date.getFullYear();
        months = date.getMonth() + 1;
        day = date.getDate();
    }
    
    if(months < '10'){
        months = `0${months}`;
    }
    if(day < '10'){
        day = `0${day}`;
    }


    return (
        <div className="popup-relative">
            <Header/>
            <div className="settings__main">
                <h2 className="heading-2">Settings</h2>
                <div className="settings__section">
                    {state.correct && <p>Your member since <span style={{fontWeight: '700',marginLeft: '1rem',fontSize: '1.6rem'}}>{`${day}:${months}:${fullYear}`}</span></p>}
                </div>
                <div className="settings__section">
                    <h4>Personal information</h4>
                    <div>
                    {state.correct && <div className="info__user__settings"><span>Nickname:</span><span className="width__span">{state.userData.user[0].name}</span><span className="settings__edit__button">Edit</span></div>}
                    </div>
                    <div>
                    {state.correct && <div className="info__user__settings"><span>Email:</span><span className="width__span">{state.userData.user[0].email}</span><span className="settings__edit__button">Edit</span></div>}
                    </div>
                    <div>
                    {state.correct && <div className="info__user__settings"><span>Password:</span><span className="width__span">******</span><span className="settings__edit__button">Edit</span></div>}
                    
                    </div>
                </div>
                <div className="settings__section">
                    <h4>Theme</h4>
                    <div>
                        <img src={lightmode} style={{width: '100%'}} alt="light mode"/>
                        <img src={darkmode} style={{width: '100%',marginTop: '2rem'}} alt="dark mode"/>
                    </div>
                </div>
                <div className="settings__section">
                    <div>
                        <button className="settings__button__delete">
                            Delete my mnTasks account
                        </button>
                        <p style={{fontSize: '1.4rem',fontWeight: '300', marginTop: '2rem'}}>
                        Deleting your account is permanent. All your data will be wiped 
                        out immediately and you won't be able to get it back. Requires 
                        password.
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Settings;