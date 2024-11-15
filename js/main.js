//
// Place any custom JS here
//
var elem = document.querySelector(".grid");
var msnry = new Masonry(elem, {
  // options
  itemSelector: ".grid-item",
  percentPosition: true,
  columnWidth: ".grid-sizer",
  gutter: 20,
});

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  const galleryItems = document.querySelectorAll(".grid-item");

  // Function to filter gallery items
  function filterGallery(filter) {
    galleryItems.forEach((item) => {
      // Show all items if filter is 'all', else only show items with matching class
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
    msnry.layout();
  }

  // Add click event listeners to each filter button
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button styling
      document
        .querySelector(".filter-buttons .active")
        .classList.remove("active");
      button.classList.add("active");

      // Filter items based on the selected button's data-filter attribute
      const filter = button.getAttribute("data-filter");
      filterGallery(filter);
    });
  });

  // Show all items initially
  filterGallery("all");
});
