const weatherForm = document.querySelector('form')
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const searchInput = document.querySelector('input')
    const searchAddress = searchInput.value

    const forecastParagraph = document.querySelector('#forecast')
    forecastParagraph.textContent = 'Loading...'
    
    fetch(`/weather?address=${searchAddress}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                // console.log(data.error)
                forecastParagraph.textContent = data.error
            } else {
                // console.log(data)
                forecastParagraph.textContent = `It's currently ${data.forecast} in "${data.location}" and the temperature is ${data.temperature}`
                searchInput.value = ''
            }
        })
    })
})