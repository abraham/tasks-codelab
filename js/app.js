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

/***
  * Stores details for a single TaskList. Currently not used mutch.
  */
var TaskList = Backbone.Model.extend({
  // url: function() {
  //   return 'https://www.googleapis.com/plus/v1/people/me?access_token=' + this.get('access_token');
  // },
  initialize: function() {
    console.log('TaskList:Initialize');
  }
});

/***
  * Collection of TaskList models.
  */
var TaskLists = Backbone.Collection.extend({
  // Tells Backbone what model each item should be.
  modle: TaskList,
  // API URL to act on TaskLists. Currently hardcoded to GET lists from server.
  url: function() {
    return 'https://www.googleapis.com/tasks/v1/users/@me/lists?access_token=' + this.get('access_token');
  },
  initialize: function() {
    console.log('TaskLists:Initialize');
  },
  // Takes the server response and modifies it so the array of TaskLists will be set as models.
  parse: function(response) {
    return response.items;
  }
});

/***
  * Attach authentication headers to API requests.
  */
function attacheAuthHeader(xhr, settings) {
  if (!window.account) {
    return;
  }
  if (settings.url.indexOf('https://www.googleapis.com/') === 0 && window.account.get('access_token')) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + window.account.get('access_token'));
  }
}
$.ajaxSetup({
  beforeSend: attacheAuthHeader
});
