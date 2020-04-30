function handleSearch(event) {

  if (event.keyCode == 13) {
    let keyword = document.getElementById("search").value;
    getPics(keyword, showThumbnail);
    event.preventDefault();
  }
}

document.getElementById("search").addEventListener("keydown", handleSearch);

async function getPics(keyword, onSuccess) {
  const res = await fetch(
    "http://35.225.163.234:2301/?url=" + encodeURIComponent("https://wallhaven.cc/api/v1/search?q=" + encodeURIComponent(keyword))
  );

  const { meta, data } = await res.json();
  const pics = data.map(data => {
    return {
      url: data.path,
      thumbnail: data.thumbs.original
    };
  });

  onSuccess(pics);
}

function showThumbnail(pics) {
  var picList = document.getElementById("pic-list");
  picList.innerHTML = "";

  for (let i = 0; i < pics.length; i++) {
    const pic = pics[i];
    picList.innerHTML += '<img src="' + pic.thumbnail + '" class="thumbnail" id="thumbnail' + i + '">';
  }

  document.querySelectorAll(".thumbnail").forEach((element, i) => {
    element.addEventListener("click", function () {
      handleThumbnailClicked(pics[i].url);
    });
  });
}

function handleThumbnailClicked(url) {
  // getPics("girl", showPics);
  let displayPic = document.getElementsByClassName("display-pic")[0];

  displayPic.innerHTML = '<img src="' + url + '">';

  displayPic.style.display = "block";
  displayPic.addEventListener("click", function(){
    displayPic.style.display = "none";
  })
}

// function showPics(pics) {
//   let displayPic = document.getElementsByClassName("display-pic")[0];

//   const pic = pics[0];
//   displayPic.innerHTML += '<img src="' + pic.url + '">';

//   displayPic.style.display = "block";
// }