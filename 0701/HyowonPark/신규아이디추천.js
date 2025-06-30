function solution(new_id) {
    new_id = new_id.toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "")
        .replace(/\.{2,}/g, ".")
        .replace(/^\.|\.$/g, "");

    if (new_id.length <= 2) {
        new_id += (new_id.at(-1) || "a").repeat(3 - new_id.length);
    }

    new_id = new_id.slice(0, 15);
    if (new_id.at(-1) === ".") {
        new_id = new_id.slice(0, new_id.length - 1);
    }
    
    return new_id;
}