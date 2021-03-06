import fs from 'fs';
let jpy_command = ["log ", "imp ", 'let {', 'log "{']
let js_command = [
    ['console.log("', 1, '");\n'],
    ['import "', 1, '";\n'],
    ['let ', 1, "=", 2, ';\n'],
    ['console.log(', 1, ');\n']
]
let out = ""
let inpfile = "";
const check = (file) => {
    let hasfaile = false;
    try {
        fs.statSync(file);
        hasfaile = true;
    } catch (err) {
        hasfaile = false;
    }
    return hasfaile;
}

const read = (file) => {
    if (check(file)) {;
        inpfile = fs.readFileSync(file, 'utf8');
    }
    return inpfile;
}
let inp = (read('src/index.jpy').replace(/\n/g, '')).split(/;/);

for (const i in inp) {
    inp[i] = inp[i].split(/"/)
        // for (const f in inp) {
        //     if (inp[i][f]) {
        //         if (~inp[i][f].indexOf('{')) {
        //             inp[i][f] = inp[i][f].split(/{/)
        //         }
        //         if (~inp[i][f].indexOf('}')) {
        //             inp[i][f] = inp[i][f].split(/}/)
        //         }
        //     }
        // }
}
console.log(inp);
for (const i in inp) {
    for (const u in jpy_command) {
        if (~inp[i][0].indexOf(jpy_command[u])) {
            for (const f in js_command[u]) {
                if (typeof js_command[u][f] == 'number') {
                    out += inp[i][f]
                } else {
                    out += js_command[u][f]
                }
            }
        }
    }
}
console.log(out);
out = out.replace(/\n/g, '')
if (check('build_jpy')) {
    fs.writeFile('build_jpy/build.js', out, function(err) {
        if (err) { throw err; }
        console.log('build_jpy/build.jsが作成されました');
    });
} else {
    fs.mkdir('build_jpy', (err) => {
        if (err) { throw err; }
        fs.writeFile('build_jpy/build.js', out, function(err) {
            if (err) { throw err; }
            console.log('build_jpy/build.jsが作成されました');
        });
    });
}