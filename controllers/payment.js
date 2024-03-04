const Razorpay = require('razorpay')
const crypto = require('crypto');

exports.createOrder = async (req, res, next) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET_KEY
        })
        const options = {
            amount: +req.body.amount * 100, // amount in the smallest currency unit
            currency: "INR",
        };
        const response = await razorpay.orders.create(options);
        res.status(200).json({
            message: "Ok",
            data: {
                id: response.id,
                amount: response.amount,
                currency: response.currency,
                key: process.env.RAZORPAY_KEY_ID,
            },
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message || 'Something went wrong' })
    }
}

exports.verify = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;
        let status = 'notVerified';

        if (isAuthentic) {
            // Database comes here
            status = 'verified'
        }
        res.status(200).json({
            message: `Payment ${status}`,
            status,
            paymentId: razorpay_payment_id
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Payment not verified'
        })
    }
}