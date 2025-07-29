import { getAuth } from '@clerk/express';

export const protectUser = async (req, res, next) => {
  try {
    const { userId } = await req.auth();

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const protectEducator = async (req, res, next) => {
  try {
    const { userId, sessionId, getToken } = await req.auth();

    const token = await getToken();
    const role = token?.session?.publicMetadata?.role;

    if (role !== 'educator') {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    next();
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

