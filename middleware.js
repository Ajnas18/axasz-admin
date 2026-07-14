export const config = {
  matcher: '/(.*)',
};

export default function middleware(req) {
  const authHeader = req.headers.get('authorization');

  if (authHeader) {
    const base64 = authHeader.split(' ')[1];
    const decoded = atob(base64);
    const [username, password] = decoded.split(':');

    const validUser = username === process.env.ADMIN_USERNAME;
    const validPass = password === process.env.ADMIN_PASSWORD;

    if (validUser && validPass) {
      return; // ✅ Access granted
    }
  }

  // ❌ Show browser login dialog
  return new Response('Access Denied', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="AXASZ Admin", charset="UTF-8"',
    },
  });
}
