// // hooks/useAuth.js
// import { useRecoilState } from "recoil";
// import { userState as userStateAtom } from "../store/atoms";  // Remove the alias

// const useAuth = () => {
//     const [userState, setUserState] = useRecoilState(userStateAtom);
    
//     return {
//         userState,
//         setUserState
//     };
// };

// export default useAuth;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};