function countChildren(node) {
    var counter = 0;
    if (node.hasChildNodes())
        for (var son of node.childNodes) {
            counter += countChildren(son);
        }
    return (counter + 1);
}

function countLIChildren(node) {
    var counter = 0;
    if (node.hasChildNodes())
        for (var son of node.childNodes) {
            if (son.nodeName == "LI" || son.nodeName == "UL")
                counter += countLIChildren(son);
        }
    if (node.nodeName == "LI")
        return (counter + 1);
    else return counter;
}

function showinfo(node, depth) {
    var s = '';
    for (var i = 0; i < depth; i++)
        s += '  ';
    s += "Nesting Level: " + depth + ', ';
    s += "nodeType: "
    switch (node.nodeType) {
        case 1:
            s += 'ELEMENT';
            break;
        case 2:
            s += 'ATTRIBUTE';
            break;
        case 3:
            s += 'TEXT';
            break;
        case 4:
            s += 'CDATA_SECTION';
            break;
        case 5:
            s += 'ENTITY_REFERENCE';
            break;
        case 6:
            s += 'ENTITY';
            break;
        case 7:
            s += 'PROCESSING_INSTRUCTION';
            break;
        case 8:
            s += 'COMMENT';
            break;
        case 9:
            s += 'DOCUMENT';
            break;
        case 10:
            s += 'DOCUMENT_TYPE';
            break;
        case 11:
            s += 'DOCUMENT_FRAGMENT';
            break;
        case 12:
            s += 'NOTATION';
            break;
        default:
            s += 'ERROR'
    }
    if (node.nodeName == 'LI') {
        console.log(node.childNodes)
        if (countLIChildren(node) - 1 !== 0) {
            node.childNodes[1].style = "display: none";
        } else
            state.set(node.id, 0);
        node.childNodes[1].innerHTML = (countLIChildren(node) - 1);
    }
    s += ', Node Tag: ' + node.nodeName;
    if (typeof node.id !== 'undefined' && node.id !== null && node.id !== '')
        s += ', Node ID:' + node.id;
    if (node.nodeValue !== null)
        if (node.nodeValue.replace(/(\r\n|\n| |\r)/gm, '') !== '')
            s += ', Node Value: ' + node.nodeValue.replace(/(\r\n|\n|\r)/gm, "");
    if (node.hasChildNodes())

        s += ', Child Nodes(1st layer): ' + node.childNodes.length;
    else
        s += ', Node Children: none';
    s += ', Total Descendants: ' + (countChildren(node) - 1);
    console.log(s);
    for (var son of node.childNodes) {
        showinfo(son, depth + 1);
    }
}
showinfo(document.documentElement, 0);