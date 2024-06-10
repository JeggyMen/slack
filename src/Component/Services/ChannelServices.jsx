import axios from "axios";
import { API_URL } from "../Constants/Constants";

const ChannelServices = {
    getChannels: async function(user) {
        try {
            const headers = {
                "access-token": user.accessToken,
                client: user.client,
                expiry: user.expiry,
                uid: user.uid
            };

            const response = await axios.get(`${API_URL}/channels`, { headers });
            const { data } = response;
            if (data) {
                return data.data;
            }
        } catch (error) {
            console.error('Error fetching channels:', error);
            if (error.response && error.response.data.errors) {
                alert("Cannot get channels");
            }
            return [];
        }
    },

    getUsers: async function(user) {
        try {
            const headers = {
                "access-token": user.accessToken,
                client: user.client,
                expiry: user.expiry,
                uid: user.uid
            };

            const response = await axios.get(`${API_URL}/users`, { headers });
            const { data } = response;
            if (data) {
                return data.data.filter(user => user.id >= 4980);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            if (error.response && error.response.data.errors) {
                alert("Cannot get users");
            }
            return [];
        }
    },

    createChannel: async function(user, channelData) {
        try {
            const headers = {
                "access-token": user.accessToken,
                client: user.client,
                expiry: user.expiry,
                uid: user.uid
            };

            const response = await axios.post(`${API_URL}/channels`, channelData, { headers });
            console.log("Create channel response:", response.data.data); 
            const { data } = response;
            if (data) {
                return data.data;
            }
        } catch (error) {
            console.error('Error creating channel:', error);
            if (error.response && error.response.data.errors) {
                alert("Cannot create channel");
            }
            return null;
        }
    },

    // addMemberToChannel: async function(user, channelId, memberId) {
    //     try {
    //         const headers = {
    //             "access-token": user.accessToken,
    //             client: user.client,
    //             expiry: user.expiry,
    //             uid: user.uid
    //         };

    //         const requestBody = {
    //             id: channelId,
    //             member_id: memberId
    //         };

    //         const response = await axios.post(`${API_URL}/channel/add_member`, requestBody, { headers });
    //         const { data } = response;
    //         if (data) {
    //             console.log("Member added successfully to the channel");
    //             return data.data;
    //         }
    //     } catch (error) {
    //         console.error('Error adding member to channel:', error);
    //         if (error.response && error.response.data.errors) {
    //             alert("Cannot add member to channel");
    //         }
    //         return null;
    //     }
    // },

    fetchChannelMessages: async function(user, channelId) {
        const endpoint = `${API_URL}/messages`;
        const headers = {
            'access-token': user.accessToken,
            'client': user.client,
            'expiry': user.expiry,
            'uid': user.uid,
        };
        const params = {
            receiver_id: channelId,
            receiver_class: "Channel",
        };
        try {
            const response = await axios.get(endpoint, { headers, params });
            if (response.status === 200) {
                return response.data.data;
            } else {
                console.log('Failed to fetch channel messages:', response.statusText);
                return [];
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Invalid or expired token');
            } else {
                console.error('Error fetching channel messages:', error);
            }
            return [];
        }
    },
    


    sendChannelMessage: async function(user, messageInfo) {
        const endpoint = `${API_URL}/messages`;
        const headers = {
            'access-token': user.accessToken,
            'client': user.client,
            'expiry': user.expiry,
            'uid': user.uid,
        };
        const requestBody = {
            receiver_id: messageInfo.channel_id,
            receiver_class: "Channel",
            body: messageInfo.body,
        };
        try {
            const response = await axios.post(endpoint, requestBody, { headers });
            if (response.status === 200) {
                return response.data.data;
            } else {
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Invalid or expired token');
            } else {
                console.error('Error sending channel message:', error);
            }
        }
    }    
}

export default ChannelServices;
