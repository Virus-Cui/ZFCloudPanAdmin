export const genQueryParam = (data) => {
    let params = "";
    for (var key in data) {
        params += key + "=" + data[key] + "&";
    }
    return params.substring(0, params.lastIndexOf("&"));
};