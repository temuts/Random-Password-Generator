var specialCharacters = ['!', '@', '#','%','^','&','*','=','+','-','<','?','>'] ;

var numbericCharacters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

var lowerCasedCharacters = ['q', 'w', 'e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];

var upperCasedCharacters = ['Q', 'W', 'E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N', 'M'];

//A function to generate a random number between 0 to max
function randomNumberGenerator (max) {
  //
  return Math.floor(Math.random*(max+1));

}

//A function to choose a random element from an array
function randomSelector(inputArray){
  if(inputArray && inputArray.length){
    var randomIndex= randomNumberGenerator(inputArray.length-1);
    return inputArray[randomIndex];                                                     
  } else {
    return null;
  }
}


function shuffleString(input){
  var stringArray = input.split("");
  
  console.log(stringArray);

  for (var i=stringArray.length-1; i>=0; i--){
    var randomIndex = randomNumberGenerator(stringArray.length);
    console.log(`swap character at index ${i} with character at index ${randomIndex}`);

    var temp = stringArray[i];
    stringArray[i]=stringArray[randomIndex];
    stringArray[randomIndex]=temp;
  }
  return stringArray.join("");

}

function getPasswordOptions(){
  var passwordLength=parseInt(prompt('How many characters would you like your password to contain?'), 10);
  if (Number.isNaN(passwordLength)){
    alert('Password must be provided as a number');
    return null;
  }

  if (passwordLength < 8){
    alert ('Password length must be at least 8 characters');
    return null;
  }

  if (passwordLength > 128){
    alert('Password length must be less than 129 characters');
    return null;
  }

  var hasSpecialCharacters = confirm (
    'Click OK to confirm including special characters.'
  );
  console.log('Special Characters', hasSpecialCharacters);
  var hasNumbericCharacters = confirm (
    'Click OK to confirm including numeric characters.'
  );

  var hasLowerCasedCharacters = confirm (
    'Click OK to confirm including lowercase characters.'
  );

  var hasUpperCasedCharacters = confirm (
    'Click OK to confirm including uppercase characters.'
  );

  console.log(`result: ${passwordLength}, type: ${typeof passwordLength}`);

  return {
    passwordLength, 
    hasSpecialCharacters,
    hasNumbericCharacters,
    hasLowerCasedCharacters,
    hasUpperCasedCharacters,

  }

  return "Is it working?"

}

function generatePassword(){

  var passwordOptions = getPasswordOptions();
  console.log(passwordOptions);
  return buildPassword(passwordOptions);

}

function buildPassword(passwordOptions){

  if (!passwordOptions){
    return "Invalid Password Option!";
  }

  //All characters that we can choose from
  var availableCharacters = [];
  //List of character that we should guarantee they exist
  var gauranteedCharacters = [];
  //List of characters for the final result
  var result = [];

  if(passwordOptions.hasNumbericCharacters){
    availableCharacters = availableCharacters.concat(numbericCharacters);
    gauranteedCharacters.push(randomSelector(numbericCharacters));
  }

  if(passwordOptions.hasLowerCasedCharacters){
    availableCharacters = availableCharacters.concat(lowerCasedCharacters);
    gauranteedCharacters.push(randomSelector(lowerCasedCharacters));
  }

  if(passwordOptions.hasUpperCasedCharacters){
    availableCharacters = availableCharacters.concat(upperCasedCharacters);
    gauranteedCharacters.push(randomSelector(upperCasedCharacters));
  }

  if(passwordOptions.hasSpecialCharacters){
    availableCharacters = availableCharacters.concat(specialCharacters);
    gauranteedCharacters.push(randomSelector(specialCharacters));
  }

  // result = result.concat(gauranteedCharacters);

  // for(i=0; i< (passwordOptions.passwordLength - gauranteedCharacters); i++){
  //   result.push(randomSelector(availableCharacters));

  // }

  for (i=0; i<passwordOptions.passwordLength; i++){
    var randomIndex = Math.floor(Math.random()*availableCharacters.length);
    console.log("available characters:", availableCharacters[randomIndex]);
    result.push(availableCharacters[randomIndex]);

  }

  return result;
  // var randomIndex = Math.floor(Math.random*(max+1));
  // return shuffleString(result.join(""));

  
}

// console.log(availableCharacters[randomIndex]);
// console.log(randomIndex);
// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  // getPasswordOptions();

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
