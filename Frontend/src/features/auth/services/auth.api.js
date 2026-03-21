import axios from "axios";


export async function register({ username, email, password }) {

    try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
            username,
            email,
            password
        }, {
            withCredentials: true
        })

        return response.data

    } catch(err){
        console.log(err)
    }
}

export async function login(email, password) {
    
    try{
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email,
            password
        }, {
            withCredentials: true
        })

        return response.data

    } catch(err){

        console.log(err)
    }
}

export async function logout() {
    
    try{

        const respons = await axios.get('http://localhost:3000/api/auth/logout',{
            withCredentials: true
        } )

        return respons.data

    }catch(err){
        console.log(err)
    }
}


export async function getMe() {
    
    try{

        const respons = await axios.get('http://localhost:3000/api/auth/get-me',{
            withCredentials: true
        } )

        return respons.data

    }catch(err){
        console.log(err)
    }
}

