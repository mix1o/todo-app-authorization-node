import React from 'react';
import HamburgerTop from '../Hamburger/HamburgerTop';
import Footer from './Footer';
import { useCookies } from 'react-cookie';
import MenuBottom from '../Hamburger/MenuBottom';
import EmptyBurger from '../../bgs/EmptyBurger';

const Policy = () => {
  const [cookies] = useCookies({});
  const { user } = cookies;

  return (
    <>
      {user && <HamburgerTop />}
      {!user && <EmptyBurger />}
      <main className="terms">
        <h1 className="section__title">Privacy Policy</h1>
        <p className="main__info">
          Overview
          <span className="label__tearms label__span--link">
            <strong>nmTasks</strong>
          </span>
          Holdings Ltd. (nmTasks, “we”, “us” or “our”) is committed to
          protecting the privacy of personal information (i.e. any information
          relating to an identified or identifiable natural person) who visit
          the <strong>https://testowa-node.herokuapp.com/</strong> website.
          Amendments to this Privacy Policy will be posted to the Site and/or
          Services and will be effective when posted. Your continued use of the
          Site and/or Services following the posting of any amendment to this
          Privacy Policy shall constitute your acceptance of such amendment.
        </p>
      </main>
      {user && <MenuBottom />}
      <Footer />
    </>
  );
};

export default Policy;
