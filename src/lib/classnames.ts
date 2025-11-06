/**
 * A minimal implementation of the `classnames` utility.
 * Supports strings, objects ({ 'class-name': boolean }), and arrays.
 *
 * @example
 * cx('btn', { active: true, disabled: false }, ['primary'])
 * // → "btn active primary"
 */
export default function cx(...args: unknown[]): string {
    const classes: string[] = [];

    for (const arg of args) {
        if (!arg) continue;

        switch (typeof arg) {
            case 'string':
            case 'number':
                classes.push(arg.toString());
                break;
            case 'object':
                if (Array.isArray(arg)) {
                    classes.push(cx(...arg));
                } else {
                    for (const key in arg) {
                        const enabled = (arg as Record<string, unknown>)[key];

                        if (enabled) classes.push(key);
                    }
                }
                break;
        }
    }

    return classes.join(' ');
}
