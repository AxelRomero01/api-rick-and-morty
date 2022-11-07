const d = document,
$main = d.querySelector("main"),
$links = d.querySelector(".links");

let url = `https://rickandmortyapi.com/api/character`;

async function loadAPI(url) {
  try {
    $main.innerHTML = `<div class="loader"></div>`;

    let res = await fetch(url);
    //console.log(res);
    let json = await res.json();
    let $template = "";
    let $prevLink;
    let $nextLink;

    console.log(json);
    
    if(!res.ok) throw{status:res.status, statusText:res.statusText}

    for (let i = 0; i < json.results.length; i++) {
      //console.log(json.results[i]);
      try {
        let res = (json.results[i]);
        
        console.log(res);

        //if(!res.ok) throw{status:res.status, statusText:res.statusText}

        $template += `
          <figure class="card">
            <img src="${res.image}"/>
            <p>${res.name}</p>
            <p>${res.species}</p>
            <p>${res.gender}</p>
            <p>${res.status}</p>
          </figure>
        `

      } catch (err) {
        //console.log(err);
        let message = err.statusText || "Ocurrio un error";
        $template += `
          <figure>
            <figcaption>Error${err.status}:${message}</figcaption>
          </figure>
          `;
      }
    }

    $main.innerHTML = $template;
    $prevLink = json.info.prev ? `<a href="${json.info.prev}">⏮️</a>`:"";
    $nextLink = json.info.next ? `<a href="${json.info.next}">⏭️</a>`:"";
    $links.innerHTML = $prevLink + " " + $nextLink;

  } catch (err) {
    console.log(err);
    let message = err.statusText || "Ocurrio un error";
    $main.innerHTML = `<p>Error ${err.status}:${message}</p>`;
  }
}

d.addEventListener("DOMContentLoaded", e => loadAPI(url));

d.addEventListener("click", e => {
  if(e.target.matches(".links a")){
      e.preventDefault();
      loadAPI(e.target.getAttribute("href"));
  }
})
