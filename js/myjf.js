!(function($, window, document, undefined) {
    var myJF = {
        imgPath: "images/dev/",
        myDev: function(cid, data) {
            var scence = new myJF.scence(cid);
            mJson(cid, data, scence, null);
            initPort(scence);
            return scence;
        }
    };

    function mJson(cid, data, scence, obj) {
        for (var k in data) {
            var datak = data[k];
            switch (k) {
                case "house":
                    scence.addbgCanvas(cid);
                    CreateElement(scence, new myJF.house(), datak, obj);
                    break;
                case 'cabinetList':
                    CreateElementList(scence, myJF.cabinet, datak, obj);
                    break;
                case 'cabinet':
                    CreateElement(scence, new myJF.cabinet(), datak, obj);
                    break;

                case 'equipList':
                    CreateElementList(scence, myJF.equip, datak, obj);
                    break;
                case 'equip':
                    CreateElement(scence, new myJF.equip(), datak, obj);
                    break;

                case 'portList':
                    CreateElementList(scence, myJF.port, datak, obj);

                    break;
                case 'port':
                    CreateElement(scence, new myJF.port(), datak, obj);
                    break;

                default:
                    if (obj) obj[k] = data[k];
                    break;
            }
        }
    }

    function CreateElementList(scence, obj, datak, parent) {
        if (datak === null) return;
        if (datak.constructor == Array)
            for (var kk in datak) {
                var o = new obj();
                if (!datak[kk].id || null == datak[kk].id) {
                    if (datak[kk].slot && datak[kk].portIndex) {
                        datak[kk].id = datak[kk].slot + "_" + datak[kk].portIndex;
                    }
                }
                CreateElement(scence, o, datak[kk], parent);
            }
        else {
            var b = new obj();
            CreateElement(scence, b, datak, parent);
        }
    }

    function CreateElement(scence, obj, data, parent) {
        scence.add(obj);
        mJson(null, data, scence, obj);
        if (parent) {
            if (!parent.children) parent.children = [];
            parent.children.push(obj);
            obj.parent = parent;
        }
    }

    function initPort(scence) {
        var equip = scence.getmEquip();
        equip && $(equip).each(function() {
            var _this = this,
                ports = _this.getChild(),
                type = _this.boardModelId,
                portdatas = portType[type];
            ports && $(ports).each(function() {
                var port = this,
                    portIndex = this.portIndex;
                var data = [];
                if (portdatas != null) {
                    data = portdatas[portIndex];
                }

                for (var k in data) {
                    (!port[k]) && (port[k] = data[k]);
                }
                if (portdatas != null) {
                    delete portdatas[portIndex];
                }

            });
            for (var t in portdatas) {
                CreateElementList(scence, myJF.port, portdatas[t], _this);
            }
        });

    }
    window.myJF = myJF;
    var portType = {
        "5": { "0": { portIndex: 0, posX: 36, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "1": { portIndex: 1, posX: 48, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "2": { portIndex: 2, posX: 60, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "3": { portIndex: 3, posX: 72, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "4": { portIndex: 4, posX: 84, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "5": { portIndex: 5, posX: 96, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "6": { portIndex: 6, posX: 122, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "7": { portIndex: 7, posX: 134, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "8": { portIndex: 8, posX: 146, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "9": { portIndex: 9, posX: 158, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "10": { portIndex: 10, posX: 170, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "11": { portIndex: 11, posX: 182, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "12": { portIndex: 12, posX: 208, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "13": { portIndex: 13, posX: 220, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "14": { portIndex: 14, posX: 232, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "15": { portIndex: 15, posX: 244, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "16": { portIndex: 16, posX: 256, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "17": { portIndex: 17, posX: 268, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "18": { portIndex: 18, posX: 294, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "19": { portIndex: 19, posX: 306, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "20": { portIndex: 20, posX: 318, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "21": { portIndex: 21, posX: 330, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "22": { portIndex: 22, posX: 342, posY: 16, width: 12, height: 11, type: '0', dir: '' }, "23": { portIndex: 23, posX: 354, posY: 16, width: 12, height: 11, type: '0', dir: '' } },
        "4": { "0": { portIndex: 0, posX: 61, posY: 2, width: 7, height: 15, type: '1' }, "1": { portIndex: 1, posX: 73, posY: 2, width: 7, height: 15, type: '1' }, "2": { portIndex: 2, posX: 85, posY: 2, width: 7, height: 15, type: '1' }, "3": { portIndex: 3, posX: 97, posY: 2, width: 7, height: 15, type: '1' }, "4": { portIndex: 4, posX: 109, posY: 2, width: 7, height: 15, type: '1' }, "5": { portIndex: 5, posX: 121, posY: 2, width: 7, height: 15, type: '1' }, "6": { portIndex: 6, posX: 133, posY: 2, width: 7, height: 15, type: '1' }, "7": { portIndex: 7, posX: 145, posY: 2, width: 7, height: 15, type: '1' }, "8": { portIndex: 8, posX: 157, posY: 2, width: 7, height: 15, type: '1' }, "9": { portIndex: 9, posX: 169, posY: 2, width: 7, height: 15, type: '1' }, "10": { portIndex: 10, posX: 181, posY: 2, width: 7, height: 15, type: '1' }, "11": { portIndex: 11, posX: 193, posY: 2, width: 7, height: 15, type: '1' }, "12": { portIndex: 12, posX: 205, posY: 2, width: 7, height: 15, type: '1' }, "13": { portIndex: 13, posX: 217, posY: 2, width: 7, height: 15, type: '1' }, "14": { portIndex: 14, posX: 229, posY: 2, width: 7, height: 15, type: '1' }, "15": { portIndex: 15, posX: 241, posY: 2, width: 7, height: 15, type: '1' }, "16": { portIndex: 16, posX: 253, posY: 2, width: 7, height: 15, type: '1' }, "17": { portIndex: 17, posX: 265, posY: 2, width: 7, height: 15, type: '1' }, "18": { portIndex: 18, posX: 277, posY: 2, width: 7, height: 15, type: '1' }, "19": { portIndex: 19, posX: 289, posY: 2, width: 7, height: 15, type: '1' }, "20": { portIndex: 20, posX: 301, posY: 2, width: 7, height: 15, type: '1' }, "21": { portIndex: 21, posX: 313, posY: 2, width: 7, height: 15, type: '1' }, "22": { portIndex: 22, posX: 325, posY: 2, width: 7, height: 15, type: '1' }, "23": { portIndex: 23, posX: 337, posY: 2, width: 7, height: 15, type: '1' }, "24": { portIndex: 24, posX: 61, posY: 23, width: 7, height: 15, type: '1' }, "25": { portIndex: 25, posX: 73, posY: 23, width: 7, height: 15, type: '1' }, "26": { portIndex: 26, posX: 85, posY: 23, width: 7, height: 15, type: '1' }, "27": { portIndex: 27, posX: 97, posY: 23, width: 7, height: 15, type: '1' }, "28": { portIndex: 28, posX: 109, posY: 23, width: 7, height: 15, type: '1' }, "29": { portIndex: 29, posX: 121, posY: 23, width: 7, height: 15, type: '1' }, "30": { portIndex: 30, posX: 133, posY: 23, width: 7, height: 15, type: '1' }, "31": { portIndex: 31, posX: 145, posY: 23, width: 7, height: 15, type: '1' }, "32": { portIndex: 32, posX: 157, posY: 23, width: 7, height: 15, type: '1' }, "33": { portIndex: 33, posX: 169, posY: 23, width: 7, height: 15, type: '1' }, "34": { portIndex: 34, posX: 181, posY: 23, width: 7, height: 15, type: '1' }, "35": { portIndex: 35, posX: 193, posY: 23, width: 7, height: 15, type: '1' }, "36": { portIndex: 36, posX: 205, posY: 23, width: 7, height: 15, type: '1' }, "37": { portIndex: 37, posX: 217, posY: 23, width: 7, height: 15, type: '1' }, "38": { portIndex: 38, posX: 229, posY: 23, width: 7, height: 15, type: '1' }, "39": { portIndex: 39, posX: 241, posY: 23, width: 7, height: 15, type: '1' }, "40": { portIndex: 40, posX: 253, posY: 23, width: 7, height: 15, type: '1' }, "41": { portIndex: 41, posX: 265, posY: 23, width: 7, height: 15, type: '1' }, "42": { portIndex: 42, posX: 277, posY: 23, width: 7, height: 15, type: '1' }, "43": { portIndex: 43, posX: 289, posY: 23, width: 7, height: 15, type: '1' }, "44": { portIndex: 44, posX: 301, posY: 23, width: 7, height: 15, type: '1' }, "45": { portIndex: 45, posX: 313, posY: 23, width: 7, height: 15, type: '1' }, "46": { portIndex: 46, posX: 325, posY: 23, width: 7, height: 15, type: '1' }, "47": { portIndex: 47, posX: 337, posY: 23, width: 7, height: 15, type: '1' } },
        "1": { "0": { portIndex: 0, posX: 99, posY: 9, width: 18, height: 15, type: '0', dir: '' }, "1": { portIndex: 1, posX: 99, posY: 24, width: 18, height: 15, type: '0', dir: '' }, "2": { portIndex: 2, posX: 99, posY: 39, width: 18, height: 15, type: '0', dir: '' }, "3": { portIndex: 3, posX: 99, posY: 54, width: 18, height: 15, type: '0', dir: '' }, "4": { portIndex: 4, posX: 136, posY: 39, width: 18, height: 15, type: '0', dir: '' }, "5": { portIndex: 5, posX: 136, posY: 54, width: 18, height: 15, type: '0', dir: '' }, "6": { portIndex: 6, posX: 189, posY: 54, width: 18, height: 15, type: '0', dir: '' }, "7": { portIndex: 7, posX: 207, posY: 54, width: 18, height: 15, type: '0', dir: '' }, "8": { portIndex: 8, posX: 225, posY: 54, width: 18, height: 15, type: '0', dir: '' } },
        "2": { "0": { portIndex: 0, posX: 6, posY: 12, width: 14, height: 19, portType: '0', dir: 'left' }, "1": { portIndex: 1, posX: 6, posY: 45, width: 14, height: 19, portType: '0', dir: 'left' }, "2": { portIndex: 2, posX: 6, posY: 78, width: 14, height: 19, portType: '0', dir: 'left' }, "3": { portIndex: 3, posX: 6, posY: 111, width: 14, height: 19, portType: '0', dir: 'left' }, "4": { portIndex: 4, posX: 205, posY: 19, width: 14, height: 19, portType: '0', dir: 'left' }, "5": { portIndex: 5, posX: 205, posY: 52, width: 14, height: 19, portType: '0', dir: 'left' }, "6": { portIndex: 6, posX: 205, posY: 85, width: 14, height: 19, portType: '0', dir: 'left' }, "7": { portIndex: 7, posX: 205, posY: 118, width: 14, height: 19, portType: '0', dir: 'left' } },
        "3": {
            "0": { "0": { portIndex: 0, posX: 6, posY: 12, width: 14, height: 19, portType: '0', dir: 'left' }, "1": { portIndex: 1, posX: 6, posY: 45, width: 14, height: 19, portType: '0', dir: 'left' }, "2": { portIndex: 2, posX: 6, posY: 78, width: 14, height: 19, portType: '0', dir: 'left' }, "3": { portIndex: 3, posX: 6, posY: 111, width: 14, height: 19, portType: '0', dir: 'left' }, "4": { portIndex: 4, posX: 205, posY: 19, width: 14, height: 19, portType: '0', dir: 'left' }, "5": { portIndex: 5, posX: 205, posY: 52, width: 14, height: 19, portType: '0', dir: 'left' }, "6": { portIndex: 6, posX: 205, posY: 85, width: 14, height: 19, portType: '0', dir: 'left' }, "7": { portIndex: 7, posX: 205, posY: 118, width: 14, height: 19, portType: '0', dir: 'left' } },
            "7": { "0": { portIndex: 0, posX: 20, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "1": { portIndex: 1, posX: 20, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "2": { portIndex: 2, posX: 32, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "3": { portIndex: 3, posX: 32, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "4": { portIndex: 4, posX: 44, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "5": { portIndex: 5, posX: 44, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "6": { portIndex: 6, posX: 56, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "7": { portIndex: 7, posX: 56, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "8": { portIndex: 8, posX: 68, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "9": { portIndex: 9, posX: 68, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "10": { portIndex: 10, posX: 80, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "11": { portIndex: 11, posX: 80, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "12": { portIndex: 12, posX: 99, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "13": { portIndex: 13, posX: 99, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "14": { portIndex: 14, posX: 111, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "15": { portIndex: 15, posX: 111, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "16": { portIndex: 16, posX: 123, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "17": { portIndex: 17, posX: 123, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "18": { portIndex: 18, posX: 135, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "19": { portIndex: 19, posX: 135, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "20": { portIndex: 20, posX: 147, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "21": { portIndex: 21, posX: 147, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "22": { portIndex: 22, posX: 159, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "23": { portIndex: 23, posX: 159, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "24": { portIndex: 24, posX: 178, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "25": { portIndex: 25, posX: 178, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "26": { portIndex: 26, posX: 190, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "27": { portIndex: 27, posX: 190, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "28": { portIndex: 28, posX: 202, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "29": { portIndex: 29, posX: 202, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "30": { portIndex: 30, posX: 214, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "31": { portIndex: 31, posX: 214, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "32": { portIndex: 32, posX: 226, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "33": { portIndex: 33, posX: 226, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "34": { portIndex: 34, posX: 238, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "35": { portIndex: 35, posX: 238, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "36": { portIndex: 36, posX: 257, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "37": { portIndex: 37, posX: 257, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "38": { portIndex: 38, posX: 269, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "39": { portIndex: 39, posX: 269, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "40": { portIndex: 40, posX: 281, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "41": { portIndex: 41, posX: 281, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "42": { portIndex: 42, posX: 293, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "43": { portIndex: 43, posX: 293, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "44": { portIndex: 44, posX: 305, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "45": { portIndex: 45, posX: 305, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "46": { portIndex: 46, posX: 317, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "47": { portIndex: 47, posX: 317, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "48": { portIndex: 48, posX: 336, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "49": { portIndex: 49, posX: 336, posY: 44, width: 12, height: 11, type: '0', dir: '' }, "50": { portIndex: 50, posX: 355, posY: 33, width: 12, height: 11, type: '0', dir: '' }, "51": { portIndex: 51, posX: 355, posY: 44, width: 12, height: 11, type: '0', dir: '' } },
            "6": {
                "0": { portIndex: 0, posX: 20, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "1": { portIndex: 1, posX: 20, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "2": { portIndex: 2, posX: 32, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "3": { portIndex: 3, posX: 32, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "4": { portIndex: 4, posX: 44, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "5": { portIndex: 5, posX: 44, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "6": { portIndex: 6, posX: 56, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "7": { portIndex: 7, posX: 56, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "8": { portIndex: 8, posX: 68, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "9": { portIndex: 9, posX: 68, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "10": { portIndex: 10, posX: 80, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "11": { portIndex: 11, posX: 80, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "12": { portIndex: 12, posX: 94, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "13": { portIndex: 13, posX: 94, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "14": { portIndex: 14, posX: 106, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "15": { portIndex: 15, posX: 106, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "16": { portIndex: 16, posX: 118, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "17": { portIndex: 17, posX: 118, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "18": { portIndex: 18, posX: 130, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "19": { portIndex: 19, posX: 130, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "20": { portIndex: 20, posX: 142, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "21": { portIndex: 21, posX: 142, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "22": { portIndex: 22, posX: 154, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "23": { portIndex: 23, posX: 154, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "24": { portIndex: 24, posX: 168, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "25": { portIndex: 25, posX: 168, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "26": { portIndex: 26, posX: 180, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "27": { portIndex: 27, posX: 180, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "28": { portIndex: 28, posX: 192, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "29": { portIndex: 29, posX: 192, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "30": { portIndex: 30, posX: 204, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "31": { portIndex: 31, posX: 204, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "32": { portIndex: 32, posX: 216, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "33": { portIndex: 33, posX: 216, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "34": { portIndex: 34, posX: 228, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "35": { portIndex: 35, posX: 228, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "36": { portIndex: 36, posX: 242, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "37": { portIndex: 37, posX: 242, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "38": { portIndex: 38, posX: 254, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "39": { portIndex: 39, posX: 254, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "40": { portIndex: 40, posX: 266, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "41": { portIndex: 41, posX: 266, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "42": { portIndex: 42, posX: 278, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "43": { portIndex: 43, posX: 278, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "44": { portIndex: 44, posX: 290, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "45": { portIndex: 45, posX: 290, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "46": { portIndex: 46, posX: 302, posY: 33, width: 12, height: 11, type: '0', dir: '' },
                "47": { portIndex: 47, posX: 302, posY: 44, width: 12, height: 11, type: '0', dir: '' },
                "48": { portIndex: 48, posX: 348, posY: 21, width: 12, height: 11, type: '0', dir: '' },
                "49": { portIndex: 49, posX: 360, posY: 21, width: 12, height: 11, type: '0', dir: '' },
                "8": { "0": { portIndex: 0, posX: 16, posY: 16, width: 11, height: 5, portType: '2' }, "1": { portIndex: 1, posX: 16, posY: 29, width: 11, height: 5, portType: '2' }, "2": { portIndex: 2, posX: 30, posY: 16, width: 11, height: 5, portType: '2' }, "3": { portIndex: 3, posX: 30, posY: 29, width: 11, height: 5, portType: '2' }, "4": { portIndex: 4, posX: 44, posY: 16, width: 11, height: 5, portType: '2' }, "5": { portIndex: 5, posX: 44, posY: 29, width: 11, height: 5, portType: '2' }, "6": { portIndex: 6, posX: 58, posY: 16, width: 11, height: 5, portType: '2' }, "7": { portIndex: 7, posX: 58, posY: 29, width: 11, height: 5, portType: '2' }, "8": { portIndex: 8, posX: 72, posY: 16, width: 11, height: 5, portType: '2' }, "9": { portIndex: 9, posX: 72, posY: 29, width: 11, height: 5, portType: '2' }, "10": { portIndex: 10, posX: 86, posY: 16, width: 11, height: 5, portType: '2' }, "11": { portIndex: 11, posX: 86, posY: 29, width: 11, height: 5, portType: '2' }, "12": { portIndex: 12, posX: 100, posY: 16, width: 11, height: 5, portType: '2' }, "13": { portIndex: 13, posX: 100, posY: 29, width: 11, height: 5, portType: '2' }, "14": { portIndex: 14, posX: 114, posY: 16, width: 11, height: 5, portType: '2' }, "15": { portIndex: 15, posX: 114, posY: 29, width: 11, height: 5, portType: '2' }, "16": { portIndex: 16, posX: 146, posY: 16, width: 11, height: 5, portType: '2' }, "17": { portIndex: 17, posX: 146, posY: 29, width: 11, height: 5, portType: '2' }, "18": { portIndex: 18, posX: 160, posY: 16, width: 11, height: 5, portType: '2' }, "19": { portIndex: 19, posX: 160, posY: 29, width: 11, height: 5, portType: '2' }, "20": { portIndex: 20, posX: 174, posY: 16, width: 11, height: 5, portType: '2' }, "21": { portIndex: 21, posX: 174, posY: 29, width: 11, height: 5, portType: '2' }, "22": { portIndex: 22, posX: 188, posY: 16, width: 11, height: 5, portType: '2' }, "23": { portIndex: 23, posX: 188, posY: 29, width: 11, height: 5, portType: '2' }, "24": { portIndex: 24, posX: 202, posY: 16, width: 11, height: 5, portType: '2' }, "25": { portIndex: 25, posX: 202, posY: 29, width: 11, height: 5, portType: '2' }, "26": { portIndex: 26, posX: 216, posY: 16, width: 11, height: 5, portType: '2' }, "27": { portIndex: 27, posX: 216, posY: 29, width: 11, height: 5, portType: '2' }, "28": { portIndex: 28, posX: 230, posY: 16, width: 11, height: 5, portType: '2' }, "29": { portIndex: 29, posX: 230, posY: 29, width: 11, height: 5, portType: '2' }, "30": { portIndex: 30, posX: 244, posY: 16, width: 11, height: 5, portType: '2' }, "31": { portIndex: 31, posX: 244, posY: 29, width: 11, height: 5, portType: '2' }, "32": { portIndex: 32, posX: 276, posY: 16, width: 11, height: 5, portType: '2' }, "33": { portIndex: 33, posX: 276, posY: 29, width: 11, height: 5, portType: '2' }, "34": { portIndex: 34, posX: 290, posY: 16, width: 11, height: 5, portType: '2' }, "35": { portIndex: 35, posX: 290, posY: 29, width: 11, height: 5, portType: '2' }, "36": { portIndex: 36, posX: 304, posY: 16, width: 11, height: 5, portType: '2' }, "37": { portIndex: 37, posX: 304, posY: 29, width: 11, height: 5, portType: '2' }, "38": { portIndex: 38, posX: 318, posY: 16, width: 11, height: 5, portType: '2' }, "39": { portIndex: 39, posX: 318, posY: 29, width: 11, height: 5, portType: '2' }, "40": { portIndex: 40, posX: 332, posY: 16, width: 11, height: 5, portType: '2' }, "41": { portIndex: 41, posX: 332, posY: 29, width: 11, height: 5, portType: '2' }, "42": { portIndex: 42, posX: 346, posY: 16, width: 11, height: 5, portType: '2' }, "43": { portIndex: 43, posX: 346, posY: 29, width: 11, height: 5, portType: '2' }, "44": { portIndex: 44, posX: 360, posY: 16, width: 11, height: 5, portType: '2' }, "45": { portIndex: 45, posX: 360, posY: 29, width: 11, height: 5, portType: '2' }, "46": { portIndex: 46, posX: 374, posY: 16, width: 11, height: 5, portType: '2' }, "47": { portIndex: 47, posX: 374, posY: 29, width: 11, height: 5, portType: '2' }, "48": { portIndex: 48, posX: 16, posY: 57, width: 11, height: 5, portType: '2' }, "49": { portIndex: 49, posX: 16, posY: 70, width: 11, height: 5, portType: '2' }, "50": { portIndex: 50, posX: 30, posY: 57, width: 11, height: 5, portType: '2' }, "51": { portIndex: 51, posX: 30, posY: 70, width: 11, height: 5, portType: '2' }, "52": { portIndex: 52, posX: 44, posY: 57, width: 11, height: 5, portType: '2' }, "53": { portIndex: 53, posX: 44, posY: 70, width: 11, height: 5, portType: '2' }, "54": { portIndex: 54, posX: 58, posY: 57, width: 11, height: 5, portType: '2' }, "55": { portIndex: 55, posX: 58, posY: 70, width: 11, height: 5, portType: '2' }, "56": { portIndex: 56, posX: 72, posY: 57, width: 11, height: 5, portType: '2' }, "57": { portIndex: 57, posX: 72, posY: 70, width: 11, height: 5, portType: '2' }, "58": { portIndex: 58, posX: 86, posY: 57, width: 11, height: 5, portType: '2' }, "59": { portIndex: 59, posX: 86, posY: 70, width: 11, height: 5, portType: '2' }, "60": { portIndex: 60, posX: 100, posY: 57, width: 11, height: 5, portType: '2' }, "61": { portIndex: 61, posX: 100, posY: 70, width: 11, height: 5, portType: '2' }, "62": { portIndex: 62, posX: 114, posY: 57, width: 11, height: 5, portType: '2' }, "63": { portIndex: 63, posX: 114, posY: 70, width: 11, height: 5, portType: '2' }, "64": { portIndex: 64, posX: 146, posY: 57, width: 11, height: 5, portType: '2' }, "65": { portIndex: 65, posX: 146, posY: 70, width: 11, height: 5, portType: '2' }, "66": { portIndex: 66, posX: 160, posY: 57, width: 11, height: 5, portType: '2' }, "67": { portIndex: 67, posX: 160, posY: 70, width: 11, height: 5, portType: '2' }, "68": { portIndex: 68, posX: 174, posY: 57, width: 11, height: 5, portType: '2' }, "69": { portIndex: 69, posX: 174, posY: 70, width: 11, height: 5, portType: '2' }, "70": { portIndex: 70, posX: 188, posY: 57, width: 11, height: 5, portType: '2' }, "71": { portIndex: 71, posX: 188, posY: 70, width: 11, height: 5, portType: '2' }, "72": { portIndex: 72, posX: 202, posY: 57, width: 11, height: 5, portType: '2' }, "73": { portIndex: 73, posX: 202, posY: 70, width: 11, height: 5, portType: '2' }, "74": { portIndex: 74, posX: 216, posY: 57, width: 11, height: 5, portType: '2' }, "75": { portIndex: 75, posX: 216, posY: 70, width: 11, height: 5, portType: '2' }, "76": { portIndex: 76, posX: 230, posY: 57, width: 11, height: 5, portType: '2' }, "77": { portIndex: 77, posX: 230, posY: 70, width: 11, height: 5, portType: '2' }, "78": { portIndex: 78, posX: 244, posY: 57, width: 11, height: 5, portType: '2' }, "79": { portIndex: 79, posX: 244, posY: 70, width: 11, height: 5, portType: '2' }, "80": { portIndex: 80, posX: 276, posY: 57, width: 11, height: 5, portType: '2' }, "81": { portIndex: 81, posX: 276, posY: 70, width: 11, height: 5, portType: '2' }, "82": { portIndex: 82, posX: 290, posY: 57, width: 11, height: 5, portType: '2' }, "83": { portIndex: 83, posX: 290, posY: 70, width: 11, height: 5, portType: '2' }, "84": { portIndex: 84, posX: 304, posY: 57, width: 11, height: 5, portType: '2' }, "85": { portIndex: 85, posX: 304, posY: 70, width: 11, height: 5, portType: '2' }, "86": { portIndex: 86, posX: 318, posY: 57, width: 11, height: 5, portType: '2' }, "87": { portIndex: 87, posX: 318, posY: 70, width: 11, height: 5, portType: '2' }, "88": { portIndex: 88, posX: 332, posY: 57, width: 11, height: 5, portType: '2' }, "89": { portIndex: 89, posX: 332, posY: 70, width: 11, height: 5, portType: '2' }, "90": { portIndex: 90, posX: 346, posY: 57, width: 11, height: 5, portType: '2' }, "91": { portIndex: 91, posX: 346, posY: 70, width: 11, height: 5, portType: '2' }, "92": { portIndex: 92, posX: 360, posY: 57, width: 11, height: 5, portType: '2' }, "93": { portIndex: 93, posX: 360, posY: 70, width: 11, height: 5, portType: '2' }, "94": { portIndex: 94, posX: 374, posY: 57, width: 11, height: 5, portType: '2' }, "95": { portIndex: 95, posX: 374, posY: 70, width: 11, height: 5, portType: '2' } },
            }
        }
    };


})(jQuery, window, document);
// until
!(function(myJF, $, window, document, undefined) {
    // body...
    function setImg(_this, ctx, src, fn) {
        var img = new Image();
        img.onload = function() {
            img && fn(_this, ctx, this);
            img = null;
        };
        img.onerror = function() {
            img = null;
        };
        img.src = src;
    }

    function MessageBus(a) {
        var b = this;
        this.name = a,
            this.messageMap = {};
        this.messageCount = 0,
            this.subscribe = function(a, c) { //信息注册 a是键 c是信息内容（方法）
                var d = b.messageMap[a];
                null == d && (b.messageMap[a] = []),
                    b.messageMap[a].push(c),
                    b.messageCount++
            };
        this.unsubscribe = function(a) { //信息注销 a是键
            var c = b.messageMap[a];
            null != c && (b.messageMap[a] = null, delete b.messageMap[a], b.messageCount--)
        };
        this.publish = function(a, c, d) { //调用某指定公开方法
            var e = b.messageMap[a];
            if (null != e)
                for (var f = 0; f < e.length; f++) //遍历信息内容
                    d ? ! function(a, b) { //若参数d为真（true或者1）异步10毫秒秒执行方法调用（多线程异步处理）否则直接执行调用
                    setTimeout(function() {
                        a(b)
                    }, 10);
                }(e[f], c) : e[f](c);
        };
    }

    function isPointInRect(a, b) {
        var c = b.x,
            d = b.y,
            e = b.width,
            f = b.height;
        return a.x > c && a.x < c + e && a.y > d && a.y < d + f;
    }

    myJF.util = {
        setImg: setImg,
        MessageBus: MessageBus,
        isPointInRect: isPointInRect
    };

})(myJF, jQuery, window, document);
//
!(function(myJF, $, window, document, undefined) {
    // body...
    var scence = function(cid) {
        var canvas = document.getElementById(cid),
            context = canvas.getContext('2d'),
            _this = this;
        context.imageSmoothingEnabled = false;
        this.children = [];
        this.messageBus = new myJF.util.MessageBus;
        this.canvas = canvas;
        this.context = context;
        this.canvas.addEventListener("click", function(e) {
            _this.addClick(_this, e);
        });
    };
    scence.prototype = {
        elementType: 'scence',
        mouseOverelement: null,
        scale: [0.5, 0.5],
        translate: [0, 0], 
        animatedObj:{},
        add: function(a) {
            this.children.push(a);
        },
        addbgCanvas: function(id) {
            var bgcanvas = document.createElement("canvas"),
                _this = this;
            bgcanvas.className = "bgcanvas";
            // bgcanvas.style = "position:absolute;top:0;left:0;z-index:7;";
            $("#" + id).parents(".canvas-wap").append(bgcanvas);
            this.bgContext = bgcanvas.getContext('2d');
            this.bgCanvas = bgcanvas;
            this.pinch(id, [this.context, this.bgContext]);
        },
        pinch: function(id, ctx) {
            var _this = this;
            Hammer.defaults.touchAction = "auto";
            var mc = new Hammer(document.getElementById(id));
            mc.get('pinch').set({ enable: true });  
            mc.get('pan').set({ direction: Hammer.DIRECTION_ALL }); 
            mc.get('pan').set({ threshold: 0 }); 
            mc.get('pan').set({ velocity: 0.2 }); 

            var ticking = false,
                initScale = [1, 1],
                initTranslate = [0, 0];
            var transform = {
                translate: [0, 0],
                scale: [1, 1],
                rx: 0,
                ry: 0,
                rz: 0
            };
            mc.on("pinchout pinchin", function(ev) {
                console.log(ev.type, ev.scale);
               var scaleoffset=ev.type=="pinchout"  ?1.5:1;
                for (var k in _this.scale) {
                    initScale[k] = _this.scale[k];
                     var t = initScale[k] * ev.scale *scaleoffset ;
                    transform.scale[k] = parseFloat(t.toFixed(2));
                }
                 for (  k in _this.initTranslate) {
                    initTranslate[k] = _this.initTranslate[k]; 
                }
               
                transform.translate =[ev.center.x*(1-transform.scale[0]), ev.center.y*(1-transform.scale[1])];
                //requestElementUpdate();
                // if(ev.type==="pinchout"){
                //     transform.scale[0]=s1>2?2:s1;
                //     transform.scale[1]=s2>2?2:s2; 
                //     transform.translate[0]= transform.translate[0] -_this.translate[0];
                //     transform.translate[1]= transform.translate[1] -_this.translate[1];  
                // }
                // else{
                    var s1=  transform.scale[0] ;
                    var s2 = transform.scale[1];
                    transform.scale[0]=s1>2?2:s1;
                    transform.scale[1]=s2>2?2:s2; 
                    transform.translate[0]= transform.translate[0] -_this.translate[0];
                    transform.translate[1]= transform.translate[1] -_this.translate[1]; 
                // }
                    amimate();

            });ticking=false;
            mc.on("pan", function (ev) {
                //console.log("事件发生点(deltaX) x: "+e.deltaX + "(deltaY)  y: "+e.deltaY);
                if(_this.scale[0]>.5){
                    //console.log("拖动结束  " + e.deltaX + "," + e.deltaY);
                     transform.translate[0]+= ev.deltaX *2*_this.scale[0];
                     transform.translate[1]+= ev.deltaY*2*_this.scale[1];
                    amimate();
                }
            });
         
            window.requestAnimFrame = (function() {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    function(callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();
            function amimate(){
                    ticking=false;
                    requestElementUpdate();
            }
            function requestElementUpdate() {
                if (!ticking) {
                    requestAnimFrame(function() {
                        updateElementTransform();
                        requestElementUpdate();
                    });
                }
            }

            function updateElementTransform() {
                var flag = false;
                var tag = initScale[0] > transform.scale[0] ? -1 : 1;
               
                for (var k in initScale) { 
                    _this.scale[k] = initScale[k] + .05 * tag;
                    if (Math.abs(_this.scale[k] - transform.scale[k]) < .01) {
                        _this.scale[k] = transform.scale[k];
                        flag = true;
                    }
                    else{
                        flag = false;
                    }
                }
                var translateTag = initTranslate[0] > transform.translate[0] ? -1 : 1;
                for (var k in initTranslate) {
                    _this.translate[k] = initTranslate[k] + .1 * translateTag;
                    if (Math.abs(_this.translate[k] - transform.translate[k]) < .01) {
                        _this.translate[k] = transform.translate[k];
                        flag = true;
                    }
                    else{
                        flag = false;
                    }
                }
                 flag? ticking=true:  ticking=false;
                _this.draw();
            }
        },
        draw: function() {
            var ctx = this.context;
            var bgctx = this.bgContext;
            var c = this.children;
            ctx.clearRect(0,0, this.canvas.width*2, this.canvas.height*2);
            ctx.save(); 
            ctx.translate(this.translate[0], this.translate[1]);

            bgctx && (bgctx.save(), bgctx.clearRect(0, 0, this.canvas.width*2, this.canvas.height*2), bgctx.translate(this.translate[0], this.translate[1]));
            for (var i = 0, l = c.length; i < l; i++) {
                c[i].scale = this.scale;
                for (var k in this.scale) {
                    c[i].scale[k] = this.scale[k];
                } 
                if (c[i].elementType === "house") {
                    c[i].draw(bgctx);

                } else {
                    c[i].draw(ctx);
                }
            }
            ctx.restore();
             bgctx && bgctx.restore();
        },
        getHouse: function() {
            return this.getElementBytype("house");
        },
        getmEquip: function() {
            return this.getElementBytype("equip");
        },
        getPort: function() {
            return this.getElementBytype("port");
        },
        getSlot: function() {
            var g = {},
                p = this.getElementBytype("port");
            for (var i = 0, l = p.length; i < l; i++) {
                var s = p[i].slot;
                g[s] || (g[s] = []);
                g[s].push(p[i])
            }
            return g;
        },
        getPortBysolt: function(solt) {
            return this.getSlot()[solt];
        },
        getElementBytype: function(type) {
            var s = [],
                c = this.children;
            for (var i = 0, l = c.length; i < l; i++)
                c[i].elementType === type && s.push(c[i]);
            return s;
        },
        setEquipIsShowText: function(b) {
            var _this = this,
                equip = _this.getmEquip();
            equip && $(equip).each(function() {
                this.setIsShowText(b);
            });
            !b ? this.draw() : (equip && $(equip).each(function() {
                this.drawText(_this.context);
            }));
        },
        getElementById: function(id) {
            var s,
                c = this.children;
            for (var i = 0, l = this.children.length; i < l; i++)
                if (c[i].id === id) s = c[i];
            return s;
        },
        getElementByXY: function(b, c) {
            for (var f = this.children, h = f.length - 1; h >= 0; h--) {
                var i = f[h];
                if (i.isInBound(b, c))
                    return i;
            }
            return null;
        },
        addClick: function(_this, e) {
                // var scales = $(this.canvas).attr("scale");
                // var scale = scales && scales.length > 0 ? scales.split(",") : [1, 1];
                var scale = _this.scale;
                var s = _this.getElementByXY(e.offsetX / parseFloat(scale[0]), e.offsetY / parseFloat(scale[1]));
                if (null !== s) {
                    var d = s['clickHandler'];
                    if (null === d)
                        throw new Error("Function not found:" + a + "Handler");
                    d.call(s);
                }
                _this.messageBus.publish("click", 1);
            }
            // ,
            // addMousemove:function(_this, e){
            //     var _this= this;
            //     var scales = $(this.canvas).attr("scale");
            //     var scale = scales && scales.length > 0 ? scales.split(",") : [1, 1];
            //     var s = _this.getElementByXY(e.offsetX / parseFloat(scale[0]), e.offsetY / parseFloat(scale[1]));

        //     if(null!==s){

        //             if(_this.mouseOverelement===null ){
        //                    _this.mouseOverelement=s;
        //                     s.mouseoverHandler(e);
        //             }
        //             else if(  _this.mouseOverelement !== s ){
        //                     _this.mouseOverelement.mouseoutHandler(e);
        //                     _this.mouseOverelement=s;
        //                     s.mouseoverHandler(e);
        //             }

        //     }
        //     else{
        //         if(_this.mouseOverelement ){
        //                     _this.mouseOverelement.mouseoutHandler(e);
        //                    _this.mouseOverelement=null; 
        //         }
        //     } 
        // } 



    };
    myJF.scence = scence;
})(myJF, jQuery, window, document);

!(function(myJF, $, window, document, undefined) {
    // body...
    var element = function() {
        this.addEventListener = function(a, fn) {
            var c = this,
                d = function(a) {
                    fn.call(c, a);
                };
            return this.messageBus.subscribe(a, d),
                this;
        };
        this.clickHandler = function(b) {
            this.messageBus.publish('click', b);
        };
        this.isInBound = function(b) {};
        this.draw = function(ctx) {};
        this.init = function() {
            this.messageBus = new myJF.util.MessageBus;
        };
        this.getDrawInf = function(ctx) {
            return this.drawInf;
        };
    };
    /*机房*/
    var house = function(canvas) {
        this.messageBus = new myJF.util.MessageBus;
        //this.init();
        this.img = null;
        this.drawInf = null;
        this.children = null;
        this.scale = [1, 1];
    }
    house.prototype = new element();
    house.prototype.elementType = "house";
    house.prototype.getChild = function() {
        return this.children;
    };
    house.prototype.drawInit = function(ctx, fn) {
        var _this = this,
            canvas = ctx.canvas;
        _this.owidth = Math.abs(_this.minPoint.x) + Math.abs(_this.maxPoint.x);
        _this.oheight = Math.abs(_this.minPoint.z) + Math.abs(_this.maxPoint.z);
        var $par = $(ctx.canvas).parent();
        _this.width = $par.width();
        _this.height = Math.floor(_this.oheight * _this.width / _this.owidth);
        this.drawInf = {
            scale: _this.width / _this.owidth * 2,
            width: _this.owidth,
            height: _this.oheight
        };
        $par.css("height", _this.height + "px").find("canvas").each(function() {
            this.height = _this.height;
            this.width = _this.width;
        });
        var src = myJF.imgPath + _this.imageName;
        myJF.util.setImg(_this, ctx, src, function(_this, ctx, img) {
            _this.img = img;
            if (fn) fn.call(_this);
        });
    };
    house.prototype.draw = function(ctx) {
        var _this = this;
        if (!_this.img) {
            _this.drawInit(ctx, function() {
                paint(ctx, _this);
                _this.messageBus.publish("imageOnload", null, 1);

            });
        } else {
            paint(ctx, _this);
            _this.messageBus.publish("imageOnload", null, 1);
        }

        function paint(ctx, _this) {
            ctx.save(),
                ctx.scale(_this.scale[0], _this.scale[1]),
                ctx.imageSmoothingEnabled = false,
                ctx.drawImage(_this.img, 0, 0, _this.width * 2, _this.height * 2),
                ctx.restore();
        }
    };
    /*机柜*/
    var cabinet = function(canvas) {
        this.messageBus = null;
        this.init();
        this.drawInf = null;
        this.children = null;
        this.scale = [1, 1];
    };
    cabinet.prototype = new element();
    cabinet.prototype.elementType = "cabinet";
    cabinet.prototype.drawInit = function(ctx) {
        var canvas = ctx.canvas;
        var _this = this;
        if (!_this.parent) {
            this.heightU = parseInt(this.heightU);
            this.drawInf = {
                cHFColor: '#999',
                /*标题字体颜色*/
                cHFStyle: '18px serif',
                /*标题字体*/
                cHHeight: 50,
                /*标题height*/
                cLineSize: { l: 10, s: 7 },
                /*刻度宽度*/
                cLineHeight: 1,
                /*1条刻度高度*/
                cLineColor: '#616161',
                /* 刻度线颜色*/
                cLineFColor: '#f9ee3c',
                /* 刻度字体颜色*/
                cLineFStyke: '12px serif',
                /* 刻度字体*/
                cBgColor: { b: '#525252', line: '#303030', inner: '#525252' },
                /* 机柜颜色*/
                cPadding: { top: 50, right: 50, bottom: 30, left: 50 },
                /* 机柜边距*/
                borderW: { top: 0, right: 10, bottom: 0, left: 10 },
                /* 机柜边距*/
                uh: 50,
                uPaddingV: 5,
                /* 1U高度*/
                cHeightU: this.heightU
            };
            //  var sw=500;
            //  var n=parseFloat((Math.floor(canvas.offsetWidth)/sw +"").replace(/(\.\d)(\d)*/,'$1'));
            // $(canvas).css('width',sw*n); 
            //  this.drawInf.cLineFStyke= parseInt(12*n)+'px serif';
            //     this.drawInf.  cHFStyle=  parseInt(18*n)+'px serif';/*标题字体*/
            //  canvas.width =sw*n;
            //  this.drawInf.ciw = sw-100;   
            //  this.drawInf.cih = this.heightU * (this.drawInf.uh + this.drawInf.cLineHeight) + this.drawInf.cLineHeight;
            //  this.drawInf.ch = this.drawInf.cih + this.drawInf.cPadding.top + this.drawInf.cPadding.right;
            //  this.drawInf.cw = sw;
            //  canvas.height = this.drawInf.ch*n;
            //  ctx.scale(n,n);
            //  $(canvas).attr("scale",n+","+n);
            //  this.drawInf.canvasScale=[n,n];  
            _this.drawInf.ciw = Math.floor(canvas.offsetWidth) - _this.drawInf.cPadding.left - _this.drawInf.cPadding.right;
            _this.drawInf.uh = Math.round(.1 * _this.drawInf.ciw) + 10;
            _this.drawInf.ciw = (_this.drawInf.uh - 10) * 10;
            _this.drawInf.cih = _this.heightU * (_this.drawInf.uh + _this.drawInf.cLineHeight) + _this.drawInf.cLineHeight;
            _this.drawInf.ch = _this.drawInf.cih + _this.drawInf.cPadding.top + _this.drawInf.cPadding.right;
            _this.drawInf.cw = Math.floor(canvas.offsetWidth);
            canvas.height = _this.drawInf.ch;
            canvas.width = _this.drawInf.cw;
        } else {
            var drawInf = _this.parent.getDrawInf(),
                scale = 1,
                w, h;
            if (drawInf) {
                scale = drawInf.scale || 1;
                w = drawInf.width || 0;
                h = drawInf.height || 0;
                this.drawInf = {
                    width: Math.floor(_this.size.z * scale),
                    height: Math.floor(_this.size.x * scale),
                    x: Math.floor((_this.position.x + w / 2) * scale),
                    y: Math.floor((_this.position.z + h / 2) * scale)
                };
            }
        }
    };
    cabinet.prototype.draw = function(ctx) {

        ctx.save();
        ctx.scale(this.scale[0], this.scale[1]);

        if (!this.parent) {
            this.drawInit(ctx);
            this.drawwap(ctx);
            this.drawText(ctx);
            this.drawU(ctx);
        } else {
            var _this = this;
            _this.drawInit(ctx);
            var x = _this.drawInf.x,
                y = this.drawInf.y,
                w = _this.drawInf.width,
                h = _this.drawInf.height;
            var alarmStatus = _this.alarmStatus,
                fillstyle, fontstyle;
            switch (alarmStatus) {
                case "1":
                    fillstyle = "#fc7a8c";
                    fontstyle = "#2a2a2a";
                    break;
                case "2":
                    fillstyle = "#ec91fb";
                    fontstyle = "#2a2a2a";
                    break;
                case "3":
                    fillstyle = "#f2d35e";
                    fontstyle = "#2a2a2a";
                    break;
                default:
                    fillstyle = ctx.createLinearGradient(x, y, x, y + h);
                    fillstyle.addColorStop(0, '#005959');
                    fillstyle.addColorStop(1, '#008c8c');
                    fontstyle = "#fff";
                    break;

            }
            ctx.save(),
                ctx.beginPath(),
                ctx.lineWidth = 1,
                ctx.strokeStyle = "#004545",
                ctx.fillStyle = fillstyle,
                ctx.lineCap = "butt",
                ctx.shadowBlur = 2;
            ctx.shadowColor = "rgba(0,0,0,.1)",
                ctx.shadowOffsetX = 2,
                ctx.shadowOffsetY = 2,
                ctx.beginPath(),
                ctx.rect(x, y, w, h),
                ctx.closePath(),
                ctx.fill(),
                ctx.stroke(),
                ctx.restore();
            var fontSize = $(window).width() / 720 * 12;

            ctx.save(),
                ctx.font = fontSize + "px serif",
                ctx.textAlign = 'center',
                ctx.textBaseline = 'middle',
                ctx.fillStyle = fontstyle;
            ctx.fillText(this.getText(), x + w / 2, y + h / 2),
                ctx.restore();
        }
        ctx.restore();
    };
    cabinet.prototype.drawwap = function(ctx) {
        var w = this.drawInf.cw,
            h = this.drawInf.ch,
            iw = this.drawInf.ciw,
            ih = this.drawInf.cih,
            p = this.drawInf.cPadding,
            b = this.drawInf.borderW;
        ctx.fillStyle = this.drawInf.cBgColor.b,
            ctx.fillRect(0, 0, w, h),
            ctx.save(),
            ctx.restore();
        ctx.fillStyle = this.drawInf.cBgColor.line,
            ctx.fillRect(b.left, b.top, w - b.right - b.left, h - b.top - b.bottom),
            ctx.save(),
            ctx.restore();
        ctx.fillStyle = this.drawInf.cBgColor.inner, ctx.fillRect(p.left, p.top, iw, ih);
    };
    cabinet.prototype.drawU = function(ctx) {
        var u = this.heightU,
            p = this.drawInf.cPadding,
            h = this.drawInf.cih,
            w = this.drawInf.cw,
            lh = this.drawInf.cLineHeight,
            d = (h - (lh * (u + 1))) / u,
            lw = this.drawInf.cLineSize;
        ctx.fillStyle = this.drawInf.cLineColor;

        for (var i = 0; i <= u; i++) {
            i % 2 === 0 ?
                (ctx.fillRect(p.left - lw.l, p.top + i * (d + lh), lw.l, lh),
                    ctx.fillRect(w - p.right, p.top + i * (d + lh), lw.l, lh)) :
                (ctx.fillRect(p.left - lw.s, p.top + i * (d + lh), lw.s, lh),
                    ctx.fillRect(w - p.right, p.top + i * (d + lh), lw.s, lh));
        }
        ctx.save();
        ctx.restore();
        ctx.fillStyle = this.drawInf.cLineFColor,
            ctx.font = this.drawInf.cLineFStyke,
            ctx.textAlign = 'left';
        for (i = 0; i < u / 2; i++)
            ctx.fillText((u - i * 2) + 'U', w - p.right + lw.s, p.top + d / 2 + i * (d + lh) * 2 + 1);
        ctx.save();
        ctx.restore();
        ctx.textAlign = 'right';
        for (i = 0; i < u / 2; i++)
            ctx.fillText((u - i * 2) + 'U', p.left - lw.s, p.top + d / 2 + i * (d + lh) * 2 + 1);
        ctx.save();
        ctx.restore();
    };
    cabinet.prototype.drawText = function(ctx) {
        var w = this.drawInf.cw,
            th = this.drawInf.cHHeight;
        ctx.fillStyle = this.drawInf.cHFColor,
            ctx.font = this.drawInf.cHFStyle,
            ctx.textAlign = 'center',
            ctx.textBaseline = 'middle',
            ctx.fillText(this.getText(), w / 2, th / 2),
            ctx.save(),
            ctx.restore();
    };
    cabinet.prototype.getText = function() {
        return this.parent ? this.location : this.shortName;
    };
    cabinet.prototype.getChild = function() {
        return this.children;
    };
    cabinet.prototype.getUIsUse = function(u) {
        var equips = this.getChild();
        if (u > this.heightU) return true;
        for (var i = 0, l = equips.length; i < l; i++) {
            var q = equips[i];
            if (u <= q.posU && u > q.posU - q.heightU) {
                return true;
            }
        }
        return false;
    };
    /*背板图*/
    var equip = function() {
        this.messageBus = null;
        this.init();
        this.img = null;
        this.jgDrawInf = null;
        this.drawInf = null;
        this.defaultPort = [];
        this.children = null;
        this.scale = 1;
    };
    equip.prototype = new element();
    equip.prototype.elementType = 'equip';
    equip.prototype.getText = function() {
        return this.equipName;
    };
    equip.prototype.getChild = function() {
        return this.children;
    };
    equip.prototype.getDrawInf = function(ctx) {
        if (!this.drawInf)
            this.getDrawInfInit(ctx, null);
        return this.drawInf;
    };
    equip.prototype.setIsShowText = function(value) {
        this.IsShowText = value;
    };
    equip.prototype.getDrawInfInit = function(ctx, fn) {
        var _this = this;
        src = myJF.imgPath + _this.imageName;
        var x = 0,
            y = 0,
            w = 0,
            ih = 0,
            h = 0;
        if (_this.parent) {
            this.jgDrawInf = _this.parent.getDrawInf();
            var lh = this.jgDrawInf.cLineHeight,
                d = this.jgDrawInf.uh,
                chu = this.jgDrawInf.cHeightU,
                posU = parseInt(this.posU),
                hU = parseInt(this.heightU);

            x = this.jgDrawInf.cPadding.left;
            w = this.jgDrawInf.ciw;
            ih = hU * (d + lh) - lh - this.jgDrawInf.uPaddingV * 2;
            // y = this.jgDrawInf.cPadding.top + h - (posU + hU) * d - (posU + hU + 1) * lh;
            y = this.jgDrawInf.cPadding.top + (chu - posU + 1) * (d + lh) + lh; //降序


        }
        myJF.util.setImg(_this, ctx, src, function(_this, ctx, img) {
            _this.img = img;
            rw = img.width;
            rh = img.height;

            if (!_this.parent) {
                var cw = ctx.canvas.clientWidth,
                    ch = ctx.canvas.clientHeight - 20;
                y = 20;
                if (cw / rw < ch / rh) {
                    w = cw;
                    ih = cw * rh / rw;
                } else {
                    ih = ch;
                    w = ch * rw / rh;
                }
                x = (cw - w) / 2;
                ctx.canvas.height = ih + 30;
            } else {
                var h = w * rh / rw;
                if (h < ih) {
                    ih = h;
                }
                y = y - ih;

            }
            _this.drawInf = {
                x: x,
                y: y,
                rwidth: img.width,
                rheight: img.height,
                width: w,
                height: ih,
                scale: [w / img.width, ih / img.height]
            };

            if (fn) fn.call(_this);
        });
    };
    equip.prototype.draw = function(ctx) {
        ctx.scale(this.scale, this.scale);
        var _this = this;
        if (!_this.img) {
            _this.getDrawInfInit(ctx, function() {
                paint(ctx, _this);
                _this.defaultPort && $(_this.defaultPort).each(function() {
                    this.draw(ctx);
                });
                _this.messageBus.publish("imageOnload", null, 1);
            });
        } else {
            paint(ctx, _this);
            _this.messageBus.publish("imageOnload", null, 1);
        }

        function paint(ctx, _this) {
            ctx.imageSmoothingEnabled = false;
            var drawInf = _this.getDrawInf(ctx);
            ctx.drawImage(_this.img, drawInf.x, drawInf.y, drawInf.width, drawInf.height);
            _this.draw3D(ctx);
            if (_this.IsShowText) _this.drawText(ctx);

        }
        ctx.restore();
    };
    equip.prototype.drawText = function(ctx) {
        if (!this.IsShowText) return false;
        var x = this.drawInf.x,
            y = this.drawInf.y,
            w = this.drawInf.width;
        h = this.drawInf.height;     
        ctx.save();
        ctx.fillStyle = 'rgba(48,48,48,.97)',
            ctx.font = '14px serif',
            ctx.fillRect(x, y, w, h), 
        ctx.fillStyle = '#a6a2a2',
            ctx.textAlign = 'center',
            ctx.textBaseline = 'middle',
            ctx.fillText(this.getText(), x + w / 2, y + h / 2),
       
            ctx.restore();
    };
    equip.prototype.draw3D = function(ctx) {
        var offset = [20, 8, 18],
            x = this.drawInf.x,
            y = this.drawInf.y,
            w = this.drawInf.width;
        if (1 || (!this.parent) || (this.parent && !this.parent.getUIsUse(this.posU + 1))) {
            ctx.fillStyle = '#313535',
                ctx.beginPath(),
                ctx.save(),
                ctx.moveTo(x + offset[0], y - offset[1]),
                ctx.lineTo(x + w - offset[2], y - offset[1]),
                ctx.lineTo(x + w, y),
                ctx.lineTo(x, y),
                ctx.closePath(),
                ctx.fill(),
                ctx.restore();
        }
    };
    equip.prototype.addEventListener = function(a, fn) {
        var c = this,
            d = function(a) {
                fn.call(c, a);
            };
        return this.messageBus.subscribe(a, d),
            this;
    };
    equip.prototype.clickHandler = function(fn) {
        this.messageBus.publish('click', fn);
    };
    equip.prototype.isInBound = function(a, b) {
        var x = this.drawInf.x,
            y = this.drawInf.y,
            w = this.drawInf.width,
            h = this.drawInf.height;

        return a > x && a < x + w && b > y && b < y + h;
    };

    /*端口*/
    var port = function() {
        this.messageBus = null;
        this.init();
        this.drawInf = {};
        this.isDraw = !0;
        this.isSelect = !1;
        this.portA = null;
        this.portB = null;
        this.type = 0;
    };
    port.prototype = new element();
    port.prototype.elementType = "port";
    port.prototype.getId = function() {
        return this.id;
    };
    port.prototype.getText = function() {
        return this.portName;
    };
    port.prototype.getType = function() {
        return this.portType;
    };
    port.prototype.draw = function(ctx) {
        var _this = this;
        if (_this.parent) {
            _this.parent.messageBus.subscribe("imageOnload", function() {
                var equipDrawInf = _this.parent.getDrawInf();
                scale = equipDrawInf.scale;
                _this.drawInf = {
                    x: Math.floor(_this.posX * scale[0] + equipDrawInf.x),
                    y: Math.floor(_this.posY * scale[1] + equipDrawInf.y),
                    width: Math.floor(_this.width * scale[0]),
                    height: Math.floor(_this.height * scale[0]),
                    scale: equipDrawInf.scale
                };
                var type = !_this.getType() ? "0" : _this.getType() + "";
                switch (type) {
                    default:
                        case "0":
                        _this.painNetPort(ctx);
                    break;
                    case "1":
                            _this.painFiberPort(ctx);
                        break;

                    case "2":
                            _this.painFiberPort2(ctx);
                        break;

                }
                if (_this.isDraw) _this.drawStatus(ctx);
            });

        }
    };
    port.prototype.setPort = function(port) {
        var _this = this;
        for (var k in port) {
            if (_this[k])
                _this[k] = port[k];
        }

    }
    port.prototype.painNetPort = function(ctx) {
        var _this = this;
        var drawInf = _this.drawInf;
        if (!_this.dir || _this.dir == '') {
            if (_this.boardModelId == 2 || _this.boardModelId == 3) {
                _this.dir = "left";
            }
        }
        if (!_this.dir) _this.dir = "bottom";
        ctx.fillStyle = '#bdbfbe';
        ctx.fillRect(drawInf.x, drawInf.y, drawInf.width, drawInf.height);
        ctx.save();
        ctx.restore();
        ctx.fillStyle = '#000000';
        var x, y, w, h, x1, y1, w1, h1, scale = drawInf.scale,
            d, s;
        switch (_this.dir) {
            case "left":
                d = [Math.round(drawInf.width * .15789), Math.round(drawInf.height * .14286)];
                if (d[0] < 2) {
                    d[0] = 2;
                    d[1] = 2;
                }
                s = [Math.round(2 * scale[0]), Math.round(2 * scale[1])]; //windth 0 margin 1
                x1 = drawInf.x + d[0],
                    w1 = s[0],
                    y = drawInf.y + d[1],
                    x = x1 + w1,
                    y1 = y + s[1],
                    h = drawInf.height - 2 * d[1],
                    h1 = h - 2 * s[1],
                    w = drawInf.width - w1 - 2 * d[0];

                break;
            case "right":

                d = [Math.round(drawInf.width * .15789), Math.round(drawInf.height * .14286)];
                if (d[0] < 2) {
                    d[0] = 2;
                    d[1] = 2;
                }
                s = [Math.round(2 * scale[0]), Math.round(2 * scale[1])];
                x = drawInf.x + d[0],
                    w1 = s[0],
                    w = drawInf.width - w1 - 2 * d[0],
                    y = drawInf.y + d[1],
                    x1 = x + w,
                    y1 = y + s[1],
                    h = drawInf.height - 2 * d[1],
                    h1 = h - 2 * s[1];
                break;
            case "top":
                d = [Math.round(drawInf.width * .16667), Math.round(drawInf.height * .12)];
                s = [Math.round(2 * scale[0]), Math.round(2 * scale[1])];
                x = drawInf.x + d[0],
                    x1 = x + s[1],
                    y1 = drawInf.y + d[1],
                    w = drawInf.width - d[0] * 2,
                    w1 = w - 2 * s[1],
                    h1 = d[0],
                    y = y1 + h1,
                    h = drawInf.height - h1 - 2 * d[1];
                break;
            default:
            case "bottom":
                d = [Math.round(drawInf.width * .16667), Math.round(drawInf.height * .181818)];
                s = [Math.floor(2 * scale[0]), Math.floor(2 * scale[1])];
                x = drawInf.x + d[0],
                    x1 = x + s[1],
                    y = drawInf.y + d[1],
                    w = drawInf.width - d[0] * 2,
                    w1 = w - 2 * s[1],
                    h1 = d[0],
                    h = drawInf.height - h1 - 2 * d[1],
                    y1 = y + h;
                break;
        }
        ctx.fillRect(x, y, w, h);
        ctx.fillRect(x1, y1, w1, h1);
        ctx.save();
        ctx.restore();


        // ctx.fillRect(drawInf.x + 3 * drawInf.scale[0], drawInf.y + 3 * drawInf.scale[0], drawInf.width - 6 * drawInf.scale[0], drawInf.height - 8 * drawInf.scale[0]);
        // ctx.fillRect(drawInf.x + 3 * drawInf.scale[0] + 2, drawInf.y + drawInf.height - 5 * drawInf.scale[0], drawInf.width - 6 * drawInf.scale[0] - 4, 2 * drawInf.scale[0]);
        // ctx.save();
        // ctx.restore();

    };

    port.prototype.painFiberPort = function(ctx) {
        var _this = this;
        var drawInf = _this.drawInf;
        ctx.fillStyle = '#bdbfbe';
        var r = 3.5 * drawInf.scale[0],
            x = drawInf.x + r,
            y = drawInf.y + r,
            y1 = drawInf.y + 3 * r + 1 * drawInf.scale[0],
            ir = 1.5 * drawInf.scale[0];
        ctx.beginPath(),
            ctx.arc(x, y, r, 0, 2 * Math.PI),
            ctx.moveTo(x, y1 + r),
            ctx.arc(x, y1, r, 0, 2 * Math.PI),
            ctx.fill(),
            ctx.save();
        ctx.restore();
        ctx.fillStyle = '#5c6066';
        ctx.beginPath(),
            ctx.arc(x, y, ir, 0, 2 * Math.PI),
            ctx.moveTo(x, y1 + ir),
            ctx.arc(x, y1, ir, 0, 2 * Math.PI),
            ctx.fill(),
            ctx.save();
        ctx.restore();
    };
    port.prototype.painFiberPort2 = function(ctx) {
        var _this = this;
        var drawInf = _this.drawInf;
        ctx.fillStyle = '#fafafa';
        var r = 2.5 * drawInf.scale[0],
            x = drawInf.x + r,
            y = drawInf.y + r,
            x1 = drawInf.x + 3 * r + 1 * drawInf.scale[0],
            ir = 1 * drawInf.scale[0];
        ctx.beginPath(),
            ctx.arc(x, y, r, 0, 2 * Math.PI),
            ctx.moveTo(x1, y + r),
            ctx.arc(x1, y, r, 0, 2 * Math.PI),
            ctx.fill(),
            ctx.save();
        ctx.restore();
        ctx.fillStyle = '#5c6066';
        ctx.beginPath(),
            ctx.arc(x, y, ir, 0, 2 * Math.PI),
            ctx.moveTo(x1, y + ir),
            ctx.arc(x1, y, ir, 0, 2 * Math.PI),
            ctx.fill(),
            ctx.save(),
            ctx.restore();
    };
    port.prototype.drawStatus = function(ctx) {
        var drawInf = this.drawInf;
        statusColor = this.getStatusColor();
        ctx.fillStyle = statusColor;
        ctx.fillRect(drawInf.x, drawInf.y, drawInf.width, drawInf.height);

    };
    port.prototype.getStatusColor = function() {
        var _this = this;
        var severity = _this.severity + '';

        switch (severity) { //红：#fc7a8c 绿#82e0a4   都50%           灰5b5b5b    84%
            /**/
            case '1':
                _this.statusColor = 'rgba(130,224,164,.5)';
                break;
            case '2':
                _this.statusColor = 'rgba(252,122,140,.5)';
                break;
            case '0':
            default:
                if (this.id && this.id != null && this.id.indexOf('_') == -1) {
                    _this.statusColor = 'rgba(130,224,164,.5)';
                } else if (this.id && this.id != null && this.id.indexOf('_') > -1) {
                    _this.statusColor = 'rgba(0,0,0,.5)';
                } else {
                    _this.statusColor = _this.isSelect ? 'rgba(255,255,0,.3)' : 'rgba(91,91,91,0)';
                }

                break;
        }
        return _this.statusColor;
    };
    port.prototype.isInBound = function(a, b) {
        var drawInf = this.getDrawInf(),
            x = drawInf.x,
            y = drawInf.y,
            w = drawInf.width,
            h = drawInf.height;
        return a > x && a < x + w && b > y && b < y + h;
    };

    myJF.house = house;
    myJF.cabinet = cabinet;
    myJF.equip = equip;
    myJF.port = port;
})(myJF, jQuery, window, document);
