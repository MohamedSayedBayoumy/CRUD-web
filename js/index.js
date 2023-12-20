if (localStorage.getItem("bookmarks")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
}

var site = document.getElementById("siteName");
var url = document.getElementById("urlSite");

var bookmarks = [];

function checkName() {
  var Regex = /^\w{3,}(\s+\w+)*$/;
  return Regex.test(site.value);
}
function checkUrl() {
  var Regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  return Regex.test(url.value);
}

function check() {
  if (!checkName()) {
    alert("Website is not vaild");
  } else if (!checkUrl()) {
    alert("URL Website is not vaild");
  }
}

document.getElementById("submitBtn").onclick = function () {
  if (checkName() && checkUrl()) {
    add();
    reset();
  } else {
    check();
  }
};

function add() {
  var bookmark = {
    site: site.value,
    url: url.value,
  };

  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  display(bookmarks);
}

function display(list) {
  var container = "";

  for (var i = 0; i < bookmarks.length; i++) {
    container += `
        <tr>
            <td>${i + 1}</td>
            <td>${list[i].site}</td>
            <td>
            <a href="${
              list[i].url
            }" target="_blank" type="button" class="btn btn-visit" id="btnVisit">
            <i class="fa-solid fa-eye pe-2"></i>
            Visit</a>
            </td>
            <td>
                <button  class="btn btn-danger" onclick='deleteItems(${i})'>
                    <i class="fa-solid fa-trash-can pe-2"></i>
                    Delete
                </button>
            </td>
        </tr>
        `;
  }
  document.getElementById("tableRow").innerHTML = container;
}

function deleteItems(item) {
  bookmarks.splice(item, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  display(bookmarks);
}

function reset() {
  url.value = "";

  site.value = "";
}
