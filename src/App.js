import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-dom';
import { firebase } from '../src/config/firebase';
import PageNotFound from './components/Pages/PageNotFound';

import Dashboard from './components/Pages/Dashboards/Dashboard';
import Login from './components/Pages/Auth/Login/Login';

import BuyerRoute from './routes/BuyerRoute';
import SellerRoute from './routes/SellerRoute';
import BuyerPayments from './components/Pages/Dashboards/Buyer/BuyerPayments';
import Home from './routes/Home';
import { initializeInterceptor } from './redux/api';
import { Suspense } from 'react';
import Loader from './components/Shared/Loader';
const searchClient = algoliasearch(
  'DZTA0M5OD8',
  'bfcc29ed9a87db03544730c93ed22ac2',
);
function App() {
  useEffect(() => {
    const unsubscibe = firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        authUser.getIdToken(true).then(idToken => {
          initializeInterceptor(idToken);
        });
      }
    });
    return () => {
      unsubscibe();
    };
  }, []);

  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="aucti_products">
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <BuyerRoute path="/buyer" component={Dashboard} />
            <SellerRoute path="/seller" component={Dashboard} />
            <BuyerRoute path="/payments/:bid_id" component={BuyerPayments} />

            <Route path="/**" component={PageNotFound} />
          </Switch>
        </Suspense>
      </InstantSearch>
    </>
  );
}

export default App;
