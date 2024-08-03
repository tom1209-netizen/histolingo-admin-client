interface RolePrivileges {
    [category: string]: {
        [action: string]: number;
    };
}

export const formatRolePrivilegesOptions = (rolePrivileges: RolePrivileges) => {
    const options: string[] = [];
    for (const [category, actions] of Object.entries(rolePrivileges)) {
        for (const [action, _] of Object.entries(actions)) {
            options.push(`${category} - ${action}`);
        }
    }
    return options;
};