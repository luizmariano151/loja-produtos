import User from "../types/User";
import UserRepository from "../repositories/UserRepository";
import CryptographyComponent from "../components/CryptographyComponent";
import JWTComponent from "../components/JWTComponent";

export default class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  public async create(user: User): Promise<User> {
    if (user.rules === undefined) {
      const defaultRules = ["READ", "CREATE", "UPDATE"];
      user.rules = defaultRules;
    }

    user.password = CryptographyComponent.encrypt(user.password);
    const uuid = await this.repository.create(user);
    user._id = uuid;

    return uuid ? user : undefined;
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.repository.findByEmail(email);
  }

  public async findByUuid(uuid: string): Promise<User> {
    return await this.repository.findByUuid(uuid);
  }

  public async read(): Promise<User[]> {
    return await this.repository.read();
  }

  public async delete(uuid: string): Promise<User> {
    try {
      return await this.repository.delete(uuid);
    } catch (error) {
      return undefined;
    }
  }

  public async updateName(uuid: string, newName: string): Promise<User> {
    const user: User = await this.findByUuid(uuid);

    if (user) {
      user.name = newName;
      return await this.repository.update(user);
    }
    return undefined;
  }

  public async addRule(uuid: string, newRule: string): Promise<boolean> {
    const user: User = await this.findByUuid(uuid);

    if (user !== undefined) {
      const index = user.rules.indexOf(newRule);
      if (index == -1) {
        user.rules.push(newRule);
        await this.repository.update(user);
        return true;
      }
      return false;
    }
    return false;
  }

  public async deleteRule(uuid: string, rule: string): Promise<boolean> {
    const user: User = await this.findByUuid(uuid);

    if (user !== undefined) {
      const index = user.rules.indexOf(rule);
      if (index > -1) {
        user.rules.splice(index, 1);
        await this.repository.update(user);
        return true;
      }
    }
    return false;
  }

  public async login(password: string, email: string): Promise<any> {
    const user = await this.findByEmail(email);

    if (user) {
      const validatesPass = CryptographyComponent.decrypt(user.password);
      if (password === validatesPass) {
        return {
          uuid: user._id,
          token: JWTComponent.generateToken(user),
        };
      }
    }

    return undefined;
  }
}
