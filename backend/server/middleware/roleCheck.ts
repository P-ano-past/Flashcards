import { Request, Response, NextFunction } from "express";

interface Role {
  name: string;
}

interface User {
  roles: Role[];
}

interface AuthenticatedRequest extends Request {
  user?: User;
}

const roleCheck = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const hasRole = user.roles.some((role) => allowedRoles.includes(role.name));

    if (!hasRole) {
      return res
        .status(403)
        .json({
          message: "Access Denied: You don't have the right permissions.",
        });
    }

    next();
  };
};

export default roleCheck;
