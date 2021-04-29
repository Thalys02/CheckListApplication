import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import CheckList from '../src/pages/CheckList'
import CheckListItens from '../src/pages/CheckListItens'

export default  function Routes(){
  return (
    <BrowserRouter>
      <Switch>
      <Route  path="/" exact component={CheckList} />
        <Route path="/:id" exact component={CheckList} />
        <Route path="/itens/:id" exact component={CheckListItens} />
      </Switch>
    </BrowserRouter>
  );
}