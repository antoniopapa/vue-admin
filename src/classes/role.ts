import {Permission} from "@/classes/permission";
import {Entity} from "@/interfaces/entity";

export class Role implements Entity {
    id: number;
    name: string;
    permissions: Permission[];

    constructor(id = 0, name = '', permissions = []) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }
}
