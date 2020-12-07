const deleteCookie = (cname) => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export default deleteCookie