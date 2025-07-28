import { Webhook } from "svix";
import User from "../models/User.js";

// Clerk Webhook Controller
export const clerkWebhooks = async (req, res) => {
  try {
    console.log("Webhook hit!");

    const payload = JSON.stringify(req.body);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(payload, headers);

    const { data, type } = evt;
    console.log("Type:", type);
    console.log("Data:", data);

    if (type === "user.created") {
      const userData = {
        _id: data.id,
        email: data.email_addresses[0].email_address,
        name: data.first_name + " " + data.last_name,
        imageUrl: data.image_url,
      };
      console.log("Saving user to DB:", userData);
      await User.create(userData);
      return res.json({ success: true, message: "User created" });
    }

    if (type === "user.updated") {
      const updateData = {
        email: data.email_addresses[0].email_address,
        name: data.first_name + " " + data.last_name,
        imageUrl: data.image_url,
      };
      await User.findByIdAndUpdate(data.id, updateData);
      return res.json({ success: true, message: "User updated" });
    }

    if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
      return res.json({ success: true, message: "User deleted" });
    }

    res.json({ success: true, message: "Unhandled event" });
  } 
  catch (error) {
    console.error("Clerk Webhook Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
