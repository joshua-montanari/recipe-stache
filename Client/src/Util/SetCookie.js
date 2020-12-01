const setCookie = (cname, cvalue, exdays) => {
    var date = new Date()
    date.setTime(date.getTime() + (exdays*24*60*60*1000))
    var expires = 'expires='+date.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export default setCookie