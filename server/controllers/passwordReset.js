import bcrypt from "bcrypt";
import User from "../models/User.js";
import Employee from "../models/Employee.js";
import Admin from "../models/Admin.js";
import otpGenerator from "otp-generator";
import mailSender from "../utils/mailSender.js";
import Otp from "../models/Otp.js";

export const validateAndOtpSender = async (req, res) => {
    try {

        let person;
        const { flag, email } = req.body;
        if (flag === "Admin") {
            person = await Admin.findOne({ email: email });
        } else if (flag === "Employee") {
            person = await Employee.findOne({ email: email });
        } else if (flag === "User") {
            person = await User.findOne({ email: email });
        }
        if (!person) return res.status(401).json({ msg: "UserId does not exist!" });

        const otpNumber = otpGenerator.generate(process.env.OTP_LENGTH,
            { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        
        await mailSender({ email: email, otp: otpNumber });
        const otp = new Otp({
            email,
            otpNumber: otpNumber,
        });
        const savedOtp = await otp.save();
        return res.status(201).json({ msg: "Otp sent Successfully! "});

    } catch (error) {
        return res.status(501).json({ error: error });
    }
}

export const validateOtp = async(req, res) => {
    try {
        console.log("hi")
        const { email, otpNumber } = req.body;
        console.log(email, otpNumber);
        const otp = await Otp.findOne({ email: email, otpNumber: otpNumber});
        console.log(otp);
        if(!otp) return res.status(401).json({ msg: "Invalid Otp! "});

        // await Otp.findOneAndDelete({ email: email, otpNumber: otpNumber });

        return res.status(200).json({ msg: "Otp successfully validated! "});
    } catch(error) {
        return res.status(510).json({ error: error });
    }
}

export const changePassword = async(req, res) => {
    try {
        const { flag, email, password } = req.body;
        let person;
        console.log(flag, email, password);
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        if (flag === "Admin") {
            person = await Admin.findOneAndUpdate({ email: email }, { password: passwordHash});
        } else if (flag === "Employee") {
            person = await Employee.findOneAndUpdate({ email: email }, { password: passwordHash});
        } else if (flag === "User") {
            person = await User.findOneAndUpdate({ email: email }, { password: passwordHash});
        }
        console.log(person);
        return res.status(200).json({ msg: "Password changed successfully! "});
    } catch(error) {
        return res.status(501).json({ error: error });
    }
}