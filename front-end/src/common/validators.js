const psl = require('psl');

function isDomain(val) {
  // PSL is the Public Suffix List
  return psl.isValid(val);
}

function isEmail(val) {
  if (!val.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
    return false;
  }

  const domain = val.split('@')[1];
  if (!isDomain(domain)) {
    return false;
  }

  return true;
}

function isPhoneNumber(val) {
  return val.length >= 11;
}

function isInternationalPhoneNumber(val) {
  return val.match(/^\+[0-9]{1,3}/);
}

function isPostcode(val) {
  // See https://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom#Validation
  return val.match(/^(([A-Z]{1,2}[0-9][A-Z0-9]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?[0-9][A-Z]{2}|BFPO ?[0-9]{1,4}|(KY[0-9]|MSR|VG|AI)[ -]?[0-9]{4}|[A-Z]{2} ?[0-9]{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/);
}

const validateFirstName = (val) => {
  var validationErrors = [];
  if(val == ''){validationErrors.push('First Name is Required')}
  return validationErrors;
}

const validateSurname = (val) => {
  var validationErrors = [];
  if(val == ''){validationErrors.push('Surname is Required')}
  return validationErrors;
}

const validateMobileNumber = (val) =>{
  var validationErrors = [];
  if(val == ''){validationErrors.push('Mobile Number is Required')}
  else{
      if(!isPhoneNumber(val)){validationErrors.push('Mobile Number Invalid')}
  }
  return validationErrors;
}

const validateEmail = (val) =>{
  var validationErrors = [];
  if(val == ''){validationErrors.push('Email is Required')}
  else{
      if(!isEmail(email)){validationErrors.push('Email Invalid')}
  }
  return validationErrors;
}

export {
  isDomain,
  isEmail,
  isPhoneNumber,
  isInternationalPhoneNumber,
  isPostcode,
  validateFirstName,
  validateSurname,
  validateMobileNumber,
  validateEmail,
};
