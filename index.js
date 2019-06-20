'use strict';

$(document).ready(function () {


  $('form').submit(event => {
    event.preventDefault(); 
    // the const states is an array of state codes 
    const states = stateCodes(event);
    validStateCodes(states);

    const max_num = parseInt($('#js-max-results').val());
  
  })

  function stateCodes(event) {
    let codes = []; 
  
    codes.push($('#js-state').val());
    return codes; 
  }

  function validStateCodes(states) {
    const stateAbbreviations = [
      'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
      'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
      'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
      'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
      'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    states.forEach(function(state) {
      if (!(stateAbbreviations.includes(state))) {
        alert('Invalid state name. Please enter abbreviated form of state name');
      }
    }); 

  }

});

//get function
  // Add key to HTTP header
  // compose url
  // fetch with url and header
  // call display results

// The user must be able to search for parks in one or more states.
// The user must be able to set the max number of results, with a default of 10.
// The search must trigger a call to NPS's API.
// The parks in the given state must be displayed on the page.Include at least:
// Full name
// Description
// Website URL
// The user must be able to make multiple searches and see 
// only the results for the current search.