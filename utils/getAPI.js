const link = process.env.NODE_ENV === 'production' 
    ? 'https://production.example.com' 
    : 'http://localhost:8080'

const getAPI=()=> link

export default getAPI