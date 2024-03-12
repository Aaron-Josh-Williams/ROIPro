export type ZipModel = {
    "post code": string
    "country": string
    "places": PlaceModel[]
}

export type PlaceModel = {
    "place name": string
    "longitude": string
    "state": string
    "state abbreviation": string
    "latitude": string
}

export type Univ = {
    name: string
    country: string
    web_pages: string[]
}