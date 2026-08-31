export const MANAGER_ROLES = ["manager", "admin"];

export function isManagerRole(role) {
    return MANAGER_ROLES.includes(role);
}
