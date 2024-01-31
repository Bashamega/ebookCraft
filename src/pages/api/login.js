export default function handler(req, res) {
   /*Logic for the login */
  if (req.method === 'POST') {
    const { email, password } = req.body;
    /**Testing account */
    if (email === 'example@example.com' && password === 'password123') {
      res.status(200).json({ status: 200 });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
