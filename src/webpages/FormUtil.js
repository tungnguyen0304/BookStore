function checkValidName(name) {
    const validNameRegex = /^[\p{L}\s']{1,50}$/u
    return validNameRegex.test(name)
  }
function checkValidEmail(email) {
    const validEmailRegex = /^[A-Za-z0-9._%+-]{1,30}@[A-Za-z0-9.-]{1,20}\.[A-Za-z]{2,6}$/;
    return validEmailRegex.test(email)
}
function checkValidUsername(Username) {
    const validUsernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
    return validUsernameRegex.test(Username)
}  
function checkValidPass(Pass) {
    const validPassRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return validPassRegex.test(Pass)
}
function checkValidPhoneNumber(input) {
    var pattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
    return pattern.test(input)
}    

export {checkValidName, checkValidUsername, checkValidPass, checkValidEmail, checkValidPhoneNumber}