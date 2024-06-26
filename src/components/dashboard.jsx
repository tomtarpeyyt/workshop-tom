import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Dashboard({ handleSignout }) {
    const navigate = useNavigate();
    
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate('/sign-in');
    }
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    axios.get('https://assignment-backend-1-4g7d.onrender.com/assignments', { headers: headers })
    .then(res => res.data)
    .then(data => setAssignments(data))
    .catch(err => console.log(err))


  }, [])
        return ( 
        <>
            <h2>Dashboard</h2>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600" onClick={handleSignout}>Sign OUT!</button>
            <div>
                {assignments.map(assignment => (<div key={assignment.id}><h1>{assignment.status}</h1></div>))}
            </div>
        </>
        )
}