import{u as v,a as b,r as i,t as m,j as e,M as l,B as r,P as y,g as P}from"./index-B2bpzhXi.js";import{u as w,P as k}from"./usePets-2Ll4vto1.js";const E=()=>{const{id:n}=v(),a=b(),{getPet:x,updatePet:p}=w(),[s,h]=i.useState(null),[j,d]=i.useState(!0),[f,o]=i.useState(!0);i.useEffect(()=>{n&&u(n)},[n]);const u=async t=>{d(!0);const c=await x(t);c?(h(c),o(c.active)):(m({title:"Error",description:"Pet not found",variant:"destructive"}),a("/pets")),d(!1)},g=()=>{s&&a(`/edit-pet/${s.id}`)},N=async t=>{s&&(o(t),await p(s.id,{active:t}),m({title:"Pet status updated",description:`${s.name} is now ${t?"active":"inactive"}`}))};return j?e.jsx(l,{children:e.jsx("div",{className:"p-6 flex justify-center items-center h-[80vh]",children:e.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-petapp-teal"})})}):s?e.jsx(l,{children:e.jsxs("div",{className:"p-6 pb-24 bg-gray-50",children:[e.jsxs("header",{className:"mb-8",children:[e.jsx("h1",{className:"text-[36px] font-bold font-rubik text-black tracking-tight",children:"Pet Details"}),e.jsx("p",{className:"text-[15px] font-rubik text-gray-400 mt-1",children:"Manage your pet's information"})]}),e.jsxs("div",{className:"flex flex-col items-center mb-8",children:[s.pet_type==="cat"?e.jsx(y,{size:"lg",petType:s.pet_type,gender:s.gender}):e.jsx(k,{size:"xl",petType:s.pet_type,gender:s.gender==="male"?"Male":"Female"}),e.jsx("h2",{className:"text-2xl font-bold mt-4 font-poppins",children:s.name})]}),e.jsxs("div",{className:"bg-white rounded-lg p-6 shadow-sm mb-6",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4 font-poppins",children:"Pet Information"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-gray-500",children:"Type"}),e.jsx("span",{className:"font-medium capitalize",children:s.pet_type})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-gray-500",children:"Gender"}),e.jsx("span",{className:"font-medium capitalize",children:s.gender})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-gray-500",children:"Age"}),e.jsxs("span",{className:"font-medium",children:[s.age," years"]})]}),s.breed&&e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-gray-500",children:"Breed"}),e.jsx("span",{className:"font-medium",children:s.breed})]}),s.vaccination&&e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-gray-500",children:"Vaccination"}),e.jsx("span",{className:"font-medium",children:s.vaccination})]})]})]}),e.jsx("div",{className:"bg-white rounded-lg p-6 shadow-sm mb-8",children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold font-poppins",children:"Active Status"}),e.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Toggle to set this pet as active or inactive"})]}),e.jsx(P,{checked:f,onCheckedChange:N,className:"data-[state=checked]:bg-petapp-teal"})]})}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{onClick:g,className:"w-full bg-petapp-teal text-white",children:"Edit Pet"}),e.jsx(r,{onClick:()=>a("/pets"),variant:"outline",className:"w-full",children:"Back to Pets"})]})]})}):e.jsx(l,{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h1",{className:"text-2xl font-bold",children:"Pet not found"}),e.jsx("p",{className:"mt-4",children:"The pet you're looking for doesn't exist or has been removed."}),e.jsx(r,{className:"mt-6",onClick:()=>a("/pets"),children:"Back to Pets"})]})})};export{E as default};
