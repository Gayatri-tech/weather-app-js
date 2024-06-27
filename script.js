const baseUrl = "http://api.weatherapi.com/v1";
const endpoint = "/current.json";
const apiKey = "c8951b16fc4b4a108b4104611242606";
let query;

const queryInput = document.querySelector("input");
queryInput.addEventListener("change", () => {
  query = queryInput.value;

  const url = `${baseUrl}${endpoint}?key=${apiKey}&q=${query}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to retrieve data: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const weatherDataBox = document.getElementById("content");
      weatherDataBox.innerHTML = `
        <img
          src=${data.current.condition.icon}
          width="100"
          alt="weather-icon"
          class="m-auto"
        />
        <p class="temp text-5xl font-semibold">${data.current.temp_c}&deg; C</p>
        <p class="temp-details text-2xl">${data.current.condition.text}</p>
        <div class="location text-xl flex items-center justify-center">
          <img src="./media/location.svg" alt="location" />
          <span>${data.location.name}, ${data.location.country}</span>
      </div>`;

      document.getElementById(
        "feels-like"
      ).innerHTML = `${data.current.feelslike_c}`;
      document.getElementById(
        "humidity"
      ).innerHTML = `${data.current.humidity}`;
    });
});
