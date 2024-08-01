import { Comment } from "../models/comment";

export const allComments={
    available: {
        title: "Licences available",
        subtitle: "You can choose a licence to start a session"
    },
    unavailable:{
        title: "No licence available",
        subtitle: "You can book a licence and be added to the queue"
    },
    requesting:{
        title:"Requesting Licence",
        subtitle:"This shouldn't take long, please wait ..."
    },
    returning:{
        title:"Returning Licence",
        subtitle:"Good job ! See you soon again :)" 
    },
    learning:{
        title:"Session going on ...",
        subtitle:"The session will end automatically when the timer end"
    }
}
