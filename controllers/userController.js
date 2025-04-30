import userModel from "../models/userModel.js";


export const getUser = async (req, res) => {
    const userId = req.userId; // Must be set by authentication middleware
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }
    const { password, createdAt, updatedAt, __v, ...others } = user._doc
    return res.status(200).json({ User: others, success: true, message: "Login Success" });
}
export const updateUser = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const userId = req.userId; // Must be set by authentication middleware
        if (!name || !email || !phone || !address) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        user.name = name;
        // user.email = email;
        user.phone = phone;
        user.address = address;
        const newUser = await user.save();
        return res.status(200).json({
            message: "User updated successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            success: true
        });
    } catch (error) {
        console.error("Error adding package:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};