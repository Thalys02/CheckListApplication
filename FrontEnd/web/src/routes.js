import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import CheckList from '../src/pages/CheckList'
import CheckListItens from '../src/pages/CheckListItens'

export default  function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"component={CheckList} />
        <Route path="/:id" component={CheckList} />
        <Route exact path="/itens/:id" component={CheckListItens}/>
      </Switch>
    </BrowserRouter>
  );
}