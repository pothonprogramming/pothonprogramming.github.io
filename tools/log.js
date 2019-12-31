const Log = function(data) {

  this.data    = data;
  this.element = document.createRange().createContextualFragment('<div class = "log"><span class = "log-date">' + data.date + '</span><span class = "log-name">' + data.name + '</span><p class = "log-note">' + data.note + '</p></div>').children[0];

};

Log.prototype = {

};