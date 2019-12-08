(() => {

  const example_container = document.getElementById("main-example-container");
  const filter_query      = document.getElementById("main-filter-query");

  const examples = [];

  function filter(query) {

    query = query.replace(/[\n\r\v]/g, ''); // filter newline and carriage return

    for (var index = 0; index < examples.length; index ++) {

      var example = examples[index];

      var regexp = new RegExp(query, 'i');

      if (regexp.test(example.data.name) || regexp.test(example.data.tags) || regexp.test(example.data.note) || regexp.test(example.data.date)) example_container.appendChild(example.element);
      else if (example.element.parentElement) example_container.removeChild(example.element);

    }

  }

  fetch("data/examples.json").then(response => {

    return response.json();

  }).then(data => {

    for (var index = 0; index < data.length; index ++) examples[index] = new Example(data[index]);

    filter("");

  });

  window.addEventListener("click", (event) => {

      if (event.target.id == "main-filter-button") filter(filter_query.innerText);

  });

  window.addEventListener("keydown", (event) => {

    if (event.keyCode == 13) {
     
      event.preventDefault();
      filter(filter_query.innerText);

    }

  });

})();