// Publishing third party oauth service specifically to client
Meteor.publish('userData', function() {
    let currentUser;
    currentUser = this.userId;
    if (currentUser) {


        return Meteor.users.find({
            _id: currentUser
        }, {
            fields: {
                // Default
                "emails": 1,
                // Created profile property
                "profile": 1,
                // Created roles property

            }
        });
    } else {
        return this.ready();
    }
});

Meteor.publish( 'allUserData', function(){
    return Meteor.users.find({_id: this.userId});
});


Meteor.publish('Meteor.users.company', function ({ userIds }) {


    // Select only the users that match the array of IDs passed in
    const selector = {
        _id: { $in: userIds }
    };

    // Only return one field, `initials`
    const options = {
        fields: {
            company: 1,
        }
    };

    const company = Meteor.users.find(selector, options);
    console.log('Company' + company.fetch().toString()  );

    return company;
});

Meteor.publish('Meteor.users.sex', function ({ userIds }) {

    const selector = {
        _id: { $in: userIds }
    };

    const options = {
        fields: {
            sex: 1,
        }
    };

    const sex = Meteor.users.find(selector, options);
    console.log('Sex' + sex.fetch().toString() );

    return sex;
});

Meteor.methods({
    'users.userUpdate': function (id, editedUser) {
        // Update account
        Meteor.users.update(id, {
            $set: {
                'username': editedUser.username,
                'company' : editedUser.company,
                'sex' : editedUser.sex,
                'emails[0].address' : editedUser.email,
                'dateOfBirth' : editedUser.dateOfBirth
            }
        });
        return true;
    },

    'users.profileImageUpload': function (userId, image) {

        console.log('Chegou em profileImageUpload ');

        if (userId !=null && this.userId == userId) {

            Meteor.users.update(userId, {
                $set: {
                    ext: image.ext,
                    bin: image.bin
                }
            });
        }
    },
});

