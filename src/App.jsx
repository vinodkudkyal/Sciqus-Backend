// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// import { useState, useEffect } from "react";
// import {
//   User,
//   Lock,
//   BookOpen,
//   Users,
//   LogOut,
//   PlusCircle
// } from "lucide-react";

// const API = "http://localhost:3000";

// export default function App() {
//   const [token, setToken] = useState("");
//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [courses, setCourses] = useState([]);
//   const [students, setStudents] = useState([]);

//   // Course form
//   const [courseName, setCourseName] = useState("");
//   const [courseCode, setCourseCode] = useState("");
//   const [courseDuration, setCourseDuration] = useState("");

//   // Student form
//   const [name, setName] = useState("");
//   const [studentEmail, setStudentEmail] = useState("");
//   const [studentPassword, setStudentPassword] = useState("");
//   const [courseId, setCourseId] = useState("");

//   /* ---------------- AUTH ---------------- */

//   const login = async () => {
//     const res = await fetch(`${API}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password })
//     });

//     const data = await res.json();
//     if (data.token) {
//       setToken(data.token);

//       // Decode role from token (simple way)
//       const payload = JSON.parse(atob(data.token.split(".")[1]));
//       setRole(payload.role);

//       loadCourses(data.token);
//       if (payload.role === "admin") loadStudents(data.token);
//     } else {
//       alert("Login failed");
//     }
//   };

//   const logout = () => {
//     setToken("");
//     setRole("");
//   };

//   /* ---------------- LOAD DATA ---------------- */

//   const loadCourses = async (tok = token) => {
//     const res = await fetch(`${API}/courses`, {
//       headers: { Authorization: `Bearer ${tok}` }
//     });
//     const data = await res.json();
//     setCourses(data);
//   };

//   const loadStudents = async (tok = token) => {
//     const res = await fetch(`${API}/students`, {
//       headers: { Authorization: `Bearer ${tok}` }
//     });
//     const data = await res.json();
//     setStudents(data);
//   };

//   /* ---------------- ADMIN ACTIONS ---------------- */

//   const createCourse = async () => {
//     await fetch(`${API}/courses`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         course_name: courseName,
//         course_code: courseCode,
//         course_duration: courseDuration
//       })
//     });
//     loadCourses();
//     setCourseName("");
//     setCourseCode("");
//     setCourseDuration("");
//   };

//   const addStudent = async () => {
//     await fetch(`${API}/students`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name,
//         email: studentEmail,
//         password: studentPassword,
//         course_id: courseId
//       })
//     });
//     loadStudents();
//     setName("");
//     setStudentEmail("");
//     setStudentPassword("");
//     setCourseId("");
//   };

//   /* ---------------- UI ---------------- */

//   if (!token) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
//         <div className="bg-slate-800 p-8 rounded-xl w-96 shadow-lg">
//           <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

//           <div className="mb-4">
//             <label className="text-sm">Email</label>
//             <div className="flex items-center bg-slate-700 rounded p-2 mt-1">
//               <User size={16} />
//               <input
//                 className="bg-transparent ml-2 outline-none w-full"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="mb-6">
//             <label className="text-sm">Password</label>
//             <div className="flex items-center bg-slate-700 rounded p-2 mt-1">
//               <Lock size={16} />
//               <input
//                 type="password"
//                 className="bg-transparent ml-2 outline-none w-full"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <button
//             onClick={login}
//             className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-900 text-white p-6">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">
//           Student Course Management ({role})
//         </h1>
//         <button
//           onClick={logout}
//           className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded"
//         >
//           <LogOut size={16} /> Logout
//         </button>
//       </div>

//       {/* ADMIN PANEL */}
//       {role === "admin" && (
//         <>
//           {/* Create Course */}
//           <section className="bg-slate-800 p-4 rounded mb-6">
//             <h2 className="font-bold mb-3 flex gap-2">
//               <BookOpen /> Create Course
//             </h2>
//             <div className="grid grid-cols-3 gap-3">
//               <input
//                 placeholder="Course Name"
//                 className="p-2 bg-slate-700 rounded"
//                 value={courseName}
//                 onChange={(e) => setCourseName(e.target.value)}
//               />
//               <input
//                 placeholder="Course Code"
//                 className="p-2 bg-slate-700 rounded"
//                 value={courseCode}
//                 onChange={(e) => setCourseCode(e.target.value)}
//               />
//               <input
//                 placeholder="Duration"
//                 className="p-2 bg-slate-700 rounded"
//                 value={courseDuration}
//                 onChange={(e) => setCourseDuration(e.target.value)}
//               />
//             </div>
//             <button
//               onClick={createCourse}
//               className="mt-3 bg-green-600 px-4 py-2 rounded flex gap-2"
//             >
//               <PlusCircle size={16} /> Add Course
//             </button>
//           </section>

