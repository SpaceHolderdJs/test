import { IUser } from "../interfaces";
import { v4 as uuidv4 } from 'uuid';

export const login = async (takenUser: Omit<IUser, "token">) => { 
   const acceptedUser = await new Promise((res, rej) => {
    setTimeout(() => {
        return res({...takenUser, token: uuidv4()});
    }, 2000);
    }); 

    return acceptedUser;
}

