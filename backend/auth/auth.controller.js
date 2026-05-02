import { findUser } from "./auth.service.js";

export const login = async (req, res) => {
  const { employeeID, password } = req.body;

  if (!employeeID || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const user = await findUser(employeeID, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        employeeID: user.EmployeeID,
        firstName: user.FirstName,
        lastName: user.LastName,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};