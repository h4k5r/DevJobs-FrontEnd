import {NextApiRequest, NextApiResponse} from "next";

const profileVerifyHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.query.token);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employer/auth/verify/${req.query.token}`, {
        method: 'POST',
    });
    const data = await response.json();
    if (data.success) {
        return res.status(200).json({
            success: true,
            message: data.message
        });
    }
    res.status(400).json({
        success: false,
        message: data.message
    });

}
export default profileVerifyHandler