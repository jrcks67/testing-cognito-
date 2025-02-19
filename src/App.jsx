// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { RecoilRoot } from "recoil";
// import Dashboard from "./protectedRoutes/Dashboard";
// import Signin from "./Signin";
// import ProtectedRoutes from "./ProtectedRoutes";

// const App = () => {
//     return (
//         <RecoilRoot>
//             <Router>
//                 <Routes>
//                     <Route path="/" element={<Signin />} />
//                     <Route element={<ProtectedRoutes />}>
//                         <Route path="/dashboard" element={<Dashboard />} />
//                     </Route>
//                 </Routes>
//             </Router>
//         </RecoilRoot>
//     );
// };

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./protectedRoutes/Dashboard";
import Signin from "./Signin";
import ProtectedRoutes from "./ProtectedRoutes";
import Signup from "./Signup";
import TalentAuth from "./TalentSignin";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/talent-signin" element={<TalentAuth />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;