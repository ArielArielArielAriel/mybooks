const formMode = {
    "Add": 0,
    "Edit": 1
};

var self = module.exports = {
    handleError: (response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response;
    },
    isNullOrEmptyString: (str) => {
        return !str || typeof (str) !== 'string';
    },
    // Pure css (text-transform:capitalize) whould be much better.
    toTitleCase: (str) => {
        if (self.isNullOrEmptyString(str)) return str;

        return str.replace(/\w\S*/g, function (txt) {
            return `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`;
        });
    },
    toAlphabeticAndSpacesOnly: (str) => {
        if (self.isNullOrEmptyString(str)) return str;

        return str.replace(/(?!d)\W+/g, " ")
    },
    toBookTitle: (str) => {
        if (self.isNullOrEmptyString(str)) return str;

        return self.toTitleCase(self.toAlphabeticAndSpacesOnly(str));

    },
    notImplemented: () => {
        alert('not implemented... yet:)');

    },
    getCorsAnywhereUrl: (url) => {
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        // proxyUrl =  'https://crossorigin.me/';

        // proxyUrl = 'http://anyorigin.com/go/?url=';

        return `${proxyUrl}${url}`;
    },
    getDelayedPromise: (ms) => new Promise(resolve =>
        ms === 0 ? resolve : setTimeout(resolve, ms)
    ),
    formMode: formMode
};