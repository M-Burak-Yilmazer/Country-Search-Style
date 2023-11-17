const searchInput = document.querySelector("#search");
const searchDiv = document.querySelector("#searchDiv");
const countries = document.querySelector(".countries");
const audio = document.querySelector("#myaudio");
const memleketim = document.querySelector("#memleketim");
const header = document.querySelector("#title");

const getFetch = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  showData(data);
  getData(data);
};

const countryArray = [];
const showData = (data) => {
  data.forEach((element) => countryArray.push(element.name.common));
  searchDiv.addEventListener("click", (e) => {
    if (e.target.textContent == "TURKEY") {
      audio.play();
      header.style = "color:black !important; font-weight:500";
      document.body.style = "background: url(./assets/100.png);";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundSize = "cover";
       document.body.style.opacity=0;
    }

    const clickValue = e.target.textContent;
    data.filter((element) => element.name.common.toUpperCase() === clickValue)
        .forEach(
          ({
            name,
            capital,
            region,
            currencies,
            flags: { png },
            languages,
            population,
            borders,
            maps: { googleMaps },
          }) => {
            countries.innerHTML = `
<div class="card shadow-lg" style="width: 22rem">
            <img src="${png}" class="card-img-top shadow" alt="..." />
            <div >
              <h5 class="p-2 text-center">${name.official.toUpperCase()}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> Region:</span> ${region}
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-landmark"></i>
                <span class="fw-bold"> Capitals:</span> ${capital}
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-comments"></i>
                <span class="fw-bold"> Languages:</span> ${Object.values(
                  languages
                )}
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-money-bill-wave"></i>
                <span class="fw-bold"> Currencies:</span> ${
                  currencies[Object.keys(currencies)[0]].name
                } ; ${currencies[Object.keys(currencies)[0]].symbol}
              </li>
              <li class="list-group-item">
              <i class="fa-solid fa-people-group"></i></i>
              <span class="fw-bold"> Population:</span> ${population.toLocaleString()}
            </li>
              <li class="list-group-item">
              <i class="fa-sharp fa-solid fa-road-barrier"></i>
              <span class="fw-bold"> Borders:</span>  ${borders || null}
            </li>
            </li>
            <li class="list-group-item">
              <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Map:</span> <a href="${googleMaps}" target='_blank'> Go to google map</a> </li>
            </ul>
          </div>
`;
          }
        )
    ;
    searchDiv.innerHTML = "";
    searchInput.value = "";
    searchInput.focus();
  });
};

searchInput.addEventListener("input", () => {
  // Her input değişikliğinde önceki sonuçları temizle
  searchDiv.innerHTML = "";
  audio.pause();
  document.body.style.background = "";

  let userInput = searchInput.value;
  countryArray
    .map((element) => element.toUpperCase())
    .filter((element) => element.includes(userInput.toUpperCase()))
    .forEach((item) => {
      const spanCountry = document.createElement("span");
      text = document.createTextNode(item);
      spanCountry.appendChild(text);
      searchDiv.appendChild(spanCountry);
    });
});

window.addEventListener("load", () => {
  getFetch();
});

function getData(data) {
  let country = data[232];
  countries.innerHTML = `
    <div class="card shadow-lg" style="width: 22rem">
            <img src="${
              country.flags.png
            }" class="card-img-top shadow" alt="..." />
            <div >
              <h5 class="p-2 text-center">${country.name.common}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> Region:</span> ${
                  country.region
                }
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-landmark"></i>
                <span class="fw-bold"> Capitals:</span> ${country.capital}
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-comments"></i>
                <span class="fw-bold"> Languages:</span> ${Object.values(
                  country.languages
                )}
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-money-bill-wave"></i>
                <span class="fw-bold"> Currencies:</span> 
                 ${country.currencies[Object.keys(country.currencies)[0]].name},
                 ${
                   country.currencies[Object.keys(country.currencies)[0]].symbol
                 }
              </li>
              <li class="list-group-item">
              <i class="fa-solid fa-people-group"></i></i>
              <span class="fw-bold"> Population:</span> ${country.population.toLocaleString()}
            </li>
              <li class="list-group-item">
              <i class="fa-sharp fa-solid fa-road-barrier"></i>
              <span class="fw-bold"> Borders:</span>  ${country.borders || null}
            </li>
            </li>
            <li class="list-group-item">
              <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Map:</span> <a href="${
                country.maps.googleMaps
              }" target='_blank'> Go to google map</a> </li>
            </ul>
          </div>
    `;
}
