import { API_URL } from "../Constants/Constants";
import axios from "axios";

const UserServices = {
    getUsers: async function(user){
        try{
            const headers = {
                "access-token": user.accessToken,
                client: user.client,
                expiry: user.expiry,
                uid: user.uid
            }
            const response = await axios.get(`${API_URL}/users`, { headers });
            const users = response.data.data;
            return users.filter((user) => user.id >= 4980)
        }catch(error){
            console.error(error);
            if(error.response && error.response.data && error.response.data.error){
                 alert("Cannot get users")
            }
            return [];
        }
    },
    signup: async function(info){
        if(info.password !== info.password_confirmation){
            return alert("Passwords don't match!");

        }

        try {
            const response = await axios.post(`${API_URL}/auth/`, info);
            const { data } = response;
            if(data.data){
                return alert("Account creation succesful!");
            }
        } catch(error){
            if(error.response.data.errors){
                return alert ("Unable to create this account.")
            }
        }
    },

    sendMessage: async function(user, info){
        try {
                const headers = {
                    "acces-token": user.accessToken,
                     client: user.client, 
                     expiry: user.expiry,
                     uid: user.id
                }
                const response = axios.post(`${API_URL}/messages`, info , {headers});
                const { data } = response;
                if(data.data){
                    return alert("Message Sent!")
                } else {
                    return alert("Cannot send message!")
                }
        }catch(error){
            console.log(error);
        }
    }
}

export default UserServices;