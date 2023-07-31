import {useEffect, useState} from 'react';
import axios from 'axios'
function HomePage() {
    const [funData, setFunData] = useState('');
    const [userData, setUserData] = useState()
    const [error, setError] = useState()
    useEffect(() => {
        const getData = async () => {
            try{
                const data = await axios.get("http://127.0.0.1:5000/get", {withCredentials: true})
                setUserData(data.data)

            }
            catch(e){
                console.log(e)
                setError(e)
            }
        }
        getData()
    }, [])

    const handleChange = (event) => {
        setFunData(event.target.value);
    };
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            const data = await axios.post("http://127.0.0.1:5000/add", {data: funData}, {withCredentials: true})
            console.log("working")
        }
        catch(e){
            setError(e)
        }
    };
    let organizedUserData = []
    if (userData){
        organizedUserData = userData.map(item => item.data)
    }
    else{
        console.log("UNDEFINED")
    }

    return (
        <div>
            <h1>Welcome to the homepage, Yaseen.</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={funData} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            <h1>{organizedUserData}</h1>
        </div>
    )
}

export default HomePage;
