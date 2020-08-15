module.exports = {
    "recurseDepth": 10,
    "source": {
        "includePattern": ".+\\.[jt]s(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "sourceType": "module",
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    },
    "opts": {
        "encoding": "utf8",
        "destination": "./var/docs/",
        "recurse": true,
        "template": "node_modules/better-docs",
    },
    "plugins": [
        "node_modules/better-docs/typescript",
        "plugins/markdown"
    ],
    "typescript": {
        "moduleRoot": "src"
    },
}
