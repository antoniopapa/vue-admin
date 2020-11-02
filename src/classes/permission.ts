import {Entity} from "@/interfaces/entity";

export class Permission implements Entity {
    id: number;
    name: string;

    constructor(id = 0, name = '') {
        this.id = id;
        this.name = name;
    }
}
