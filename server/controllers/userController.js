// const ApiError = require('../error/apiError')
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const {User, Basket} = require('../models/models');
// const { json } = require('../db');
// const generateJwt = (id,email, role)=>{
//    return jwt.sign(
//         {id, email, role}, 
//         process.env.SECRET_KEY,
//         {expiresIn: '24h'}
//     );
// }

// class UserController{
//     async registration(req, res, next){
//         const {email,password, role} = req.body
//         if(!email || !password){
//             return next(ApiError.badRequest("Некорректный email или пароль"))
//         }

//         const candidate = await User.findOne({where: {email}});
//         if(candidate){
//             return next(ApiError.badRequest("Пользователь с таким email  уже существует"));
//         }

//         const hasPassword = await bcrypt.hash(password, 5);
//         const user = await User.create({email, role, password: hasPassword});
//         const basket = await Basket.create({UserId: user.id})
//         const jwtToket = generateJwt(user.id,user.email, user.role);

//         return res.json({jwtToket})

//     }
//     async login(req, res,next){
//         const {email, password} = req.body
//         const user = await User.findOne({where:{email}});
//         if(!user){
//             // next(ApiError.internal("Пользователь не найден"))
//             return res.json({message:"Пользователь не найден"});

//         }
        
//         const comprasePassword = bcrypt.compareSync(password, user.password);
//         if(!comprasePassword){
//             // next(ApiError.internal("Неверный пароль"))
//             return res.json({message:"Неверный пароль"});

//         }

//         const jwtToken = generateJwt(user.id, user.email, user.role);
//         return res.json({jwtToken})
//     }
//     async check(req, res,next){
//         const token = generateJwt(req.user.id, req.user.email, req.user.role)
//         return res.json({token});
//     }
// }

// module.exports = new UserController();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');
const { json } = require('../db');

const generateJwt = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
};

class UserController {
  async registration(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Некорректный email или пароль' });
    }

    try {
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
      }

      const hashedPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email,password: hashedPassword });
      await Basket.create({ UserId: user.id });
      const jwtToken = generateJwt(user.id, user.email, user.role);

      return res.json({ jwtToken });
    } catch (error) {
      // Обработка ошибки (заглушка)
      console.error(error);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Пользователь не найден' });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Неверный пароль' });
      }

      const jwtToken = generateJwt(user.id, user.email, user.role);
      return res.json({ jwtToken });
    } catch (error) {
      // Обработка ошибки (заглушка)
      console.error(error);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
