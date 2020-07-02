import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default () => {
    Accounts.onCreateUser((options, user) => {
        user.company = options.company ? options.company : '';
        user.sex = options.sex ? options.sex : '';
        user.dateOfBirth = options.dateOfBirth ? options.dateOfBirth : '';
        return user;
    });
}