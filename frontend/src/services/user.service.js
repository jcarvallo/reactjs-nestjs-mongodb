import axios  from 'axios';

export default class UserService {

    async getAll(){
        const URL = `${process.env.REACT_APP_API_URL}users/`;
        return await axios({
            method: 'get',
            url: URL,
        })
    }
    async createUser(data) {
        const URL = `${process.env.REACT_APP_API_URL}users/create`;
        return await axios({
            method: 'post',
            url: URL,
            data:data
        })
    }

    async editUser(userID,data) {
        const URL = `${process.env.REACT_APP_API_URL}users/update?userID=${userID}`;
        return await axios({
            method: 'put',
            url: URL,
            data: data
        })
    }


    async deleteUser(userID) {
        const URL = `${process.env.REACT_APP_API_URL}users/delete?userID=${userID}`;
        return await axios({
            method: 'delete',
            url: URL,
        })
    }


}
