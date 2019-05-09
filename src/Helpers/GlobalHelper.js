import config from '../Config.json';

export function GetBaseURL() {
    var url = window.location
    var parser = document.createElement('a');
    parser.href = url;
    return parser.origin;
};

export function addnewProductToLastviewdIdList(newItem, initiallist) {
    let lastvieditemids = initiallist ? initiallist : [];
    if (lastvieditemids) {

        lastvieditemids.push(newItem);
        lastvieditemids = [...new Set(lastvieditemids)];
        if (lastvieditemids.length > config.MaxLastviewdToKeep) {
            lastvieditemids.shift();
        }
    }
    return lastvieditemids;
}

