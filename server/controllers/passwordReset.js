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
    if (!person)
      return res.status(401).json({
        title: "Failed",
        message: "UserId does not exist!",
        status: "failure",
      });

    const otpNumber = otpGenerator.generate(process.env.OTP_LENGTH, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    await mailSender({ email: email, otp: otpNumber });
    const otp = new Otp({
      email,
      otpNumber: otpNumber,
    });
    const savedOtp = await otp.save();
    console.log(savedOtp);
    return res.status(201).json({
      title: "Success",
      message: "Otp sent Successfully!",
      status: "success",
    });
  } catch (error) {
    return res
      .status(501)
      .json({ message: error.message, title: "Failure", status: "Failure" });
  }
};

export const validateOtp = async (req, res) => {
  try {
    const { email, otpNumber } = req.body;
    const otp = await Otp.findOne({ email: email, otpNumber: otpNumber });
    const tempOtp = await Otp.findOne({ email: email });
    console.log(email, otpNumber, otp, tempOtp);
    if (!otp)
      return res.status(401).json({
        title: "validation Failed",
        message: "Invalid Otp! ",
        status: "failure",
      });

    // await Otp.findOneAndDelete({ email: email, otpNumber: otpNumber });

    return res.status(200).json({
      message: "Otp successfully validated! ",
      status: "success",
      title: "success!",
    });
  } catch (error) {
    return res
      .status(510)
      .json({ title: "Success", message: error.message, status: "failure" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { flag, email, password } = req.body;
    let person;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    if (flag === "Admin") {
      person = await Admin.findOneAndUpdate(
        { email: email },
        { password: passwordHash }
      );
    } else if (flag === "Employee") {
      person = await Employee.findOneAndUpdate(
        { email: email },
        { password: passwordHash }
      );
    } else if (flag === "User") {
      person = await User.findOneAndUpdate(
        { email: email },
        { password: passwordHash }
      );
    }
    console.log("success");
    return res.status(200).json({
      title: "Success!",
      message: "Password changed successfully! ",
      status: "success",
    });
  } catch (error) {
    return res.status(501).json({
      title: "Password reset error",
      message: error.message,
      status: "failure",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { flag, email, oldPassword, newPassword } = req.body;
    let person;
    const salt = await bcrypt.genSalt();
    const newPasswordHash = await bcrypt.hash(newPassword, salt);
    let matched = false;
    if (flag === "Admin") {
      person = await Admin.findOne({ email: email }, { password: 1 });
      if (bcrypt.compareSync(oldPassword, person.password)) {
        matched = true;
        person = await Admin.findOneAndUpdate(
          { email },
          { password: newPasswordHash }
        );
      }
    } else if (flag === "Employee") {
      person = await Employee.findOne({ email: email }, { password: 1 });
      if (bcrypt.compareSync(oldPassword, person.password)) {
        matched = true;
        person = await Employee.findOneAndUpdate(
          { email },
          { password: newPasswordHash }
        );
      }
    } else if (flag === "User") {
      person = await User.findOne({ email: email });
      console.log(person, email);
      if (bcrypt.compareSync(oldPassword, person.password)) {
        matched = true;
        person = await User.findOneAndUpdate(
          { email },
          { password: newPasswordHash }
        );
        console.log(await User.find({ email: email }), newPasswordHash);
      }
    }
    if (!matched) {
      return res.status(404).json({
        title: "Failure!",
        message: "Old password did not match",
        status: "failure",
      });
    }
    return res.status(200).json({
      title: "Success!",
      message: "Password changed successfully! ",
      status: "success",
    });
  } catch (error) {
    return res.status(501).json({
      title: "Password reset error",
      message: error.message,
      status: "failure",
    });
  }
};
