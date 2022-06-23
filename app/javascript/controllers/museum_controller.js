import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["lng", "lat", "result"]

  connect() {
    console.log("Museum controller connected!")
  }

  updateResult(data) {
    this.resultTarget.innerText = null
    data.features.forEach((museum) => {
      const museumResult = `<li>${museum.place_name}</li>`
      this.resultTarget.insertAdjacentHTML("beforeend", museumResult)
    });
  }

  search(event) {
    event.preventDefault()
    const lat = this.latTarget.value
    const lng = this.lngTarget.value

    const query = (`https://api.mapbox.com/geocoding/v5/mapbox.places/museum.json?limit=10&type=poi&proximity=${lng},${lat}&access_token=pk.eyJ1Ijoid3ZhbGEiLCJhIjoiY2wzNGV0MDZrMDNxNDNqcDVydW8wcGd6MyJ9.5z3qs54hdI3hGslqjk1wNw`)
    fetch(query)
      .then(response => response.json())
      .then(data => this.updateResult(data))
  }
}
