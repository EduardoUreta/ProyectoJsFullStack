export const MyProfileMiddleware = (req, res, next) => {
    const profileId = req.params.id;
    const userId = req.user._id;
    const userRole = req.user.role;
  
    try {
      if (userRole == 'admin') {
        return next();
      } 
      if(profileId != userId) {
        return res.status(403).redirect(`/perfil/${userId}`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };