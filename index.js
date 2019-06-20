'use strict';

function watchForm() {
  $('form').submit(event => {
    event.preventDefault(); 

    const state = stateCode(event);
    const max_num = parseInt($('#js-max-results').val());
   
    if  (validStateCode(state)) {
      getParkInfo(state, max_num);
    }
  });
}

function stateCode(event) {
  let codes = []; 
  
  codes.push($('#js-state-1').val().toUpperCase());
  const state = codes.filter(ele => ele !== "" );
  return state; 
}

function validStateCode(state) {
  const stateAbbreviations = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  if (!(stateAbbreviations.includes(state[0]))) {
    alert('Invalid state name. Please enter abbreviated form of a state name.');
    return false;
  }
  return true; 
}

function getParkInfo(state, max_num) {
  const key = "3s2cp4J69269b5elC49u4e5cG3xkZMJwTiA5mGJp";
  const url = `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${max_num}&api_key=${key}`;

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
