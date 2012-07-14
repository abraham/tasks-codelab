/***
  * Callback function called by Google connect button. Must be global.
  * Set with <g:plus callback="authCallback" ... />
  */
function authCallback(result) {
  if (result.error) {
    alert('Error. Auth required');
  } else {
    window.account.set(result).fetch();
  }
}

/***
  * Stores profile and authentication details for the Google Account.
  */
var Account = Backbone.Model.extend({
  //API URL to fetch profile details from.
  url: function() {
    return 'https://www.googleapis.com/plus/v1/people/me?access_token=' + this.get('access_token');
  },
  initialize: function() {
    console.log('Account:Initialize');
    // this.on('change:access_token', this.fetch);
  }
});