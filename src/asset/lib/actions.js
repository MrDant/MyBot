const _click = function(node) {
  node.click();
};

const _check = function(node) {
  node.checked = !node.checked;
};

const _hidden = function(node) {
  node.hidden = true;
};

const _delete = function(node) {
  node.remove();
};

const _text = function(node, text) {
  node.value = text;
};

const _password = function(node, text) {
  node.value = text;
};
export { _click, _check, _hidden, _delete, _text, _password };
