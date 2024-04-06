import fs from 'fs';

export default (file) => {
    try {
        const buffer = fs.readFileSync(`${__dirname}/${file}.cypher`)
        return buffer.toString();
    } catch (err) {
        //console.log(err);
        return false;
    }
}