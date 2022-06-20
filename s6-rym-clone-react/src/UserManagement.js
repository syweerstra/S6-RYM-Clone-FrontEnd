export function LogoutStorage(){
    localStorage.removeItem("JWT");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
}
