// Select the form with ID
const form = document.querySelector("#searchForm");

// Function to clear existing images
const clearImages = () => {
  const images = document.querySelectorAll("img");
  images.forEach((img) => img.remove());
};

// Add event listener on submit
// Prevent default action (page reload)
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Clear existing images
  clearImages();

  const searchTerm = form.elements.query.value;
  const config = { params: { q: searchTerm } };
  //use Axios to make GET request and store in res variable, config to specify query param
  try {
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    makeImages(res.data);
    // Retrieve value entered by user form input
    form.elements.query.value = "";
  } catch {
    error;
  }
  {
    console.error("Error fetching data:", error);
    alert(
      "An error occured while searching for your TV Show. Please try again later."
    );
  }
});

//Display images with function and call with response data
const makeImages = (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      const img = document.createElement("IMG");
      img.src = result.show.image.medium;
      document.body.append(img);
    }
  }
};
