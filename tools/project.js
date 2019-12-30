const Project = function(data) {

  this.data    = data;
  this.element = document.createRange().createContextualFragment('<div class = "project"><span class = "project-name">' + data.name + '</span><nav class = "project-links"><a class = "project-link" href = "https://github.com/pothonprogramming/pothonprogramming.github.io/tree/master/content/' + data.path + '" target = "_blank">code</a><a class = "project-link" href = "content/' + data.path + '/' + data.page + '.html' + '" target = "_blank">page</a><a class = "project-link" href = "https://www.youtube.com/watch?v=' + data.vlog + '" target = "_blank">vlog</a></nav><p class = "project-note">' + data.note + '</p></div>').children[0];

};

Project.prototype = {

};