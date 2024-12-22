const link = process.env.NODE_ENV === 'production' 
    ? 'https://production.example.com' 
    : 'http://localhost:8080'

export const getAPI=()=> link

export const getAPIRequest=(url)=> `${link}/api${url}`

