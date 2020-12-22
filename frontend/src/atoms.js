import {atom} from 'recoil';

export const userAtom = atom({
    key:"adminAtom",
    default:{
        isAuth:false,
        jwt:null,
        id:null
    }
})