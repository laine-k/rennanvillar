const fs = require("fs");
const path = require("path");

// Specify the directory where your images are stored
const imagesDir = path.join(__dirname, "css/assets/images/pipes/stands"); // Modify path as needed

// Function to generate HTML for each image in the folder
function generateHTML() {
  // Read the contents of the images directory
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    // Filter only image files (you can adjust this filter based on your image extensions)
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    // Start the HTML structure
    let htmlContent = '<div class="grid-container">\n';

    // Loop through each image file and generate HTML
    imageFiles.forEach((file) => {
      const imagePath = path.join("css/assets/images/pipes/stands", file); // Relative path for the img src
      const className = "stand"; // You can change this dynamically based on the folder or file

      // Generate the HTML for the current image
      htmlContent += `
      <div class="grid-item ${className}">
        <img src="${imagePath}" alt="${file}" />
      </div>\n`;
    });

    // Close the grid-container div
    htmlContent += "</div>";

    // Write the generated HTML to a new file
    fs.writeFile(
      path.join(__dirname, "output.html"),
      htmlContent,
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing HTML file:", writeErr);
          return;
        }
        console.log("HTML file generated successfully!");
      }
    );
  });
}

// Call the function to generate HTML
generateHTML();
