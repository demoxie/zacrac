import {ICreateProfileRequest, IUpdateProfileRequest, IUserIdRequest} from "../types";
import {AppDataSource} from "../config/db/data-source";
import {User} from "../entity/user.entity";
import {AlreadyExistException, DatabaseError, NotFoundException} from "../exceptions";

export class UserService{

    createProfile = async (req: ICreateProfileRequest, path: string) => {
        const existingUser = await AppDataSource.getRepository(User).findOneBy({
            username: req.body.username
        });
        if(existingUser){
            throw new AlreadyExistException("User exist",path);
        }

        const newUser: User = new User();
        newUser.username = req.body.username;
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.address = req.body.address;
        newUser.phoneNumber = req.body.phoneNumber;

       return  await AppDataSource.manager.save(newUser)
           .catch(err=>{
               throw new DatabaseError(err, path);
           });
    };

    getUserProfiles = async (path: string) => {
        return await AppDataSource.getRepository(User).find()
            .catch(err=>{
                throw new DatabaseError(err, path);
            });
    };

    getUserProfile = async (userId: number, path: string) => {
        const existingUser = await AppDataSource.getRepository(User).findOneBy({
            id: userId
        })
            .catch(err=>{
                throw new DatabaseError(err, path);
            });
        if(!existingUser){
            throw new NotFoundException("User not found",path);
        }
        return existingUser;
    };

    updateUserProfile = async (req: IUpdateProfileRequest, path: string) => {
        const existingUser = await AppDataSource.getRepository(User).findOneBy({
            id: parseInt(req.params.userId)
        })
            .catch(err=>{
                throw new DatabaseError(err, path);
            });
        if(!existingUser){
            throw new NotFoundException("User not found",path);
        }
        UserService.mapUpdatableFields(existingUser, req);
        return await AppDataSource.manager.save(existingUser)
            .catch(err=>{
                throw new DatabaseError(err, path);
            });
    };

    private static mapUpdatableFields(existingUser: User, req: IUpdateProfileRequest) {
        existingUser.firstName = req.body.firstName ? req.body.firstName : existingUser.firstName;
        existingUser.lastName = req.body.lastName ? req.body.lastName : existingUser.lastName;
        existingUser.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : existingUser.phoneNumber;
        existingUser.address = req.body.address ? req.body.address : existingUser.address;
    }

    deleteUserProfile = async (req: IUserIdRequest, path: string) => {
        const existingUser = await AppDataSource.getRepository(User).findOneBy({
            id: parseInt(req.params.userId)
        });
        if(!existingUser){
            throw new NotFoundException("User not found",path);
        }
        await AppDataSource.getRepository(User).delete({
            id: parseInt(req.params.userId)
        });
    };
}