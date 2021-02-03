import React,{useState} from 'react'
import {close} from '../Hamburger/HamburgerIcons';

const EditPopup = ({setMessage,editDataType,updateData,setOpen,message}) => {
    const [nickname,setNickname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    if(message.correct){
        setTimeout(() => {
            setMessage('');
        },2000)
    }
    return (
        <div className="settings__edit__div">
          <div style={{textAlign: 'right'}}>
            <i onClick={() => setOpen(false)}>
            {close}
            </i>
          </div>
         {editDataType == 'nickname' && 
         <>
         <h3 style={{color: "#fff",fontWeight: '300'}} className="heading-3">Edit your new nickname</h3>
         <label style={{display: 'block',color: '#fff',textAlign:'center',marginTop: '2rem',}}>
           <p style={{fontSize: '1.5rem',paddingLeft: '2rem',textAlign: 'left'}}>Enter a new data</p>
          <input value={nickname} onChange={(e) => setNickname(e.target.value)} type="text" style={{marginTop: '2rem'}} className="hamburger__input"/>
         </label>
         <div style={{width: '50%',margin: '2rem auto'}}>
       
         <button onClick={() => updateData(nickname,'nickname')}
          className="btn__main--full">Change </button>
         </div>
         </>}
         {editDataType == 'email' && 
         <>
         <h3 style={{color: "#fff",fontWeight: '300'}} className="heading-3">Edit your new email</h3>
         <label style={{display: 'block',color: '#fff',textAlign:'center',marginTop: '2rem',}}>
           <p style={{fontSize: '1.5rem',paddingLeft: '2rem',textAlign: 'left'}}>Enter a new data</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" style={{marginTop: '2rem'}} className="hamburger__input"/>
         </label>
         <div style={{width: '50%',margin: '2rem auto'}}>
       
         <button onClick={() => updateData(email,'email')}
          className="btn__main--full">Change </button>
         </div>
         </>
         }
         {editDataType == 'password' && 
         <>
         <h3 style={{color: "#fff",fontWeight: '300'}} className="heading-3">Edit your new password</h3>
         <label style={{display: 'block',color: '#fff',textAlign:'center',marginTop: '2rem',}}>
           <p style={{fontSize: '1.5rem',paddingLeft: '2rem',textAlign: 'left'}}>Enter a new data</p>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" style={{marginTop: '2rem'}} className="hamburger__input"/>
         </label>
         <div style={{width: '50%',margin: '2rem auto'}}>
       
         <button onClick={() => updateData(password,'password')}
          className="btn__main--full">Change </button>
         </div>
         </>
         }
         <p style={{textAlign:'center',fontSize: '1.5rem'}} className={`${message.correct ? "green-color-p" : "red-color-p"}`}>
         {message.message}
         </p>
        </div>
    )
}

export default EditPopup;