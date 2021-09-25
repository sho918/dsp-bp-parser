# dsp-bp-parser

## Usage

```bash
$ npm run dev
$ npm run build
$ npm run lint
$ npm run lint:fix
```

```javascript
import DspBpParser from 'dsp-bp-parser';

// Blurprint string
const bp = 'BLUEPRINT:0,10,0,0,0,0,0,0,637657055979970390,0.8.20.8116,New%20Blueprint,"H4sIAAAAAAAAC2NkQAWMUAxh/2dgOAFlMsKFGVapzzcHCx6Q3IbMhsn/47Bj+A8FCFMZGAC/wJi6bAAAAA=="ED787AF7F9569A7FF9C0213711AFFFB7';

// Parse blueprint data
let data = new DspBpParser(bp);

// Modify data
data.header.desc = "Some description";

// Export new blurprint string
const newBp = data.export();
console.log(newBp);
// BLUEPRINT:0,10,0,0,0,0,0,0,637657055979970400,0.8.20.8116,New%20Blueprint,Some%20description"H4sIAAAAAAAAC2NkQAWMUAxh/2dgOAFlMsKFGVapzzcHCx6Q3IbMhsn/47Bj+A8FCFMZGAC/wJi6bAAAAA=="5BB6AC9FD96EB0382C05A800B079056E
```

```json
{
    "raw": "BLUEPRINT:0,10,0,0,0,0,0,0,637657055979970390,0.8.20.8116,New%20Blueprint,\"H4sIAAAAAAAAC2NkQAWMUAxh/2dgOAFlMsKFGVapzzcHCx6Q3IbMhsn/47Bj+A8FCFMZGAC/wJi6bAAAAA==\"ED787AF7F9569A7FF9C0213711AFFFB7",
    "header": {
        "layout": 10,
        "icon0": 0,
        "icon1": 0,
        "icon2": 0,
        "icon3": 0,
        "icon4": 0,
        "tick": 637657055979970400,
        "gameVersion": "0.8.20.8116",
        "shortDesc": "New Blueprint",
        "desc": ""
    },
    "content": {
        "version": 1,
        "cursorOffsetX": 0,
        "cursorOffsetY": 0,
        "cursorTargetArea": 0,
        "dragBoxSizeX": 1,
        "dragBoxSizeY": 1,
        "primaryAreaIdx": 0,
        "num": 1,
        "areas": [
            {
                "index": 0,
                "parentIndex": -1,
                "tropicAnchor": 0,
                "areaSegments": 200,
                "anchorLocalOffsetX": 0,
                "anchorLocalOffsetY": 0,
                "width": 1,
                "height": 1
            }
        ],
        "num2": 1,
        "buildings": [
            {
                "index": 0,
                "areaIndex": 0,
                "localOffsetX": 0.000018972747056977823,
                "localOffsetY": 0,
                "localOffsetZ": -0.0000022910537609277526,
                "localOffsetX2": 0.000018972747056977823,
                "localOffsetY2": 0,
                "localOffsetZ2": -0.0000022910537609277526,
                "yaw": 0,
                "yaw2": 0,
                "itemId": 2302,
                "modelIndex": 62,
                "tempOutputObjIdx": -1,
                "tempInputObjIdx": -1,
                "outputToSlot": 0,
                "inputFromSlot": 0,
                "outputFromSlot": 0,
                "inputToSlot": 0,
                "outputOffset": 0,
                "inputOffset": 0,
                "recipeId": 1,
                "filterId": 0,
                "num": 0,
                "parameters": []
            }
        ]
    },
    "summary": {
        "gameVersion": "0.8.20.8116",
        "shortDesc": "New Blueprint",
        "desc": "",
        "totalStructure": 1,
        "buildings": {
            "2302": {
                "count": 1,
                "recipeIds": {
                    "1": 1
                },
                "filterIds": {},
                "parameters": []
            }
        },
        "belts": {
            "2001": 0,
            "2002": 0,
            "2003": 0
        },
        "inserters": {
            "2011": 0,
            "2012": 0,
            "2013": 0
        }
    }
}
```
