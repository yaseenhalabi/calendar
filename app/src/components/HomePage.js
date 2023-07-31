import {useEffect, useState} from 'react';
import axios from 'axios'
function HomePage() {
    const [userInfo, setLoginInfo] = useState({username:"", password:""})

    useEffect(() => {
        const getData = async () => {
            try{
                const data = await axios.post("https://calendar-yaseen-api-9684d13821fa.herokuapp.com/register", loginInfo, {withCredentials: true})
                console.log(data)
            }
            catch(e){
                console.log(e)
            }
        }
        getData()
    }, [])


    
    return (
        <h1>Welcome to the homepage, Yaseen.</h1>
    )
}

export default HomePage;
