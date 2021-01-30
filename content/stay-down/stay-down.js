const STAY_DOWN = (function() {

  const buffers = {};
  const constructors = {};
  const images = {};
  const methods = {};
  const states = {};
  const tools = {};

  function getBuffer(name) { return buffers[name]; }
  function getConstructor(name) { return constructors[name]; }
  function getImage(name) { return images[name]; }
  function getMethod(name) { return methods[name]; }
  function getState(name) { return states[name]; }
  function getTool(name) { return tools[name]; }

  function setBuffer(name, object) { buffers[name] = object; }
  function setConstructor(name, $function) { constructors[name] = $function; }
  function setImage(name, object) { images[name] = object; }
  function setMethod(name, $function) { methods[name] = $function; }
  function setState(name, object) { states[name] = object; }
  function setTool(name, object) { tools[name] = object; }

  return { getBuffer, getConstructor, getImage, getMethod, getState, getTool, setBuffer, setConstructor, setImage, setMethod, setState, setTool };

})();