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
    }
}

export default UserServices;