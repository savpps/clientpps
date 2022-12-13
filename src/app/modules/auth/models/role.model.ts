export class RoleModel {
    id:        string;
    name:      string;
    createdAt: Date;
    updatedAt: Date;

    setRole(role: RoleModel) {
        this.id = role.id
        this.name = role.name
        this.createdAt = role.createdAt
        this.updatedAt = role.updatedAt
    }
}