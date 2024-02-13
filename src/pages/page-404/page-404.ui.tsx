import { Link } from 'react-router-dom';
import { useCurrentUserQuery } from '~entities/session';
import { pathKeys } from '~shared/lib/react-router';

const Page404 = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { data: user } = useCurrentUserQuery();
  return (
    <div>
      <h1>Page not found</h1>
      <p>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
      <Link
        to={user ? pathKeys.wallet.root() : pathKeys.home()}
        className='btn btn-sm btn-outline-primary'
      >
        Go back home
      </Link>
    </div>
  );
};

export default Page404;
