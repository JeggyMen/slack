import axios from "axios";
import { API_URL } from "../Constants/Constants";
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
                return alert("Account creation successful!");
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
                "access-token": user.accessToken,
                client: user.client,
                expiry: user.expiry,
                uid: user.id
            }
            const response = await axios.post(`${API_URL}/messages`, info , {headers});
            const { data } = response;
            if(data.data){
                return alert("Message Sent!")
            } else {
                return alert("Cannot send message!")
            }
        } catch(error){
            console.log(error);
        }
    },
    fetchMessages: async function(user, selectedUser){
        const endpoint = `${API_URL}/messages?receiver_id=${selectedUser.id}&receiver_class=User`;
        const headers = {
            'access-token': user.accessToken,
            'client': user.client,
            'expiry': user.expiry,
            'uid': user.uid,
        };
        try {
            const response = await axios.get(endpoint, { headers });
            if (response.status === 200) {
                return response.data.data;
            } else {
                console.log('Failed to fetch messages:', response.statusText);
                return [];
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Invalid or expired token');
            } else {
                console.error('Error fetching messages:', error);
            }
            return [];
        }
    }
}
export default UserServices;