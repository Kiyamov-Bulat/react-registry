const URL_ALPHABET =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

export function nanoid(size = 21) {
    let id = '';
    let i = size | 0;

    while (i--) {
        // `| 0` is more compact and faster than `Math.floor()`.
        id += URL_ALPHABET[(Math.random() * 64) | 0];
    }
    return id;
}
