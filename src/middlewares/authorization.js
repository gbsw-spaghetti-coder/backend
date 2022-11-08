exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ message: "로그인 하세요" });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(400).json({ message: "로그인 되어있는 상태입니다" });
  }
};


exports.isAdmin = (req, res, next) => {
  const role = req.user.dataValues.role;

  if(req.isAuthenticated() && role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "관리자만 접근 가능합니다" });
  }
}