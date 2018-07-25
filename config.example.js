module.exports = {
    // The port to run the webserver on.
    port: 80,
    // Make this really long to make it impossible that an unauthorised request goes through.
    key: 'super secret key',
    // Optional branch name. If set, commands will only fire if the name of the branch is contained in this array.
    branches: [],
    // These will execute sequentially.
    commands: [
        'echo hello >> .somefile'
    ]
};