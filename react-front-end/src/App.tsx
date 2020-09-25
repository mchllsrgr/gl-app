import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface User {
  id: number;
  // email: string;
  // name: string;
}

export default function App() {
  const [user, setUser] = useState({} as User);

  const fetchData = (e:any) => {
    console.log('test');

    axios.get('/api/data')
    .then((response) => {
      console.log(response.data)
      console.log(response.data.message)

      setUser({
        id: response.data.message
      });
    }) 
  }
  
  return (
    <div>
      <button onClick={fetchData}>test</button>
    </div>
  )
}

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       message: 'Click the button to load data!'
//     }
//   }

//   fetchData = () => {
//     axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
//     .then((response) => {
//       // handle success
//       console.log(response.data) // The entire response from the Rails API

//       console.log(response.data.message) // Just the message
//       this.setState({
//         message: response.data.message
//       });
//     }) 
//   }

//   render() {
//     return (
//       <div className="App">
//         <h1>{ this.state.message }</h1>
//         <button onClick={this.fetchData} >
//           Fetch Data
//         </button>        
//       </div>
//     );
//   }
// }

// export default App;
