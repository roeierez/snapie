/*
We will give information here on what the user can or can not do.
It is now implemented naively and should be backed up with a proper configured running server.
Later on we can implement this based on user roles and permissions.
 */

function hasRole (role) {
    return window.location.search.indexOf(`${role}=true`) >= 0;
}

module.exports = {
    siteEditor: hasRole('siteEditor')
}
