// controllers/packageController.js
import packageModel from "../models/packageModel.js";

// Add a new package
export const addPackage = async (req, res) => {
    try {
        const { name, place, image, description, packageExpense } = req.body;

        const newPackage = new packageModel({
            name,
            place,
            image,
            description,
            packageExpense,
        });

        const savedPackage = await newPackage.save();

        return res.status(201).json({
            message: "New travel package added successfully",
            package: savedPackage,
            success: true,
        });
    } catch (error) {
        console.error("Error adding package:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
export const addMultiplePackages = async (req, res) => {
    try {
        const userId = req.userId; // Must be set by authentication middleware
        const packages = req.body;

        if (!Array.isArray(packages) || packages.length === 0) {
            return res.status(400).json({
                message: "Package data must be a non-empty array",
                success: false
            });
        }

        // Attach userId to each package
        const packagesWithUser = packages.map(pkg => ({
            ...pkg,
            userId: userId
        }));

        const savedPackages = await packageModel.insertMany(packagesWithUser);

        return res.status(201).json({
            message: "Multiple packages added successfully",
            packages: savedPackages,
            success: true,
        });
    } catch (error) {
        console.error("Error adding multiple packages:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
// Get all packages
export const getAllPackages = async (req, res) => {
    try {
        const packages = await packageModel.find();
        return res.status(200).json({ packages });
    } catch (error) {
        console.error("Error fetching packages:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const singlePackages = async (req, res) => {
    try {
        const packageId = req.params.id;
        if (!packageId) {
            return res.status(400).json({ message: "Package ID is required" });
        }
        const packages = await packageModel.findById(packageId);
        console.log(packages, '-----------packages')
        return res.status(200).json({ packages });
    } catch (error) {
        console.error("Error fetching packages:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
