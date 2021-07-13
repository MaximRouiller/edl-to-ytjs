const meow = require('meow');

const flags = {
    path: {
        type: 'string',
        alias: 'p',
        isRequired: true
    }
};

const options = {
    inferType: true,
    description: false,
    hardRejection: false,
    flags
};

module.exports = meow('edl-to-yt [-p|--path] <path.edl>', options);
