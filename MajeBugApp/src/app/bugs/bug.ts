/*
"title": "string",
"body": "string",
"isFixed": true,
"stepToReproduce": "string",
"severity": 0
*/
export class Bug {
    // properties
    constructor(
        public title = '',
        public body = '',
        public isFixed = false,
        public stepToReproduce = '',
        public severity = 1
    ) {

    }
}
