import {
      createHash,
      compareHash
} from "../../../utils/bcrypt/bcrypt.utils.js";

import crypto from "crypto";

const validEmail = (email) => {

      const emailRegex = /^\w+([\.-]?\w+)*@(?:hotmail|outlook|gmail|coder|github)\.(?:|com|es)+$/i;

      return emailRegex.test(email);

};

class ValidationError extends Error {

      constructor(errors) {

            super();
            this.errors = errors;

      }

}

export class GetUserDTO {

      constructor(payload) {

            try {

                  if (!payload) throw new ValidationError(["Se requiere un email"]);

                  for (const key in payload) {

                        if (!payload[key]) throw new ValidationError([`Se requiere ${key}`]);

                  };

                  if (payload.email !== undefined) {

                        if (!validEmail(payload.email)) throw new ValidationError(["Se requiere un email valido"]);

                  } else {

                        if (!validEmail(payload)) throw new ValidationError(["Se requiere un email valido"]);

                  }

                  this.email = payload.email ? payload.email : payload;
                  this.id = payload.id ? payload.id : '';
                  this.password = payload.password ? payload.password : '';

            } catch (error) {

                  if (error instanceof ValidationError) return {
                        errors: error.errors
                  };
            }
      }

};

export class LoadUserDTO {

      constructor(payload, user) {

            try {

                  if (!payload || !user) throw new ValidationError(["El usuario que se intenta cargar, no existe"]);

                  const executeValidation = payload.password && user ? true : false;

                  if (executeValidation) {

                        const compare = compareHash(payload.password, user);

                        if (!compare) throw new ValidationError(["Contraseña incorrecta"]);

                  };

                  if (!validEmail(payload.email) || !validEmail(user.email)) throw new ValidationError(["Se requiere un email valido"]);

                  this.email = user.email;
                  this._id = user._id;
                  this.age = user.age;
                  this.first_name = user.first_name;
                  this.last_name = user.last_name;
                  this.phone = user.phone;
                  this.role = user.role ? user.role.toUpperCase() : 'USER';


            } catch (error) {

                  if (error instanceof ValidationError) return {
                        errors: error.errors
                  };
            }



      }

};

export class SaveUserDTO {

      constructor(payload) {

            try {

                  for (const key in payload) {

                        if (!payload[key] && key !== "phone") throw new ValidationError([`Se requiere ${key}`]);

                  };

                  if (payload.password && payload.password.length < 8) throw new ValidationError(["La contraseña debe tener al menos 8 caracteres"]);

                  if (payload.password !== payload.confirm_password) throw new ValidationError(["Las contraseñas no coinciden"]);

                  if (!validEmail(payload.email)) throw new ValidationError(["Se requiere un email valido"]);

                  const hashedPassword = createHash(payload.password);

                  this.first_name = payload.first_name;
                  this.last_name = payload.last_name;
                  this.email = payload.email.toLowerCase();
                  this.age = payload.age;
                  this.password = hashedPassword;
                  this.role = payload.role ? payload.role.toUpperCase() : 'USER';
                  this.phone = payload.phone;

            } catch (error) {

                  if (error instanceof ValidationError) return {
                        errors: error.errors
                  };
            }

      };

};

export class UpdateUserDTO {

      constructor(updatedPayload, payloadToUpdate) {

            try {

                  if (updatedPayload.email && !validEmail(updatedPayload.email)) throw new ValidationError(["Se requiere un email valido"]);

                  if (updatedPayload.password && updatedPayload.password.length < 8) throw new ValidationError(["La contraseña debe tener al menos 8 caracteres"]);

                  if (!payloadToUpdate) throw new ValidationError(["El usuario que se intenta actualizar, no existe"]);

                  const executeValidation = updatedPayload.password && payloadToUpdate ? true : false;

                  if (executeValidation) {

                        const compare = compareHash(updatedPayload.password, payloadToUpdate);

                        if (!compare) throw new ValidationError(["Contraseña incorrecta"]);

                  };

                  for (const key in updatedPayload) {

                        if (updatedPayload[key] && key !== "password" && key !== "_id") payloadToUpdate[key] = updatedPayload[key];

                  };

                  this._id = payloadToUpdate._id;
                  this.first_name = payloadToUpdate.first_name;
                  this.last_name = payloadToUpdate.last_name;
                  this.email = payloadToUpdate.email;
                  this.age = payloadToUpdate.age;
                  this.password = payloadToUpdate.password;
                  this.role = payloadToUpdate.role ? payloadToUpdate.role.toUpperCase() : 'USER';
                  this.phone = payloadToUpdate.phone ? payloadToUpdate.phone : '';
                  this.password_reset_token = payloadToUpdate.password_reset_token ? payloadToUpdate.password_reset_token : '';
                  this.password_reset_expires = payloadToUpdate.password_reset_expires ? payloadToUpdate.password_reset_expires : '';

            } catch (error) {

                  if (error instanceof ValidationError) return {
                        errors: error.errors
                  };
            }

      }

}

