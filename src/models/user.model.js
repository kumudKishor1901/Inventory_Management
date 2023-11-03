
export default class UserModel{
    constructor(id,name,email,password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static get(){
        return users;
    }

    

    static add(userObj){
        const user = new UserModel(
            users.length+1,
            userObj.name,
            userObj.email,
            userObj.password,
        );
        users.push(user);
        console.log(users);
    }

   static checkLoginDetails(email,password){
        return users.find((user)=>user.email===email && user.password === password);
            
    }
}

const users = [];