//           {/* Add Student */}
//           <section className="bg-slate-800 p-4 rounded mb-6">
//             <h2 className="font-bold mb-3 flex gap-2">
//               <Users /> Add Student
//             </h2>
//             <div className="grid grid-cols-4 gap-3">
//               <input
//                 placeholder="Name"
//                 className="p-2 bg-slate-700 rounded"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <input
//                 placeholder="Email"
//                 className="p-2 bg-slate-700 rounded"
//                 value={studentEmail}
//                 onChange={(e) => setStudentEmail(e.target.value)}
//               />
//               <input
//                 placeholder="Password"
//                 className="p-2 bg-slate-700 rounded"
//                 value={studentPassword}
//                 onChange={(e) => setStudentPassword(e.target.value)}
//               />
//               <select
//                 className="p-2 bg-slate-700 rounded"
//                 value={courseId}
//                 onChange={(e) => setCourseId(e.target.value)}
//               >
//                 <option value="">Select Course</option>
//                 {courses.map((c) => (
//                   <option key={c.course_id} value={c.course_id}>
//                     {c.course_name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button
//               onClick={addStudent}
//               className="mt-3 bg-blue-600 px-4 py-2 rounded"
//             >
//               Add Student
//             </button>
//           </section>

//           {/* Student List */}
//           <section className="bg-slate-800 p-4 rounded">
//             <h2 className="font-bold mb-3">Students</h2>
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="text-gray-400">
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Course</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((s) => (
//                   <tr key={s.student_id}>
//                     <td>{s.name}</td>
//                     <td>{s.email}</td>
//                     <td>{s.course_name}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </section>
//         </>
//       )}

//       {/* STUDENT VIEW */}
//       {role === "student" && (
//         <section className="bg-slate-800 p-4 rounded">
//           <h2 className="font-bold mb-3">Available Courses</h2>
//           <ul className="list-disc ml-6">
//             {courses.map((c) => (
//               <li key={c.course_id}>
//                 {c.course_name} ({c.course_code})
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}
//     </div>
//   );
// }



// import { useState } from "react";
// import {
//   User,
//   Lock,
//   BookOpen,
//   Users,
//   LogOut,
//   PlusCircle,
//   Trash2,
//   Edit
// } from "lucide-react";

// const API = "http://localhost:3000";

// export default function App() {
//   const [token, setToken] = useState("");
//   const [role, setRole] = useState("");

//   // login
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // data
//   const [courses, setCourses] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [myProfile, setMyProfile] = useState(null);

//   // course form
//   const [courseName, setCourseName] = useState("");
//   const [courseCode, setCourseCode] = useState("");
//   const [courseDuration, setCourseDuration] = useState("");

//   // student form
//   const [name, setName] = useState("");
//   const [studentEmail, setStudentEmail] = useState("");
//   const [studentPassword, setStudentPassword] = useState("");
//   const [courseId, setCourseId] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   /* ---------------- AUTH ---------------- */

//   const login = async () => {
//     const res = await fetch(`${API}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password })
//     });
//     const data = await res.json();

//     if (!data.token) return alert("Login failed");

//     setToken(data.token);
//     const payload = JSON.parse(atob(data.token.split(".")[1]));
//     setRole(payload.role);

//     loadCourses(data.token);

//     if (payload.role === "admin") loadStudents(data.token);
//     else loadMyProfile(data.token);
//   };

//   const logout = () => {
//     setToken("");
//     setRole("");
//     setMyProfile(null);
//   };

//   /* ---------------- LOAD ---------------- */

//   const loadCourses = async (tok = token) => {
//     const res = await fetch(`${API}/courses`, {
//       headers: { Authorization: `Bearer ${tok}` }
//     });
//     setCourses(await res.json());
//   };

//   const loadStudents = async (tok = token) => {
//     const res = await fetch(`${API}/students`, {
//       headers: { Authorization: `Bearer ${tok}` }
//     });
//     setStudents(await res.json());
//   };

//   const loadMyProfile = async (tok = token) => {
//     const res = await fetch(`${API}/students/me`, {
//       headers: { Authorization: `Bearer ${tok}` }
//     });
//     setMyProfile(await res.json());
//   };

//   /* ---------------- ADMIN ACTIONS ---------------- */

//   const createCourse = async () => {
//     await fetch(`${API}/courses`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         course_name: courseName,
//         course_code: courseCode,
//         course_duration: courseDuration
//       })
//     });
//     loadCourses();
//     setCourseName("");
//     setCourseCode("");
//     setCourseDuration("");
//   };

//   const saveStudent = async () => {
//     const url = editingId
//       ? `${API}/students/${editingId}`
//       : `${API}/students`;

//     const method = editingId ? "PUT" : "POST";

//     await fetch(url, {
//       method,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(
//         editingId
//           ? { course_id: courseId }
//           : {
//               name,
//               email: studentEmail,
//               password: studentPassword,
//               course_id: courseId
//             }
//       )
//     });

//     loadStudents();
//     setName("");
//     setStudentEmail("");
//     setStudentPassword("");
//     setCourseId("");
//     setEditingId(null);
//   };

//   const editStudent = (s) => {
//     setEditingId(s.student_id);
//     setName(s.student_name);
//     setStudentEmail(s.email);
//     setCourseId(s.course_id || "");
//   };

//   const deleteStudent = async (id) => {
//     if (!confirm("Delete this student?")) return;

//     await fetch(`${API}/students/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     loadStudents();
//   };

//   /* ---------------- LOGIN UI ---------------- */

//   if (!token) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
//         <div className="bg-slate-800 p-8 rounded-xl w-96">
//           <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

//           <input
//             placeholder="Email"
//             className="w-full p-2 mb-3 bg-slate-700 rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-2 mb-5 bg-slate-700 rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             onClick={login}
//             className="w-full bg-blue-600 p-2 rounded"
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ---------------- DASHBOARD ---------------- */

//   return (
//     <div className="min-h-screen bg-slate-900 text-white p-6">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-xl font-bold">Dashboard ({role})</h1>
//         <button
//           onClick={logout}
//           className="bg-red-600 px-4 py-2 rounded flex gap-2"
//         >
//           <LogOut size={16} /> Logout
//         </button>
//       </div>

//       {/* ADMIN */}
//       {role === "admin" && (
//         <>
//           {/* COURSE */}
//           <div className="bg-slate-800 p-4 rounded mb-6">
//             <h2 className="font-bold mb-3">Create Course</h2>
//             <div className="grid grid-cols-3 gap-3">
//               <input
//                 placeholder="Course Name"
//                 className="p-2 bg-slate-700 rounded"
//                 value={courseName}
//                 onChange={(e) => setCourseName(e.target.value)}
//               />
//               <input
//                 placeholder="Course Code"
//                 className="p-2 bg-slate-700 rounded"
//                 value={courseCode}
//                 onChange={(e) => setCourseCode(e.target.value)}
//               />
//               <input
//                 placeholder="Duration"
//                 className="p-2 bg-slate-700 rounded"
//                 value={courseDuration}
//                 onChange={(e) => setCourseDuration(e.target.value)}
//               />
//             </div>
//             <button
//               onClick={createCourse}
//               className="mt-3 bg-green-600 px-4 py-2 rounded"
//             >
//               Add Course
//             </button>
//           </div>

//           {/* STUDENT */}
//           <div className="bg-slate-800 p-4 rounded mb-6">
//             <h2 className="font-bold mb-3">
//               {editingId ? "Update Student" : "Add Student"}
//             </h2>

//             <div className="grid grid-cols-4 gap-3">
//               {!editingId && (
//                 <>
//                   <input
//                     placeholder="Name"
//                     className="p-2 bg-slate-700 rounded"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                   <input
//                     placeholder="Email"
//                     className="p-2 bg-slate-700 rounded"
//                     value={studentEmail}
//                     onChange={(e) => setStudentEmail(e.target.value)}
//                   />
//                   <input
//                     placeholder="Password"
//                     className="p-2 bg-slate-700 rounded"
//                     value={studentPassword}
//                     onChange={(e) => setStudentPassword(e.target.value)}
//                   />
//                 </>
//               )}

//               <select
//                 className="p-2 bg-slate-700 rounded"
//                 value={courseId}
//                 onChange={(e) => setCourseId(e.target.value)}
//               >
//                 <option value="">Select Course</option>
//                 {courses.map((c) => (
//                   <option key={c.course_id} value={c.course_id}>
//                     {c.course_name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <button
//               onClick={saveStudent}
//               className="mt-3 bg-blue-600 px-4 py-2 rounded"
//             >
//               {editingId ? "Update Student" : "Add Student"}
//             </button>
//           </div>

//           {/* STUDENT TABLE */}
//           <div className="bg-slate-800 p-4 rounded">
//             <h2 className="font-bold mb-3">Students</h2>
//             <table className="w-full">
//               <thead className="text-gray-400">
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Course</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((s) => (
//                   <tr key={s.student_id}>
//                     <td>{s.student_name}</td>
//                     <td>{s.email}</td>
//                     <td>{s.course_name}</td>
//                     <td className="flex gap-2">
//                       <button onClick={() => editStudent(s)}>
//                         <Edit size={16} />
//                       </button>
//                       <button onClick={() => deleteStudent(s.student_id)}>
//                         <Trash2 size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}

//       {/* STUDENT */}
//       {role === "student" && myProfile && (
//         <div className="bg-slate-800 p-6 rounded max-w-xl">
//           <h2 className="text-xl font-bold mb-4">My Profile</h2>
//           <p><b>Name:</b> {myProfile.student_name}</p>
//           <p><b>Email:</b> {myProfile.email}</p>
//           <p><b>Course:</b> {myProfile.course_name}</p>
//           <p><b>Code:</b> {myProfile.course_code}</p>
//           <p><b>Duration:</b> {myProfile.course_duration} weeks</p>
//         </div>
//       )}
//     </div>
//   );
// }




// import { useState } from "react";
// import { LogOut, Edit, Trash2 } from "lucide-react";

// const API = "http://localhost:3000";

// export default function App() {
//   const [token, setToken] = useState("");
//   const [role, setRole] = useState("");

//   // login
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // data
//   const [courses, setCourses] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [myProfile, setMyProfile] = useState(null);

//   // student form (admin)
//   const [studentName, setStudentName] = useState("");
//   const [studentEmail, setStudentEmail] = useState("");
//   const [studentPassword, setStudentPassword] = useState("");
//   const [courseId, setCourseId] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // course form
//   const [courseName, setCourseName] = useState("");
//   const [courseCode, setCourseCode] = useState("");
//   const [courseDuration, setCourseDuration] = useState("");

//   /* ---------------- AUTH ---------------- */

//   const login = async () => {
//     const res = await fetch(`${API}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password })
//     });

//     const data = await res.json();
//     if (!data.token) return alert("Login failed");

//     setToken(data.token);
//     const payload = JSON.parse(atob(data.token.split(".")[1]));
//     setRole(payload.role);

//     loadCourses(data.token);

//     if (payload.role === "admin") {
//       loadStudents(data.token);
//     } else {
//       loadMyProfile(data.token);
//     }
//   };

//   const logout = () => {
//     setToken("");
//     setRole("");
//     setMyProfile(null);
//   };

//   /* ---------------- LOAD DATA ---------------- */

//   const loadCourses = async (tok = token) => {
//     const res = await fetch(`${API}/courses`, {
//       headers: { Authorization: `Bearer ${tok}` }
//     });
//     setCourses(await res.json());
//   };

//   const loadStudents = async (tok = token) => {
//     const res = await fetch(`${API}/students`, {
//       headers: { Authorization: `Bearer ${tok}` }
//     });
//     setStudents(await res.json());
//   };

//   const loadMyProfile = async (tok = token) => {
//     const res = await fetch(`${API}/students/me`, {
//       headers: { Authorization: `Bearer ${tok}` }
//     });
//     setMyProfile(await res.json());
//   };

//   /* ---------------- ADMIN ACTIONS ---------------- */

//   const createCourse = async () => {
//     await fetch(`${API}/courses`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         course_name: courseName,
//         course_code: courseCode,
//         course_duration: courseDuration
//       })
//     });

//     loadCourses();
//     setCourseName("");
//     setCourseCode("");
//     setCourseDuration("");
//   };

//   const saveStudent = async () => {
//     const url = editingId
//       ? `${API}/students/${editingId}`
//       : `${API}/students`;

//     const method = editingId ? "PUT" : "POST";

//     await fetch(url, {
//       method,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(
//         editingId
//           ? { course_id: courseId }
//           : {
//               student_name: studentName,
//               email: studentEmail,
//               password: studentPassword,
//               course_id: courseId
//             }
//       )
//     });

//     loadStudents();
//     setStudentName("");
//     setStudentEmail("");
//     setStudentPassword("");
//     setCourseId("");
//     setEditingId(null);
//   };

//   const editStudent = (s) => {
//     setEditingId(s.student_id);
//     setStudentName(s.student_name);
//     setStudentEmail(s.email);
//     setCourseId(s.course_id || "");
//   };

//   const deleteStudent = async (id) => {
//     if (!confirm("Delete this student?")) return;

//     await fetch(`${API}/students/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     loadStudents();
//   };

//   /* ---------------- LOGIN UI ---------------- */

//   if (!token) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
//         <div className="bg-slate-800 p-8 rounded-xl w-96">
//           <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

//           <input
//             placeholder="Email"
//             className="w-full p-2 mb-3 bg-slate-700 rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-2 mb-5 bg-slate-700 rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             onClick={login}
//             className="w-full bg-blue-600 p-2 rounded"
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ---------------- DASHBOARD ---------------- */

//   return (
//     <div className="min-h-screen bg-slate-900 text-white p-6">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-xl font-bold">Dashboard ({role})</h1>
//         <button
//           onClick={logout}
//           className="bg-red-600 px-4 py-2 rounded flex gap-2"
//         >
//           <LogOut size={16} /> Logout
//         </button>
//       </div>

//       {/* ================= ADMIN ================= */}
//       {role === "admin" && (
//         <>
//           {/* CREATE COURSE */}
//           <div className="bg-slate-800 p-4 rounded mb-6">
//             <h2 className="font-bold mb-3">Create Course</h2>
//             <div className="grid grid-cols-3 gap-3">
//               <input
//                 placeholder="Course Name"
//                 className="p-2 bg-slate-700 rounded"
//                 value={courseName}
//                 onChange={(e) => setCourseName(e.target.value)}
//               />
//               <input
//                 placeholder="Course Code"
//                 className="p-2 bg-slate-700 rounded"
//                 value={courseCode}
//                 onChange={(e) => setCourseCode(e.target.value)}
//               />
//               <input
//                 placeholder="Duration"
//                 className="p-2 bg-slate-700 rounded"
//                 value={courseDuration}
//                 onChange={(e) => setCourseDuration(e.target.value)}
//               />
//             </div>
//             <button
//               onClick={createCourse}
//               className="mt-3 bg-green-600 px-4 py-2 rounded"
//             >
//               Add Course
//             </button>
//           </div>

//           {/* ADD / UPDATE STUDENT */}
//           <div className="bg-slate-800 p-4 rounded mb-6">
//             <h2 className="font-bold mb-3">
//               {editingId ? "Update Student" : "Add Student"}
//             </h2>

//             <div className="grid grid-cols-4 gap-3">
//               {!editingId && (
//                 <>
//                   <input
//                     placeholder="Student Name"
//                     className="p-2 bg-slate-700 rounded"
//                     value={studentName}
//                     onChange={(e) => setStudentName(e.target.value)}
//                   />
//                   <input
//                     placeholder="Email"
//                     className="p-2 bg-slate-700 rounded"
//                     value={studentEmail}
//                     onChange={(e) => setStudentEmail(e.target.value)}
//                   />
//                   <input
//                     placeholder="Password"
//                     className="p-2 bg-slate-700 rounded"
//                     value={studentPassword}
//                     onChange={(e) => setStudentPassword(e.target.value)}
//                   />
//                 </>
//               )}

//               <select
//                 className="p-2 bg-slate-700 rounded"
//                 value={courseId}
//                 onChange={(e) => setCourseId(e.target.value)}
//               >
//                 <option value="">Select Course</option>
//                 {courses.map((c) => (
//                   <option key={c.course_id} value={c.course_id}>
//                     {c.course_name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <button
//               onClick={saveStudent}
//               className="mt-3 bg-blue-600 px-4 py-2 rounded"
//             >
//               {editingId ? "Update Student" : "Add Student"}
//             </button>
//           </div>

//           {/* STUDENT TABLE */}
//           <div className="bg-slate-800 p-4 rounded">
//             <h2 className="font-bold mb-3">Students</h2>
//             <table className="w-full">
//               <thead className="text-gray-400">
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Course</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((s) => (
//                   <tr key={s.student_id}>
//                     <td>{s.student_name}</td>
//                     <td>{s.email}</td>
//                     <td>{s.course_name}</td>
//                     <td className="flex gap-2">
//                       <button onClick={() => editStudent(s)}>
//                         <Edit size={16} />
//                       </button>
//                       <button onClick={() => deleteStudent(s.student_id)}>
//                         <Trash2 size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}

//       {/* ================= STUDENT ================= */}
//       {role === "student" && myProfile && (
//         <>
//           {/* PROFILE */}
//           <div className="bg-slate-800 p-6 rounded max-w-xl mb-6">
//             <h2 className="text-xl font-bold mb-4">My Profile</h2>
//             <p><b>Name:</b> {myProfile.student_name}</p>
//             <p><b>Email:</b> {myProfile.email}</p>
//             <p><b>Course:</b> {myProfile.course_name}</p>
//             <p><b>Code:</b> {myProfile.course_code}</p>
//             <p><b>Duration:</b> {myProfile.course_duration} weeks</p>
//           </div>

//           {/* AVAILABLE COURSES */}
//           <div className="bg-slate-800 p-6 rounded max-w-xl">
//             <h2 className="text-xl font-bold mb-4">Available Courses</h2>
//             <ul className="list-disc ml-6 space-y-1">
//               {courses.map((c) => (
//                 <li key={c.course_id}>
//                   {c.course_name} ({c.course_code}) – {c.course_duration} weeks
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import { 
  LogOut, 
  Edit, 
  Trash2, 
  Plus, 
  BookOpen, 
  User, 
  GraduationCap, 
  LayoutDashboard,
  Clock,
  Hash,
  XCircle,
  Save,
  Loader2
} from "lucide-react";

const API = "http://localhost:3000";

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                  */
/* -------------------------------------------------------------------------- */

// FIX: Moved InputField OUTSIDE the App component so it doesn't re-render on every keystroke
const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-1">
    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-500 transition-colors">
        <Icon size={16} />
      </div>
      <input 
        {...props} 
        className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-600 transition-all outline-none"
      />
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* MAIN APP                                    */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  // login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // data
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [myProfile, setMyProfile] = useState(null);

  // student form (admin)
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [courseId, setCourseId] = useState("");
  const [editingId, setEditingId] = useState(null);

  // course form
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDuration, setCourseDuration] = useState("");

  /* ---------------- AUTH ---------------- */

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!data.token) throw new Error("Login failed");

      setToken(data.token);
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      setRole(payload.role);

      loadCourses(data.token);

      if (payload.role === "admin") {
        loadStudents(data.token);
      } else {
        loadMyProfile(data.token);
      }
    } catch (err) {
      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken("");
    setRole("");
    setMyProfile(null);
    setEmail("");
    setPassword("");
  };

  /* ---------------- LOAD DATA ---------------- */

  const loadCourses = async (tok = token) => {
    try {
      const res = await fetch(`${API}/courses`, {
        headers: { Authorization: `Bearer ${tok}` }
      });
      setCourses(await res.json());
    } catch (e) { console.error(e); }
  };

  const loadStudents = async (tok = token) => {
    try {
      const res = await fetch(`${API}/students`, {
        headers: { Authorization: `Bearer ${tok}` }
      });
      setStudents(await res.json());
    } catch (e) { console.error(e); }
  };

  const loadMyProfile = async (tok = token) => {
    try {
      const res = await fetch(`${API}/students/me`, {
        headers: { Authorization: `Bearer ${tok}` }
      });
      setMyProfile(await res.json());
    } catch (e) { console.error(e); }
  };

  /* ---------------- ADMIN ACTIONS ---------------- */

  const createCourse = async (e) => {
    e.preventDefault();
    if(!courseName || !courseCode || !courseDuration) return alert("Fill all fields");
    
    await fetch(`${API}/courses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        course_name: courseName,
        course_code: courseCode,
        course_duration: courseDuration
      })
    });

    loadCourses();
    setCourseName("");
    setCourseCode("");
    setCourseDuration("");
    alert("Course Created Successfully!");
  };

  const saveStudent = async (e) => {
  e.preventDefault();

  // 🔴 FRONTEND VALIDATION
  if (!editingId) {
    if (!studentName || !studentEmail || !studentPassword || !courseId) {
      alert("Please fill all student details and select a course");
      return;
    }
  }

  if (editingId && !courseId) {
    alert("Please select a course");
    return;
  }

  const url = editingId
    ? `${API}/students/${editingId}`
    : `${API}/students`;

  const method = editingId ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      editingId
        ? { course_id: courseId }
        : {
            student_name: studentName,
            email: studentEmail,
            password: studentPassword,
            course_id: courseId
          }
    )
  });

  const data = await res.json();

  // 🔴 HANDLE BACKEND ERRORS
  if (!res.ok) {
    alert(data.message || "Failed to add student");
    return;
  }

  alert(editingId ? "Student updated successfully" : "Student added successfully");

  loadStudents();
  cancelEdit();
};

  const editStudent = (s) => {
    setEditingId(s.student_id);
    setStudentName(s.student_name);
    setStudentEmail(s.email);
    setCourseId(s.course_id || "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setStudentName("");
    setStudentEmail("");
    setStudentPassword("");
    setCourseId("");
    setEditingId(null);
  };

  const deleteStudent = async (id) => {
    if (!confirm("Delete this student permanently?")) return;

    await fetch(`${API}/students/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    loadStudents();
  };


  /* ---------------- LOGIN UI ---------------- */

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 relative overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 bg-indigo-600 rounded-xl mb-4 shadow-lg shadow-indigo-600/20">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
            <p className="text-slate-400 text-sm mt-1">Sign in to your dashboard</p>
          </div>

          <form onSubmit={login} className="space-y-5">
            <InputField 
              label="Email Address" 
              icon={User} 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin@sciqus.com"
              autoFocus
            />
            <InputField 
              label="Password" 
              icon={Hash} 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
            />
            
            <button
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 flex justify-center items-center gap-2 mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Login"}
            </button>
          </form>
          
          <div className="mt-6 text-center text-xs text-slate-500">
            Protected by Sciqus Security
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- DASHBOARD UI ---------------- */

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* NAVBAR */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow shadow-indigo-600/30">
              <GraduationCap size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight">Sciqus<span className="text-indigo-400">LMS</span></span>
            <span className="text-[10px] px-2 py-0.5 bg-slate-800 border border-slate-700 rounded-full text-slate-400 uppercase font-bold tracking-wider">
              {role}
            </span>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium px-3 py-1.5 hover:bg-red-400/10 rounded-lg">
            <span>Sign Out</span>
            <LogOut size={16} />
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 animate-in fade-in duration-500">
        
        {/* ================= ADMIN VIEW ================= */}
        {role === "admin" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COL: FORMS */}
            <div className="space-y-8">
              
              {/* CREATE COURSE CARD */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-6 text-indigo-400">
                  <BookOpen size={20} />
                  <h2 className="font-bold text-white text-lg">Create Course</h2>
                </div>
                <form onSubmit={createCourse} className="space-y-4">
                  <InputField label="Course Name" icon={BookOpen} value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="e.g. React Native" />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Code" icon={Hash} value={courseCode} onChange={(e) => setCourseCode(e.target.value)} placeholder="CS-101" />
                    <InputField label="Duration (Wks)" icon={Clock} value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)} placeholder="12" />
                  </div>
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 mt-2">
                    <Plus size={16} /> Add Course
                  </button>
                </form>
              </div>

              {/* STUDENT FORM CARD */}
              <div className={`bg-slate-900 border ${editingId ? 'border-amber-500/50 ring-1 ring-amber-500/20' : 'border-slate-800'} rounded-xl p-6 shadow-lg transition-all`}>
                <div className="flex items-center justify-between mb-6">
                  <div className={`flex items-center gap-2 ${editingId ? 'text-amber-400' : 'text-indigo-400'}`}>
                    <User size={20} />
                    <h2 className="font-bold text-white text-lg">{editingId ? "Edit Student" : "Register Student"}</h2>
                  </div>
                  {editingId && (
                    <button onClick={cancelEdit} className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2 py-1 rounded">
                      <XCircle size={14}/> Cancel
                    </button>
                  )}
                </div>

                <form onSubmit={saveStudent} className="space-y-4">
                  {!editingId && (
                    <>
                      <InputField label="Full Name" icon={User} value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="John Doe" />
                      <InputField label="Email" icon={User} value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="john@example.com" />
                      <InputField label="Password" icon={Hash} type="password" value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} placeholder="Create password" />
                    </>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assign Course</label>
                    <div className="relative group">
                      <select 
                        required
                        className="w-full pl-3 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white outline-none appearance-none cursor-pointer transition-all"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                      >
                        <option value="">Select a course...</option>
                        {courses.map((c) => (
                          <option key={c.course_id} value={c.course_id}>{c.course_name} ({c.course_code})</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                        <BookOpen size={16}/>
                      </div>
                    </div>
                  </div>

                  <button className={`w-full ${editingId ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'} text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg mt-2`}>
                    {editingId ? <Save size={16}/> : <Plus size={16}/>} 
                    {editingId ? "Update Student" : "Register Student"}
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT COL: TABLE */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg h-full">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                  <h3 className="font-bold text-lg">Student Directory</h3>
                  <span className="text-xs bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300 font-mono">
                    {students.length} Records
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-950 uppercase font-medium border-b border-slate-800 text-xs tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Student</th>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {students.map((s) => (
                        <tr key={s.student_id} className="hover:bg-slate-800/50 transition-colors group">
                          <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-xs font-bold border border-indigo-500/20">
                              {s.student_name.charAt(0)}
                            </div>
                            {s.student_name}
                          </td>
                          <td className="px-6 py-4 font-mono text-xs text-slate-500">{s.email}</td>
                          <td className="px-6 py-4">
                            {s.course_name ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                {s.course_name}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-slate-500 text-xs font-medium border border-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                                Unassigned
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => editStudent(s)} className="p-2 hover:bg-indigo-500/20 text-indigo-400 rounded-lg transition-colors" title="Edit">
                                <Edit size={16} />
                              </button>
                              <button onClick={() => deleteStudent(s.student_id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Delete">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {students.length === 0 && (
                        <tr><td colSpan="4" className="text-center py-12 text-slate-500 italic">No students found in the database.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STUDENT VIEW ================= */}
        {role === "student" && myProfile && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* PROFILE CARD */}
            <div className="md:col-span-1">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg sticky top-24">
                <div className="flex flex-col items-center text-center mb-6 relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-xl shadow-indigo-500/20 border-4 border-slate-900">
                    {myProfile.student_name.charAt(0)}
                  </div>
                  <h2 className="text-xl font-bold text-white">{myProfile.student_name}</h2>
                  <p className="text-slate-400 text-sm font-mono">{myProfile.email}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                      <BookOpen size={48} />
                    </div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1 tracking-wider">Current Enrollment</p>
                    <p className="flex items-center gap-2 font-medium text-white text-lg">
                      <BookOpen size={18} className="text-indigo-400"/> 
                      {myProfile.course_name || "Not Enrolled"}
                    </p>
                  </div>
                  {myProfile.course_name && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-800/50 rounded-xl text-center border border-slate-700/50">
                        <p className="text-xs text-slate-500 uppercase mb-1 font-bold">Code</p>
                        <p className="font-mono text-sm text-indigo-300">{myProfile.course_code}</p>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-xl text-center border border-slate-700/50">
                        <p className="text-xs text-slate-500 uppercase mb-1 font-bold">Duration</p>
                        <p className="font-mono text-sm text-indigo-300">{myProfile.course_duration} Wks</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* AVAILABLE COURSES GRID */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6 p-2">
                <LayoutDashboard className="text-indigo-500"/>
                <h2 className="text-2xl font-bold">Course Catalog</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courses.map((c) => (
                  <div key={c.course_id} className="group bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all cursor-default relative overflow-hidden">
                    {/* Hover Glow Effect */}
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>

                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                        <BookOpen size={24} />
                      </div>
                      <span className="text-xs font-mono py-1 px-2 bg-slate-800 rounded text-slate-400 border border-slate-700 group-hover:border-indigo-500/30 transition-colors">
                        {c.course_code}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 text-slate-200 group-hover:text-white transition-colors">{c.course_name}</h3>
                    
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-4 pt-4 border-t border-slate-800">
                      <Clock size={14} className="text-indigo-500/70" />
                      <span>{c.course_duration} Weeks Duration</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}