export class DeleteUserDTO {

      constructor(payload, userToDelete) {

            try {

                  if (!payload || !userToDelete) throw new ValidationError(["El usuario que se intenta eliminar, no existe"]);

                  if (!validEmail(payload.email)) throw new ValidationError(["Se requiere un email valido"]);

                  if (payload.password !== payload.confirm_password) throw new ValidationError(["Las contraseñas no coinciden"]);

                  const executeValidation = payload.password && userToDelete ? true : false;

                  if (executeValidation) {

                        const compare = compareHash(payload.password, userToDelete);

                        if (!compare) throw new ValidationError(["Contraseña incorrecta"]);

                  };

                  this.email = payload.email;
                  this.password = payload.password;

            } catch (error) {

                  if (error instanceof ValidationError) return {
                        errors: error.errors
                  };

            }

      }

};

export class LoadAdminDTO {

      constructor(payload, admin) {

            try {

                  if (!payload || !admin) throw new ValidationError(["El usuario que se intenta cargar, no existe"]);

                  for (const key in payload) {

                        if (!payload[key]) throw new ValidationError([`Se requiere ${key}`]);

                  };

                  if (payload.email !== admin.email) throw new ValidationError(["El usuario que se intenta cargar, no existe"]);

                  const executeValidation = payload.password && admin ? true : false;

                  if (executeValidation) {

                        const compare = compareHash(payload.password, admin);

                        if (!compare) throw new ValidationError(["Contraseña incorrecta"]);

                  };

                  this.email = admin.email;
                  this.role = admin.role.toUpperCase();
                  this.first_name = admin.first_name;
                  this.last_name = admin.last_name;

            } catch (error) {

                  if (error instanceof ValidationError) return {
                        errors: error.errors
                  };

            }

      };

};

export class CreateResetTokenDTO {

      constructor(payload) {

            try {

                  if (!payload) throw new ValidationError(["El usuario que se intenta cargar, no existe"]);

                  if (!validEmail(payload.email)) throw new ValidationError(["Se requiere un email valido"]);

                  const token = crypto.randomBytes(20).toString('hex');

                  const expires = new Date();

                  expires.setHours(expires.getHours() + 1);

                  this.email = payload.email;
                  this.first_name = payload.first_name;
                  this.last_name = payload.last_name;
                  this.email = payload.email;
                  this.age = payload.age;
                  this.role = payload.role ? payload.role.toUpperCase() : 'USER';
                  this.phone = payload.phone;
                  this.password = payload.password;
                  this.password_reset_token = token;
                  this.password_reset_expires = expires;

            } catch (error) {

                  if (error instanceof ValidationError) return {
                        errors: error.errors
                  };

            }

      };

}

export class ResetPasswordDTO {

      constructor(payload, user) {

            try {

                  if (!payload || !user) throw new ValidationError(["El usuario que se intenta cargar, no existe"]);

                  if (!validEmail(payload.email)) throw new ValidationError(["Se requiere un email valido"]);

                  if (payload.password.length < 8) throw new ValidationError(["La contraseña debe tener al menos 8 caracteres"]);

                  if (payload.password !== payload.confirm_password) throw new ValidationError(["Las contraseñas no coinciden"]);

                  const executeValidation = payload.password && user.password ? true : false;

                  if (executeValidation) {

                        const compare = compareHash(payload.password, user);

                        if (compare) throw new ValidationError(["La contraseña debe ser diferente a la anterior"]);

                  };

                  const hashedPassword = createHash(payload.password);

                  this.email = user.email;
                  this.first_name = user.first_name;
                  this.last_name = user.last_name;
                  this.email = user.email;
                  this.age = user.age;
                  this.role = user.role ? user.role.toUpperCase() : 'USER';
                  this.phone = user.phone;
                  this.password = hashedPassword;
                  this.passwordResetToken = user.passwordResetToken;
                  this.passwordResetExpires = user.passwordResetExpires;

            } catch (error) {

                  if (error instanceof ValidationError) return {
                        errors: error.errors
                  };

            };

      };

};