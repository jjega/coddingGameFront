export default function auth({ next, router }) {
  console.log('here AUTH')
  if (!localStorage.getItem('token')) {
    return router.push({ name: 'home' });
  }
  return next();
}