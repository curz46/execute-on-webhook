module.exports = {
    // The port to run the webserver on.
    port: 80,
    // Make this really long to make it impossible that an unauthorised request goes through.
    key: "super secret key",
    // These will execute sequentially.
    commands: [
        'echo hello >> .somefile'
    ]
};