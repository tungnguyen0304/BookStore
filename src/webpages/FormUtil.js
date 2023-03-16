function checkPhoneNumber(mobile) {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (mobile !=='') {
        if (vnf_regex.test(mobile) === false) {
            return 2 // malformed email
        } else {
            return 0 // ok
        }
    } else {
        return 1 // empty
    }    
}

export {checkPhoneNumber}