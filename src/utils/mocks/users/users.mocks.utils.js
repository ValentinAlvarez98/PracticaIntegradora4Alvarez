import {
      Faker,
      faker,
      es
}
from '@faker-js/faker';

const customFaker = new Faker({
      locale: [es]
});

export const generateUsers = () => {

      const role = 'user';

      const dateCreated = Date.now();

      return {

            _id: customFaker.database.mongodbObjectId(),
            first_name: customFaker.person.firstName(),
            last_name: customFaker.person.lastName(),
            email: customFaker.internet.email(),
            age: customFaker.number.int({
                  min: 18,
                  max: 100
            }),
            password: customFaker.internet.password(),
            role,
            phone: faker.phone.number('+598 9' + `${customFaker.number.int({
                  min: 1,
                  max: 9
            })}` + '#######'),
            date_created: dateCreated,

      }

}