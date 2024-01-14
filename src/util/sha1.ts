import * as crypto from 'crypto';

function Sha1 (pass: string) {
    const hashCode = crypto.createHash('sha256');
    hashCode.update(pass);
    return hashCode.digest("hex");
}

export { Sha1 }