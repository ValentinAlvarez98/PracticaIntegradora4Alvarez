import {
      getDAOS
} from "../../daos/index.daos.js";

import {
      getDTOS
} from "../../dtos/index.dtos.js";

const {
      SaveUserDTO,
      LoadUserDTO,
      GetUserDTO,
      UpdateUserDTO,
      DeleteUserDTO,
      LoadAdminDTO,
      CreateResetTokenDTO,
      ResetPasswordDTO
} = getDTOS();

const {
      usersMongoDAO,
      usersMemoryDAO
} = getDAOS();

export class UsersRepository {

      constructor() {

            this.dao = usersMongoDAO;
            this.dao.memory = usersMemoryDAO;

      };

      async getOne(payload) {

            const userPayload = new GetUserDTO(payload);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            const user = await this.dao.getOne(userPayload);

            return user;

      };

      async loginOne(payload, user) {

            const userPayload = new LoadUserDTO(payload, user);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            return userPayload;

      };

      async addOne(payload) {

            const userPayload = new SaveUserDTO(payload);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            const user = await this.dao.addOne(userPayload);

            return user;

      };

      async updateOne(email, payload) {

            const user = new GetUserDTO(email);

            const userToUpdate = await this.dao.getOne(user);

            const updatedPayload = new UpdateUserDTO(payload, userToUpdate);

            if (updatedPayload.errors) throw new Error(JSON.stringify(updatedPayload.errors));

            return await this.dao.updateOne(email, updatedPayload);

      };

      async deleteOne(payload) {

            const userToDelete = await this.dao.getOne(payload);

            const payloadToDelete = new DeleteUserDTO(payload, userToDelete);

            return await this.dao.deleteOne(payloadToDelete, payloadToDelete.email);

      };

      async loginAdmin(payload) {

            const admin = await this.dao.memory.getAdmin();

            const userPayload = new LoadAdminDTO(payload, admin);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            return userPayload;

      };

      async createResetToken(payload) {

            const userPayload = new GetUserDTO(payload.email);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            const user = await this.dao.getOne(userPayload);

            const userToUpdate = new CreateResetTokenDTO(user);

            if (userToUpdate.errors) throw new Error(JSON.stringify(userToUpdate.errors));

            return await this.dao.updateOne(payload.email, userToUpdate);

      };

      async resetPassword(payload) {

            const userPayload = new GetUserDTO(payload.email);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            const userToUpdate = await this.dao.getOne(userPayload);

            const updatedUser = new ResetPasswordDTO(payload, userToUpdate);

            if (updatedUser.errors) throw new Error(JSON.stringify(updatedUser.errors));

            return await this.dao.updateOne(payload.email, updatedUser);

      };

}