import UserModel from "../entities/UserModel";
import RepositoryTemplate from "../templates/RepositoryTemplate";

export default class UserRepository extends RepositoryTemplate{
    
    constructor(){
        super(UserModel);    
    }
    public async findByEmail(email: string){
        return await this.mongoModel.findOne({ email });
    }
}