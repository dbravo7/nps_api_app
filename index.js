'use strict';

function watchForm() {
  $('form').submit(event => {
    event.preventDefault(); 
    // the states variable is an array of state codes 
    const states = stateCodes(event);
    validStateCodes(states);

    const max_num = parseInt($('#js-max-results').val());
    
    getParkInfo(states, max_num);
  });
}

function stateCodes(event) {
  let codes = []; 
  
  codes.push($('#js-state-1').val().toUpperCase());
  codes.push($('#js-state-2').val().toUpperCase());
  codes.push($('#js-state-3').val().toUpperCase());
  const states = codes.filter(ele => ele !== "" );
  return states; 
}

function validStateCodes(states) {
  const stateAbbreviations = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  if (states === undefined || states.length === 0) {
    alert('Please input a state name.'); 
  }

  states.forEach(function(state) {
    if (!(stateAbbreviations.includes(state))) {
      alert('Invalid state name. Please enter abbreviated form of state name.');
    }
  }); 
  
}

function getParkInfo(states, max_num) {
  // const key = "&api_key=3s2cp4J69269b5elC49u4e5cG3xkZMJwTiA5mGJp";
  const queryString = createParamsString(states, max_num);
  const url = "https://developer.nps.gov/api/v1/parks?" + queryString;

  const options = {
    headers: new Headers({
      "X-Api-Key": "3s2cp4J69269b5elC49u4e5cG3xkZMJwTiA5mGJp"})
  };
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('section').addClass('hidden');
      $('#js-error-message').text(`Something went wrong: ${error.message}`);
    });
}

function createParamsString(states, max_num) {
  let string_collection = [];

  for (let i = 0; i < states.length; i++) {
    string_collection.push(`stateCode=${states[i]}`)
  }
  string_collection.push(`limit=${max_num}`);
  return string_collection.join('&');
}

function displayResults(response) {
  console.log(response);
  removeResults();

  for (let i = 0; i < response.data.length; i++) {

    $('.results').append(
      `<li><h3>${response.data[i].fullName}</h3>
        <p>${response.data[i].description}</p> 
        <a href=${response.data[i].url}>Go to website</a>`    
    )}
  $('section').removeClass('hidden');   
}

function removeResults() {
  $('.results').empty();
}

$(watchForm);
