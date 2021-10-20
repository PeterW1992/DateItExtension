let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

var tab_title = '';
function display_h1 (results){
  h1=results;
  document.querySelector("#header").innerHTML = "<p>tab title: " + tab_title + "</p><p>dom h1: " + h1 + "</p>";
}

function display_content (results){
  contents=results;
  document.querySelector("#content").innerHTML = "contents: " + contents;
}

function getHeaderContent (){
	return document.querySelector("h1").textContent;
}

function getBodyContent (){
	return document.querySelector(".div").innerHTML;
}

chrome.tabs.query({active: true}, function(tabs) {
  var tab = tabs[0];
  tab_title = tab.title;
  chrome.scripting.executeScript(
  {
	  target: {tabId: tab.id, allFrames: true},
	  func: getHeaderContent
  }, display_h1);
});

chrome.tabs.query({active: true}, function(tabs) {
  var tab = tabs[0];
  tab_title = tab.title;
  chrome.scripting.executeScript(
  {
	  target: {tabId: tab.id, allFrames: true},
	  func: getBodyContent
  }, display_content);
});