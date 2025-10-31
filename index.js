const express = require("express");
const User = require("./schema");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    const response = await User.findOne({ email: email });

    if (response) {
      return res.status(400).json({
        message: "User already present",
        success: false,
      });
    }

    const createUser = await User.create({
      username,
      email,
      password,
    });

    if (!createUser) {
      return res.status(400).json({
        message: "Error while signup",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User signup successfully",
      user: createUser,
      success: true,
    });
  } catch (error) {
    console.log("Error while signup");

    return res.status(500).json({
      success: false,
      message: "Server error while signup",
    });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        message: "All fields are required, signin",
        success: false,
      });
    }

    const response = await User.findOne({ email: email });

    if (!response) {
      return res.status(400).json({
        message: "User not present",
        success: false,
      });
    }

    if (response.password !== password) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User signin successfully",
      success: true,
      data: response,
    });
  } catch (error) {
    console.log("Error while signin");

    return res.status(500).json({
      success: false,
      message: "Server error while signin",
    });
  }
});

app.get("/users", async (req, res) => {
    try{    
        const users = await User.find();

        if(!users){
            return res.status(400).json({
                message:"Error while getting users",
                success:false
            })
        }

        res.json({
            users: users
        })

    }catch(error){
        return res.status(500).json({
            message:"Error while getting all users",
            success:false
        })
    }
})

app.listen(3000, () => {
  console.log("App is running at port 3000");
});
