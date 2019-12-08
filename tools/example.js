const Example = function(data, index) {

  this.data    = data;
  this.element = document.createRange().createContextualFragment('<div class = "example"><h1 class = "example-name">' + data.name + '</h1><div class = "example-links"><a class = "example-link" href = "https://github.com/pothonprogramming/pothonprogramming.github.io/tree/master/content/' + data.path + '" target = "_blank">code</a><a class = "example-link" href = "content/' + data.path + '/' + data.page + '.html' + '" target = "_blank">page</a><a class = "example-link" href = "https://www.youtube.com/watch?v=' + data.vlog + '" target = "_blank">vlog</a></div><p class = "example-note">' + data.note + '</p></div>').children[0];
  this.index = index;

};

Example.prototype = {

};