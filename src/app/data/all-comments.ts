import { Comment } from '../models/comment';

export const allComments = {
  available: {
    title: 'Licences available !',
    subtitle: 'You can choose a licence to start a session',
    class: 'available',
    // green
  },
  unavailable: {
    title: 'No licence available',
    subtitle: 'You can book a licence and be added to the queue',
    class: 'unavailable',
    // black
  },
  requesting: {
    title: 'Requesting Licence ...',
    subtitle: "This shouldn't take long, please wait ...",
    class: 'available',
    //green
  },
  returning: {
    title: 'Returning Licence ...',
    subtitle: 'Good job ! See you soon again :)',
    class: 'learning',
    // red
  },
  learning: {
    title: 'Session going on ...',
    subtitle: 'The session will end automatically when the timer ends',
    class: 'learning',
    // red
  },
  fetching: {
    title: 'Fetching Data ...',
    subtitle: 'If this takes more than seconds then the server is not responding',
    class: 'unavailable',
    // black
  },
  booked: {
    title: 'Position in the queue: ',
    subtitle: "We'll notify you when it's your turn to take the first returned licence",
    class: 'unavailable',
    // black
  },
  first_in_queue:{
    title: "It's your turn ! ",
    subtitle: "All you need to do is click on the take licence button before the timer ends ",
    class: 'available',
  },
  sessions: {
    title: 'My Sessions',
    subtitle:
      'Here you can find all your sessions and add notes to keep track of your progress',
    class: 'sessions',
    //sessions icon
  },
};
