import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SigninPage from './Components/Signin'
import SignUp from './Components/Signup'
import Home from './Components/Home'
import Games from './Components/Games/Games'
import GameDetails from './Components/Games/GameDetails'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBookmark, faHeart, faList } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/'component={SigninPage} />
            <Route path='/Home' component={Home} />
            <Route path='/signup' component={SignUp} />
            <Route exact path='/Game' component={Games} />
            <Route path='/Game/:id' component={GameDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

library.add(faBookmark, faHeart, faList)

export default App;
