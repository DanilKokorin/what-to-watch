import Logo from '../logo/logo';

function HeadGuest(): JSX.Element {
  return (
    <section className="film-card">
      <div className="film-card__bg">
        {/* <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" /> */}
        <img src="img/bg-header.jpg" alt="" />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header">
        <Logo />

        <div className="user-block">
          <a href="sign-in.html" className="user-block__link">
            Sign in
          </a>
        </div>
      </header>
    </section>
  );
}

export default HeadGuest;
