import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section className="heading">
        <h1>How can we help you</h1>
        <p>Choose option</p>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        Create New Ticket
      </Link>
      <Link to="/tickets" className="btn btn-reverse btn-block">
        View My Tickets
      </Link>
    </>
  );
}

export default Home;
