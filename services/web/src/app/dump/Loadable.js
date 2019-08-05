import L from 'react-loadable';
import Loading from '@app/dump/Loading';

const Loadable = opts =>
  L({
    loading: Loading,
    delay: 300,
    ...opts
  });

export default Loadable;
