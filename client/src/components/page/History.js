import React, { useEffect, useState } from 'react'
import Header from '../page/Header';
import Task from '../todo/Task';
import Footer from './Footer';
const History = () => {

    const [tasks,setTasks] = useState([]);

    useEffect(() => {
        fetch('/api/todos')
        .then(res => res.json())
        .then(json => setTasks(json))
    }, [tasks])

    const filteredCompleted = tasks.filter((item) => item.complete == 'Completed');

    return (
        <div>
            <Header/>
           
            
        
            {filteredCompleted.length > 0 && 
            <>
             <h3 className="heading-3">Your's completed tasks</h3>
             <p className="history__p">Here you can see all your's completed tasks</p>
                <div style={{padding: '1rem'}}>
                {filteredCompleted.reverse().map(({ _id, name, description, priority, date, complete,finishedDate,}) =>
                <Task
                id={_id}
                  key={_id}
                  name={name}
                  desc={description}
                  prio={priority}
                  date={date}
                  status={complete}
                  isCompleted={true}
                  bgColor="completed__task__bgColor"
                  finished={finishedDate}
                />
                )}
            </div>
            </>}
            {filteredCompleted.length < 1 && 
                <div>
                    <h3 className="heading-3">You don't have completed tasks yet</h3>
                    <p className="history__p">When you complete the task it will be appear here</p>
                    <div style={{textAlign: 'center',marginTop: '3rem'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.001 14c-2.332 0-4.145 1.636-5.093 2.797l.471.58c1.286-.819 2.732-1.308 4.622-1.308s3.336.489 4.622 1.308l.471-.58c-.948-1.161-2.761-2.797-5.093-2.797zm-3.501-6c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z" fill="#4a5568"/></svg>
                    </div>
                </div>
            }
            <Footer/>
        </div>
    )
}

export default History;