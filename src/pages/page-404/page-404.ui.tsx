import { Link } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';

const Page404 = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <p>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
      <Link to={pathKeys.home()} className='btn btn-sm btn-outline-primary'>
        Go back home
      </Link>
    </div>
  );
};

export default Page404;
