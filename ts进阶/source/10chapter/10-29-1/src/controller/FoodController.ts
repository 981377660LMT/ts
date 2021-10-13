import { Request, Response } from 'express'
import {
  get, middleware, Controller
} from '../decorator';
import { isValidUser, SecondMiddleAware } from '../middleaware/middleawarefunc'
@Controller("/")
class FoodController {

  @get("/showFood/:foodname/:price")
  @middleware(SecondMiddleAware)
  @middleware(isValidUser)
  showFood(req: Request, res: Response): void {
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    let foodname = req.params.foodname
    let price = req.params.price
    res.write(`美食:${foodname}`);
    res.write(`美食:${price}`);
    res.write("大混沌");
    res.write("一锅炖")
    //res.status(200).status(23);

    res.end();
  }
}