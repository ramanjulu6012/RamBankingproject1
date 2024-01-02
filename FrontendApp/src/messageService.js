import { Subject } from 'rxjs';
const subject = new Subject();
const user = new Subject();
export const messageService = {
    sendMessage: message => 
    subject.next({ 
        text: message 
    }),
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable()
};

export const userService = {
    sendUser: user1 => 
    user.next({ 
        text: user1
        //text : sessionStorage.getItem("user")  
    },  
    ),
    clearMessages: () => user.next(),
    getMessage: () => user.asObservable()
};

