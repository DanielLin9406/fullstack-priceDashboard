import logo from '@app/image/data.png';
const SITE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000': 'https://cra-ssr.herokuapp.com'; 

export const seo = {
  SITE_URL,
  defaultTitle: 'Daniel\'s Website',
  defaultDescription:'This is a really awesome website where we can render on the server. Supa cool.',
  defaultImage: `${SITE_URL}${logo}`,
  defaultSep: ' | '
}