(() => {

  var html = {

    example_template:  document.getElementById("example-template"),
    example_container: document.getElementById("example-container")

  };

  fetch("data/examples.json").then(response => {

    return response.json();

  }).then(examples => {

    for (var index = 0; index < examples.length; index ++) {

      var example_data     = examples[index];
      var example_fragment = document.importNode(html.example_template.content, true);
      var example_element  = example_fragment.children[0];

      example_element.querySelector(".example-name").innerText = example_data.name;

      example_element.querySelector('a[data-name="code"]').href = "https://github.com/pothonprogramming/pothonprogramming.github.io/tree/master/content/" + example_data.path;
      example_element.querySelector('a[data-name="page"]').href = "content/" + example_data.path + "/" + example_data.page + ".html";
      example_element.querySelector('a[data-name="vlog"]').href = "https://www.youtube.com/watch?v=" + example_data.vlog;

      html.example_container.appendChild(example_element);

    }

  });

  function createExample() {



  }

})();