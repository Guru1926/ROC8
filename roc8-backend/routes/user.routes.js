import { Router} from 'express'
import { login, signup } from "../controller/user.controller.js"
import { validateUser } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  res.send("User route")
  });

  router.get("/verify",validateUser, async (req, res) => {
    try {
      res.send('Verified !')
    } catch (err) {
      res.status(500).send("Something went wrong !");
    }
  });

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const userData = await signup(body);
    return res.send({ user:userData });
  } catch (err) {
    if (err.message == "Email already exists !") {
      res.status(400).send(err.message);
    } else {
      res.status(500).send("Something went wrong !");
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const responsToken = await login(body);
    return res.send({ token:responsToken });
  } catch (err) {
    if (
      err.message == "Email not registered !" ||
      err.message == "Wrong password !"
    ) {
      res.status(400).send(err.message);
    } else {
      res.status(500).send("Something went wrong !");
    }
  }
});


export default router