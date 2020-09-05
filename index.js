(() => {

  const filter_query       = document.getElementById("main-filter-query");
  const project_container  = document.getElementById("main-project-container");
  const projects_container = document.getElementById("main-projects-container");
  const logs_container     = document.getElementById("main-logs-container");

  const projects = [];
  const logs     = [];

  function clickOrTouchStart(event) {

    if (event.target.id == "main-filter-button") {
      
      event.preventDefault();
      
      filter(filter_query.innerText);

    }

  }

  function emptyContainer(container) {

    while(container.firstChild) container.removeChild(container.firstChild);

  }

  function fillContainer(container, elements) {

    while(elements.length != 0) container.appendChild(elements.shift());

  }

  function filter(query) {

    query = query.replace(/[\n\r\v]/g, ''); // filter newline and carriage return

    var elements = [];

    for (var index = 1; index < projects.length; index ++) {

      var project = projects[index];

      var regexp = new RegExp(query, 'i');

      if (regexp.test(project.data.name) || regexp.test(project.data.tags) || regexp.test(project.data.note) || regexp.test(project.data.date)) elements.push(project.element);

    }

    emptyContainer(projects_container);
    fillContainer(projects_container, elements);

  }

  function keyDown(event) {

    if (event.keyCode == 13) {
     
      event.preventDefault();
      filter(filter_query.innerText);

    }

  }

  // Open all links in new tab
  (() => {

    const links = document.querySelectorAll('a');
  
    for (var index = links.length - 1; index > -1; -- index) {
     
      var link = links[index];
      if (link.target === '') link.setAttribute('target', '_blank');

    }
  
  })();
  

  fetch("data/logs.json").then(response => {

    return response.json();

  }).then(data => {

    for (var index = 0; index < data.length; index ++) logs[index] = new Log(data[index]);

    logs_container.appendChild(logs[0].element);

  });

  fetch("data/projects.json").then(response => {

    return response.json();

  }).then(data => {

    for (var index = 0; index < data.length; index ++) projects[index] = new Project(data[index]);

    project_container.appendChild(projects[0].element);

    filter("");

  });

  window.addEventListener("touchstart", clickOrTouchStart);

  window.addEventListener("click", clickOrTouchStart);

  window.addEventListener("keydown", keyDown);

})();