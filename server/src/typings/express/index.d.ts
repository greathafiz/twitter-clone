import { UserDoc } from "../../interfaces/UserDoc";
declare global {
  namespace Express {
    interface User extends UserDoc {}
  }
}
