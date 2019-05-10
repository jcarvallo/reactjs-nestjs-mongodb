import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { Layout,NavBar } from './components/index';
import { Home  } from './views/index';


function App(props) {
  return (
    <div>
      <NavBar></NavBar>
      <Layout>
        <BrowserRouter>
          <Route path="/" exact component={Home} />
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
