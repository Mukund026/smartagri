const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ error: 'User not authorized' });

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access forbidden: insufficient permissions' });
        }
        next();
    };
};

module.exports = checkRole;
