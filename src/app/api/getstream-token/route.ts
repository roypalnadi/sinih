import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.GETSTREAM_SECRET || 'your-secret-key';

export async function POST(req: Request) {
    const body = await req.json();
    const { id } = body;

    console.log(id);

    const token = jwt.sign({ user_id: id }, SECRET_KEY, { noTimestamp: true });

    // Bisa dikirim via JSON:
    return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });

    // Atau set sebagai cookie (lebih aman):
    // res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);
    // res.status(200).json({ message: 'Logged in' });
}
