const tickets=[
{id:"#1048",subject:"Unable to access shared folder",customer:"Northstar Logistics",priority:"High",status:"Open",assignee:"Maria Costa",initials:"MC",updated:"8 min ago"},
{id:"#1047",subject:"Invoice export is failing",customer:"Atlas Finance",priority:"Critical",status:"Open",assignee:"Alex Romero",initials:"AR",updated:"22 min ago"},
{id:"#1046",subject:"New employee access request",customer:"Vertex Health",priority:"Medium",status:"Pending",assignee:"Julia Santos",initials:"JS",updated:"41 min ago"},
{id:"#1045",subject:"Dashboard permissions",customer:"Acme Industries",priority:"Low",status:"Resolved",assignee:"Maria Costa",initials:"MC",updated:"1h ago"},
{id:"#1044",subject:"VPN connection drops",customer:"Northstar Logistics",priority:"High",status:"Open",assignee:"Alex Romero",initials:"AR",updated:"2h ago"},
{id:"#1043",subject:"Password reset request",customer:"Atlas Finance",priority:"Medium",status:"Pending",assignee:"Julia Santos",initials:"JS",updated:"2h ago"},
{id:"#1042",subject:"Purchase order integration",customer:"Acme Industries",priority:"Critical",status:"Open",assignee:"Maria Costa",initials:"MC",updated:"3h ago"},
{id:"#1041",subject:"Email signature update",customer:"Vertex Health",priority:"Low",status:"Resolved",assignee:"Julia Santos",initials:"JS",updated:"4h ago"}
];
const activities=[
["MC","Maria Costa","assigned ticket #1048","8 min ago"],
["AR","Alex Romero","resolved ticket #1045","34 min ago"],
["JS","Julia Santos","requested customer info on #1046","52 min ago"],
["MC","Maria Costa","added note to #1044","1h ago"],
["AR","Alex Romero","changed priority on #1047","2h ago"]
];

const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function priorityClass(v){return v.toLowerCase()}
function statusClass(v){return v.toLowerCase()}
function ticketRow(t){
 return `<tr><td class="ticket-id">${t.id}<span>${t.subject}</span></td><td>${t.customer}</td><td><span class="pill ${priorityClass(t.priority)}">${t.priority}</span></td><td><span class="pill ${statusClass(t.status)}">${t.status}</span></td><td><div class="assignee"><span class="avatar">${t.initials}</span>${t.assignee}</div></td><td>${t.updated}</td></tr>`
}
function renderRecent(){ $("#recent-tickets").innerHTML=tickets.slice(0,5).map(ticketRow).join("") }
function renderTickets(){
 const q=($("#ticket-search")?.value||"").trim().toLowerCase();
 const active=$(".tabs button.active")?.dataset.status||"all";
 const rows=tickets.filter(t=>(active==="all"||t.status.toLowerCase()===active)&&(!q||Object.values(t).join(" ").toLowerCase().includes(q)));
 $("#all-tickets").innerHTML=rows.length?rows.map(ticketRow).join(""):`<tr><td colspan="6" style="text-align:center;padding:35px;color:#8c98a8">No tickets found.</td></tr>`;
}
function renderActivity(){ $("#activity-list").innerHTML=activities.map(a=>`<div class="activity"><span class="avatar">${a[0]}</span><p><strong>${a[1]}</strong> ${a[2]}<time>${a[3]}</time></p></div>`).join("") }
function showView(id){
 $$(".view").forEach(v=>v.classList.toggle("active",v.id===id));
 $$(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.view===id));
 $("#page-title").textContent=id[0].toUpperCase()+id.slice(1);
 if(id==="tickets")renderTickets();
 $("#sidebar").classList.remove("open");
 window.scrollTo({top:0,behavior:"smooth"});
}
$$(".nav-item").forEach(n=>n.addEventListener("click",()=>showView(n.dataset.view)));
$$("[data-open-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.openView)));
$$(".tabs button").forEach(b=>b.addEventListener("click",()=>{$$(".tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderTickets()}));
$("#ticket-search")?.addEventListener("input",renderTickets);
$("#global-search")?.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.value.trim()){showView("tickets");$("#ticket-search").value=e.target.value;renderTickets();}});
document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#global-search").focus()}});
$("#mobile-menu").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#theme-toggle").addEventListener("click",()=>document.body.classList.toggle("dark"));

const modal=$("#modal");
function openModal(){modal.classList.add("open");setTimeout(()=>$("#subject").focus(),50)}
function closeModal(){modal.classList.remove("open")}
$("#new-ticket").addEventListener("click",openModal);$("#new-ticket-2").addEventListener("click",openModal);$("#modal-close").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
$("#ticket-form").addEventListener("submit",e=>{e.preventDefault();closeModal();const toast=$("#toast");toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2600);e.target.reset()});

renderRecent();renderTickets();renderActivity();
