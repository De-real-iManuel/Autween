(() => {
  const activities = [
    {id:"stories",title:"Build a story together",icon:"📚",type:"stories",desc:"Add a character or a new idea whenever you're ready.",tags:["stories"],href:"#studio"},
    {id:"art",title:"Make a little artwork",icon:"🎨",type:"art",desc:"Choose colors, shapes, and ideas. There is no wrong way.",tags:["art"],href:"#studio"},
    {id:"building",title:"Create a cozy world",icon:"🧱",type:"building",desc:"Imagine a place and decide what belongs there.",tags:["building"],href:"#studio"},
    {id:"puzzles",title:"Explore a gentle puzzle",icon:"🧩",type:"puzzles",desc:"Take your time and try a small challenge.",tags:["puzzles"],href:"#studio"}
  ];
  const list = document.querySelector("#activityList");
  const count = document.querySelector("#suggestionCount");
  const interestInputs = [...document.querySelectorAll('input[name="interest"]')];
  const personalToggle = document.querySelector("#personalToggle");
  const calmToggle = document.querySelector("#calmToggle");
  const selected = () => interestInputs.filter(el => el.checked).map(el => el.value);
  function render() {
    const interests = selected();
    const personalized = personalToggle.checked;
    const shown = personalized && interests.length ? activities.filter(a => interests.includes(a.type)) : activities;
    count.textContent = shown.length + (shown.length === 1 ? " activity" : " activities");
    list.innerHTML = shown.map(a => {
      const reason = personalized && interests.includes(a.type) ? "Matches something you chose" : "Here if you'd like to try it";
      return `<article class="activity-card"><div class="activity-art art-${a.type}" aria-hidden="true">${a.icon}</div><h3>${a.title}</h3><p>${a.desc}</p><p class="reason">${reason}</p><button class="small-button" type="button" data-activity="${a.id}">Explore</button></article>`;
    }).join("");
    list.querySelectorAll("button[data-activity]").forEach(button => button.addEventListener("click", () => {
      document.querySelector("#studio").scrollIntoView({behavior:calmToggle.checked?"auto":"smooth",block:"start"});
      document.querySelector("#studioTitle").textContent = activities.find(a=>a.id===button.dataset.activity).title;
      document.querySelector("#storyOutput").hidden = true;
    }));
  }
  interestInputs.forEach(el => el.addEventListener("change",render));
  personalToggle.addEventListener("change",render);
  calmToggle.addEventListener("change",()=>document.body.classList.toggle("calm-mode",calmToggle.checked));
  document.querySelector("#resetBtn").addEventListener("click",()=>{
    interestInputs.forEach(el=>el.checked=el.value==="stories");
    document.querySelector('input[name="pace"][value="quiet"]').checked=true;
    personalToggle.checked=true;calmToggle.checked=false;document.body.classList.remove("calm-mode");
    document.querySelector("#storyOutput").hidden=true;render();
  });
  document.querySelector("#storyBtn").addEventListener("click",()=>{
    const character=document.querySelector("#character").value;
    const place=document.querySelector("#place").value;
    const output=document.querySelector("#storyOutput");
    output.textContent=`One day, ${character.toLowerCase()} found a path to the ${place.toLowerCase()}. There was no rush. A new adventure could begin whenever they felt ready. What happens next is yours to imagine.`;
    output.hidden=false;
  });
  render();
})();