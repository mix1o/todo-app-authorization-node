import React,{useEffect,useState} from 'react';
import styled from 'styled-components'
import ListHamburger from './ListHamburger';
import { useCookies } from 'react-cookie';


const HamburgerDiv = styled.div`
  background: #1db95e;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  text-align: right;
  padding: 1rem;
`;
const HelpDiv = styled.div`
height: 100vh;
position: fixed;
top: 0;
right: 0;
width: 100%;
backdrop-filter: blur(3px);
transform: ${({isOpen}) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
transition: transform .3s ease-in-out;
z-index: 3;
`;


const Hamburger = ({isOpen,setIsOpen,logOut}) => {
    const [user, setUser] = useState([]);
    const [correct, setCorrect] = useState(false);
    
    

    useEffect(() => {
        fetch('/api/userpanel')
          .then((res) => res.json())
          .then((json) => {
              if(json.correct){
                  setUser(json);
                  setCorrect(true);
              }
          });
        // .then((json) => console.log(json));
      }, [user]);



    return (
        <HelpDiv onClick={() => setIsOpen(false)} isOpen={isOpen}>
        <HamburgerDiv>
       
            <svg onClick={() => setIsOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              name="hide menu"
              >
              <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" />
            </svg>
            <div className="info__user">
            <p>Welcome,</p>
            {correct && <p className="second">{user.user[0].name}</p>}
            {correct && <p className="credits">Your credits: <span>{user.user[0].credits}</span></p>}
            </div>
            <div style={{display: 'flex',alignItems: 'center', height: '70vh'}}>
            <ListHamburger/>
            </div>
            <div  className="hamburger__log__out">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M13 2v-2l10 3v18l-10 3v-2h-9v-7h1v6h8v-18h-8v7h-1v-8h9zm-2.947 10l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z"/></svg>
            <button onClick={logOut} className="log__out">Log out</button>
            </div>
        </HamburgerDiv>
    </HelpDiv>
    )
}

export default Hamburger;