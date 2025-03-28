const { v4: uuidv4 } = require("uuid");
const User = require("../Models/user");
const forgetUser = require("../Models/forgetPassword");
const { setUser } = require("../service/auth");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const saltRounds = 12;

async function HandleUserSignup(req, res) {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password:", hash);

    await User.create({
      name: name,
      email: email,
      password: hash,
    });

    return res.redirect("/");
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).send("Signup failed. Please try again.");
  }
}

async function HandleUserLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "Invalid Username or Password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      console.log("Password Matched");
      // const sessionId=uuidv4();
      // setUser(sessionId,user);
      const token = setUser(user);
      res.cookie("uid", token);
      return res.redirect("/");
    } else {
      return res.render("login", { error: "Invalid Username or Password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send("Login failed. Please try again.");
  }
}

async function HandleUserOTP(req, res) {
  const email = req.body.email;
  //   console.log("hii");
  console.log(email);
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) return res.render("forgetPassword", { error: "Invalid Email" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "akshat9090.fzd@gmail.com",
        pass: "zovgajkpwpgzbixb",
      },
    });
    const otp = generateOTP();

    await forgetUser.create({
      email: email,
      otp: otp,
    });

    const mailOptions = {
      from: "akshat9090.fzd@gmail.com",
      to: email,
      subject: "Welcome to the Email Notification System",
      text: `Hi this is your OTP ${otp},  

          Welcome to our Notification System!  

          This is a test email to verify that your Nodemailer setup is working correctly.  
          Please find the attached **Holiday Calendar** for reference.

          Best Regards,
          Akshat
          `,
          attachments: [
            {
              filename: 'Resume_Akshat.pdf', 
              path: '/home/user/NodeJs /URL_Shortner/Document/Resume_Akshat.pdf', 
            }
          ]
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("email sent", info.response);

    return res.render("forgetPassword");
  } catch (error) {
    console.log("forget password error", error);
    return res.render("forgetPassword");
  }
}


async function HandleVerifyOTP(req, res) {
  const otp = req.body.otp;
  try {
    if (!otp) {
      console.log("otp is required");
      return res.render("forgetPassword");
    }
    const user = await forgetUser.findOne({ otp: otp });
    if (!user) {
      console.log("user not found");
      return res.render("forgetPassword");
    }

    if (otp == user.otp) {
      console.log("logged In");
      return res.redirect("/");
    } else {
      console.log("wrong otp");
      return res.render("forgetPassword");
    }
  } catch (error) {
    console.log("Internel Error", error);
    return res.render("forgetPassword");
  }
}

function generateOTP(length = 6) {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

module.exports = {
  HandleUserSignup,
  HandleUserLogin,
  HandleUserOTP,
  HandleVerifyOTP,
};
