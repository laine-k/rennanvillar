// ── Masonry grid (portfolio pages only) ──────────────────
var elem = document.querySelector(".grid");

if (elem) {
  var msnry = new Masonry(elem, {
    itemSelector:    ".grid-item",
    percentPosition: true,
    columnWidth:     ".grid-sizer",
    gutter:          20,
  });

  imagesLoaded(".grid", function () {
    msnry.layout();
  });
}

// ── Gallery filter (portfolio pages only) ────────────────
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  const galleryItems  = document.querySelectorAll(".grid-item");

  if (!filterButtons.length) return;

  function filterGallery(filter) {
    galleryItems.forEach(function (item) {
      item.style.display =
        filter === "all" || item.classList.contains(filter) ? "block" : "none";
    });
    if (elem && msnry) msnry.layout();
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var current = document.querySelector(".filter-buttons .active");
      if (current) current.classList.remove("active");
      button.classList.add("active");
      filterGallery(button.getAttribute("data-filter"));
    });
  });

  filterGallery("all");
});
