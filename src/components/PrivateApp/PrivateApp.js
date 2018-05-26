import React, { Fragment } from "react";
import Header from '../Header';
import Footer from '../Footer';

const privateApp = WrappedComponent => {
  return props => (
    <Fragment>
      <Header />
        <WrappedComponent {...props} />
      <Footer />
    </Fragment>
  )
}

export default privateApp
